import React, { Component } from "react";

//input liked: boolean
//Output: onClick

class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) {
      classes += "-o";
    }
    return (
      <i
        style={{ cursor: "pointer" }}
        onClick={this.props.onClickToggle}
        className={classes}
        aria-hidden="true"
      />
    );
  }
}

export default Like;
