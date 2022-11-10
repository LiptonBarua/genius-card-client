import { createBrowserRouter } from "react-router-dom";
import Checkout from "../../Pages/Checkout/Checkout";

import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Main from "../../Pages/Main";
import Orders from "../../Pages/Orders/Orders";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRouter from "../PrivateRouter/PrivateRouter";


const router = createBrowserRouter([
    {
        path: '/', element: <Main></Main>, children: [
            {
                path: '/', element: <Home></Home>
            },
            {
                path: '/login', element: <Login></Login>
            },
            {
                path: '/signUp', element: <SignUp></SignUp>
            },
            {
                path: '/checkout/:id',
                loader: ({params})=>fetch(`https://genius-car-server-vert.vercel.app/services/${params.id}`),
                element: <PrivateRouter><Checkout></Checkout></PrivateRouter>
            },
            {
                path: '/orders',
                element: <PrivateRouter><Orders></Orders></PrivateRouter>
            }
        ]
    }
])
export default router;
