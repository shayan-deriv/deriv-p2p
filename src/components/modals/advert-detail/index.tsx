import React from "react";
import { useNavigate } from "react-router-dom";
// import { useGetUrlParams } from "../../../hooks";

type TAdvertDetailModal = {
    // eslint-disable-next-line no-unused-vars
    onClose: (e: React.MouseEvent<HTMLElement>) => void;
    advert_id: string;

}
const AdvertDetailModal = ({ onClose }: TAdvertDetailModal) => {
    const navigate = useNavigate();
    // const {targetParams} = useGetUrlParams(['']);
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
                    height: 450,
                    width: 540,
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                    zIndex: 10,
                }}
            >
                <h2>advert details:</h2>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        onClose(e)
                    }
                    }>Cancel</button>
                    <button onClick={
                        (e) => {
                            // eslint-disable-next-line no-console
                            e.stopPropagation();
                            onClose(e);
                            navigate('/p2p/buy-sell')
                        }
                    }>Buy</button>
                </div>
            </div>
        </div>
    );
};

export default AdvertDetailModal;
