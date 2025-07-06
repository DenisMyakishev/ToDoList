import LogoGitHub from '../../assets/LogoGitHub/index';
import LogoTelegram from '../../assets/LogoTelegram';
import styles from './index.module.css';

const Footer = () => {
	return (
		<footer className="footer">
			<div className={`container ${styles.footerContainer}`}>
				<span>Created by:</span>
				<div className={styles.links}>
					<span>DenisMyakishev</span>
					<a href="https://github.com/DenisMyakishev" target="_blank">
						<LogoGitHub />
					</a>
					<a href="https://t.me/myachden" target="_blank">
						<LogoTelegram />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
