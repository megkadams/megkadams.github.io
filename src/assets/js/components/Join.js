import React, { Component, PropTypes } from 'react';
import JoinForm from './JoinForm';
import Preview from './Preview';
import Success from './Success';
import Header from './Header';
import h from '../helpers';
import sampleData from '../sample-data'
import Icon from './Icons'

export default class Join extends Component {
	constructor(props) {
    super(props)
		this.handleFormInput = this.handleFormInput.bind(this)
    this.state = {
    	ladies : sampleData,
			lady : {
				name: '',
	      image: '',
	      desc: '',
	      email: '',
	      location: '',
	      categories: h.getRadioOrCheckboxValue(document.querySelectorAll('input[name="categories"]')),
	      portfolio: '',
	      linkedin: '',
	      github: '',
	      twitter: ''
			},
    	step: 1
    };
  }

	addToPreview(lady){
    this.setState({
			lady : this.state.lady
		})
	}

	addToLadies(event){
		event.preventDefault();
		const newLady = this.state.lady
		const ladies = this.state.ladies
		ladies.push(newLady)
    this.setState({
      ladies: ladies,
    })
    this.nextStep();
	}

	handleFormInput(e, inputField, inputValue) {
		let lady = this.state.lady
		lady[inputField] = inputValue
    this.setState({
			lady : lady
		})
	}

	nextStep(){
    this.setState({
      step : this.state.step + 1
    })
  }

  previousStep() {
    this.setState({
      step : this.state.step - 1
    })
  }


	showStep() {
    switch (this.state.step) {
      case 1:
        return (
					<div>
						<ul className="qualifications-list">
							<li>You are a kickass woman <Icon size='2rem' icon='check' /></li>
							<li>You have 2x the talent and walk the talk <Icon size='2rem' icon='check' /></li>
							<li>You work in tech or science <Icon size='2rem' icon='check' /></li>
						</ul>
	        	<JoinForm
							lady={this.state.lady}
							onUserInput={(e) => this.handleFormInput(e, e.target.name, e.target.value)}
							nextStep={this.nextStep.bind(this)} previousStep={this.previousStep.bind(this)} addToPreview={this.addToPreview.bind(this)}
						/>
					</div>
				)
      case 2:
        return (
        	<Preview
						lady={this.state.lady}
						previousStep={this.previousStep.bind(this)}
						addToLadies={this.addToLadies.bind(this)}
					/>
				)
      case 3:
        return <Success />
    }
  }

	render() {
 		return (
			<div className="wrapper">
				<Header/>
	 			<div className="outer-container join-container clearfix">
					{this.showStep()}
				</div>
			</div>
		)
	}
};
