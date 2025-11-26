import React, { useContext, useState } from "react";
import NotesContext, { Page, type ContextInterface } from "../../NotesContext";
import ButtonNavigation from "../Button/ButtonNavigation";
import type { UserDb } from "../../App";
import './AuthorizationSection.css'
import { getDb } from "../../fetchRequestDB";
import openEyeImage from '/openeye.svg';
import closeEyeImage from '/closeeye.svg';

export default function AuthorizationSection() {
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

    function authorizationUser() {
        if(user.name && user.password) {
            getDb(`https://parseapi.back4app.com/classes/users?where={"name":"${user.name}"}`)
                .then(data => { 
                    if (data[0].password === user.password) {
                        document.cookie = `user_id=${data[0]?.objectId}; path=/; max-age=${(60 * 60 * 24 * 30) * 2}`;
                        document.cookie = `user_name=${data[0]?.name}; path=/; max-age=${(60 * 60 * 24 * 30) * 2}`;
                        setTimeout(() => context.setPage(Page.ACCOUNT), 1000);
                        console.log(document.cookie);
                    } else {
                        alert('Возможно вы неправильно ввели пароль')
                    }
                })
                .catch(() => {alert('Возможно вы неправильно ввели данные, либо у вас нет аккаунта')})
        } else {
            alert('Введите имя и пароль');
        }
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