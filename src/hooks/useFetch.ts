export type FetchError = {
    status: number;
    message: string;
} | null;

export type FetchData<Data> = Data | null;

export type Fetch<Data> = {
    loading: boolean;
    error: FetchError;
    data: FetchData<Data>;
}