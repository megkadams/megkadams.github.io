// from: http://dmfrancisco.github.io/react-icons/

import React, {Component} from 'react';

export default class Icon extends Component {
  static propTypes = {
    icon: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    style: React.PropTypes.object
  }

  render() {
    const _mergeStyles = (...args) => {
      // This is the m function from "CSS in JS" and can be extracted to a mixin
      return Object.assign({}, ...args);
    };

    const renderGraphic = () => {
      switch (this.props.icon) {
        case 'check':
          return (
            <g><path d="M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z"></path></g>
          );
        case 'done-all':
          return (
            <g><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41 6.34-6.34zm4.24-1.41l-10.58 10.58-4.18-4.17-1.41 1.41 5.59 5.59 12-12-1.42-1.41zm-21.83 7.82l5.59 5.59 1.41-1.41-5.58-5.59-1.42 1.41z"></path></g>
          )
        case 'email':
          return (
            <g><path d="M20 4h-16c-1.1 0-1.99.9-1.99 2l-.01 12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0 4l-8 5-8-5v-2l8 5 8-5v2z"></path></g>
          )
        case 'gps-fixed':
          return (
            <g><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94v-2.06h-2v2.06c-4.17.46-7.48 3.77-7.94 7.94h-2.06v2h2.06c.46 4.17 3.77 7.48 7.94 7.94v2.06h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94h2.06v-2h-2.06zm-8.94 8c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>
          )
        case 'link':
          return (
            <g><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4v-1.9h-4c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9h-4c-1.71 0-3.1-1.39-3.1-3.1zm4.1 1h8v-2h-8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4v1.9h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
          )
        case 'place':
          return (
            <g><path d="M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
          )
        case 'post-github':
          return (
            <g><path d="M7.2 6.6h-.1c-.5 1.4-.2 2.3-.1 2.6-.6.7-1 1.6-1 2.6 0 3.8 2.4 4.6 4.6 4.9-.2 0-.6.2-.8.8-.4.2-1.8.7-2.6-.7 0 0-.5-.8-1.3-.9 0 0-.8 0-.1.5 0 0 .6.3.9 1.3 0 0 .5 1.7 3 1.1v3.1h5v-3.5c0-1-.4-1.5-.8-1.8 2.2-.2 4.6-1 4.6-4.8 0-1.1-.4-2-1-2.6.1-.3.4-1.2-.1-2.6 0 0-.8-.3-2.7 1-.8-.2-1.6-.3-2.5-.3-.8 0-1.7.1-2.5.3-1.4-1-2.2-1-2.6-1zm12.8 15.4h-16c-1.1 0-2-.9-2-2v-16c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2z"></path></g>
          )
        case 'post-linkedin':
          return (
            <g><path d="M20 2h-16c-1.1 0-1.99.9-1.99 2l-.01 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2zm-12 17h-3v-9h3v9zm-1.5-10.69c-1 0-1.81-.81-1.81-1.81s.81-1.81 1.81-1.81 1.81.81 1.81 1.81-.81 1.81-1.81 1.81zm12.5 10.69h-3v-5.3c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.3h-3v-9h3v1.2c.52-.84 1.59-1.4 2.5-1.4 1.93 0 3.5 1.57 3.5 3.5v5.7z"></path></g>
          )
        case 'post-twitter':
          return (
            <g><path d="M20 2h-16c-1.1 0-1.99.9-1.99 2l-.01 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2zm-2.29 7.33c-.06 4.62-3.02 7.78-7.42 7.98-1.82.08-3.14-.5-4.28-1.23 1.34.21 3.01-.32 3.9-1.09-1.32-.13-2.1-.8-2.46-1.88.38.07.78.05 1.14-.03-1.19-.4-2.04-1.13-2.08-2.67.33.15.68.29 1.14.32-.9-.5-1.55-2.35-.8-3.57 1.32 1.45 2.91 2.63 5.52 2.79-.65-2.8 3.06-4.32 4.61-2.44.66-.13 1.19-.38 1.7-.65-.21.65-.62 1.1-1.12 1.47.54-.07 1.03-.21 1.44-.41-.25.53-.81 1.01-1.29 1.41z"></path></g>
          )
        case 'star-outline':
          return (
            <g><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
          )
        default:
          return ('')

        // Add more icons here
      }
    };

    const styles = {
      fill: 'currentcolor',
      verticalAlign: 'middle',
      width: this.props.size, // CSS instead of the width attr to support non-pixel units
      height: this.props.size // Prevents scaling issue in IE
    };
    return (
      <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fit
        style={_mergeStyles(styles, this.props.style)}>
        {renderGraphic()}
      </svg>
    );
  }
}
