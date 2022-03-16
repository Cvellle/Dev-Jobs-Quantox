import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Store } from "./store/store";

import Jobs from "./features/jobsList/components/Jobs";
import Header from "./features/header/components/Header";
import Details from "./features/details/components/Details";
import React, { useContext } from "react";

function App() {
  const { state, dispatch } = useContext(Store);
  const { dark } = state;
  return (
    <div className="App">
      <div
        className="app-container"
        style={{
          background: !dark ? "#121721" : "white",
        }}
      >
        <Header className="header" />
        <BrowserRouter>
          <Routes>
            <Route element={<Jobs />} exact path="/" />
            <Route element={<Details />} exact path="/item/:id" />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
