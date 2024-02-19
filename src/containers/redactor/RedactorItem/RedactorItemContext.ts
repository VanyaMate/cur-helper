import { createContext } from 'react';
import { Editor } from '@tiptap/react';


export const RedactorEditorContext = createContext<Editor | null>(null);