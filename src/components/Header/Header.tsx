import logoNotes from '/logoNotes.svg';
import logoReg from '/reg3.svg';
import logoAccount from '/account.svg';
import logoMenu from '/menu.svg'
import './Header.css';
import { Page, type AllPage } from '../../NotesContext';
import { useState } from 'react';

interface propsHeader {
    setPage: (page: AllPage) => void
}

export default function Header({ setPage }: propsHeader) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    return (
        <header className='header'>
            <h1 className='header__h1'>Notes</h1>
            <img className='header__image' src={logoNotes} alt="логотип заметок" />

            <button className={ document.cookie ? 'header__button-account' : 'display-none' } onClick={() => setPage(Page.ACCOUNT)}>
                <p className='header__paragraph-account'>Личный кабинет</p>
                <img className='header__image-account' src={logoAccount} alt="логотип личного кабинета" />
            </button>
            <button className='header__button-reg' onClick={() => setPage(Page.REG)}>
                <img className='header__image-reg' src={logoReg} alt="логотип регестрации" />
            </button>

            <button className='header__button-menu' onClick={() => setMenuOpen(prev => !prev)}>
                <img className='header__image-menu' src={logoMenu} alt="логотип меню" />
            </button>
            <ul className={menuOpen ? 'header__list' : 'display-none'}>
                <li className='header__item-list'>
                    <button className={ document.cookie ? 'header__button-list' : 'display-none'} onClick={() => {setPage(Page.ACCOUNT); setMenuOpen(prev => !prev)}}>Личный кабинет</button>   
                </li>
                <li className='header__item-list'>
                    <button className='header__button-list' onClick={() => {setPage(Page.REG); setMenuOpen(prev => !prev)}}>Зарегистрироваться</button>
                </li>
            </ul>
        </header>
    );
}