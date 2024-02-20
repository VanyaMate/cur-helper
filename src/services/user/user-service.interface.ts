import { UserType } from '@vanyamate/cur-helper-types';


export interface IUserService {
    set (user: UserType): void;

    remove (): void;
}