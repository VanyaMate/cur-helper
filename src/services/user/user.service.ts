import { IUserService } from '@/services/user/user-service.interface.ts';
import { UserType } from '@/types/user/user.types';


class UserService implements IUserService {
    public user: UserType | null = null;

    set (user: UserType): void {
        this.user = user;
    }

    remove (): void {
        this.user = null;
    }
}

export const userService: IUserService = new UserService();