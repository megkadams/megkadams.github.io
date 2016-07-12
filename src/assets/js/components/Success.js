import React, { Component } from 'react'
import Icon from './Icons'

export default class Success extends Component {
	render() {
		return(
			<div className='success-container'>
				<div className="success-content-wrapper">
					<h2>You Rock!</h2>
					<p>Thanks for applying. All submissions are curated.</p>
					<p>Meanwhile, follow us on Twitter or check out the other cool ladies on 2xCode.</p>
					<a className='pill-btn rainbow-btn super-jumbo-btn' href="https://twitter.com/2xCoders" target="_blank">
						<Icon size='1.75rem' icon='post-twitter' /> Follow 2xCode on Twitter
					</a>
				</div>
			</div>
		)
	}
};
