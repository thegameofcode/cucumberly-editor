var ScenarioList = React.createClass({
  getInitialState() {
    return { scenarios: [] };
  },

  newScenario() {
    let scenarios = this.state.scenarios;
    scenarios.push({name: 'new scenario'});
    this.setState({scenarios});
  },

  render() {
    let Button = ReactBootstrap.Button;
    let scenarioItems = this.state.scenarios.map((scenario) => <li>{scenario.name}</li>);

    return (
      <div>
        <h3>Scenarios</h3>
        <ul>{scenarioItems}</ul>
        <Button onClick={this.newScenario}>New Scenario</Button>
      </div>
    );
  }
});

var Editor = React.createClass({
  render() {
    return (
      <div>
        <h2>Editor</h2>
        <ScenarioList />
      </div>
    );
  }
});
