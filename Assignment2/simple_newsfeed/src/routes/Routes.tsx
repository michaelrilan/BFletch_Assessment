import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import UpdateProfile from "../pages/UpdateProfile";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Login /> },
      { path: "signup", element: <Register /> },
      { path: "home", 
        element: (
        <ProtectedRoute>
            <Home />
        </ProtectedRoute>
        ), 
      },
      { path: "updateprofile", 
        element: (
        <ProtectedRoute>
            <UpdateProfile />
        </ProtectedRoute>
        ), 
      },

    ],
  },
]);