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

export const fetchService = function <Data> (options: FetchServiceRequestOptions, save: FetchServiceSaveOptions<Data>): Promise<Data> {
    const data = save.record[save.id];

    if (data) {
        data.pending = true;
    } else {
        save.record[save.id] = {
            pending: true,
            error  : null,
            data   : null,
        };
    }

    return fetch(options.url, {
        method : options.options.method,
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': options.token ?? '',
        },
    })
        .then(async (response) => {
            if (response.ok) {
                const body: Data     = await response.json();
                save.record[save.id] = {
                    pending: false,
                    error  : null,
                    data   : body,
                };
                return body;
            } else {
                const error: ErrorResponseType = await response.json();
                save.record[save.id] = {
                    pending: false,
                    error  : {
                        errors: error.errors,
                        code  : response.status,
                    },
                    data   : null,
                };
                return Promise.reject(error);
            }
        })
        .catch((error) => {
            save.record[save.id] = {
                pending: false,
                error  :
                    {
                        code  : ErrorCode.NOT_FOUND,
                        errors: [
                            {
                                target  : 'server',
                                messages: [ 'Сервер не отвечает' ],
                            },
                        ],
                    },
                data   : null,
            };
            return Promise.reject(error);
        });
};