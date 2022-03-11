import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { StoreProvider } from "./store/store";
import Jobs from "./features/jobsList/components/Jobs";
import Header from "./features/header/components/Header";
import Details from "./features/details/components/Details";
import React from "react";

function App() {
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
