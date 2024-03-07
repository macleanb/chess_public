/* External Imports */
import { createBrowserRouter } from 'react-router-dom';

/* Internal Imports */
import App from './App';
import Game from './pages/Game';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <Game />
      },
      {
        path: 'game/',
        element: <Game />
      },
      // {
      //   path: 'error/',
      //   element: <NotFound />
      // },
      // {
      //   path: "*",
      //   element: <NotFound />
      // },
    ],
    //errorElement: <NotFound />,
  }
]);

export default router;