import { createContext } from "react";

export const enum Page {
    HOME = 'home',
    NOTE_TEXT = 'note_text',
    REG = 'reg',
    AUTH = 'auth',
    ACCOUNT = 'account'
}

export type AllPage = Page.HOME | Page.NOTE_TEXT | Page.REG | Page.AUTH | Page.ACCOUNT;


export interface ContextInterface {
    setPage: (page: AllPage) => void,
    noteId: string,
    setNoteId: (page: string) => void
}

const NotesContext = createContext<ContextInterface>({ setPage: () => undefined, noteId: '0', setNoteId: () => undefined });
export default NotesContext;