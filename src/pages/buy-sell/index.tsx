import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdvertDetailModal from "../../components/modals/advert-detail";
import { useGetUrlParams } from "../../hooks";
import getAdvertIdFromUrl from "../../utils/url/getAdvertIdFromUrl"
import { AuthContext } from "../../context/AuthProvider";

type TAdvert = {
    id: number;
    advertiser: string;
    title: string;
    type: string;
}[]

type TModalStates = "advert_detail" | "advert_confirmation" | "action_successful"

const BuySellPage = () => {
    const {
        is_user_verified,
        is_allowed_to_see_advert_detail,
        is_allowed_to_buy_or_sell_advert,
    } = useContext(AuthContext);
    const { urlParams, setUrlParams } = useGetUrlParams();
    const [adverts, setAdverts] = React.useState<TAdvert>([]);

    const navigate = useNavigate();
    const current_url = window.location.pathname;

    const advert_type = urlParams.get('type')
    const selected_advert_id = getAdvertIdFromUrl(current_url) ?? '';
    const current_modal = urlParams.get('step') ?? undefined;

    const SemanticModalRoutes = {
        advert_detail: `/p2p/buy-sell/modal/${advert_type}/${selected_advert_id}?type=${advert_type}&step=show_advert_detail`,
        advert_confirmation: `/p2p/buy-sell/modal/${advert_type}/${selected_advert_id}?type=${advert_type}&step=show_advert_confirmation`,
        action_successful: `/p2p/buy-sell/modal/${advert_type}/${selected_advert_id}?type=${advert_type}&step=action_successful`,
    }

    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        navigate(-1)
    };

    const handleOpen = (e: React.MouseEvent<HTMLElement>, advert_id: number) => {
        e.stopPropagation();
        if (is_user_verified && is_allowed_to_see_advert_detail)
            navigate(`/p2p/buy-sell/modal/${advert_type}/${advert_id}?type=${advert_type}&step=show_advert_detail`);
        else
            navigate('/401')
    };

    const isVerified = (step : TModalStates) => {
        switch (step) {
            case 'advert_detail':
                return is_user_verified && is_allowed_to_see_advert_detail;
            case 'advert_confirmation':
                return is_user_verified && is_allowed_to_buy_or_sell_advert;
            case 'action_successful':
                return is_user_verified;
            default:
                return false;
        }
    }

    const handleNextState = (
            e: React.MouseEvent<HTMLElement>,
            next_step:TModalStates
        ) => {
        e.stopPropagation();
        //verify if user is valid to perform next action
            if(isVerified(next_step)){
                navigate(SemanticModalRoutes[next_step]);
            }else{
                navigate('/401')
            }
    }

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
        {
            is_user_verified && is_allowed_to_see_advert_detail && selected_advert_id && current_modal === 'show_advert_detail' &&
            <AdvertDetailModal onClose={handleClose} onNextAction={handleNextState} advert_id={selected_advert_id} />
        }

        {
            is_user_verified && selected_advert_id && current_modal === 'show_advert_confirmation' &&
            <AdvertDetailModal onClose={handleClose} onNextAction={handleNextState} advert_id={selected_advert_id} />
        }

    </div>;
};

export default BuySellPage;
