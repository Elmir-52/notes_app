import { useContext, type ReactNode } from "react";
import type { AllPage, ContextInterface } from "../../NotesContext";
import NotesContext from "../../NotesContext";
import './ButtonNavigation.css'

interface PropsButtonNavigation {
    children: ReactNode;
    page: AllPage;
}

export default function ButtonNavigation({ children, page }: PropsButtonNavigation) {
    const context: ContextInterface = useContext(NotesContext);

    return (
        <button className="button" onClick={() => context.setPage(page)}>{children}</button>
    );
}