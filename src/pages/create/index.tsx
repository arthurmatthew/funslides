import { useState } from "react";
import { SlideMenuItem } from "../../components/create/SlideMenuItem";
import { TPresentation, TSlide } from "../../types";
import Smile from "../../assets/fs-smile.png";
import { Link } from "react-router-dom";
import { ToolbarSeperator } from "../../components/create/ToolbarSeperator";
import { btoaUrl } from "../../helpers/urlSafeEncryption";

export const CreateIndex = () => {
    const [slides, _setSlides] = useState<TPresentation>([
        {
            content:
                "https://media.discordapp.net/attachments/995096496406016040/1213924460353294347/1.png?ex=65f73e40&is=65e4c940&hm=7350358f76923182f28bd6a961f67c8d72d6403f02950a8de7aaa2090b62af02&=&format=webp&quality=lossless&width=1015&height=571",
        },
        {
            content:
                "https://media.discordapp.net/attachments/995096496406016040/1213924461330301028/2.png?ex=65f73e41&is=65e4c941&hm=1a0992b155004d2d45e4c07aa0628fc9e0cf5f0e16226d70368ec41b85cbb741&=&format=webp&quality=lossless&width=1015&height=571",
        },
        {
            content:
                "https://media.discordapp.net/attachments/995096496406016040/1213924462118834217/3.png?ex=65f73e41&is=65e4c941&hm=8a97d21a5026daa6e686146f89649845683d5befeae6b612f68817b4a81dd7b5&=&format=webp&quality=lossless&width=1015&height=571",
        },
    ]);
    const [selectedSlide, setSelectedSlide] = useState<TSlide>(slides[0]);

    return (
        <div className="grid flex-grow grid-rows-12">
            <div className="row-span-1 flex items-center gap-4 bg-gray-200 px-4">
                <Link to="/">
                    <img src={Smile} className="h-8" />
                </Link>
                <div className="flex gap-3 rounded-lg border-2 border-gray-300 bg-gray-100 px-2">
                    <button>File</button>
                    <button>Edit</button>
                    <button>View</button>
                    <button>Insert</button>
                    <button>Format</button>
                    <button>Tools</button>
                </div>
                <span className="h-8 w-px bg-gray-400"></span>
                <div className="flex items-center gap-3 rounded-lg border-2 border-gray-300 bg-gray-100 px-2">
                    <i className="bi-search" />
                    <i className="bi-arrow-left" />
                    <i className="bi-arrow-right" />
                </div>
                <ToolbarSeperator />
                <div className="flex items-center gap-1">
                    <div className="flex gap-3 rounded-lg border-2 border-gray-300 bg-gray-100 px-2">
                        <p className="flex items-center gap-1">
                            Inter{" "}
                            <i className="bi-caret-down-fill text-xs text-gray-600" />
                        </p>
                    </div>
                    <div className="flex gap-3 rounded-lg border-2 border-gray-300 bg-gray-100 px-2">
                        <p className="flex items-center gap-1">
                            48pt{" "}
                            <i className="bi-caret-down-fill text-xs text-gray-600" />
                        </p>
                    </div>
                </div>
                <ToolbarSeperator />
                <div className="flex items-center gap-3 rounded-lg border-2 border-gray-300 bg-gray-100 px-2 text-lg">
                    <i className="bi-type-bold" />
                    <i className="bi-type-italic" />
                    <i className="bi-type-underline" />
                    <i className="bi-type-strikethrough" />
                </div>
                <ToolbarSeperator />
                <Link
                    to={`/host/${btoaUrl(JSON.stringify(slides))}`}
                    className="flex items-center gap-3 rounded-lg border-2 border-gray-300 bg-gray-100 px-2"
                >
                    <p>Present</p>
                </Link>
            </div>
            <div className="row-span-11 grid grid-cols-6">
                <div className="col-span-1 flex flex-col gap-2 overflow-y-scroll border-r-2 border-gray-200 p-2">
                    {slides.map((slide, i) => (
                        <SlideMenuItem
                            selected={slide.content === selectedSlide.content}
                            onClick={() => setSelectedSlide(slide)}
                            content={slide.content}
                            index={i + 1}
                        />
                    ))}
                    <div className="flex items-center justify-center rounded-md bg-gray-200 p-6">
                        <h2>
                            Quiz Break{" "}
                            <i className="bi-pencil-fill ml-1 text-sm" />
                        </h2>
                    </div>
                    <div className="flex items-center justify-center rounded-md border-2 border-dashed border-gray-300">
                        <i className="bi-plus text-6xl text-gray-300" />
                    </div>
                </div>
                <div className="col-span-5 flex items-center justify-center bg-gray-300">
                    <img
                        src={selectedSlide.content}
                        className="aspect-video w-4/5 bg-white shadow-2xl"
                    />
                </div>
            </div>
        </div>
    );
};
