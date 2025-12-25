import { useEffect, useRef } from "react";
import './Modal.css'
import { setDb } from "../../fetchRequestDB";
import type { NoteDb } from "../../App";
import cross from '/cross.svg'
import { ref, type DatabaseReference } from "firebase/database";
import { db } from "../../../lib/fierbase";

interface PropsModal {
    open: boolean,
    onClick: (open: boolean) => void,
}

export default function Modal({ open, onClick }: PropsModal) {
    const dialog = useRef<HTMLDialogElement>(null);

    const cookieFull: string = document.cookie;
    const cookieArr: string[] = cookieFull.split(';');
    const cookieUserId: string = cookieArr[0].split('=')[1];

    useEffect(() => {
        if (open) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }

    }, [open]);

    const newDate = new Date();
    const todayDate = `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`;

    const newNoteId: string = crypto.randomUUID();
    const newNoteRef: DatabaseReference = ref(db, `/notes/${newNoteId}`);

    function noteAdd() {
        setDb<NoteDb>(newNoteRef, {note_id: newNoteId, user_id: cookieUserId, title: 'Новая заметка', content: '', date: todayDate});
    }

    return (
        <dialog ref={dialog} className="modal">
            <button onClick={ () => onClick(false) } className="modal__cross-button"><img className="modal__cross-image" src={cross} alt="крестик" /></button>
            <button onClick={ () => { noteAdd(); onClick(false) } } className="modal__button">Создать новую заметку</button>
        </dialog>
    );
}