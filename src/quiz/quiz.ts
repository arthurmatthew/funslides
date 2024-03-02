import { child, get, getDatabase } from "firebase/database";
import { ref, set } from "firebase/database";
const {onValueChanged} = require("firebase-functions/v2/database");
import { useState, useEffect } from 'react';
const database = getDatabase();

class Quiz{
    gameId: string | number | undefined;
    db;
    score = 0;
    timeStart: any;
    
    constructor(){
        this.db = getDatabase();
        
          
    }

    createGame(questions: any): Number{
        let gameNum = 8;
        set(ref(this.db, 'games/' + gameNum), {
            questionList: questions,
            users: [],
            qOn: -1,
            start: 0
          });
        // const onWrittenFunctionDefault = onValueChanged("games/"+gameNum+'/qOn', (event) => {
        //     this.update()
        // });
        return gameNum;
    }
    joinGame(name:string,id:number){
        const dbRef = ref(getDatabase());
        let users: string[] = [];
        get(child(dbRef, `games/${id}/users`)).then((snapshot) => {
        if (snapshot.exists()) {
            users = snapshot.val()
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
        users.push(name)
        set(ref(this.db, 'games/'+id +'/'+users), {
            users: users
        });
        this.gameId = id

    }
    getQuestions(){
        const dbRef = ref(getDatabase());
        let questions: never[] = []
        get(child(dbRef, `games/${this.gameId}/questionList`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            questions = snapshot.val()
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
        return questions
    }
    getqOn(){
        const dbRef = ref(getDatabase());
        let qOn:number = 0
        get(child(dbRef, `games/${this.gameId}/qOn`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            qOn = snapshot.val()
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
        return qOn
    }
    getqStart(){
        const dbRef = ref(getDatabase());
        let start = 0
        get(child(dbRef, `games/${this.gameId}/start`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            start = snapshot.val()
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
        return start
    }
    getId(){
        return this.gameId
    }
    calcScore(anws:number){
        let questions = this.getQuestions()
        let qOn:number = this.getqOn();
        if(questions[qOn][anws][1]==true && (Date.now()-this.getqStart()) < 30000){
            this.score += (1000 * (30000-(Date.now()-this.getqStart())/30000))
        }
    }
    nextQuestion(){
        let nextQ = parseInt(this.getqOn.toString())
        nextQ += 1
        set(ref(this.db, 'games/' + this.gameId), {
            qOn: nextQ,
            start: Date.now()
          });
    }
    getCurrentQuestion(){
        const dbRef = ref(getDatabase());
        let question:string[] = []
        get(child(dbRef, `games/${this.gameId}/start`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            question = snapshot.val()
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
        return question[this.getqOn()]
    }
}
let q = new Quiz()
export default function useQuiz(){
    let [count,setCount] = useState(0)
    const onWrittenFunction = onValueChanged("games/"+q.getId+'/qOn', () => {setCount(count+1)})
    return q;

}


