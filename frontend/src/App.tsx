import React from "react";

import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import { GlobalProviders } from "./GlobalProviders";

function App() {
  return (
    <GlobalProviders>
      <div className="App">
        <h1>Hello , World</h1>
        <Dashboard />
      </div>
    </GlobalProviders>
  );
}

export default App;
