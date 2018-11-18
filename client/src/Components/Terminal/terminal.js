import React from "react";
import "./terminal.css";
class Terminal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      command: "",
      lines: [{ text: [], class: "" }]
    };
    this.element = this.props.elementRef;
  }

  render() {
    return (
      <div className={"wrapper " + this.props.state} ref={this.element}>
        <div className="terminal">
          {this.state.lines.map(line => (
            <p className={line.class}>{line.text}</p>
          ))}
          <p className="command">
            {this.state.command}
            <span className="selected">&nbsp;</span>
          </p>
          <input type="text" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.element);

    this.element.current.addEventListener("currentKeyDown", this.onKeyDown);
    this.element.current.addEventListener("currentKeyPress", this.onKeyPress);
  }

  componentDidUpdate() {
    this.element.current.scrollTop = this.element.current.scrollHeight;
  }

  onKeyPress = event => {
    switch (event.keyCode) {
      case 13: //enter
        this.runCommand(this.state.command);
        this.setState({
          lines: this.state.lines.concat([
            {
              text: [this.state.command],
              class: "command"
            }
          ]),
          command: ""
        });

        break;

      default:
        this.setState({
          command: this.state.command + String.fromCharCode(event.keyCode)
        });
        break;
    }
  };

  onKeyDown = even => {
    console.log("asd" + even.bubbles);
    /* if (event.keyCode === 8 && this.state.command.length > 0) {
      //backspace
      this.setState({
        command: this.state.command.slice(0, this.state.command.length - 1)
      });
    }*/
  };

  runCommand = command => {
    fetch("http://localhost:3000/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commands: command })
    })
      .then(res => res.json())
      .then(json => {
        const result = json.result.reduce(
          (totalLines, lines) => totalLines.concat({ text: lines.split("\n") }),
          []
        );
        this.setState({ lines: this.state.lines.concat(result) });
      });
  };
}

export default Terminal;
