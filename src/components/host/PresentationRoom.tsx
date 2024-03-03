import { TPresentation } from "../../types";

interface IPresentationRoom {
    slideNumber: number;
    presentation: TPresentation;
    advance: () => void;
    previous: () => void;
}

export const PresentationRoom = ({
    slideNumber,
    presentation,
    advance,
    previous,
}: IPresentationRoom) => {
    return (
        <div className="flex flex-grow flex-col items-center justify-center">
            <h1>
                {slideNumber + 1}/{presentation.length}
            </h1>
            <img
                src={presentation[slideNumber].content}
                className="my-5 aspect-video w-full max-w-2xl rounded-lg border-2 border-gray-700 bg-gray-200"
            ></img>
            <div className="flex gap-2 rounded-md bg-gray-200 p-2">
                <button
                    onClick={previous}
                    className="rounded-md bg-white px-8 py-4"
                >
                    Previous Slide
                </button>
                <button
                    onClick={advance}
                    className="rounded-md bg-white px-8 py-4"
                >
                    Next Slide
                </button>
            </div>
        </div>
    );
};
