import { Create, With } from '@/types/types.ts';
import { TestType } from '@/types/test/test.types.ts';
import { QuestionType } from '@/types/question/question.types.ts';


export type ThemeType = {
    id: string;
    publicId: string;
    enabled: boolean;
    title: string;
    description: string;
    additional: string;
    body: string;
    url: string;
}

export type ThemeCreateType = Create<ThemeType, 'publicId' | 'title'>;
export type ThemeUpdateType = Partial<ThemeType>;
export type ThemeShortType = Pick<ThemeType, 'publicId' | 'title' | 'url'>;


export type ThemeChildren = {
    children: ThemeShortType[]
}

export type ThemeRecursiveChildren = {
    children: With<ThemeShortType, [ ThemeRecursiveChildren ]>[]
}

export type ThemeBreadcrumb = {
    breadcrumb: ThemeShortType[];
}

export type ThemeTests = {
    tests: TestType[];
}

export type ThemeQuestions = {
    questions: QuestionType[];
}