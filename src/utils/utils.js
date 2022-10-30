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
	Formats the original itemBases object into a more user friendly object that behaves like a pseudo-database

	TODO: currently this ignores everything thats not gear in the itemBase. This should be modified to accomodate those other types of items
	such as embers etc.

	@param {Object} bases - all the item bases
	@param {String} language - the language to translate text into
	@param {Function} translate - a function to translate a given string into the desired language

	@return {Object} returns a formatted object embedded with gear base data
*/
export const formatItemBases = (bases, language, translate) => {
	const formattedBases = {}

	const type2Map = {
		"1": {
			type: "weapon",
			allowed_subtypes: ["one-handed", "two-handed"]
		},
		"2": {
			type: "armour",
			allowed_subtypes: ["chest", "helmet", "feet", "hands"]
		},
		"3": {
			type: "offhand",
			allowed_subtypes: ["off hand"]
		},
		"4": {
			type: "trinket",
			allowed_subtypes: ["finger", "neck", "waist"]
		}
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

		const { allowed_subtypes } = type2Map[base.type2]

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