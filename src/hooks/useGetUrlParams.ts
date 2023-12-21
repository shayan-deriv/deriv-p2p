import { useSearchParams } from "react-router-dom";

const useGetUrlParams = (params: string[] = []) => {
    const [urlParams, setUrlParams] = useSearchParams();
    const targetParams: { [key: string]: string | null } = {};

    params.forEach((param) => {
        targetParams[param] = urlParams.get(param);
    });

    return {
        urlParams,
        targetParams,
        setUrlParams,
    };

}

export default useGetUrlParams;
