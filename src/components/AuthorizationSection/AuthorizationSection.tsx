import React, { useContext, useState } from "react";
import NotesContext, { Page, type ContextInterface } from "../../NotesContext";
import ButtonNavigation from "../Button/ButtonNavigation";
import type { UserDb } from "../../App";
import './AuthorizationSection.css'
import { getDb } from "../../fetchRequestDB";
import openEyeImage from '/openeye.svg';
import closeEyeImage from '/closeeye.svg';
import { equalTo, orderByChild, query, ref, type DatabaseReference, type Query } from "firebase/database";
import { db } from "../../../lib/fierbase";

export default function AuthorizationSection() {
    const [user, setUser] = useState<UserDb>({ user_id: '', name: '', password: '' })
    const [openEye, setOpenEye] = useState<boolean>(false);
    const context: ContextInterface = useContext(NotesContext);

    const usersRef: DatabaseReference = ref(db, '/users');
    const userQuery: Query = query(
            usersRef,
            orderByChild('name'),
            equalTo(user.name)
        )

    function authorizationUser(): void {
        if(user.name && user.password) {

            getDb<UserDb>(userQuery)
                .then((data: UserDb[] | undefined) => {

                    if (data && data?.length === 0) {
                        alert('Возможно вы не зарегистрировались на сайте');
                    } else if (data && data[0].password === user.password) {
                        const userFromDB: UserDb = data[0];
                        document.cookie = `user_id=${userFromDB.user_id}; path=/; max-age=${(60 * 60 * 24 * 30) * 2}`;
                        document.cookie = `user_name=${userFromDB.name}; path=/; max-age=${(60 * 60 * 24 * 30) * 2}`;
                        context.setPage(Page.ACCOUNT);
                    } else {
                        alert('Возможно вы неправильно ввели пароль')
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
        <section className="authorization-section">
            <h3 className="authorization-section__h3">Авторизация</h3>
            <input className="authorization-section__input" type="text" placeholder='Введите имя' value={user.name} onChange={(event) => changeUser(event, 'name')}/>
            <div className="authorization-section__password-wrapper">
                {
                    openEye ? <input className="authorization-section__password-input" type="text" placeholder='Введите пароль' value={user.password} onChange={(event) => changeUser(event, 'password')}/>
                        : <input className="authorization-section__password-input" type="password" placeholder='Введите пароль' value={user.password} onChange={(event) => changeUser(event, 'password')}/>
                }
                <button onClick={() => setOpenEye(prev => !prev)} className="registration-section__button-eye">
                    <img className="authorization-section__image-eye" src={!openEye ? closeEyeImage : openEyeImage} alt="иконка глаза" />
                </button>
            </div>

            <div className="authorization-section__wrapper-buttons">
                <button className="authorization-section__button" onClick={ () => authorizationUser() }>Войти в аккаунт</button>
                <ButtonNavigation page={Page.HOME}>На главную</ButtonNavigation>
            </div>
        </section>
    )
}