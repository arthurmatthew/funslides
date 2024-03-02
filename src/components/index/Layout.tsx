import { Outlet } from "react-router";
import funSlidesIcon from "../../assets/fs-smile.png";
import { Link } from "react-router-dom";

interface ILayout {
    children?: React.ReactNode;
}

export const Layout = ({ children }: ILayout) => {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="flex items-center bg-gray-100 p-4">
                <Link to="/" className="flex items-center">
                    <img src={funSlidesIcon} className="-mr-2 h-8" />
                    <h1 className="text-4xl font-black tracking-tighter text-purple-600">
                        funslides
                    </h1>
                </Link>
            </header>
            <main className="flex flex-auto flex-col">
                {children ?? <Outlet />}
            </main>
            <footer className="p-4">
                <p className="text-center text-xs opacity-50">
                    made by matthew & sebastien for hackpnw '24
                </p>
            </footer>
        </div>
    );
};
