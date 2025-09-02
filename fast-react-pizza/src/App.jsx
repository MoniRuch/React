import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./ui/Home.jsx";
import Cart from "./features/cart/Cart.jsx";
import Menu, {loader as menuLoader} from "./features/menu/Menu.jsx";
import CreateOrder, {action as createOrderAction} from "./features/order/CreateOrder.jsx";
import Order, {loader as orderLoader} from "./features/order/Order.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import Error from "./ui/Error.jsx";

export default function App(){
    const router = createBrowserRouter([
        { element: <AppLayout />,
          errorElement: <Error />,  
          children: [{ path: '/', element: <Home /> },
              { path: '/cart', element: <Cart /> },
              { path: '/menu', element: <Menu />, loader: menuLoader, errorElement: <Error />},
              { path: '/order/new', element: <CreateOrder />, action: createOrderAction, errorElement: <Error /> },
              { path: '/order/:orderId', element: <Order />, loader: orderLoader, errorElement: <Error />}
          ]
        }
      ])  
    return <div>
        <RouterProvider router={router}/>
    </div>
}