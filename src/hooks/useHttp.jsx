//Para enviar la request
import {useCallback, useEffect, useState} from "react";

async function sendHttpRequest(url, config){
    const response = await fetch(url, config);
    const responseData = await response.json();
    if(!response.ok){
        throw new Error(responseData.message || 'Something went wrong, failed to send request');
    }
    return responseData;//si todo va bien
}
export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData(){
        setData(initialData);
    }

    const sendRequest = useCallback(async function sendRequest(data) {//update state based on request status
        setIsLoading(true);
        try {
            const responseData = await sendHttpRequest(url, {...config, body: data});
            setData(responseData);
        } catch (error){
            setError(error.message || 'Something went wrong');
        }
        setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        if(config && (config.method === 'GET' || !config.method) || !config)//undefined
        sendRequest();
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}
