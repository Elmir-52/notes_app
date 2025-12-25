import ButtonNavigation from '../Button/ButtonNavigation';
import NotesContext, { Page, type ContextInterface } from '../../NotesContext';
import React, { useContext, useEffect, useState } from 'react';
import { deleteDb, getDb, setDb } from '../../fetchRequestDB';
import type { NoteDb } from '../../App';
import './NoteTextSection.css';
import { db } from '../../../lib/fierbase';
import { equalTo, orderByChild, query, ref, type DatabaseReference, type Query } from 'firebase/database';

export default function NoteTextSection() {
    const context: ContextInterface = useContext(NotesContext);
    const noteId: string = context.noteId;
    const setPage = context.setPage;
    
    const [result, setResult] = useState<NoteDb | undefined>();
    
    const notesRef: DatabaseReference = ref(db, `/notes`);
    const notesQuery: Query = query(
        notesRef,
        orderByChild('note_id'),
        equalTo(noteId)
    )

    const refToRequiredNote = ref(db, `/notes/${noteId}`)

    useEffect(() => {
        getDb<NoteDb>(notesQuery) 
            .then( (data: NoteDb[] | undefined) =>  data ? setResult(data[0]) : null )
    }, []);

    function saveNote(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (result) {
            setDb<NoteDb>(refToRequiredNote, result);
        }

        setPage(Page.HOME);
    }

    function deleteNote(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        deleteDb(refToRequiredNote);

        setPage(Page.HOME);
    }

    function changeResult<T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>, type: 'title' | 'content') {
        setResult((prev: NoteDb | undefined) => {
            if (!prev) {
                return undefined
            } else if (type === 'title') {
                return {
                    ...prev,
                    title: event.target.value
                }
            } else if (type === 'content') {
                return {
                    ...prev,
                    content: event.target.value
                }
            }
        })
    }

    return (
        <section className="note-text">
            <div className='note-text__wrapper-buttons'>
                <ButtonNavigation page={Page.HOME} >На главную</ButtonNavigation>
                <button className='note-text__button' onClick={(event) => saveNote(event)}>Сохранить</button>
                <button className='note-text__button' onClick={(event) => setTimeout(() => {deleteNote(event)}, 500)}>Удалить заметку</button>
            </div>
            <div className='note-text__wrapper-texts'>
                <input className='note-text__input' type="text" placeholder='Введите заголовок заметки' value={result?.title} onChange={ (event) => changeResult<HTMLInputElement>(event, 'title') }/>
                <textarea placeholder='Введите текст' className="note-text__textarea" value={result?.content} onChange={ (event) => changeResult<HTMLTextAreaElement>(event, 'content') }></textarea>
            </div>
        </section>
    );
}