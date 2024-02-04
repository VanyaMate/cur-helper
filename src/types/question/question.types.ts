import { Complexity, Create } from '@/types/types.ts';
import { QuestionAnswerType } from '@/types/answer/answer.types.ts';


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

export type QuestionCreateType = Create<QuestionType, 'title' | 'answers'>;
export type QuestionUpdateType = Partial<QuestionType>;