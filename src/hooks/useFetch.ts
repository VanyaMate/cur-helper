import { useEffect, useState } from 'react';


export type FetchError =
    {
        status: number;
        message: string;
    }
    | null;

export type FetchData<Data> =
    Data
    | null;

export type Fetch<Data> = {
    loading: boolean;
    error: FetchError;
    data: FetchData<Data>;
}

export type FetchResponseError = {
    message: string;
    path: string;
    statusCode: number;
    timestamp: string;
}

export const useFetch = function <Data> (url: string): Fetch<Data> {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ]     = useState<FetchError>(null);
    const [ data, setData ]       = useState<Data | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        let aborted: boolean  = false;
        setLoading(() => true);
        setError(() => null);

        fetch(url, { signal: abortController.signal })
            .then(async (response) => {
                if (response.ok) {
                    return response;
                } else {
                    const error: FetchResponseError = await response.json();
                    return Promise.reject({
                        message: error.message, code: error.statusCode,
                    });
                }
            })
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => {
                !aborted &&
                setError({
                    message: error.message ?? 'Server error',
                    status : error.code ?? 404,
                });
            })
            .finally(() => !aborted && setLoading(false));

        return () => {
            aborted = true;
            abortController.abort();
        };
    }, [ url ]);

    return {
        loading, error, data,
    };
};