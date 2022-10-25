import { useTranslation } from 'react-i18next';
import React from 'react';
import { MdTouchApp } from 'react-icons/md';

const AbilityTreeHelper = () => {
	const { t } = useTranslation();

	return (
		<div className="border border-green-600 bg-green-900 rounded-lg my-2 p-2 flex flex-row gap-4 justify-between">
			<div className="flex flex-row gap-2 items-center">
				<div>
					<img loading="lazy" src="img/rightBtn.png" alt="Right click" style={{ transform: 'rotateY(180deg)' }} />
				</div>
				<div>{t('commons:add_point')}</div>
				<div>
					<img loading="lazy" className="hidden md:block" src="img/rightBtn.png" alt="Right click" />
					<div>
						<MdTouchApp className="md:hidden" alt="Long Press" />
					</div>
				</div>
				<div>{t('commons:remove_point')}</div>
			</div>
		</div>
	);
};

export default AbilityTreeHelper;
