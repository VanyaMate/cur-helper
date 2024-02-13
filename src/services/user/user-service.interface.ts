import { UserType } from '@/types/user/user.types.ts';


export interface IUserService {
    set (user: UserType): void;

    remove (): void;
}