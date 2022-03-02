import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { StoreProvider } from "./store/store";
import Jobs from "./features/jobsList/components/jobs";
import Header from "./features/header/components/header";

function App() {
  return (
    <div className="App">
      <StoreProvider>
      <Header className="header"/>
        <BrowserRouter>
          <Routes>
            <Route element={<Jobs/>} exact path="/" />
            {/* <Route element={<Details/>} exact path="/item/:id" /> */}
          </Routes>
        </BrowserRouter>  
      </StoreProvider>
    </div>
  );
}

export default App;
