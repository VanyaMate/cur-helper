import { IUserService } from '@/services/user/user-service.interface.ts';
import { UserType } from '@vanyamate/cur-helper-types';
import { makeAutoObservable } from 'mobx';


class UserService implements IUserService {
    public user: UserType | null = null;

    constructor () {
        makeAutoObservable(this);
    }

    set (user: UserType): void {
        this.user = user;
    }

    remove (): void {
        this.user = null;
    }
}

export const userService: IUserService = new UserService();