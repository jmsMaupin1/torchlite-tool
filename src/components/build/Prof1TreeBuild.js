import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import HyperLinkTooltip from '../HyperLinkTooltip';
import { DebounceInput } from 'react-debounce-input';
import CoreTooltip from '../CoreTooltip';
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';
import TalentNode from '../TalentNode';

const Prof1TreeBuild = ({
	fieldRefMainProf,
	currentTree,
	currentMainProf,
	filterNode,
	currentNodeFilter,
	mainProfPoint,
	setMainProfPoint,
	mainProfStat,
	currentTreeOrder,
	removePoint,
	addPoint,
}) => {
	const { t } = useTranslation();
	const { translate } = useContext(AppContext);
	const updateXArrow = useXarrow();

	const onSpecCoreChange = (e, index) => {
		let temp = { ...mainProfPoint };
		if (index === 1) {
			temp.core1 = e;
		}
		if (index === 2) {
			temp.core2 = e;
		}

		setMainProfPoint(temp);
	};

	return (
		<>
			{currentTree && (
				<div
					ref={fieldRefMainProf}
					style={{
						backgroundImage: `url("img/icons/TalentGodsIcon/${
							currentMainProf !== null ? currentMainProf.background.split('|')[0] : null
						}.png`,
					}}
					className="bg-[#282828] bg-no-repeat bg-contain bg-right-top  border rounded-md shadow-lg p-2 mb-2 flex flex-col"
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
						<div className="font-bold text-xl">{translate(currentMainProf.name)}</div>
						<div>Core Talent</div>
						<hr className="self-center border-slate-600 mb-4 w-[50%]"></hr>
					</div>
					<div className="flex flex-row gap-4 justify-evenly">
						<div className="coreTalent flex flex-row gap-2">
							<div className="flex flex-col items-center">
								<div className="flex flex-row justify-between">
									<CoreTooltip
										currentTree={currentTree}
										mainProfPoint={mainProfPoint}
										onSpecCoreChange={onSpecCoreChange}
										coreNumber={1}
										spec={0}
									/>
								</div>
								<div>
									{mainProfPoint.nb} / {currentTree.filter((e) => e.position === '0|0').slice(0, 3)[0].need_points}
								</div>
							</div>
							<div className="flex flex-col items-center">
								<div className="flex flex-row justify-between">
									<CoreTooltip
										currentTree={currentTree}
										mainProfPoint={mainProfPoint}
										onSpecCoreChange={onSpecCoreChange}
										coreNumber={2}
										spec={0}
									/>
								</div>
								<div>
									{mainProfPoint.nb} / {currentTree.filter((e) => e.position === '0|0').slice(3)[0].need_points}
								</div>
							</div>
						</div>
					</div>
					<div className="text-center">{t('commons:tree')}</div>
					<div className="text-center">{mainProfPoint.nb}</div>
					<div className="flex flex-row gap-2 justify-between overflow-clip w-fit">
						<div>
							<div>STATS</div>
							{mainProfStat && (
								<div className="flex flex-col overflow-y-auto text-sm">
									{Object.entries(mainProfStat).map(([affix, stat]) => (
										<HyperLinkTooltip
											key={affix}
											str={translate('affix_class|description|' + affix)
												.replace('$P1$', stat)
												.replace('$+P1$', '+' + stat)}
										/>
									))}
								</div>
							)}
						</div>
						<div
							onScroll={() => updateXArrow()}
							className="overflow-x-auto md:overflow-visible flex flex-col items-start md:pl-0 relative md:static"
						>
							<Xwrapper>
								{currentTreeOrder.map((line, x) => (
									<div key={'line' + x} id={'line_' + x} className="flex flex-row justify-center items-center">
										{line.map((column, y) => (
											<TalentNode
												search={currentNodeFilter}
												key={'talentNode' + y}
												type={'main'}
												column={column}
												y={y}
												profPoint={mainProfPoint}
												x={x}
												removePoint={removePoint}
												addPoint={addPoint}
												id={column !== undefined ? column.id : null}
											/>
										))}
									</div>
								))}
								{currentTreeOrder.map((line) =>
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

export default Prof1TreeBuild;
