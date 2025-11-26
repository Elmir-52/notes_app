import Header from "./components/Header/Header";
import HomeSection from "./components/HomeSection/HomeSection";
import NotesConstext, { Page, type AllPage } from "./NotesContext";
import { useState } from "react";
import NoteTextSection from "./components/NoteTextSection/NoteTextSection";
import RegistrationSection from "./components/RegistrationSection/RegistrationSection";
import './App.css';
import AuthorizationSection from "./components/AuthorizationSection/AuthorizationSection";
import AccountSection from "./components/AccountSection/AccountSection";

export interface NoteDb {
    objectId: string, 
    user_id: string,
    title: string, 
    content: string,
    date: string
}

export interface UnCleanNoteDb {
    objectId: string, 
    createdAt: string, 
    updatedAt: string,
    user_id: string,
    title: string, 
    content: string,
    date: string
}

export interface UserDb {
    objectId: string,
    name: string,
    password: string,
}

export interface UnCleanUserDb {
    objectId: string, 
    createdAt: string,
    updatedAt: string,
    name: string,
    password: string,
}

export default function App() {
  const [page, setPage] = useState<AllPage>(Page.HOME);
  const [noteId, setNoteId] = useState<string>('0');

  return (
    <>
      <Header setPage={setPage}></Header>
      <main>
        <NotesConstext.Provider value={{setPage: (page: AllPage) => setPage(page), noteId: noteId, setNoteId: (id: string) => setNoteId(id)}}>

            {page === Page.HOME ? <HomeSection></HomeSection>
                  : undefined}

            {page === Page.NOTE_TEXT ? <NoteTextSection></NoteTextSection>
                  : undefined}

            {page === Page.REG ? <RegistrationSection></RegistrationSection>
                  : undefined}

            {page === Page.AUTH ? <AuthorizationSection></AuthorizationSection>
                  : undefined}

            {page === Page.ACCOUNT ? <AccountSection></AccountSection>
                  : undefined}
            
        </NotesConstext.Provider>
      </main>
    </>
  )
}