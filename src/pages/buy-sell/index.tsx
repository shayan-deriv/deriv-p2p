import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BuySellModal from "../../components/modal";

type TAdvert = {
    id: number;
    advertiser: string;
    title: string;
    type: string;
}[]
const BuySellPage = () => {
    const [searchParams, SetSearchParams] = useSearchParams();
    const [adverts, setAdverts] = React.useState<TAdvert>([]);

    const navigate = useNavigate();
    const advert_type = searchParams.get('type')
    const selected_advert_id = searchParams.get('advert');

    const handleClose = () => {navigate(-1)};

    const handleOpen = (id: number) => {navigate(`/p2p/buy-sell/${advert_type}?type=${advert_type}&advert=${id}`)};

    const filterBuyAndSell = (type: string) => {
        SetSearchParams({ type });
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
                        <button onClick={()=>handleOpen(advert?.id)}>{advert_type === 'buy' ? 'BUY' : 'SELL'}</button>
                    </li>
                )
            })}
        </ul>
        {selected_advert_id &&  <BuySellModal onClose={handleClose} />}

    </div>;
};

export default BuySellPage;
