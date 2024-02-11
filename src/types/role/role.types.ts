import { Create } from '@/types/types.ts';


export type RoleType = {
    id: string;
    title: string;
    rights: number;
}

export type RoleCreateType = Create<RoleType, 'title' | 'rights'>
export type RoleUpdateType = Partial<RoleType>;