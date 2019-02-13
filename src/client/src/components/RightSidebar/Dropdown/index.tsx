import * as React from "react";

import styles from "./styles.module.css";

class Dropdown extends React.Component {
    public state = {
        selected: "Full Stack Web Application",
        showOptions: false,
        options: [
            "Full Stack Web Application",
            "RESTful API",
        ]
    }
    public expandDropdown(e: any) {
        if (this.state.showOptions) {
            this.setState({
                ...this.state,
                showOptions: false,
            })
        } else {
            this.setState({
                ...this.state,
                showOptions: true,
            })
        }
    }
    public render() {
        return(
            <div>
                Project Type
                <div className={styles.selected} onClick={this.expandDropdown.bind(this)}>
                    {this.state.selected}
                </div>
                {
                    this.state.showOptions && this.state.options.map((option) => <li>{option}</li>)
                }
            </div>
        )
    }
}

export default Dropdown;