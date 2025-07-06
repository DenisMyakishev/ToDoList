import styles from './index.module.css';

const LogoGitHub = () => {
	return (
		<svg
			className={styles.logoGitHub}
			viewBox="0 0 37 37"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_d_1_309)">
				<rect x="4" y="1" width="34" height="34" rx="17" fill="white" />
			</g>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M21 1C16.964 0.997875 13.059 2.46929 9.98429 5.15076C6.90961 7.83223 4.86603 11.5486 4.21947 15.6345C3.57292 19.7204 4.36562 23.9089 6.45564 27.45C8.54565 30.9911 11.7965 33.6536 15.626 34.9606C16.4795 35.1227 16.7877 34.5878 16.7877 34.1501C16.7877 33.7124 16.7877 32.6426 16.7877 31.1917C12.046 32.2454 11.0661 28.8574 11.0661 28.8574C10.7524 27.7855 10.07 26.8667 9.14565 26.2719C7.60458 25.1939 9.26419 25.2101 9.26419 25.2101C9.8025 25.2874 10.3165 25.4896 10.7671 25.8015C11.2177 26.1133 11.5929 26.5264 11.8642 27.0095C13.3816 29.6761 15.8157 28.9061 16.8115 28.4603C16.8901 27.5749 17.274 26.7472 17.8942 26.126C14.1166 25.6883 10.1493 24.197 10.1493 17.5183C10.1243 15.7857 10.7528 14.1102 11.9038 12.8416C11.3809 11.3393 11.4403 9.68849 12.0697 8.22981C12.0697 8.22981 13.4922 7.75971 16.7403 10.0129C19.5241 9.23484 22.4601 9.23484 25.2438 10.0129C28.4919 7.75971 29.9145 8.22981 29.9145 8.22981C30.5391 9.68962 30.5985 11.3386 30.0804 12.8416C31.2292 14.111 31.855 15.7867 31.827 17.5183C31.827 24.2132 27.8755 25.6802 24.0742 26.1179C24.4821 26.5418 24.7962 27.0507 24.9953 27.6101C25.1944 28.1695 25.2738 28.7663 25.228 29.36C25.228 31.6862 25.228 33.5665 25.228 34.142C25.228 34.7175 25.5363 35.1471 26.3977 34.9525C30.2233 33.6404 33.469 30.9752 35.5541 27.4336C37.6392 23.892 38.4277 19.7051 37.7785 15.6219C37.1294 11.5387 35.0849 7.82549 32.0109 5.1466C28.9369 2.46772 25.0339 0.997872 21 1Z"
				stroke="black"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<defs>
				<filter
					id="filter0_d_1_309"
					x="0"
					y="0"
					width="42"
					height="42"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_1_309"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_1_309"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	);
};

export default LogoGitHub;
