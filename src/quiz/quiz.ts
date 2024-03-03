import { child, get, getDatabase, off, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from 'react';
// Import the functions you need from the SDKs you need


export class Quiz{
    gameId: string | number | undefined;
    db;
    score = 0;
    timeStart: any;
    userName:string = '';
    dbRef: any;

    
    constructor(){
        this.db = getDatabase();
        this.dbRef = ref(this.db)
          
    }
    gameExists(id:number){
        get(child(this.dbRef, `games/${id}/currentQuestion`)).then((snapshot) => {
            if (snapshot.exists()) {
                return true
            } else {
                console.log("No data available", "game does not exist");
                return false
            }
            }).catch((error) => {
            console.error(error);
        });
        return false
    }
    createGame(questions: any): number {
        let gameId = Math.round(Math.random() * 100000);
    
        set(ref(this.db, `games/${gameId}`), {
            questionList: questions,
            users: [],
            currentQuestion: -1,
            questionStartTime: 0
        }).then(() => {
            this.gameId = gameId;
            console.log(this.gameId, "createGame gameid");
        }).catch((error) => {
            console.error("Did not work lol");
        });
    
        return gameId;
    }
    
    setSlides(slides:any){
        set(ref(this.db, `games/${this.gameId}/slides`), {
            slidesArray: slides,
            currentSlide: -1,
            //not that it starts  -1, start the slide show with next slide
          });
    }
    getCurrentSlideNumber(){
        let curSlide = 0
        get(child(this.dbRef, `games/${this.gameId}/slides/currentSlide`)).then((snapshot) => {
            if (snapshot.exists()) {
                curSlide = snapshot.val()
            } else {
                console.log("No data available", "current slide");
            }
            }).catch((error) => {
            console.error(error);
        });
        return curSlide
    }
    nextSlide(){
        let nxtSlide = this.getCurrentSlideNumber()+1
        set(ref(this.db, `games/${this.gameId}/slides`), {
            currentSlide: nxtSlide,
            //not that it starts  -1, start the slide show with next slide
        });
    }
    getAllSlides(){
        let slides:string[] = [];
        get(child(this.dbRef, `games/${this.gameId}/slides/slidesArray`)).then((snapshot) => {
            if (snapshot.exists()) {
                slides = snapshot.val()
            } else {
                console.log("No data available", "all slide");
            }
            }).catch((error) => {
            console.error(error);
        });
        return slides
    }
    getCurrentSlide():string{
        let slides = "";
        console.log(this.getCurrentSlideNumber())
        get(child(this.dbRef, `games/${this.gameId}/slides/slidesArray`)).then((snapshot) => {
            if (snapshot.exists()) {
                slides = snapshot.val()[this.getCurrentSlideNumber()]
            } else {
                console.log("No data available", "current slide");
            }
            }).catch((error) => {
            console.error(error);
        });
        return slides
    }
    joinGame(userName:string,gameId:number){
        let users: string[] = [];
        get(child(this.dbRef, `games/${gameId}/users`)).then((snapshot) => {
        if (snapshot.exists()) {
            users = snapshot.val()
        } else {
            console.log("No data available", "join game");
        }
        }).catch((error) => {
        console.error(error);
        });
        users.push(userName)
        set(ref(this.db, 'games/'+gameId +'/'+users), {
            users: users
        });
        this.gameId = gameId

    }
    getQuestions(){
        let questions: never[] = []
        get(child(this.dbRef, `games/${this.gameId}/questionList`)).then((snapshot) => {
        if (snapshot.exists()) {
            questions = snapshot.val()
        } else {
            console.log("No data available","get questions",this.gameId);
        }
        }).catch((error) => {
        console.error(error);
        });
        return questions
    }
    getqOn(){
        let qOn:number = 0
        get(child(this.dbRef, `games/${this.gameId}/qOn`)).then((snapshot) => {
        if (snapshot.exists()) {
            qOn = snapshot.val()
        } else {
            console.log("No data available, getqOn");
        }
        }).catch((error) => {
        console.error(error);
        });
        return qOn
    }
    getqStart(){
        let start = 0
        get(child(this.dbRef, `games/${this.gameId}/start`)).then((snapshot) => {
        if (snapshot.exists()) {
            start = snapshot.val()
        } else {
            console.log("No data available","start");
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
        set(ref(this.db, 'games/' + this.gameId + '/users'+this.userName), {
            score: this.score,
          });
    }
    getScore(pos:number){
        let users:string[] = []
        get(child(this.dbRef, `games/${this.gameId}/users`)).then((snapshot) => {
            if (snapshot.exists()) {
                users = snapshot.val()

            } else {
                console.log("No data available","get users");
            }
            }).catch((error) => {
            console.error(error);
            });
        let score = null
        get(child(this.dbRef, `games/${this.gameId}/users/${users[pos]}/score`)).then((snapshot) => {
            if (snapshot.exists()) {
                score = snapshot.val()
                } else {
                console.log("No data available","score");
            }
            }).catch((error) => {
                console.error(error);
            });
        return score
    }
    nextQuestion(){
        let nextQ = this.getqOn()
        nextQ += 1
        set(ref(this.db, 'games/' + this.gameId), {
            qOn: nextQ,
            start: Date.now()
          });
    }
    getCurrentQuestion(){
        let question:string[] = []
        get(child(this.dbRef, `games/${this.gameId}/start`)).then((snapshot) => {
        if (snapshot.exists()) {
            question = snapshot.val()
        } else {
            console.log("No data available","get current question");
        }
        }).catch((error) => {
        console.error(error);
        });
        return question[this.getqOn()]
    }
    getDb(){
        return this.db
    }
}

export default function useQuiz(q:Quiz) {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      if (!q) {
        console.error('Quiz instance (q) is not provided to useQuiz.');
        return;
      }
  
      const db = q.getDb();
      const gameRef = ref(db, `games/${q.getId()}/qOn`);
  
      // Define a callback function that updates the count
      const handleValueChange = () => {
        setCount((prevCount) => prevCount + 1); // Correctly handle state updates based on the previous state
      };
  
      onValue(gameRef, handleValueChange);
  
      return () => {
        off(gameRef, 'value', handleValueChange);
      };
  
    }, [q]);   
    return q;
  }

