import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { QueryClientProvider, QueryClient } from "react-query";
import { MaterialUIControllerProvider,UserProvider } from "context";
import { ToastContainer } from "react-toastify";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const queryClient = new QueryClient();


ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <UserProvider>
      <DndProvider backend={HTML5Backend} >
        <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <App />
      </QueryClientProvider>
      </DndProvider>
      </UserProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
