import React, { Component, PropTypes } from 'react'
import Icon from './Icons'

export default class FormInput extends Component {
	static propTypes = {
		onChangeEvent: PropTypes.func.isRequired,
    iconSize: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
    labelCopy: PropTypes.string.isRequired,
  }

	constructor(props) {
    super(props)
  }

  inputFocus(ev) {
		ev.target.parentNode.classList.add('filled')
	}

	inputBlur(ev) {
		if( ev.target.value.trim() === '' ) {
      ev.target.parentNode.classList.remove('filled')
    }
	}

	render() {
    const {
      iconSize,
      icon,
      type,
      name,
      id,
      defaultValue,
      onChangeEvent,
      labelCopy,
    } = this.props

		return(
			<div className='input-container'>
				<Icon size={iconSize} icon={icon} />
				<input
					className='input-field'
					type={type}
					name={name}
					id={id}
					defaultValue={defaultValue}
					onFocus={this.inputFocus}
					onBlur={this.inputBlur}
					onChange={onChangeEvent}
				/>
				<label
					className='input-label'
					htmlFor={id}>
					<span className='input-label-content'>
						{labelCopy}
					</span>
				</label>
			</div>
		)
	}
};
