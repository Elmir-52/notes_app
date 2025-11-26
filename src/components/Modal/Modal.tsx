import { useEffect, useRef } from "react";
import './Modal.css'
import { postDb } from "../../fetchRequestDB";
import type { NoteDb } from "../../App";
import cross from '/cross.svg'

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
    const nowDate = `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`

    function noteAdd() {
        postDb<NoteDb>(`https://parseapi.back4app.com/classes/notes`, {objectId: '', user_id: cookieUserId, title: 'Новая заметка', content: '', date: nowDate});
    }

    return (
        <dialog ref={dialog} className="modal">
            <button onClick={() => onClick(false)} className="modal__cross-button"><img className="modal__cross-image" src={cross} alt="крестик" /></button>
            <button onClick={() => {setTimeout(() => {onClick(false)}, 500); noteAdd()}} className="modal__button">Создать новую заметку</button>
        </dialog>
    );
}