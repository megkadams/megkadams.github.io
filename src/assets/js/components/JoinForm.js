import React, { Component, PropTypes } from 'react';
import h from '../helpers';
import Icon from './Icons';
import classNames from 'classnames'
import FormInput from './FormInput'
import Dropzone from 'react-dropzone'

export default class JoinForm extends Component {
	static propTypes = {
    onUserInput: PropTypes.func.isRequired,
		nextStep: PropTypes.func.isRequired,
		previousStep: PropTypes.func.isRequired,
		addToPreview: PropTypes.func.isRequired,
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
		this.state = {
			imageFiles: []
		}
  }

	componentDidMount() {
		[].slice.call(document.querySelectorAll('input.input-field') ).forEach( function(inputEl) {
			if(inputEl.value.trim() != '') {
				inputEl.parentNode.classList.add('filled')
			}
		})
	}

	seePreview(event){
		event.preventDefault()
    this.props.addToPreview(this.state)
    this.props.nextStep()
	}

	camelize(str) {
		return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
	    return index == 0 ? letter.toLowerCase() : letter.toUpperCase()
	  }).replace(/\s+/g, '')
	}

	handleCheckboxChange(event) {
    this.setState({
      TODO: event.target.checked
    })
  }

	renderOptions(type, name, value, index) {
		var details = this.props.lady
    var isChecked = function() {
      if (type == 'radio')
				return value == this.props.lady[name]

      if (type == 'checkbox')
				return this.props.lady[name].indexOf(value) >= 0

      return false
    }.bind(this);

    return (
			<span className='checkbox-container' key={index}>
	      <input
					type={type}
					name={name}
					id={this.camelize(value)}
					defaultValue={value}
					defaultChecked={isChecked()} />
				<label htmlFor={this.camelize(value)}>{value}</label>
			</span>
    )
  }

	onDrop(imageFiles) {
		this.setState({
      imageFiles: imageFiles
    })
		console.log(this.state.imageFiles)
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

		const imageUploadStyle = this.state.imageFiles.length > 0 ? {
		  backgroundImage: 'url(' + this.state.imageFiles[0].preview + ')'
		} : { backgroundImage: '' }

		return(
			<form className='join-form' ref='joinForm' autoComplete='off'>
				<FormInput
					iconSize='2rem'
					icon='star-outline'
					type='text'
					name='name'
					id='ladyName'
					defaultValue={name}
					onChangeEvent={(e) => this.props.onUserInput(e, e.target.name, e.target.value)}
					labelCopy='Your name*'
				/>
				<FormInput
					iconSize='2rem'
					icon='star-outline'
					type='text'
					name='desc'
					id='ladyDesc'
					defaultValue={desc}
					onChangeEvent={(e) => this.props.onUserInput(e, e.target.name, e.target.value)}
					labelCopy='Short bio* (150 characters)'
				/>
				<FormInput
					iconSize='2rem'
					icon='email'
					type='text'
					name='email'
					id='ladyEmail'
					defaultValue={desc}
					onChangeEvent={(e) => this.props.onUserInput(e, e.target.name, e.target.value)}
					labelCopy='Email*'
				/>
				<FormInput
					iconSize='2rem'
					icon='gps-fixed'
					type='text'
					name='location'
					id='ladyLocation'
					defaultValue={location}
					onChangeEvent={(e) => this.props.onUserInput(e, e.target.name, e.target.value)}
					labelCopy='Location*'
				/>

				<Dropzone
					onDrop={this.onDrop.bind(this)}
					className='dropzone'
					activeClassName='active-dropzone'
					multiple={false}
					style={imageUploadStyle}>
          {this.state.imageFiles.length === 0 ? <div>Drag and drop or click to select a 550x550px file to upload.</div> : null}
        </Dropzone>

				<div className='input-container checkbox-group'>
				  <span className='faux-label'>Select the tags that apply to you:</span><br/>
				  {['Development', 'Engineering', 'Entrepreneurship', 'Management', 'Product Design'].map(this.renderOptions.bind(this, 'checkbox', 'categories'))}
				</div>

				<FormInput
					iconSize='2rem'
					icon='link'
					type='text'
					name='portfolio'
					id='ladyPortfolio'
					defaultValue={portfolio}
					onChangeEvent={(e) => this.props.onUserInput(e, e.target.name, e.target.value)}
					labelCopy='Portfolio URL*'
				/>
				<FormInput
					iconSize='2rem'
					icon='post-linkedin'
					type='text'
					name='linkedin'
					id='ladyLinkedIn'
					defaultValue={linkedin}
					onChangeEvent={(e) => this.props.onUserInput(e, e.target.name, e.target.value)}
					labelCopy='LinkedIn*'
				/>
				<FormInput
					iconSize='2rem'
					icon='post-github'
					type='text'
					name='github'
					id='ladyGithub'
					defaultValue={github}
					onChangeEvent={(e) => this.props.onUserInput(e, e.target.name, e.target.value)}
					labelCopy='Github'
				/>
				<FormInput
					iconSize='2rem'
					icon='post-twitter'
					type='text'
					name='twitter'
					id='ladyTwitter'
					defaultValue={twitter}
					onChangeEvent={(e) => this.props.onUserInput(e, e.target.name, e.target.value)}
					labelCopy='Twitter'
				/>

				<button
					onClick={this.seePreview.bind(this)}
					className='pill-btn pull-right'>Next
				</button>
			</form>
		)
	}
};
