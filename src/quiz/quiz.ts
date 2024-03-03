import { child, get, getDatabase, onValue, off, ref, set } from "firebase/database";
import { useEffect, useState } from 'react';

export class Quiz {
    gameId = -1;
    db: any;
    score = 0;
    timeStart: any;
    userName = '';
    dbRef: any;

    constructor() {
        this.db = getDatabase();
        this.dbRef = ref(this.db);
    }

    async gameExists(id: number): Promise<boolean> {
        try {
            const snapshot = await get(child(this.dbRef, `games/${id}/currentQuestion`));
            return snapshot.exists();
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async createGame(questions: any): Promise<number> {
        try {
            const gameId = Math.round(Math.random() * 100000);
            await set(ref(this.db, `games/${gameId}`), {
                questionList: questions,
                users: [],
                currentQuestion: -1,
                questionStartTime: 0
            });
            this.gameId = gameId;
            console.log(this.gameId, "createGame gameid");
            return gameId;
        } catch (error) {
            console.error("Did not work lol", error);
            return -1;
        }
    }

    async setSlides(slides: any): Promise<void> {
        try {
            await set(ref(this.db, `games/${this.gameId}/slides`), {
                slidesArray: slides,
                currentSlide: -1,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async getCurrentSlideNumber(): Promise<number> {
        try {
            const snapshot = await get(child(this.dbRef, `games/${this.gameId}/slides/currentSlide`));
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available", "current slide number");
                return 0;
            }
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    async nextSlide(): Promise<void> {
        try {
            const nxtSlide = await this.getCurrentSlideNumber() + 1;
            await set(ref(this.db, `games/${this.gameId}/slides`), {
                currentSlide: nxtSlide,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async getCurrentSlide(): Promise<string> {
        try {
            let slide = "error did not work2";
            const snapshot = await get(child(this.dbRef, `games/${this.gameId}/slides/slidesArray`));
            if (snapshot.exists()) {
                slide = snapshot.val()[await this.getCurrentSlideNumber()];
                slide = 'testing';
            } else {
                console.log("No data available", "current slide");
                slide = 'test did';
            }
            return slide;
        } catch (error) {
            console.error(error);
            return 'error peroi';
        }
    }

    async joinGame(userName: string, gameId: number): Promise<void> {
        try {
            let users: string[] = [];
            const snapshot = await get(child(this.dbRef, `games/${gameId}/users`));
            if (snapshot.exists()) {
                users = snapshot.val();
            } else {
                console.log("No data available", "join game");
            }
            users.push(userName);
            await set(ref(this.db, `games/${gameId}/users`), {
                users: users
            });
            this.gameId = gameId;
        } catch (error) {
            console.error(error);
        }
    }

    async getQuestions(): Promise<any[]> {
        try {
            const snapshot = await get(child(this.dbRef, `games/${this.gameId}/questionList`));
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available", "get questions", this.gameId);
                return [];
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getqOn(): Promise<number> {
        try {
            const snapshot = await get(child(this.dbRef, `games/${this.gameId}/currentQuestion`));
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available", "get qOn");
                return 0;
            }
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    async getqStart(): Promise<number> {
        try {
            const snapshot = await get(child(this.dbRef, `games/${this.gameId}/start`));
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available", "start");
                return 0;
            }
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    getId(): number {
        return this.gameId;
    }

    async calcScore(anws: number): Promise<void> {
        try {
            const questions = await this.getQuestions();
            const qOn: number = await this.getqOn();
            if (questions[qOn][anws][1] == true && (Date.now() - await this.getqStart()) < 30000) {
                this.score += (1000 * (30000 - (Date.now() - await this.getqStart()) / 30000));
            }
            await set(ref(this.db, `games/${this.gameId}/users/${this.userName}`), {
                score: this.score,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async getScore(pos: number): Promise<number | null> {
        try {
            let users: string[] = [];
            const snapshot = await get(child(this.dbRef, `games/${this.gameId}/users`));
            if (snapshot.exists()) {
                users = snapshot.val();
            } else {
                console.log("No data available", "get users");
                return null;
            }
            let score = null;
            const userSnapshot = await get(child(this.dbRef, `games/${this.gameId}/users/${users[pos]}/score`));
            if (userSnapshot.exists()) {
                score = userSnapshot.val();
            } else {
                console.log("No data available", "score");
            }
            return score;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async nextQuestion(): Promise<void> {
        try {
            let nextQ = await this.getqOn();
            nextQ += 1;
            await set(ref(this.db, `games/${this.gameId}`), {
                qOn: nextQ,
                start: Date.now()
            });
        } catch (error) {
            console.error(error);
        }
    }

    async getCurrentQuestion(): Promise<string> {
        try {
            let question: string[] = [];
            const snapshot = await get(child(this.dbRef, `games/${this.gameId}/start`));
            if (snapshot.exists()) {
                question = snapshot.val();
            } else {
                console.log("No data available", "get current question");
            }
            return question[await this.getqOn()];
        } catch (error) {
            console.error(error);
            return "error";
        }
    }

    getDb(): any {
        return this.db;
    }
}

export default function useQuiz(q: Quiz) {
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
