import { makeAutoObservable } from 'mobx';
import { IAuthService } from '@/services/auth/auth-service.interface.ts';
import {
    LoginDataType,
    UserAuthType,
    RegistrationDataType,
} from '@/types/auth/auth.types';
import { API_HOST } from '@/constants/api.url.ts';


class AuthService implements IAuthService {
    private _abortController: AbortController = new AbortController();
    private _authStorageName: string          = 'auth-token';
    public authenticated: boolean             = false;
    public pending: boolean                   = false;
    public error: string                      = '';

    get token (): [ string, boolean ] {
        return this._getToken();
    }

    constructor () {
        makeAutoObservable(this);
    }

    async refresh (): Promise<UserAuthType | null> {
        const [ token, remember ] = this._getToken();
        if (token) {
            this.pending = true;
            this._abortController.abort();
            this._abortController = new AbortController();
            return fetch(`${ API_HOST }/api/v1/auth/refresh`, {
                signal : this._abortController.signal,
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body   : JSON.stringify({ token }),
            })
                .then((response) => response.json())
                .then((data: UserAuthType) => {
                    this._setToken(data.token, remember);
                    return data;
                })
                .catch((e) => this.error = e)
                .finally(() => {
                    this.pending = false;
                });
        } else {
            return null;
        }
    }

    async login (loginData: LoginDataType, remember?: boolean): Promise<UserAuthType> {
        this.pending = true;
        this._abortController.abort();
        this._abortController = new AbortController();
        return fetch(`${ API_HOST }/api/v1/auth/login`, {
            signal : this._abortController.signal,
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body   : JSON.stringify(loginData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject('Не правильные данные');
                }
            })
            .then((data: UserAuthType) => {
                console.log(data);
                this._setToken(data.token, remember);
                this.authenticated = true;
                return data;
            })
            .catch((e) => this.error = e)
            .finally(() => {
                this.pending = false;
            });
    }

    async registration (registrationData: RegistrationDataType, remember?: boolean): Promise<UserAuthType> {
        this.pending = true;
        this._abortController.abort();
        this._abortController = new AbortController();
        return fetch(`${ API_HOST }/api/v1/auth/registration`, {
            signal : this._abortController.signal,
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body   : JSON.stringify(registrationData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject('Не правильные данные');
                }
            })
            .then((data: UserAuthType) => {
                console.log(data);
                this._setToken(data.token, remember);
                this.authenticated = true;
                return data;
            })
            .catch((e) => this.error = e)
            .finally(() => {
                this.pending = false;
            });
    }

    async logout (): Promise<boolean> {
        this._abortController.abort();
        this.authenticated = false;
        this._removeToken();
        return true;
    }

    private _setToken (token: string, remember?: boolean) {
        if (remember) {
            localStorage.setItem(this._authStorageName, token);
        } else {
            sessionStorage.setItem(this._authStorageName, token);
        }
    }

    private _removeToken () {
        localStorage.removeItem(this._authStorageName);
        sessionStorage.removeItem(this._authStorageName);
    }

    private _getToken (): [ string, boolean ] {
        const localStorageToken: string | null = localStorage.getItem(this._authStorageName);
        if (localStorageToken) {
            return [ localStorageToken, true ];
        }
        const sessionStorageToken: string | null = sessionStorage.getItem(this._authStorageName);
        if (sessionStorageToken) {
            return [ sessionStorageToken, false ];
        }
        return [ '', false ];
    }
}

export const authService: IAuthService = new AuthService();