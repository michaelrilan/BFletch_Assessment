
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router";
import { ToastContainer as ToastifyContainer } from 'react-toastify';
import { UserProvider } from "./context/useAuth";
// import UpdateProfile from "./pages/UpdateProfile";

const App = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path='/' element={<Login />} />
    //     <Route path='/signup' element={<Register />} />
    //     {/* <Route path='/updateprofile' element={<UpdateProfile />} /> */}

    //     <Route path='/home' element={<Home />} />
    //   </Routes>
    // </Router>
    <>
      <UserProvider>
        <Outlet />
        <ToastifyContainer position="top-right" autoClose={3000}/>
      </UserProvider>
    </>
  );
};

export default App;
