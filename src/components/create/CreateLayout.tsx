import { Outlet } from "react-router";

interface ICreateLayout {
    children?: React.ReactNode;
}

export const CreateLayout = ({ children }: ICreateLayout) => {
    return (
        <div className="flex h-screen max-h-screen flex-col overflow-hidden">
            <main className="flex flex-auto flex-col">
                {children ?? <Outlet />}
            </main>
            <footer></footer>
        </div>
    );
};
