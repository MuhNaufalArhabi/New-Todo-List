import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: ()=> {
      if(sessionStorage.access_token){
        return redirect('/')
      }
      return null
    }
  },
  {
    path: "/",
    element: <HomePage />,
    loader: ()=> {
      if(!sessionStorage.access_token){
        return redirect('/login')
      }
      return null
    }
  },
]);

export default router;
