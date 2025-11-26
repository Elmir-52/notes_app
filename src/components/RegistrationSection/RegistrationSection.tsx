import React, { useContext, useState } from "react";
import NotesContext, { Page, type ContextInterface } from "../../NotesContext";
import ButtonNavigation from "../Button/ButtonNavigation";
import type { UserDb } from "../../App";
import './RegistrationSection.css'
import { getDb, postDb } from "../../fetchRequestDB";
import openEyeImage from '/openeye.svg';
import closeEyeImage from '/closeeye.svg';

export default function RegistrationSection() {
    const [user, setUser] = useState<UserDb>({ objectId: '', name: '', password: '' })
    const [openEye, setOpenEye] = useState<boolean>(false);
    const context: ContextInterface = useContext(NotesContext);

    function changeUser(event: React.ChangeEvent<HTMLInputElement>, property: string) {
        if (property === 'name') {
            setUser(prev => {
                return {
                    ...prev,
                    name: event.target.value
                }
            })
        } else {
            setUser(prev => {
                return {
                    ...prev,
                    password: event.target.value
                }
            })
        }
    }

    function registrationUser(): void {
        if(user.name && user.password) {
            getDb(`https://parseapi.back4app.com/classes/users?where={"name":"${user.name}"}`)
                .then((data: UserDb[]) => {
                    if (!(data[0].name === user.name)) {
                        throw new Error('такого пользователя нет');
                    } else {
                        alert('Пользователь с таким именем уже есть');
                    }
                    console.log(data);

                })
                .catch(e => {
                    postDb<UserDb>(`https://parseapi.back4app.com/classes/users`, user)
                            .then(data => { 
                                document.cookie = `user_id=${data?.objectId}; path=/; max-age=${(60 * 60 * 24 * 30) * 2}`;
                                document.cookie = `user_name=${user.name}; path=/; max-age=${(60 * 60 * 24 * 30) * 2}`;
                                setTimeout(() => context.setPage(Page.ACCOUNT), 1500);
                                console.log(document.cookie);
                            })
                    console.log(e);
                })
        } else {
            alert('Введите имя и пароль');
        }
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
                <ButtonNavigation page={Page.AUTH}>Уже есть аккаунт</ButtonNavigation>
                <ButtonNavigation page={Page.HOME}>На главную</ButtonNavigation>
            </div>
        </section>
    )
}