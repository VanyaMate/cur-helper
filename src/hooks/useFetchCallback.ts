import { useCallback, useState } from 'react';


export type FetchError =
    {
        status: number;
        message: string;
    }
    | null;

export type FetchData<Data> =
    Data
    | null;

export type FetchCallback<Data, DispatchData> = {
    loading: boolean;
    error: FetchError;
    data: FetchData<Data>;
    dispatch: (data: DispatchData) => Promise<Data>;
}

export type FetchResponseError = {
    message: string;
    path: string;
    statusCode: number;
    timestamp: string;
}

// TODO: Temp hook
export const useFetchCallback = function <Data, DispatchData> (url: string): FetchCallback<Data, DispatchData> {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ]     = useState<FetchError>(null);
    const [ data, setData ]       = useState<Data | null>(null);

    const dispatch: (data: DispatchData) => Promise<Data> = useCallback((data: DispatchData) => {
        setLoading(() => true);
        setError(() => null);

        return fetch(url, {
            credentials: 'include',
            method     : 'POST',
            body       : JSON.stringify(data),
            headers    : {
                'Content-Type': 'application/json',
            },
        })
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
            .then((data) => {
                setData(data);
                return data;
            })
            .catch((error) => {
                setError({
                    message: error.message ?? 'Server error',
                    status : error.code ?? 404,
                });
            })
            .finally(() => setLoading(false));
    }, [ url ]);

    return {
        loading, error, data, dispatch,
    };
};