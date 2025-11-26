import { useEffect, useState } from "react";
import ButtonNote from "../ButtonNote/ButtonNote";
import ButtonNoteAdd from "../ButtonNoteAdd/ButtonNoteAdd";
import './HomeSection.css';
import Modal from "../Modal/Modal";
import { getDb } from "../../fetchRequestDB";
import type { NoteDb, UnCleanNoteDb } from "../../App";

export default function HomeSection() {
    const [modal, setModal] = useState<boolean>(false);
    const [result, setResult] = useState<NoteDb[]>([{objectId: '', user_id: '', title: '', content: '', date: ''}]);

    const cookieFull: string = document.cookie;
    const cookieArr: string[] = cookieFull.split(';');
    const cookieUserId: string = cookieArr[0].split('=')[1];

    useEffect(() => {
        getDb<UnCleanNoteDb>(`https://parseapi.back4app.com/classes/notes?where={"user_id":"${cookieUserId}"}`)
            .then(data => setResult(data))
    }, [modal]);

    return (
        <section className="home-section">
            {
                result.map(el => {
                    return <ButtonNote key={el.objectId} content={el}></ButtonNote>
                })
            }

            <ButtonNoteAdd onClick={(open: boolean) => cookieUserId ? setModal(open) : alert('Пожалуйста зарегестрируйтесь либо войдите в аккаунт')} ></ButtonNoteAdd>
            <Modal open={modal} onClick={(open: boolean) => setModal(open)}></Modal>
        </section>
    );
}