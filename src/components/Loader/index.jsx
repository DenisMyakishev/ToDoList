import { useRef } from 'react';
import styles from './index.module.css';
import './transition.css';
import { CSSTransition } from 'react-transition-group';

const Loader = ({ isLoading }) => {
	const nodeRef = useRef();
	return (
		<CSSTransition
			in={isLoading}
			nodeRef={nodeRef}
			timeout={500}
			classNames="loader"
			unmountOnExit
		>
			<div className={styles.loader} ref={nodeRef}>
				<div className={styles.overlay}></div>
				<div className={styles.clock}>
					<div className={styles.circle}>
						<div className={styles.hours}></div>
						<div className={styles.minutes}></div>
					</div>
				</div>
			</div>
		</CSSTransition>
	);
};

export default Loader;
