import {
    TestPassingResults,
    TestPassingType,
} from '@/types/test-passing/test-passing.types.ts';
import { RoleType } from '@/types/role/role.types.ts';
import { Create, With } from '@/types/types.ts';


export type UserType = {
    id: string;
    login: string;
    avatarUrl: string;
    email: string;
    firstName: string;
    lastName: string;
    verified: boolean;
    role: RoleType | null;
}

export type UserTestPassing = {
    testPassing: With<TestPassingType, [ TestPassingResults ]>[];
}

export type UserCreateType =
    Create<Omit<UserType, 'role'>, 'login'>
    & { password: string };
export type UserUpdateType = Partial<Omit<UserType, 'role'>>;