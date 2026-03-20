import { useState, useEffect } from "react";
import styles from "./Disclaimer.module.css";

const STORAGE_KEY = "disclaimerClosed";

const Disclaimer = () => {
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
                Для входа можно использовать любой email — даже вымышленный, например test@mail.com
                <br />
                To use this service, you can enter any email - even a fake one like test@mail.com
            </p>
            <button
                type="button"
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="Закрыть"
            >
                ×
            </button>
        </div>
    );
};

export default Disclaimer;