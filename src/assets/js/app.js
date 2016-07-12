import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import NotFound from './components/NotFound';
import StorePicker from './components/About';
import App from './components/App';
import About from './components/About';
import Join from './components/Join';

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/about" component={About}/>
    <Route path="/join" component={Join}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));


// (function() {
//   if (!String.prototype.trim) {
//   (function() {
//   var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
//   String.prototype.trim = function() {
//   return this.replace(rtrim, '');
//   };
//   })();
//   }

  // [].slice.call( document.querySelectorAll( '.input-field' ) ).forEach( function( inputEl ) {
  //   // in case the input is already filled..
  //   if( inputEl.value.trim() != '' ) {
  //     inputEl.parentNode.classList.add('filled');
  //   }
  // });

  // function onInputFocus(ev) {
  //   ev.target.parentNode.classList.add('filled');
  // }
  //
  // function onInputBlur(ev) {
  //   if( ev.target.value.trim() === '' ) {
  //     ev.target.parentNode.classList.remove('filled');
  //   }
  // }
// })();


//Most recent routing app pattern
//import React from 'react'
// import ReactDOM from 'react-dom'
// import { Router, Route, IndexRoute, Link, Redirect, hashHistory } from 'react-router'
// import Gravatar from './components/Gravatar'
//
// const USERS = [
//   { id: 1, name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
//   { id: 2, name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
// ]
//
// function getUserByID(id) {
//   for (let i = 0; i < USERS.length; ++i)
//     if (USERS[i].id === parseInt(id, 10))
//       return USERS[i]
//
//   return null
// }
//
// const App = React.createClass({
//   render() {
//     return (
//       <div>
//         <h1>People Viewer</h1>
//         {this.props.children}
//       </div>
//     )
//   }
// })
//
// const Home = React.createClass({
//   render() {
//     const contactItems = USERS.map(user => (
//       <li key={user.email}>
//         <Link to={`/profile/${user.id}`}>{user.name}</Link>
//       </li>
//     ))
//
//     return (
//       <div>
//         <h2>Home</h2>
//         <ul className="people-list">{contactItems}</ul>
//       </div>
//     )
//   }
// })
//
// const Profile = React.createClass({
//   render() {
//     const { userID } = this.props.params
//     const user = getUserByID(userID)
//
//     if (user == null)
//       return <p>Cannot find user with id {userID}</p>
//
//     return (
//       <div className="profile">
//         <Gravatar email={user.email}/> {user.name}
//       </div>
//     )
//   }
// })
//
// const NoMatch = React.createClass({
//   render() {
//     return <h1>No routes matched</h1>
//   }
// })
//
// ReactDOM.render((
//   <Router history={hashHistory}>
//     <Route path="/" component={App}>
//       <IndexRoute component={Home}/>
//       <Route path="profile/:userID" component={Profile}/>
//       <Redirect from="/users/:userID" to="/profile/:userID"/>
//     </Route>
//     <Route path="*" component={NoMatch}/>
//   </Router>
// ), document.getElementById('app'))
