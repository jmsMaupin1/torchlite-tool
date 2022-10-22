import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { DebounceInput } from 'react-debounce-input';
import CoreTooltip from '../CoreTooltip';
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';
import TalentNode from '../TalentNode';

const Spec1TreeBuild = ({
	fieldRefSpec1,
	currentTreeSpec1,
	filterNode,
	currentNodeFilter,
	spec1Point,
	setSpec1Point,
	spec1Stat,
	currentTreeOrderSpec1,
	removePoint,
	addPoint,
	spec1,
}) => {
	const { t } = useTranslation();
	const { translate } = useContext(AppContext);
	const updateXArrow = useXarrow();

	const onSpec1CoreChange = (e, index) => {
		let temp = { ...spec1Point };
		if (index === 1) {
			temp.core1 = e;
		}
		if (index === 2) {
			temp.core2 = e;
		}
		//this.refs.Tooltip.hide();
		setSpec1Point(temp);
	};

	return (
		<>
			{currentTreeSpec1 && (
				<div
					ref={fieldRefSpec1}
					style={{
						backgroundImage: `url("img/icons/TalentGodsIcon/${spec1 !== null ? spec1.background.split('|')[0] : null}.png`,
					}}
					className="bg-[#282828] bg-no-repeat bg-contain bg-right-top border rounded-md shadow-lg p-2 mb-2"
				>
					<div>
						<DebounceInput
							value={currentNodeFilter}
							className="w-auto bg-[#282828] border rounded border-slate-500"
							placeholder="Filter node..."
							debounceTimeout={500}
							onChange={(event) => filterNode(event)}
						/>
					</div>
					<div className="text-center flex flex-col justify-center">
						<div className="font-bold text-xl">{translate(spec1.name)}</div>
						<div>Core Talent</div>
						<hr className="self-center border-slate-600 mb-4 w-[50%]"></hr>
					</div>
					<div className="flex flex-row gap-4 justify-evenly">
						<div className="coreTalent flex flex-row gap-2">
							<div className="flex flex-col items-center">
								<div className="flex flex-row justify-between">
									<CoreTooltip
										currentTree={currentTreeSpec1}
										mainProfPoint={spec1Point}
										onSpecCoreChange={onSpec1CoreChange}
										coreNumber={1}
										spec={1}
									/>
								</div>
								<div>
									{spec1Point.nb} / {currentTreeSpec1.filter((e) => e.position === '0|0').slice(0, 3)[0].need_points}
								</div>
							</div>
							<div className="flex flex-col items-center">
								<div className="flex flex-row justify-between">
									<CoreTooltip
										currentTree={currentTreeSpec1}
										mainProfPoint={spec1Point}
										onSpecCoreChange={onSpec1CoreChange}
										coreNumber={2}
										spec={1}
									/>
								</div>
								<div>
									{spec1Point.nb} / {currentTreeSpec1.filter((e) => e.position === '0|0').slice(3)[0].need_points}
								</div>
							</div>
						</div>
					</div>
					<div className="text-center">{t('commons:tree')}</div>
					<div className="text-center">{spec1Point.nb}</div>
					<div className="flex flex-row gap-2 justify-between overflow-clip w-fit">
						<div>
							<div>STATS</div>
							{spec1Stat && (
								<div className="flex flex-col overflow-y-auto text-sm">
									{Object.entries(spec1Stat).map(([affix, stat]) => (
										<div
											key={affix}
											dangerouslySetInnerHTML={{
												__html: translate('affix_class|description|' + affix)
													.replace('$P1$', stat)
													.replace('$+P1$', '+' + stat),
											}}
										></div>
									))}
								</div>
							)}
						</div>
						<div
							onScroll={() => updateXArrow()}
							className="overflow-auto md:overflow-visible flex flex-col items-start md:pl-0 relative md:static"
						>
							<Xwrapper>
								{currentTreeOrderSpec1.map((line, x) => (
									<div key={'line' + x} className="flex flex-row  justify-center items-center">
										{line.map((column, y) => (
											<TalentNode
												search={currentNodeFilter}
												key={'talentNode' + y}
												type={'spec1'}
												column={column}
												y={y}
												profPoint={spec1Point}
												x={x}
												removePoint={removePoint}
												addPoint={addPoint}
												id={column !== undefined ? column.id : null}
											/>
										))}
									</div>
								))}
								{currentTreeOrderSpec1.map((line) =>
									line
										.filter((column) => column !== undefined && column.before_id !== '')
										.map((column) => (
											<Xarrow
												key={column.id + '-' + column.before_id}
												startAnchor={'left'}
												color={'white'}
												endAnchor={'right'}
												start={column.id} //can be react ref
												end={column.before_id} //or an id
												strokeWidth={2}
												showHead={false}
												curveness={0}
											/>
										))
								)}
							</Xwrapper>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Spec1TreeBuild;
