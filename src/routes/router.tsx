import {
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { IndexRoute } from "./index.route";
import { CreateRoute } from "./create.route";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {IndexRoute}
            {CreateRoute}
        </>,
    ),
);
