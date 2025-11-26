import { useContext } from 'react'
import './ButtonNote.css'
import NotesContext, { Page, type ContextInterface } from '../../NotesContext'
import type { NoteDb } from '../../App';

interface PropsButtonNote {
    content: NoteDb,
}

export default function ButtonNote({ content }: PropsButtonNote) {
    const context: ContextInterface = useContext(NotesContext);

    return(
        <button onClick={() => {context.setPage(Page.NOTE_TEXT); context.setNoteId(content.objectId)}} className='button-note'>
            <h3 className='button-note__title'>{content.title}</h3>
            <hr />
            <p className='button-note__date'>{content.date}</p>
        </button>
    )
}