import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class Layout extends Component {
  state = { activeItem: "posts" };

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name }, () => {
      if (this.state.activeItem === "users") {
        this.props.history.push("/users");
      } else {
        this.props.history.push("/");
      }
    });

  render() {
    const { activeItem } = this.state;
    const { children } = this.props;
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="posts"
            active={activeItem === "posts"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="users"
            active={activeItem === "users"}
            onClick={this.handleItemClick}
          />
        </Menu>

        <Segment>{children}</Segment>
      </div>
    );
  }
}
export default withRouter(Layout);
