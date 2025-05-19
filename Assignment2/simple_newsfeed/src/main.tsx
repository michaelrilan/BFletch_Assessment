// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import 'bootstrap/dist/css/bootstrap.css'


// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css'

import { router } from "./routes/Routes";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );

// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
