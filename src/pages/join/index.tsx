import React, { useEffect, useState } from "react";
import useQuiz, { Quiz } from "../../quiz/quiz";

let gameId = 90210;

export default function JoinIndex() {
    const [firstTime, setFirstTime] = useState(true);
    let [currentSlide, setCurrentSlide] = useState(<p>Game has not started</p>);
    let [slideNum, setSlideNum] = useState(0);
    let [slideNumber,setSlideNumber] = useState(0)
    const q = useQuiz(new Quiz());
    const slides = ["https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg","",""]
    const quiz = []
    
    useEffect(() => {
        function update(){
            setCurrentSlide(<img className=" w-5/6 h-5/6" src={slides[0]}/>)
        }
        // async function setup() {
        //     console.log('setup');
        //     if (await q.gameExists(gameId)) {
        //         q.joinGame("Seb", gameId);
        //         setCurrentSlide(<p>Waiting for the game to start</p>);
        //     } else {
        //         gameId = await q.createGame(["ome", true]);
        //         await q.setSlides(['https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT1kXgDHNIA5A7zhviSs3z0k76yX6RzCrOLbOmYj_Y2RuAvRKar','https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT1kXgDHNIA5A7zhviSs3z0k76yX6RzCrOLbOmYj_Y2RuAvRKar','https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT1kXgDHNIA5A7zhviSs3z0k76yX6RzCrOLbOmYj_Y2RuAvRKar']);
        //     }

        //     await q.nextSlide();
        //     setCurrentSlide(<img src={await q.getCurrentSlide()} />);
        //     setFirstTime(false);
        // }

        // async function update() {
        //     console.log(await q.getCurrentSlide());
        //     setCurrentSlide(<img src={await q.getCurrentSlide()} />);
        //     setSlideNum(await q.getCurrentSlideNumber());
        // }

        // if (firstTime) {
        //     setup();
        // }
        update();
    }, [q, firstTime]);

    return (
        <>
            {/* <p className="text-center">Slide {slideNum + 1} out of {10}</p>
            <div className="h-screen flex items-center justify-center">
                {currentSlide}
            </div> */}
            <div className="flex flex-grow flex-col items-center justify-center">
            <h1>
                {slideNumber + 1}/{slides.length}
            </h1>
            <img
                src={slides[slideNumber]}
                className="my-5 aspect-video w-full max-w-3xl rounded-lg border-2 border-gray-700 bg-gray-200"
            ></img>
            </div>
        </>
    );
}
