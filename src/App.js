import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Store, StoreProvider } from "./store/store";
import Jobs from "./features/jobsList/components/jobs";
import Header from "./features/header/components/header";
import Details from "./features/details/components/details";
import React, { useEffect } from "react";

function App() {
  const { state, dispatch } = React.useContext(Store);  

  return (
    <div className="App">
      <StoreProvider>
        <div className="app-container">
          <Header className="header" />
          <BrowserRouter>
            <Routes>
              <Route element={<Jobs />} exact path="/" />
              <Route element={<Details />} exact path="/item/:id" />
            </Routes>
          </BrowserRouter>
        </div>
      </StoreProvider>
    </div>
  );
}

export default App;
