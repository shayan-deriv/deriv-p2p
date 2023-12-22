/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

type TModalStates = "advert_detail" | "advert_confirmation" | "action_successful"
type TAdvertDetailModal = {
    onClose: (e: React.MouseEvent<HTMLElement>) => void;
    onNextAction: (e: React.MouseEvent<HTMLElement>, next_step: TModalStates ) => void;
    advert_id: string;
}

type TAdvert = {
    id: number;
    advertiser: string;
    title: string;
    type: string;
}

const AdvertDetailModal = ({ onClose, onNextAction, advert_id }: TAdvertDetailModal) => {
    const [advert, setAdvert] = React.useState<Partial<TAdvert>>({});
    const fetchAdvert = async () => {
        const response = await fetch(`http://localhost:3001/adverts/${advert_id}`);
        const data = await response.json();
        setAdvert(data);
    }

    useEffect(() => {
        fetchAdvert();
    }
    , []);

    return (
        <div
            onClick={onClose}
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
                onClick={(e) => e.stopPropagation()}
            >
                <h2>advert details:</h2>
                <div style={{ display: "flex", justifyContent: "space-between", flexDirection:'column' }}>
                    <div style={{display:'flex', flexDirection:'column', paddingBottom:10}}>
                    <span>id:{ advert?.id}</span>
                    <span>advertiser:{ advert?.advertiser}</span>
                    <span>title:{ advert?.title}</span>
                    <span>type:{ advert?.type}</span>
                    </div>
                    <div style={{display:"flex", justifyContent:"flex-end", gap:5}}>
                    <button onClick={(e) => { onNextAction(e ,'advert_detail') }}>prev</button>
                    <button onClick={(e) => { onNextAction(e, 'advert_confirmation') }}>next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertDetailModal;
