import React, { Component } from "react";
import Terminal from "./Components/Terminal/terminal.js";
import Header from "./Components/Header/header.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shells: [
        {
          ref: React.createRef(),
          state: "current",
          shellRef: React.createRef()
        }
      ]
    };
  }

  render() {
    return (
      <div id="app">
        <Header
          shells={this.state.shells}
          addTerminal={this.addTerminal}
          changeCurrentShell={this.changeCurrentShell}
        />

        {this.state.shells.map(shell => {
          return <Terminal state={shell.state} elementRef={shell.shellRef} />;
        })}
      </div>
    );
  }
  componentDidMount() {
    const shells = this.state.shells;

    document.addEventListener("keydown", e => {
      const even = new Event("currentKeyDown", { bubbles: 123 });
      shells[
        shells.findIndex(element => element.state === "current")
      ].shellRef.current.dispatchEvent(even);
    });
  }
  addTerminal = () => {
    const shells = this.state.shells.concat([
      { ref: React.createRef(), state: "", shellRef: React.createRef() }
    ]);
    console.log(shells);

    this.setState({ shells });
  };

  changeCurrentShell = (ref, event) => {
    //when tab is clicked
    //get old shells

    let shells = this.state.shells;
    //modify state by first removing the old current
    shells[shells.findIndex(element => element.state === "current")].state = "";
    //then adding the new current, identifiable thanks to refs
    shells[shells.findIndex(element => element.ref === ref)].state = "current";
    console.log(shells);

    this.setState({ shells });
  };
}

export default App;
