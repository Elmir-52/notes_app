import ButtonNavigation from '../Button/ButtonNavigation';
import NotesContext, { Page, type ContextInterface } from '../../NotesContext';
import React, { useContext, useEffect, useState } from 'react';
import { deleteDb, getDb, patchDb } from '../../fetchRequestDB';
import type { NoteDb } from '../../App';

import './NoteTextSection.css';

export default function NoteTextSection() {
    const context: ContextInterface = useContext(NotesContext);
    const id: string = context.noteId;
    const setPage = context.setPage;
    const [result, setResult] = useState<NoteDb>({objectId: '', user_id: '', title: '', content: '', date: ''});

    useEffect(() => {
        getDb(`https://parseapi.back4app.com/classes/notes?where={"objectId":"${id}"}`) 
            .then(data => setResult(data[0]))
    }, []);

    function saveNote(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        patchDb<NoteDb>(`https://parseapi.back4app.com/classes/notes/${id}`, result);
    }

    function deleteNote(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        deleteDb(`https://parseapi.back4app.com/classes/notes/${id}`);

        setPage(Page.HOME);
    }

    return (
        <section className="note-text">
            <div className='note-text__wrapper-buttons'>
                <ButtonNavigation page={Page.HOME} >На главную</ButtonNavigation>
                <button className='note-text__button' onClick={(event) => saveNote(event)}>Сохранить</button>
                <button className='note-text__button' onClick={(event) => setTimeout(() => {deleteNote(event)}, 500)}>Удалить заметку</button>
            </div>
            <div className='note-text__wrapper-texts'>
                <input className='note-text__input' type="text" placeholder='Введите заголовок заметки' value={result?.title} onChange={(event) => setResult((prev) => { return { ...prev,  title: event.target.value}})}/>
                <textarea placeholder='Введите текст' className="note-text__textarea" value={result?.content} onChange={(event) => setResult((prev) => { return { ...prev,  content: event.target.value}})}></textarea>
            </div>
        </section>
    );
}