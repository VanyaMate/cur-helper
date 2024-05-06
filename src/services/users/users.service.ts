import { IUsersService } from '@/services/users/users-service.interface.ts';
import { UserProfileData } from '@vanyamate/cur-helper-types/types/users';
import { fetchService } from '@/services/fetch-service.ts';
import { API_HOST } from '@/constants/api.url.ts';
import { FetchData } from '@/services/types.ts';
import { makeAutoObservable } from 'mobx';


export class UsersService implements IUsersService {
    public users: Record<string, FetchData<UserProfileData>> = {};

    constructor () {
        console.log('users service');
        makeAutoObservable(this);
    }

    getProfileDataByLogin (login: string, token?: string): Promise<UserProfileData> {
        console.log('Get profile', login);
        return fetchService({
            url    : `${ API_HOST }/api/v1/users/${ login }`,
            options: {
                method: 'GET',
            },
            token  : token,
        }, {
            record: this.users,
            id    : login,
        });
    }
}

export const usersService: IUsersService = new UsersService();