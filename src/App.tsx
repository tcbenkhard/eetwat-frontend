import React from 'react';
import './App.scss';
import OverviewPage from "./page/overview-page";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <OverviewPage />,
    },
    {
        path: "/",
        element: <OverviewPage />,
    },
]);

const App = () => {
  return (
      <div id={'content'}>
          <RouterProvider router={router}/>
      </div>
  )
}

export default App;