import React from 'react';
import BookActions from '../../actions/BookActions';
import BaseComponent from '../BaseComponent';
import Scenario from './Scenario';

import { Button } from 'react-bootstrap';

export default class ScenarioList extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('newScenario');
  }

  componentWillReceiveProps(nextProps) {
    let scenarios = nextProps.scenarios;
    this.setState({scenarios});
  }

  newScenario() {
    BookActions.createScenario(this.props.episodeId, this.props.featureId);
  }

  render() {
    let scenarioItems = this.props.scenarios.map((scenario) => {
      return (
        <Scenario key={`scenario_${scenario.id}`} scenario={scenario} episodeId={this.props.episodeId} featureId={this.props.featureId} />
      );
    });

    return (
      <div>
        <h3>Scenarios</h3>
        {scenarioItems}
        <Button onClick={this.newScenario}>New Scenario</Button>
      </div>
    );
  }
}

ScenarioList.propTypes = {
  episodeId: React.PropTypes.string.isRequired,
  featureId: React.PropTypes.string.isRequired
};
