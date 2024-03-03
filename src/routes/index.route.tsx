import { Route } from "react-router-dom";
import { Index } from "../pages/index";
import { NotFound } from "../pages/not-found";
import { Layout } from "../components/index/Layout";
import  JoinIndex  from "../pages/join/index";
import QuizPage from "../pages/quizPage";

export const IndexRoute = (
    <Route
        path="/"
        element={<Layout />}
        errorElement={
            <Layout>
                <NotFound />
            </Layout>
        }
    >
        <Route path="/" element={<Index />} />
        <Route path="/join" element={<JoinIndex/>} />
        <Route path='/quiz' element={<QuizPage/>}/>
    </Route>
);
