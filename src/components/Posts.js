import React, { PropTypes, Component } from 'react';

export default class Posts extends Component {
  render () {
    return (
      <b>{this.props.posts}</b>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.string.isRequired
};
