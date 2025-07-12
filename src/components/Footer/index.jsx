import { CONTACT_LINKS } from '../../constants/contactLinks.jsx';
import styles from './index.module.css';

const Footer = () => {
	return (
		<footer>
			<hr className={styles.separator}/>
			<div className={`container ${styles.footerContainer}`}>
				<span>Created by:</span>
				<div className={styles.links}>
					<span>DenisMyakishev</span>
					{CONTACT_LINKS.map(({ link, logo }) => {
						return (
							<a href={link} target="_blank" key={link}>
								{logo}
							</a>
						);
					})}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
