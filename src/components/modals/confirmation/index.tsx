import React from "react";

type TAdvertConfirmationModal = {
    // eslint-disable-next-line no-unused-vars
    onClose: (e: React.MouseEvent<HTMLElement>) => void;
    advert_id: string;

}
const AdvertConfirmationModal = ({ onClose }: TAdvertConfirmationModal) => {
    return (
        <div
            onClick={
                (e) => {
                    onClose(e);
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
                    zIndex: 10,
                }}
            >
                <h2>Are you sure?</h2>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button onClick={}>No</button>
                    <button onClick={}>Yes</button>
                </div>
            </div>
        </div>
    );
};

export default AdvertConfirmationModal;
