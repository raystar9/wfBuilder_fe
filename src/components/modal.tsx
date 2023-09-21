import styles from "./modal.module.scss";

export default function Modal({visible, closeModalHandler}) {
    return (
        <div className={styles.modalWrap +" " + (visible?styles.visible:"")}>
            <div className="modal-main">
                <div className="modal-body"></div>
                <button>close</button>
            </div>
        </div>
    )
}