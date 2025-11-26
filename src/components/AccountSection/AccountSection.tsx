import { Page } from "../../NotesContext";
import ButtonNavigation from "../Button/ButtonNavigation";
import './AccountSection.css';

export default function AccountSection() {
    const cookieFull: string = document.cookie;
    const cookieArr: string[] = cookieFull.split(';');
    const cookieUserId: string = cookieArr[0].split('=')[1];
    const cookieUserName: string = cookieArr[1].split('=')[1];

    return (
        <section className="account-section">
            <h2 className="account-section__h2">Добрый день {cookieUserName}</h2>
            <p className="account-section__paragraph">Ваш id: {cookieUserId}</p>
            <div className="account-section__wrapper-button">
                <ButtonNavigation page={Page.HOME}>На главную</ButtonNavigation>
            </div>
        </section>
    )
}