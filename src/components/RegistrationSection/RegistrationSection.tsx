import React, { useContext, useState } from "react";
import NotesContext, { Page, type ContextInterface } from "../../NotesContext";
import Button from "../Button/Button";
import type { UserDb } from "../../App";
import './RegistrationSection.css'
import { getDb, setDb } from "../../fetchRequestDB";
import openEyeImage from '/openeye.svg';
import closeEyeImage from '/closeeye.svg';
import { equalTo, orderByChild, query, ref, type DatabaseReference, type Query } from "firebase/database";
import { db } from "../../../lib/fierbase";

export default function RegistrationSection() {
    const [user, setUser] = useState<UserDb>({ user_id: crypto.randomUUID(), name: '', password: ''})
    const [openEye, setOpenEye] = useState<boolean>(false);
    const context: ContextInterface = useContext(NotesContext);

    const usersRef: DatabaseReference = ref(db, '/users');
    const refToRequiredUser = ref(db, `/users/${user.user_id}`);
    const userQuery: Query = query(
        usersRef,
        orderByChild('name'),
        equalTo(user.name)
    )

    function registrationUser(): void {
        if(user.name && user.password) {
            
            getDb<UserDb>(userQuery)
                .then((data: UserDb[] | undefined) => {
                    
                    if (data?.length === 0) {
                        setDb<UserDb>(refToRequiredUser, user)
                            .then(() => { 
                                document.cookie = `user_id=${user.user_id}; path=/; max-age=${(60 * 60 * 24 * 30) * 2}`;
                                context.setPage(Page.ACCOUNT);
                            })
                    } else {
                        alert('Пользователь с таким именем уже есть');
                    }

                })
                
        } else {
            alert('Введите имя и пароль');
        }
    }

    function changeUser(event: React.ChangeEvent<HTMLInputElement>, property: string): void {
        setUser((prev: UserDb) => {
            if (property === 'name') {
                return {
                    ...prev,
                    name: event.target.value
                }
            } else if (property === 'password') {
                return {
                    ...prev,
                    password: event.target.value
                }
            } else {
                return prev;
            }
        });
    }

    return (
        <section className="registration-section">
            <h3 className="registration-section__h3">Регистрация</h3>
            <input className="registration-section__input" type="text" placeholder='Введите имя' value={user.name} onChange={(event) => changeUser(event, 'name')}/>
            <div className="registration-section__password-wrapper">
                {
                    openEye ? <input className="registration-section__password-input" type="text" placeholder='Введите пароль' value={user.password} onChange={(event) => changeUser(event, 'password')}/>
                        : <input className="registration-section__password-input" type="password" placeholder='Введите пароль' value={user.password} onChange={(event) => changeUser(event, 'password')}/>
                }
                <button onClick={() => setOpenEye(prev => !prev)} className="registration-section__button-eye">
                    <img className="registration-section__image-eye" src={!openEye ? closeEyeImage : openEyeImage} alt="иконка глаза" />
                </button>
            </div>

            <div className="registration-section__wrapper-buttons">
                <button className="registration-section__button" onClick={() => registrationUser() }>Зарегестрироваться</button>
                <Button typeButton="navigation" page={Page.AUTH}>Уже есть аккаунт</Button>
                <Button typeButton="navigation" page={Page.HOME}>На главную</Button>
            </div>
        </section>
    )
}