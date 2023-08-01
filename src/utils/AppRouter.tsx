import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router";
import { MainPage, CoursePage } from "../pages";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/course/:courseId",
    element: <CoursePage />,
    loader: async function loader({ params }) {
      return params.courseId
    }
  },
];

const AppRouter: RemixRouter = createBrowserRouter(routes);

export default AppRouter;
