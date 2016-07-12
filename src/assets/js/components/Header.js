import React, { Component } from 'react';

export default class Header extends Component {
	render() {
		return(
			<header className="main-header">
				<a className="main-header-logo" href="/">2xCode</a>
				<nav className="main-header-navigation">
					<a href="/about">What's This?</a>
					<a href="/join">Join</a>
				</nav>
			</header>   
		)
	}
}; 