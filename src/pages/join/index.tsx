import React, { useEffect, useState } from "react";
import useQuiz, { Quiz } from "../../quiz/quiz";

let gameId = 90210;

export default function JoinIndex() {
    const [firstTime, setFirstTime] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(<p>game has not started</p>);
    const q = useQuiz(new Quiz());

    useEffect(() => {
        function setup() {
            if (q.gameExists(gameId)) {
                q.joinGame("Seb", gameId);
                setCurrentSlide(<p>Waiting for the game to start</p>);
            } else {
                gameId = q.createGame(["ome",true])
                q.setSlides(['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT1kXgDHNIA5A7zhviSs3z0k76yX6RzCrOLbOmYj_Y2RuAvRKar']);
            }

            q.nextQuestion();
            setCurrentSlide(<img src={q.getCurrentSlide()} />);
            setFirstTime(false);
            console.log(firstTime);
        }

        if (firstTime) {
            setup();
        }
    }, [q]);

    return (
        <>
            <p className="text-center">Slide {q.getCurrentQuestion() + 1} out of {q.getAllSlides().length}</p>
            <div className="h-screen flex items-center justify-center">
                {currentSlide}
            </div>
        </>
    );
}
