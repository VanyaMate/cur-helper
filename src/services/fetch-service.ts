import { ErrorCode, ErrorResponseType } from '@vanyamate/cur-helper-types';
import { FetchData } from '@/services/types.ts';


export type FetchServiceRequestOptions = {
    url: string;
    token?: string;
    options: RequestInit;
};

export type FetchServiceSaveOptions<Data> = {
    record: Record<string, FetchData<Data>>;
    id: string;
};

export const fetchService = async function <Data> (options: FetchServiceRequestOptions, save: FetchServiceSaveOptions<Data>): Promise<Data> {
    const cacheData       = save.record[save.id];
    const abortController = new AbortController();

    if (cacheData) {
        if (cacheData.abortController) {
            cacheData.abortController.abort();
        }
        cacheData.pending         = true;
        cacheData.abortController = abortController;
    } else {
        save.record[save.id] = {
            pending        : true,
            error          : null,
            data           : null,
            abortController: abortController,
        };
    }

    return fetch(options.url, {
        method : options.options.method,
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': options.token ?? '',
        },
        signal : abortController.signal,
    })
        .then(async (response) => {
            if (response.ok) {
                const body: Data     = await response.json();
                save.record[save.id] = {
                    pending        : false,
                    error          : null,
                    data           : body,
                    abortController: abortController,
                };
                return body;
            } else {
                const error: ErrorResponseType = await response.json();
                save.record[save.id]           = {
                    pending        : false,
                    error          : {
                        errors: error.errors,
                        code  : response.status,
                    },
                    data           : null,
                    abortController: abortController,
                };
                return Promise.reject(error);
            }
        })
        .catch((error) => {
            if (error.toString() === 'AbortError: The user aborted a request.') {
                return Promise.reject();
            } else {
                save.record[save.id] = {
                    pending        : false,
                    error          :
                        {
                            code  : ErrorCode.NOT_FOUND,
                            errors: [
                                {
                                    target  : 'server',
                                    messages: [ 'Сервер не отвечает' ],
                                },
                            ],
                        },
                    data           : null,
                    abortController: abortController,
                };
            }
            save.record[save.id] = {
                pending        : false,
                error          :
                    {
                        code  : ErrorCode.NOT_FOUND,
                        errors: [
                            {
                                target  : 'server',
                                messages: [ 'Сервер не отвечает' ],
                            },
                        ],
                    },
                data           : null,
                abortController: abortController,
            };
            return Promise.reject(error);
        });
};