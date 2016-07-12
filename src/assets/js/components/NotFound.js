import React, { Component } from 'react';
import Header from './Header';

export default class NotFound extends Component {
	render() {
		return(
			<div className="wrapper">
				<Header/>
	 			<div className="outer-container error-container clearfix">
					<h1>Not Found</h1>
				</div>
			</div>
		)
	}

};
