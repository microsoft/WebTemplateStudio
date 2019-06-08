import React, {Component} from 'react';

export default class ListForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      textField: ""
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAddListItem(this.state.textField);
    this.setState({textField: ""});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="input-group my-3">
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.textField}
          name="textField"
          className="form-control"
          placeholder="Add text here..."
          aria-label="Add text here..."
        />
        <button type="submit" className="btn btn-primary ml-2">
          Submit
        </button>
      </form>
    );
  }
}