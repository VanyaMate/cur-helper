import {
    MultiplyResponse,
    With,
    AdminTestThemeShort,
    AdminTestQuestionsShort,
    TestUpdateType,
    AdminTestShortType,
    TestType,
    TestCreateType,
} from '@vanyamate/cur-helper-types';


export interface IAdminTestService {
    tests: Map<string, With<TestType, [ AdminTestThemeShort, AdminTestQuestionsShort ]>>;
    testsList: MultiplyResponse<AdminTestShortType>;
    unlinkedForQuestion: Map<string, MultiplyResponse<AdminTestShortType>>;

    create (token: string, data: TestCreateType): Promise<With<TestType, [ AdminTestThemeShort, AdminTestQuestionsShort ]>>;

    update (token: string, id: string, data: TestUpdateType): Promise<TestType>;

    delete (token: string, id: string): Promise<boolean>;

    getOne (token: string, id: string): Promise<With<TestType, [ AdminTestThemeShort, AdminTestQuestionsShort ]>>;

    getMany (token: string): Promise<MultiplyResponse<AdminTestShortType>>;

    getManyUnlinkedForQuestion (token: string, questionId: string): Promise<MultiplyResponse<AdminTestShortType>>;
}