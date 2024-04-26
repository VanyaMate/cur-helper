import { ErrorResponseType } from '@vanyamate/cur-helper-types';


export type FetchData<Data> = {
    pending: boolean;
    error: ErrorResponseType | null;
    data: Data | null;
    abortController: AbortController | null;
}