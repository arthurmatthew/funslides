import { PersonalAction } from "../components/join/PersonalAction";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDdphHvQdruSOkDdVbYDGWGjPVzfN9ZAN0",

  authDomain: "funslide-94fb9.firebaseapp.com",

  databaseURL: "https://funslide-94fb9-default-rtdb.firebaseio.com/",

  projectId: "funslide-94fb9",

  storageBucket: "funslide-94fb9.appspot.com",

  messagingSenderId: "850878584627",

  appId: "1:850878584627:web:8fe6302a6d18f7d0e05046",

  measurementId: "G-6RY4XQKKSV"

};
initializeApp(firebaseConfig)
export const Index = () => {
    return (
        <>
            <div className="m-24 flex flex-col items-center gap-12 text-center text-5xl font-black">
                <h1 className="">
                    Teaching, learning, and playing.{" "}
                    <span className="bg-gradient-to-tr from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        Streamlined
                    </span>
                </h1>
                <p className="max-w-4xl text-xl font-normal">
                    Students are 580% more likely to retain information{" "}
                    <b>if they aren't bored</b>. We'll help you engage your
                    audience without forcing them to take notes.
                </p>
            </div>

            <div className="h-screen bg-gray-100">
                <div className="grid grid-cols-2 gap-2 p-2">
                    <PersonalAction>
                        <h1 className="text-center text-2xl">For Students</h1>
                        <form className="grid grid-cols-3 gap-1">
                            <input
                                type="text"
                                placeholder="Enter a code"
                                className="col-span-2 rounded-md border-2 border-gray-100 p-4"
                            />
                            <Link
                                to={"/join"}
                                className="rounded-md bg-purple-200 p-4 px-8 text-center"
                            >
                                Join
                            </Link>
                        </form>
                    </PersonalAction>
                    <PersonalAction>
                        <h1 className="text-2xl">For Teachers</h1>
                        <div className="grid grid-cols-2 gap-1">
                            <Link
                                to="/host"
                                className="rounded-md bg-purple-200 p-4 px-16"
                            >
                                Start Presenting
                            </Link>
                            <Link
                                to="/create"
                                className="rounded-md bg-purple-200 p-4 px-16"
                            >
                                Start Designing
                            </Link>
                        </div>
                    </PersonalAction>
                </div>
            </div>
        </>
    );
};
