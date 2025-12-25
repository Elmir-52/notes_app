import { useEffect, useState  } from "react";
import ButtonNote from "../ButtonNote/ButtonNote";
import ButtonNoteAdd from "../ButtonNoteAdd/ButtonNoteAdd";
import './HomeSection.css';
import Modal from "../Modal/Modal";
import { getDb } from "../../fetchRequestDB";
import type { NoteDb } from "../../App";
import { equalTo, orderByChild, query, ref, type DatabaseReference, type Query } from "firebase/database";
import { db } from "../../../lib/fierbase";

export default function HomeSection() {
    const [modal, setModal] = useState<boolean>(false);
    const [result, setResult] = useState<NoteDb[] | undefined>();

    const cookieFull: string = document.cookie;
    const cookieArr: string[] = cookieFull.split(';');
    const cookieUserId: string = cookieArr[0].split('=')[1];

    const notesRef: DatabaseReference = ref(db, '/notes');
    const notesQuery: Query = query(
        notesRef,
        orderByChild('user_id'),
        equalTo(cookieUserId)
    )

    console.log(result, 'resExam');

    useEffect(() => {
        getDb<NoteDb>(notesQuery)
            .then((data: NoteDb[] | undefined) => { setResult(data) })
            
    }, [modal]);
        
    return (
        <section className="home-section">

            {
                result?.map(el => {
                    return <ButtonNote key={el.note_id} content={el}></ButtonNote>
                })
            }

            <ButtonNoteAdd onClick={(open: boolean) => cookieUserId ? setModal(open) : alert('Пожалуйста зарегестрируйтесь либо войдите в аккаунт')} ></ButtonNoteAdd>
            <Modal open={modal} onClick={(open: boolean) => setModal(open)}></Modal>
        </section>
    );
}