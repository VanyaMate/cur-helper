import { makeAutoObservable } from 'mobx';
import { IAuthService } from '@/services/auth/auth-service.interface.ts';
import {
    UserAuthType,
} from '@/types/auth/auth.types';
import { API_HOST } from '@/constants/api.url.ts';
import {
    LoginDataType,
    RegistrationDataType,
} from '@vanyamate/cur-helper-types';


class AuthService implements IAuthService {
    private _aborted: boolean                 = false;
    private _abortController: AbortController = new AbortController();
    private _authStorageName: string          = 'auth-token';
    public authenticated: boolean             = false;
    public pending: boolean                   = !!this._getToken()[0];
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
            this.pending  = true;
            this._aborted = true;
            this._abortController.abort();
            this._abortController = new AbortController();
            return fetch(`${ API_HOST }/api/v1/auth/refresh`, {
                signal : this._abortController.signal,
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': token,
                },
            })
                .then(this._getResponse.bind(this))
                .then(this._saveData(remember ?? false))
                .catch(this._catchHandler.bind(this))
                .finally(this._finallyHandler.bind(this));
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
            .then(this._getResponse.bind(this))
            .then(this._saveData(remember ?? false))
            .catch(this._catchHandler.bind(this))
            .finally(this._finallyHandler.bind(this));
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
            .then(this._getResponse.bind(this))
            .then(this._saveData(remember ?? false))
            .catch(this._catchHandler.bind(this))
            .finally(this._finallyHandler.bind(this));
    }

    async logout (): Promise<boolean> {
        this._abortController.abort();
        this.authenticated = false;
        this._removeToken();
        return true;
    }

    private async _getResponse (response: Response): Promise<UserAuthType> {
        this._aborted = false;
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject('Не правильные данные');
        }
    }

    private _saveData (remember: boolean) {
        return async (data: UserAuthType): Promise<UserAuthType> => {
            this._setToken(data.token, remember);
            this.authenticated = true;
            return data;
        };
    }

    private async _catchHandler (error: any) {
        this.error = error;
        if (!this._aborted) {
            this._removeToken();
        }
        return error;
    }

    private async _finallyHandler () {
        if (!this._aborted) {
            this.pending = false;
        }
    }

    private _setToken (token: string, remember?: boolean) {
        if (remember) {
            localStorage.setItem(this._authStorageName, token);
        } else {
            sessionStorage.setItem(this._authStorageName, token);
            document.cookie = `${ this._authStorageName }=${ token }; path=/;`;
        }
    }

    private _removeToken () {
        localStorage.removeItem(this._authStorageName);
        sessionStorage.removeItem(this._authStorageName);
        document.cookie = `${ this._authStorageName }=; path=/;`;
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
        const cookieStorageToken = document.cookie.match(new RegExp(`${this._authStorageName}=(.+)`))?.[1].split('&')[0];
        if (cookieStorageToken) {
            return [ cookieStorageToken, false ];
        }
        return [ '', false ];
    }
}

export const authService: IAuthService = new AuthService();