import React, { useEffect, useState } from "react";

let gameId = 90210;

export default function QuizPage() {
    let [Qnum, setQNum] = useState(0);
    let [score,setScore] = useState(0)
    let quiz = [["In what country did the first Starbucks open outside of North America?",['Japan',true],['Pluto',false],['Germany',false],["UK",false]],["What is 1+1",['2',true],['idk',false],['3',false],["1",false]]]
    
    function submitAnwser(anw:number){
        
        if(quiz.length-2 >=Qnum && quiz[Qnum][anw+1][1]){
            setScore(score+1000)
            console.log(quiz[Qnum][anw+1][1])
        }
        setQNum(Qnum +1)
        
    }

    return (
        <>
            <div className="flex flex-grow flex-col items-center justify-center">
            <h1 className=" m-2">
                {quiz[Qnum][0]}
            </h1>
            <button onClick={() => submitAnwser(0)} className="border-gray-700 w-80 bg-gray-200 text-xl rounded-lg p-2 m-2">{quiz[Qnum][1][0]}</button>
            <button onClick={() => submitAnwser(1)} className="border-gray-700 w-80 bg-gray-200 text-xl rounded-lg p-2 m-2">{quiz[Qnum][2][0]}</button>
            <button onClick={() => submitAnwser(2)} className="border-gray-700 w-80 bg-gray-200 text-xl rounded-lg p-2 m-2">{quiz[Qnum][3][0]}</button>
            <button onClick={() => submitAnwser(3)} className="border-gray-700 w-80 bg-gray-200 text-xl rounded-lg p-2 m-2">{quiz[Qnum][4][0]}</button>
            <h1 className=" m-2 text-sm">
                {'score: '}{score}
            </h1>
            </div>
            
        </>
    );
}
