import React from 'react';
import BaseComponent from '../BaseComponent';
import StepTable from './StepTable';
import { Input } from 'react-bootstrap';

export default class Scenario extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('onBlur', 'onKeyUp', 'updateStep');
  }

  onBlur() {
    let oldValue = this.props.step.data.value;
    let currValue = this.refs.stepInput.getValue();
    if (oldValue !== currValue) {
      this.updateStep();
    }
  }

  onKeyUp(e) {
    if (e.keyCode === 13 && this.refs.stepInput.getValue() !== '') {
      this.props.onNewStep(this);
    }
  }

  updateStep() {
    let step = this.props.step;
    let value = this.refs.stepInput.getValue();
    let table = this.refs.table.getValue();
    this.props.onStepChange(step.code, step.idx, {value, table});
  }

  render() {
    let step = this.props.step;

    return (
        <div>
          <Input type='text' label={step.label} placeholder='Enter text' defaultValue={step.data.value} ref='stepInput' onBlur={this.onBlur} onKeyUp={this.onKeyUp} />
          <StepTable ref='table' table={step.data.table} onTableChange={this.updateStep} />
        </div>
    );
  }
}
