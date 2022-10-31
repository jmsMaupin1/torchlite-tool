import { max, min } from "lodash";
import BaseCard from "../components/base/BaseCard";

//format an array of data to [[], [], [], ...x] (x define by dataPerRow) for ViewportList
export const formatArray = (data, dataPerRow) => {
	let tmp1 = [];
	let result = [];

	data.forEach((item, key) => {
		if (tmp1.length >= dataPerRow) {
			result.push(tmp1);
			tmp1 = [];
		}

		tmp1.push(item);
		//add last row to result if we parse all the data
		if (key === data.length - 1) result.push(tmp1);
	});

	return result;
};


/*
	formats the gear portion of our item base
*/
const formatGear = (bases, language, translate) => {
	const formattedBases = {}

	const type2Map = {
		"1": ["one-handed", "two-handed"],
		"2": ["chest", "helmet", "feet", "hands"],
		"3": ["off hand"],
		"4": ["finger", "neck", "waist"]
	}

	for (const base of bases) {
		if (!base.icon || base.name === translate(base.name) || !(base.type2 in type2Map) || (!base.base_attr_modifier && base.type2 !== "4"))
			continue

		base.description1 = translate(base.description1)
		base.description2 = translate(base.description2)
		base.name = translate(base.name)
		base.weapon_type = translate(base.weapon_type)
		base.base_attr_display = base['base_attr_display_' + language]
		base.suffix = base['suffix_' + language]

		const allowed_subtypes = type2Map[base.type2]

		// The wildcard notation here is mostly for testing purposes. Basically change the allowed_subtypes
		// in the type2Map object to just a "*" and it will allow all base.description2's in the formattedBases map
		// this is useful when you want to see what else we may need to add to the allowed_subtypes array for example.
		if ((allowed_subtypes === "*" || allowed_subtypes.indexOf(base.description2.toLowerCase()) > -1)) {
			if (base.description2 in formattedBases) {
				if (base.description1 in formattedBases[base.description2]) {
					formattedBases[base.description2][base.description1].push(base)
				} else {
					formattedBases[base.description2][base.description1] = [base]
				}
			} else {
				formattedBases[base.description2] = {[base.description1]:[base]}
			}
		}
	}

	return formattedBases
}


/*
	We want to format the embers map like so:

	embers = {
		[translate(e.name)] : {
			detail: translate(e.detail),
			description1: translate(e.description1),
			description2: translate(e.description2),
			id: e.id,

			mods = {

				we probably dont actually need to keep track of group weight, min, max values etc. because we will have to 
				dynamically calculate that each time for each new base depending on the item level
				group: {
					affix: (min - max) some text where min is min of worst tier and max is max of t1
					total_weight: sum of all tiers weights
					exclusive group: this is the group that we check to see if a mod is even able to roll on an item, no two mods with the same exclusive group can roll on a single item
					modifier_type: (this should be something like prefix vs suffix?)

					for the types, this particular group of mods can only roll on gear whos types match all three of these (type2,3,4) vars
					but it looks like each we only need to match type4 here since all embers are assumed to have a type1 of 1
					and each type4 is unique to its group of items.
					type4
					tiers [
						sort list by required_level probably
						{
							min: min of tier
							max: max of tier
							weight: weight of this mod to roll when selecting rolls from this mod group
							required_level: the required min level of the base for this tier to be able to roll
						}
					]
				}
			}
		}
	}
*/
const formatEmbers = (emberBases, mods, translate) => {
	const embers = {}
	const emberIDMap = {}

	for (const base of emberBases) {
		embers[translate(base.name)] = {
			detail: translate(base.detail),
			description1: translate(base.description1),
			description2: translate(base.description2),
			id: base.id,
			icon: base.icon,
			name: translate(base.name),
			mods: {}
		}
		emberIDMap[base.id] = translate(base.name)
	}

	for (const mod of mods) {
		// mod.Ashes 200001 looks to be corrupted mods
		if (mod.tier === "0" || mod.type1 !== "1" || mod.forge_weight === "0" || mod.Ashes === "200001")
			continue;
	
		const ember = embers[emberIDMap[mod.Ashes]],
			  dparams = mod.dynmc_params;

		let ranges = [];

			if (dparams.indexOf(';') > -1) {
				ranges = dparams.split(";").sort((a, b) => parseInt(a.split("|")[1]) - parseInt(b.split('|')[1]));
			} else {
				ranges = dparams.split("|").sort((a, b) => parseInt(a) - parseInt(b));
			}


		if (!(mod.group in ember.mods)) {
			ember.mods[mod.group] = {
				affix: mod.affix[0].replace(/\(-?\d+--?\d+\)|[\+|-](\d+)%/g, '(#-#)'),
				exclusive_group: mod.exclusive_group,
				modifier_type: mod.modifier_type,
				type4: mod.type4,
				tiers: [{
					min: ranges[0],
					max: ranges[1],
					tier: mod.tier,
					dynamic: mod.dynmc_params,
					affix: mod.affix,
					weight: parseInt(mod.forge_weight),
					required_level: parseInt(mod.forge_level)
				}]
			}
		} else {
			ember.mods[mod.group].tiers.push({
				min: ranges[0],
				max: ranges[1],
				tier: mod.tier,
				affix: mod.affix,
				weight: parseInt(mod.forge_weight),
				required_level: parseInt(mod.forge_level)
			})
		}
	}
	return embers
}

/*
	Formats the original itemBases object into a more user friendly object that behaves like a pseudo-database

	TODO: currently this ignores everything thats not gear in the itemBase. This should be modified to accomodate those other types of items
	such as embers etc.

	notes: 
		- type1:
			-  1: gear
			-  4: nothing
			-  5: memory fragment
			-  6: skill
			-  7: non-ember or flame fuel crafting mats [Elixir of oblivion, Call of netherrealm, netherrealm resonance, energy core]
			-  8: Temp items
			-  9: Quest Items
			- 10: compasses
			- 11: revival token
			- 13: Letter (temp item)
			- 15: ember
			- 16: Fossils
			- 17: Fuel
			- 18: Beacons
			- 19: Proof tokens
			- 20: Corroding mats
			- 21: Reward chests
			- 22: Black Gold
		
			

		- type1: 1 (gear), type2: 1 (weapons)
			- type3:
				-  1: Hammer type4: 4, 11
				-  2: Sword  type4: 6, 10
				-  3: Gun    type4: 26, 27, 28
				-  4: Bow    type4: 9, 29
				-  5: staff  type4: 2, 3, 12, 14
				-  8: Dagger type4: 5, 8
				-  9: Claw   type4: 1,
				- 10: Axe    type4: 7, 3
		- type1: 1 (gear), type2: 2 (armour)
			- type3:
				- 12: Gloves type4: 40, 41, 42
				- 13: Feet   type4: 50, 51, 52
				- 14: Chest  type4: 60, 61, 62
				- 15: Helmet type4: 70, 71, 72
		- type1: 1 (gear), type2: 3 (off hand)
			- type3:
				- 11: Off hand type4: 80, 81, 82
		- type1: 1 (gear), type2: 4 (trinkets)
			- type3:
				- 16: Neck type4: 20
				- 17: Belt type4: 23
				- 18: Finger type4: 21


	@param {Object} bases - all the item bases
	@param {String} language - the language to translate text into
	@param {Function} translate - a function to translate a given string into the desired language

	@return {Object} returns a formatted object embedded with gear base data
*/
export const formatItemBases = (bases, language, translate, emberMods) => {
	let gear = [],
		embers = [];

	for (const base of bases) {
		if (base.name === translate(base.name))
			continue

		if (base.type1 === "15")
			embers.push(base)
		else if (base.type1 === "1") {
			gear.push(base)
		}
	}
	
	const newib = {
		embers: formatEmbers(embers, emberMods, translate),
		gear: formatGear(gear, language, translate)
	}

	console.log(newib)

	return newib
}


/* 
	After we update our embers to match a basetype we need to recalculate what the mod group
	weights will be, as well as the roll ranges and attempt to update the affix
*/
export const updateEmberWeightsAndAffix = ember => {
	const mods = ember.mods;
	let emberweight = 0;

	for (const modKey in mods) {
		let mod = mods[modKey],
			replaceStr = '';

		mod.weight = mod.tiers.reduce((sum, tier) => sum + tier.weight, 0);
		emberweight += mod.weight;
		mod.max = mod.tiers[0].max;
		mod.min = mod.tiers[mod.tiers.length - 1].min;

		if (mod.max) {
			if (mod.max.indexOf("|") > -1) {
				let min_roll = mod.min.split("|"),
					max_roll = mod.max.split("|")
				replaceStr = `(${min_roll[0]}-${min_roll[1]}) - (${max_roll[0]}-${max_roll[1]})`
			} else {
				replaceStr = `(${mod.min}-${mod.max})`
			}

			mod.affix = mod.affix.replace(/(\(#-#\) - \(#-#\))|\(#-#\)/g, replaceStr);
		}
	}

	ember['weight'] = emberweight;

	return ember;
}