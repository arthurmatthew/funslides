interface ISlideMenuItem {
    index: number;
    content: string;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    selected: boolean;
}

export const SlideMenuItem = ({
    index,
    onClick,
    content,
    selected,
}: ISlideMenuItem) => {
    return (
        <button
            onClick={onClick}
            className={`group relative flex h-32 w-full items-center justify-center rounded-md border-2 border-gray-200 duration-75 hover:border-purple-300 ${selected ? "border-purple-300" : ""}`}
        >
            <img
                src={content}
                className="absolute -z-10 h-full w-full opacity-20 grayscale"
            />
            <div className="h-full w-full">
                <h1
                    className={`w-fit rounded-br-lg rounded-tl-md bg-gray-200 px-4 py-2 duration-75 group-hover:bg-purple-300 ${selected ? "bg-purple-300" : ""}`}
                >
                    Slide {index}
                </h1>
            </div>
        </button>
    );
};
