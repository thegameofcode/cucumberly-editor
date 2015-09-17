import React from 'react';
import { Panel, Input, Button, Glyphicon } from 'react-bootstrap';
import BaseComponent from '../BaseComponent';
import Step from './Step';
import BookActions from '../../actions/BookActions';
import EditableLabel from '../ui/EditableLabel';

export default class Scenario extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('onNewStep', 'onStepChange', 'onScenarioChange', 'removeScenario');
  }

  onScenarioChange() {
    let scenarioId = this.props.scenario.id;
    let data = { name: this.refs.name.getText() };
    BookActions.saveScenario(this.props.episodeId, this.props.featureId, scenarioId, data);
  }

  onNewStep(stepFrom) {
    let scenarioId = this.props.scenario.id;
    BookActions.createStep(this.props.episodeId, this.props.featureId, scenarioId, stepFrom.props.step.code);
  }

  onStepChange(step, newValue) {
    let scenarioId = this.props.scenario.id;
    BookActions.saveStep(this.props.episodeId, this.props.featureId, scenarioId, step.code, step.idx, newValue);
  }

  removeScenario() {
    BookActions.removeScenario(this.props.episodeId, this.props.featureId, this.props.scenario.id);
  }

  render() {
    let scenario = this.props.scenario;
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

    let headerText = (
      <div>
        <EditableLabel ref='name' initialText={scenario.name} defaultText='Scenario name' onChange={this.onScenarioChange} />
        <Button bsSize='xsmall' className='pull-right' onClick={this.removeScenario}><Glyphicon glyph='remove' /></Button>
      </div>
    );

    return (
      <Panel header={headerText}>
        <form>
          {stepUis}
        </form>
      </Panel>
    );
  }
}
