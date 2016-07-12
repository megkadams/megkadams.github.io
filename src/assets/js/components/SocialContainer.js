import React, { Component, PropTypes } from 'react'
import Icon from './Icons'


export default class SocialContainer extends Component {
	static propTypes = {
		portfolio: PropTypes.string.isRequired,
		linkedin: PropTypes.string.isRequired,
		github: PropTypes.string.isRequired,
		twitter: PropTypes.string.isRequired,
  }

	constructor(props) {
    super(props)
  }

	ifExists(platformLink, icon){
		if (platformLink != '') {
			return (
				<li className='card-item-portfolio'>
					<a href={platformLink} target='_blank'>
						<Icon size='1.5rem' icon={icon} />
					</a>
				</li>
			)
		}
	}

	render() {
		const {
      portfolio,
      linkedin,
      github,
      twitter,
		} = this.props

		return(
      <ul className='card-item-social-container'>
	      {this.ifExists(portfolio, 'link')}
	      {this.ifExists(linkedin, 'post-linkedin')}
	      {this.ifExists(github, 'post-github')}
	      {this.ifExists(twitter, 'post-twitter')}
      </ul>
		)
	}

};
