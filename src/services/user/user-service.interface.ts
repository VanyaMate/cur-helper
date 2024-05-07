import { UserType } from '@vanyamate/cur-helper-types';


export interface IUserService {
    user: UserType | null;

    set (user: UserType): void;

    remove (): void;
}