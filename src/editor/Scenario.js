import React from 'react';
import { Panel, Input } from 'react-bootstrap';
import BaseComponent from '../BaseComponent';
import Step from './Step';
import books from '../db/book';

export default class Scenario extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('onNewStep', 'onStepChange');

    this.state = {
      scenario: props.scenario
    };
  }

  onNewStep(stepFrom) {
    let scenarioId = this.state.scenario.id;
    books.addStep(this.props.episodeId, this.props.featureId, scenarioId, stepFrom.props.step.code, (err, scenario) => {
      if (err) return alert('Error saving scenario');
      this.setState({ scenario: scenario })
    });
  }

  onStepChange(step, newValue) {
    let scenarioId = this.state.scenario.id;
    books.setScenarioStepVal(this.props.episodeId, this.props.featureId, scenarioId, step.code, step.idx, newValue, (err, scenario) => {
      if (err) return alert('Error saving scenario');
      this.setState({ scenario: scenario })
    });
  }

  render() {
    let scenario = this.state.scenario;
    let stepNames = ['Given', 'When', 'Then'];
    let stepUis = [];

    let idx;
    stepNames.forEach((stepName) => {
      idx = 0;
      scenario.steps[stepName.toLowerCase()].forEach((stepData) => {
        let step = {idx: idx, code: stepName.toLowerCase(), data: stepData, label: (idx === 0) ? stepName : 'And'};
        stepUis.push(<Step key={step.code + '_' + idx} step={step} onNewStep={this.onNewStep} onStepChange={this.onStepChange} />);
        idx++;
      });
    });

    return (
      <Panel header={scenario.name}>
        <form>
          {stepUis}
        </form>
      </Panel>
    );
  }
}
