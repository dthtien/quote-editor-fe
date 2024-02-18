import { RouteObject, RouterProvider, createBrowserRouter, useRoutes } from 'react-router-dom';
import Quotes from './components/Quotes';
import Home from './components/Home';
import { ProtectedRoute, useAuth } from './provider/authProvider';
import Login from './components/Login';

const RouteList = () => {
  const { isLogin } = useAuth();

  const publicRoutes: RouteObject[] = [
    {
      path: '/',
      element: <Home />,
    },
  ];

  const loginRoutes: RouteObject[] = [
    {
      path: '/login',
      element: <Login />,
    }
  ];

  const protectedRoutes: RouteObject[] = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/quotes',
          element: <Quotes />,
        }
      ]
    }
  ];

  const routes = useRoutes([
    ...publicRoutes,
    ...(isLogin ? [] : loginRoutes),
    ...protectedRoutes
  ]);

  return <> {routes} </>;
}
export default RouteList;
