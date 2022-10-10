import { MdArrowCircleUp } from 'react-icons/md';

const Footer = () => {
	return (
		<>
			<div className="bottom-0 right-2 fixed z-10">
				<button title="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
					<MdArrowCircleUp className="w-10 h-10" />
				</button>
			</div>
			<footer className="border-t mt-2 border-gray-500">
				<div className="text-sm flex justify-between p-2 gap-2 container mx-auto">
					<div>This site is fan-made and not affiliated with XD in any way.</div>
					<div>Made with 💗 by TheConcepteur</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
