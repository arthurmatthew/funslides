import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { IndexRoute } from "./index.route";

export const router = createBrowserRouter(
  createRoutesFromElements(<>{IndexRoute}</>),
);
