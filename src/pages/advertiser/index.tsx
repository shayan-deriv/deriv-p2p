import React from "react";
import { useParams, useNavigate } from "react-router-dom";

type TAdvertiser = {
    id: string;
    name: string;
    email: string;
}

const Advertiser = () => {
    const { id } = useParams<{ id: string }>();
    const [advertiser, setAdvertiser] = React.useState<TAdvertiser>();
    const navigate = useNavigate();

    React.useEffect(() => {
        if(id)
            fetchAdvertiser(id);
    }, [id]);

    const fetchAdvertiser = async (id: string) => {
        const response = await fetch(`http://localhost:3001/advertisers/${id}`);
        const data = await response.json();
        setAdvertiser(data);
    }
    return <div>

        <h1><span className="back-btn" onClick={() => navigate(-1)}>&larr;</span>Advertiser info</h1>
        <div> id: {advertiser?.id}</div>
        <div> name: {advertiser?.name}</div>
        <div> email: {advertiser?.email}</div>
    </div>;
};

export default Advertiser;
