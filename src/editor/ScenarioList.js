import React from 'react';
import books from '../db/book';
import BaseComponent from '../BaseComponent';
import Scenario from './Scenario';

import { Button } from 'react-bootstrap';

export default class ScenarioList extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('newScenario');

    this.state = {scenarios: []};
  }

  newScenario() {
    books.createScenario(this.props.episodeId, this.props.featureId, (err, scenario) => {
      let scenarios = this.state.scenarios;
      scenarios.push(scenario);
      this.setState({scenarios});
    });
  }

  loadScenarios(episodeId, featureId) {
    books.getFeature(episodeId, featureId, (err, feature) => {
      let scenarios = feature.scenarios;
      this.setState({scenarios});
    });
  }

  componentDidMount() {
    this.loadScenarios(this.props.episodeId, this.props.featureId);
  }

  componentWillReceiveProps(nextProps) {
    this.loadScenarios(nextProps.episodeId, nextProps.featureId);
  }

  render() {
    let scenarioItems = this.state.scenarios.map((scenario) => {
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
