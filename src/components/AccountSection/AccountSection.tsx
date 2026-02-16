import { equalTo, orderByChild, query, ref, type DatabaseReference, type Query } from "firebase/database";
import NotesContext, { Page } from "../../NotesContext";
import Button from "../Button/Button";
import './AccountSection.css';
import { db } from "../../../lib/fierbase";
import { deleteDb, getDb, getOneElementFromDB } from "../../fetchRequestDB";
import { useContext, useEffect, useState } from "react";
import type { NoteDb, UserDb } from "../../App";

export default function AccountSection() {
    const cookieFull: string = document.cookie;
    const cookieUserId: string = cookieFull.split('=')[1];

    const [userName, setUserName] = useState<string>('');
    const setPage = useContext(NotesContext).setPage;

    const refToRequiredUser: DatabaseReference = ref(db, `users/${cookieUserId}`);

    function deleteUser() {
        const notesRef: DatabaseReference = ref(db, '/notes');
        const notesQuery: Query = query(
            notesRef,
            orderByChild('user_id'),
            equalTo(cookieUserId)
        );

        getDb<NoteDb>(notesQuery)
            .then((notes: NoteDb[] | undefined) => {
                if (notes) {
                    notes.map((note: NoteDb) => {
                        const refToRequiredNote: DatabaseReference = ref(db, `notes/${note.note_id}`);
                        deleteDb(refToRequiredNote);
                    });
                }
            })

        deleteDb(refToRequiredUser)
    }

    useEffect(() => {
        getOneElementFromDB<UserDb>(refToRequiredUser)
            .then((data: UserDb | undefined) => data ? setUserName(data.name) : undefined)
    }, [])

    return (
        // добавь loading
        <section className="account-section">
            <h2 className="account-section__h2">Добрый день {userName}</h2>
            <p className="account-section__paragraph">Ваш id: {cookieUserId}</p>
            <div className="account-section__wrapper-button">
                <Button typeButton="navigation" page={Page.HOME}>На главную</Button>
            </div>
            <div className="account-section__wrapper-button">
                <Button className="account-section__delete-button" typeButton="button" onClick={() => { 
                    deleteUser();
                    setPage(Page.HOME);
                    document.cookie = `user_id=; path=/; max-age=-1`;
                }}>Удалить аккаунт</Button>
            </div>
        </section>
    )
}