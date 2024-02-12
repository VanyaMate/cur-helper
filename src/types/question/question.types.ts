import { Complexity, Create } from '@/types/types.ts';
import { QuestionAnswerType } from '@/types/answer/answer.types.ts';
import { ThemeShortType } from '@/types/theme/theme.types.ts';


export type QuestionType = {
    id: string;
    enabled: boolean;
    title: string;
    description: string;
    body: string;
    complexity: Complexity;
    points: number;
    answers: QuestionAnswerType[];
}

export type QuestionSelect = {
    selectId: string;
}

export type QuestionResult = {
    timeSpent: number;
    answerTime: number;
}

export type QuestionThemes = {
    themes: ThemeShortType[];
}

export type QuestionCreateType = Create<QuestionType, 'title' | 'answers'>;
export type QuestionUpdateType = Partial<QuestionType>;
export type QuestionShortType = Pick<QuestionType, 'id'>;