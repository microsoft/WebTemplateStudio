handleAddListItem(event) {
  fetch(this.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    //{[{
    body: JSON.stringify({
      text: this.state.multilineTextField
    })
    //}]}
  })