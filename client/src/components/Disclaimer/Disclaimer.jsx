import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Disclaimer.module.css";

const STORAGE_KEY = "disclaimerClosed";

const Disclaimer = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const closed = localStorage.getItem(STORAGE_KEY);
        if (closed === "true") setIsVisible(false);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem(STORAGE_KEY, "true");
    };

    if (!isVisible) return null;

    return (
        <div className={styles.disclaimer}>
            <p className={styles.disclaimerText}>
                {t("disclaimer.text")}
            </p>
            <button
                type="button"
                className={styles.closeButton}
                onClick={handleClose}
                aria-label={t("disclaimer.close")}
            >
                ×
            </button>
        </div>
    );
};

export default Disclaimer;