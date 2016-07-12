import React, { Component, PropTypes } from 'react'
import PersonView from './PersonView'
import Icon from './Icons'

export default class Preview extends Component {
	static propTypes = {
		previousStep: PropTypes.func.isRequired,
		addToLadies: PropTypes.func.isRequired,
    lady: PropTypes.shape({
			name: PropTypes.string.isRequired,
			image: PropTypes.string.isRequired,
			desc: PropTypes.string.isRequired,
			email: PropTypes.string.isRequired,
			location: PropTypes.string.isRequired,
			categories: PropTypes.array.isRequired,
			portfolio: PropTypes.string.isRequired,
			linkedin: PropTypes.string.isRequired,
			github: PropTypes.string.isRequired,
			twitter: PropTypes.string.isRequired,
    }).isRequired,
  }

	constructor(props) {
    super(props)
  }

	goBack(event){
		event.preventDefault()
		this.props.previousStep()
	}

	render() {
		const {
			name,
      image,
      desc,
      email,
      location,
      categories,
      portfolio,
      linkedin,
      github,
      twitter,
		} = this.props.lady

		let style = {
			fill: '#818181'
		}

		return(
			<div className='preview-container'>
				<h6>Your profile view:</h6>
				<div className='card-item'>
					<div className='card-item-image'></div>
					<div className='card-item-copy-container'>
						<h2 className='card-item-name'>{name}</h2>
						<div className='card-item-location'>
							<Icon size='1.5rem' style={style} icon='place' />{location}
						</div>
						<p className='card-item-decs'>{desc}</p>
						<ul className='icon-list'>
							<li className='card-item-portfolio'>
								<a href='{portfolio}' target='_blank'>
									<Icon size='1.5rem' style={style} icon='link' />
								</a>
							</li>
							<li className='card-item-linkedin'>
								<a href='{dinkedin}' target='_blank'>
									<Icon size='1.5rem' style={style} icon='post-linkedin' />
								</a>
							</li>
							<li className='card-item-github'>
								<a href='{github}' target='_blank'>
									<Icon size='1.5rem' style={style} icon='post-github' />
								</a>
							</li>
							<li className='card-item-twitter'>
								<a href='{twitter}' target='_blank'>
									<Icon size='1.5rem' style={style} icon='post-twitter' />
								</a>
							</li>
						</ul>
						<div className='card-item-categories'>{categories.join(', ')}</div>
					</div>
				</div>

				<div className='form-button-container'>
					<button
						className='pill-btn jumbo-btn'
						onClick={this.goBack.bind(this)}>Edit
					</button>
					<button
						className='pill-btn rainbow-btn jumbo-btn'
						type='submit'
						onClick={this.props.addToLadies}>Submit
					</button>
				</div>
			</div>
		)
	}
};
