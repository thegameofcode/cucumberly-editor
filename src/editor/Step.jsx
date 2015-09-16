import React from 'react';
import BaseComponent from '../BaseComponent';
import { Input } from 'react-bootstrap';

export default class Scenario extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('onBlur', 'onKeyUp');
  }

  onBlur() {
    let oldValue = this.props.step.data.value;
    let currValue = this.refs.stepInput.getValue();
    if (oldValue !== currValue) {
      this.props.onStepChange(this.props.step, currValue);
    }
  }

  onKeyUp(e) {
    if (e.keyCode === 13 && this.refs.stepInput.getValue() !== '') {
      this.props.onNewStep(this);
    }
  }

  getStepValue() {
    return {value: this.refs.stepInput.getValue(), table: []};
  }

  render() {
    let step = this.props.step;

    return (
        <Input type='text' label={step.label} placeholder='Enter text' defaultValue={step.data.value} ref='stepInput' onBlur={this.onBlur} onKeyUp={this.onKeyUp} />
    );
  }
}
