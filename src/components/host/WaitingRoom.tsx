import { TPlayer } from "../../types";

interface IWaitingRoom {
    players: TPlayer[];
    start: () => void;
}

export const WaitingRoom = ({ players, start }: IWaitingRoom) => {
    return (
        <div className="my-20 flex flex-col items-center">
            <div className="flex gap-6">
                <h1 className="text-6xl font-black">Gather your audience.</h1>
                <h1 className="rounded-lg bg-gray-200 px-2 text-6xl font-black">
                    106789
                </h1>
            </div>

            <button
                onClick={start}
                className="my-10 w-full max-w-2xl rounded-lg bg-purple-300 py-2 text-2xl"
            >
                Start with {players.length} people
            </button>
            <div className="flex max-w-5xl flex-wrap justify-center gap-1 rounded-md bg-gray-100 p-1">
                {players.length === 0 ? (
                    <p className="p-4">
                        Share your code to the audience to let them join.
                    </p>
                ) : (
                    players.map((player) => (
                        <p
                            key={player.name}
                            className="font rounded-md bg-gray-200 px-8 py-4"
                        >
                            {player.name}
                        </p>
                    ))
                )}
            </div>
        </div>
    );
};
