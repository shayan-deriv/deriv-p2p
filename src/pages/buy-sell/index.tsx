import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AdvertDetailModal from "../../components/modals/advert-detail";
import { useGetUrlParams } from "../../hooks";
import getAdvertIdFromUrl from "../../utils/url/getAdvertIdFromUrl"

type TAdvert = {
    id: number;
    advertiser: string;
    title: string;
    type: string;
}[]
const BuySellPage = () => {
    const { urlParams, setUrlParams } = useGetUrlParams();
    const [adverts, setAdverts] = React.useState<TAdvert>([]);

    const navigate = useNavigate();
    const current_url = window.location.pathname;

    const advert_type = urlParams.get('type')
    const selected_advert_id = getAdvertIdFromUrl(current_url) ?? '';

    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        navigate(-1)
    };

    const handleOpen = (e: React.MouseEvent<HTMLElement>, advert_id: number) => {
        e.stopPropagation();
        navigate(`/p2p/buy-sell/${advert_type}/${advert_id}?type=${advert_type}`);
    };

    const filterBuyAndSell = (type: string) => {
        setUrlParams({ type });
        fetchAdverts();
    }

    React.useEffect(() => {
        fetchAdverts();
    }, []);

    const fetchAdverts = async () => {
        const response = await fetch(`http://localhost:3001/adverts`);
        const data = await response.json();
        setAdverts(data);
    }

    return <div>
        <h1>buy and sell page</h1>
        <div style={{ display: 'flex', gap: 5 }}>
            <button className={advert_type === 'buy' ? 'active-tab' : ''} onClick={() => filterBuyAndSell('buy')}>buy</button>
            <button className={advert_type === 'sell' ? 'active-tab' : ''} onClick={() => filterBuyAndSell('sell')}>sell</button>
        </div>
        <ul>
            {adverts?.filter((advert) => advert?.type === advert_type).map((advert) => {
                return (
                    <li key={advert.id} className="adverts-table">
                        <span>{advert.id}</span>
                        <Link to={`/p2p/advertisers/${advert?.id}`}><span>{advert?.advertiser}</span></Link>
                        <span>{advert.title}</span>
                        <span>{advert.type}</span>
                        <button onClick={(e) => handleOpen(e, advert?.id)}>{advert_type === 'buy' ? 'BUY' : 'SELL'}</button>
                    </li>
                )
            })}
        </ul>
        {selected_advert_id && <AdvertDetailModal onClose={handleClose} advert_id={selected_advert_id} />}

    </div>;
};

export default BuySellPage;
