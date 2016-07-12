import React, { Component } from 'react'
import Header from './Header'
import Icon from './Icons'

export default class About extends Component {
	render() {
		return(
			<div className='wrapper'>
				<Header/>
	 			<div className='outer-container about-container clearfix'>
					<div className='about-content-wrapper'>
						<h2>This is a directory of women who are 2x amazing in tech. We want to:</h2>
						<div className='split-content tri-split'>
							<div className='split-block'>
								<Icon size='5rem' icon='post-twitter' />
								<p>Recognize amazing women</p>
							</div>
							<div className='split-block'>
								<Icon size='5rem' icon='post-twitter' />
								<p>Inspire people looking for role models</p>
							</div>
							<div className='split-block'>
								<Icon size='5rem' icon='post-twitter' />
								<p>Show off!</p>
							</div>
						</div>
						<p>2xCode started in the "Ladies Room" Slack channel at work. We wanted to give female role models more recognition and were stumped by the lack of resources we could point to whenever we were asked, "What about the women in tech?" And 2xCode was created.</p>
						<p>2xCode refers to women having ff2 X chromosomes (witty, we know). But it's also our way to show that women in tech are also 2x amazing.</p>
						<p className='centered'>- Cait, Leah, Katie, Kitkat, Mariann, Meg, and Shaneeza</p>
						<a className='pill-btn rainbow-btn super-jumbo-btn' href='https://twitter.com/2xCoders' target='_blank'>
							<Icon size='1.75rem' icon='post-twitter' /> Follow 2xCode on Twitter
						</a>
					</div>
				</div>
			</div>
		)
	}
};
