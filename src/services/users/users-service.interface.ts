import { UserProfileData } from '@vanyamate/cur-helper-types/types/users';
import { FetchData } from '@/services/types.ts';


export interface IUsersService {
    users: Record<string, FetchData<UserProfileData>>;

    getProfileDataByLogin (login: string, token?: string): Promise<UserProfileData>;
}