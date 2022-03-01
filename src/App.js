import logo from "./logo.svg";
import "./App.css";
import { StoreProvider } from "./store/store";
import JobsList from "./features/jobsList/components/jobsList";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <JobsList/>
      </StoreProvider>
    </div>
  );
}

export default App;
