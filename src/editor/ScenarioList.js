import React from 'react';
import books from '../db/book';
import BaseComponent from '../BaseComponent';

import { Panel, Button, Input } from 'react-bootstrap';

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
        <Panel header={scenario.name}>
          <form>
            <Input type='text' label='Given' placeholder='Enter text' />
            <Input type='text' label='When' placeholder='Enter text' />
            <Input type='text' label='Then' placeholder='Enter text' />
          </form>
        </Panel>
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
