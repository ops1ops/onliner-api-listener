import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      name: '',
      msg: '',
    };
  }

  handleButtonClick = () => {
    const { name } = this.state;
    if (name.length > 0) {
      this.setState({
        msg: `Your name has ${name.length} characters including space`,
      });
    }
  };

  handleTextChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleReset = () => {
    this.setState({ name: '', msg: '' });
  };
  // End Handlers

  render() {
    const { name } = this.state;
    let { msg } = this.state;
    if (msg !== '') {
      msg = <p>{msg}</p>;
    } else {
      msg = '';
    }
    return (

      <div>
        <span>Your name:: </span>
        <input
          type="text"
          id="txtName"
          name="txtName"
          value={name}
          onChange={this.handleTextChange}
        />
        <button type="button" id="btnSubmit" onClick={this.handleButtonClick}>
          Calculate Name Length
        </button>
        <button type="button" id="btnReset" onClick={this.handleReset}>
          Reset All
        </button>
        <hr />
        {msg}
      </div>
    );
  }
}
