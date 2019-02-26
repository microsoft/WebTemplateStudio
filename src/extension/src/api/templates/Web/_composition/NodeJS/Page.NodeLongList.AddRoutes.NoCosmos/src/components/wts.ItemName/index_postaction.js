class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      WarningMessageOpen: false,
      WarningMessageText: ""
    };

    //{[{
    this._id = 3;
    //}]}
    this.endpoint = "/api/wts.ItemNameItems";
    this.handleWarningClose = this.handleWarningClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddListItem = this.handleAddListItem.bind(this);
  }

  handleAddListItem(event) {
    fetch(this.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //{[{
      body: JSON.stringify({
      text: this.state.multilineTextField,
      _id: this._id
      })
      //}]}
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result =>
        this.setState(prevState => ({
          list: [result, ...prevState.list],
          multilineTextField: ""
        }))
      )
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `Request to add list item failed: ${error}`
        })
      );

    //{[{
    this._id++;
    //}]}
  }