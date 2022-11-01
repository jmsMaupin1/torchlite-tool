import { useContext } from 'react';
import { Tooltip } from 'flowbite-react';
import { AppContext } from '../context/AppContext';

function HyperLinkTooltip({ str, className, style, disable = false }) {
	const { dataI18n } = useContext(AppContext);

	if (Array.isArray(str)) {
		str = str[0];
	}
	if (!str) {
		return '';
	}
	let myReg = /<e([^>]*)[^>]*>(.*?)<\/e>/gim;
	let myMatch = myReg.exec(str);
	let content = null;

	if (myMatch !== null) {
		let myId = myMatch[1].replace('id=', '').replace(' ', '');
		content = dataI18n.find((h) => h.index === 'hyperlink|des|' + myId);
		if (content !== undefined) {
			content = content.value.replaceAll('\\n', '<br>');
		}
	}
	let myStringReturn = str
		.replace(myReg, "<a style='color:#ffc130;font-weight:bold' class='tooltip hover:cursor-pointer'>$2</a>")
		.replaceAll('\\n', '<br>');
	if (!content) {
		return <div style={style} className={className} dangerouslySetInnerHTML={{ __html: myStringReturn }} />;
	} else {
		return (
			<Tooltip content={<div dangerouslySetInnerHTML={{ __html: content }} />} trigger="hover">
				<div style={style} className={className} dangerouslySetInnerHTML={{ __html: myStringReturn }} />
			</Tooltip>
		);
	}
}
export default HyperLinkTooltip;
