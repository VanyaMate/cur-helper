import {
    MultiplyResponse,
    With,
    AdminTestThemeShort,
    AdminTestQuestionsShort,
    TestUpdateType,
    AdminTestShortType,
    TestType,
} from '@vanyamate/cur-helper-types';


export interface IAdminTestService {
    tests: Map<string, With<TestType, [ AdminTestThemeShort, AdminTestQuestionsShort ]>>;
    testsList: MultiplyResponse<AdminTestShortType>;

    create (): void;

    update (token: string, id: string, data: TestUpdateType): Promise<TestType>;

    delete (): void;

    getOne (token: string, id: string): Promise<With<TestType, [ AdminTestThemeShort, AdminTestQuestionsShort ]>>;

    getMany (token: string): Promise<MultiplyResponse<AdminTestShortType>>;
}