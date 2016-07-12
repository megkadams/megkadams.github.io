import React, { Component, PropTypes } from 'react'
import SocialContainer from './SocialContainer'


export default class PersonView extends Component {
	static propTypes = {
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

		return(
			<li className='card-item'>
        <div className='card-item-image'></div>
        <div className='card-item-copy-container'>
          <h2 className='card-item-name'>{name}</h2>
          <div className='card-item-location'>{location}</div>
          <p className='card-item-decs'>{desc}</p>
          <SocialContainer
						portfolio={portfolio}
						linkedin={linkedin}
						github={github}
						twitter={twitter}
					/>
          <div className='card-item-categories'>{categories.join(', ')}</div>
        </div>
      </li>
		)
	}

};
