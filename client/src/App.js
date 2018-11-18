import React, { Component } from "react";
import Terminal from "./Components/Terminal/terminal.js";
//import Header from "./Components/Header/header.js";

class App extends Component {
  render() {
    return (
      <div className="App" id="app">
        <Terminal elementRef={React.createRef()} />
      </div>
    );
  }
}

export default App;
