type TModal = {
    onClose: () => void;

}
const Modal = ({ onClose }: TModal) => {
    return (
        <div
            onClick={
                (e) => {
                    onClose();
                    e.stopPropagation();
                }
            }
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "grey",
                    height: 150,
                    width: 240,
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                }}
            >
                test modal
            </div>
        </div>
    );
};

export default Modal;
