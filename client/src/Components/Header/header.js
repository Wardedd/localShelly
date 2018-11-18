import React from "react";
import "./header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <div className="tabContainer">
          {this.props.shells.map(shell => (
            <div
              className={"tab " + shell.state}
              ref={shell.ref}
              onClick={this.props.changeCurrentShell.bind(this, shell.ref)}
            >
              Shell
            </div>
          ))}
        </div>
        <button onClick={this.props.addTerminal}>+</button>
      </header>
    );
  }
}

export default Header;
