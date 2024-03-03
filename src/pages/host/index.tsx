import { useState } from "react";
import { useParams } from "react-router-dom";
import { WaitingRoom } from "../../components/host/WaitingRoom";
import { atobUrl } from "../../helpers/urlSafeEncryption";
import { TPlayer, TPresentation } from "../../types";
import { PresentationRoom } from "../../components/host/PresentationRoom";

export const HostIndex = () => {
    const { presentation } = useParams();

    if (presentation === undefined) {
        return <h1>Select a presentation</h1>;
    }

    const players: TPlayer[] = [
        { name: "Matthew", score: 1200 },
        { name: "Sebastien", score: 980 },
    ];
    const [slideNumber, setSlideNumber] = useState(-1);
    const [parsedPresentation, _setParsedPresentation] = useState(
        JSON.parse(atobUrl(presentation)) as TPresentation,
    );

    if (slideNumber === -1) {
        return (
            <WaitingRoom players={players} start={() => setSlideNumber(0)} />
        );
    }

    if (parsedPresentation[slideNumber] === undefined) {
        return (
            <div className="my-20 flex flex-col items-center gap-6">
                <h1 className="text-6xl font-black">Teacher's Summary</h1>
                <div className="grid max-w-6xl grid-cols-2 gap-2">
                    <div className="flex flex-col items-center gap-2 rounded-md border-2 border-purple-300 bg-purple-100 px-16 py-4">
                        <div className="flex flex-col items-center">
                            <h1 className="text-4xl font-black">Sebastien</h1>
                            <h2 className="text-2xl">Most Engaged</h2>
                        </div>
                        <p className="text-center text-lg">
                            Sebastien was active in the presentation for 98.7%
                            of the time. They earned 980 points.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-2 rounded-md border-2 border-yellow-300 bg-yellow-100 px-16 py-4">
                        <div className="flex flex-col items-center">
                            <h1 className="text-4xl font-black">Matthew</h1>
                            <h2 className="text-2xl">High Score</h2>
                        </div>
                        <p className="text-center text-lg">
                            Matthew got 100% of the questions correct during the
                            first quiz. They earned 1200 points.
                        </p>
                    </div>
                    <div className="col-span-2 flex items-center justify-center rounded-md border-2 border-red-300 bg-red-100 py-4">
                        <p>
                            Matthew only watched 56% of the presentation.{" "}
                            <span className="underline">
                                Learn how to keep your audience engaged
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex max-w-5xl flex-wrap justify-center gap-1 rounded-md bg-gray-100 p-1">
                    {players.length === 0 ? (
                        <p className="p-4">Everybody left...</p>
                    ) : (
                        players.map((player) => (
                            <p
                                key={player.name}
                                className="font rounded-md bg-gray-200 px-8 py-4"
                            >
                                {player.name} - <b>{player.score}</b>
                            </p>
                        ))
                    )}
                </div>
            </div>
        );
    }

    return (
        <PresentationRoom
            presentation={parsedPresentation}
            slideNumber={slideNumber}
            previous={() =>
                setSlideNumber((number) => {
                    if (number === 0) return number;
                    return number - 1;
                })
            }
            advance={() => setSlideNumber((number) => number + 1)}
        />
    );
};
