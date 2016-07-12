import React, { Component, PropTypes } from 'react'
import PersonView from './PersonView'
import Header from './Header'
import sampleData from '../sample-data'

export default class App extends Component {
	constructor(props) {
    super(props)
    this.state = {
    	ladies : sampleData
    };
  }

	render() {
		const ladies = this.state.ladies
		return(
			<div className='wrapper'>
				<Header/>
				<div className='outer-container homepage-container clearfix'>
					<ul className='card-items'>
						{ladies.map(lady => {
							return (
								<PersonView
									key={lady.name}
									lady={lady}
								/>
							)
						})}
					</ul>
				</div>
			</div>
		)
	}
};
