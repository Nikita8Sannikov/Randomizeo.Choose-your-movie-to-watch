import styles from "./Spinner.module.css";

const Spinner = () => {
	return (
		<div className={styles.fullScreenContainer}>
			<div className={styles.timerContainer}>
				<div className={styles.timerLoader}></div>
			</div>
		</div>
	);
};

export default Spinner;
