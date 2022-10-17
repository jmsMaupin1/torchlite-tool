import cardRecipe from './../data/cardRecipe.json';
import rewardGroup from './../data/rewardGroup.json';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Loader from '../components/Loader';
import FateCardCard from '../components/FateCardCard';

function FateCard() {
	const { translate, itemBase } = useContext(AppContext);
	//const { t } = useTranslation();
	if (itemBase === null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}
	return (
		<div className="grid grid-cols-5 gap-2">
			{cardRecipe
				.sort((a, b) => a.rarity - b.rarity)
				.map((card, index) => (
					<FateCardCard card={card} key={'recipe' + index} />
				))}
		</div>
	);
}
export default FateCard;
