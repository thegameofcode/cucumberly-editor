let books = new BookDb();

class BaseComponent extends React.Component {
  bindMethods(...methods) {
    methods.forEach((method) => this[method] = this[method].bind(this)); // TODO using reflection bind all methods
  }
}

class EpisodeList extends BaseComponent {
  constructor(props) {
    super(props);

    super.bindMethods('newEpisode');
    this.state = {episodes: []};

    books.loadBook((err, book) => {
      if (err) return alert('Error loading book');
      this.setState({episodes: book.episodes});
    });
  }

  newEpisode() {
    books.createEpisode((err, episode) => {
      let episodes = this.state.episodes;
      //episodes.push(episode); // this.state.episodes refer to same object in books, therefor push is not neccesary
      this.setState({episodes});
    });
  }

  render() {
    let Col = ReactBootstrap.Col;
    let Button = ReactBootstrap.Button;
    let episodeItems = this.state.episodes.map((episode) =>
        <FeatureList episode={episode} />
    );

    return (
      <Col md={3}>
        <h3>Episodes</h3>
        <div>{episodeItems}</div>
        <Button onClick={this.newEpisode}>New Episode</Button>
      </Col>
    );
  }
}

class FeatureList extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('newFeature');

    this.state = {features: props.episode.features};
  }

  newFeature() {
    books.createFeature(this.props.episode.id, (err, episode) => {
      let features = this.state.features;
      //features.push({name: 'new feature'});
      this.setState({features});
    });
  }

  render() {
    let Button = ReactBootstrap.Button;
    let Panel = ReactBootstrap.Panel;

    let featureItems = this.state.features.map((feature) => {
      return <li><a href={'#/editor/episode/' + this.props.episode.id + '/feature/' + feature.id}>{feature.name}</a></li>
    });

    const title = (
      <h3>{this.props.episode.name}</h3>
    );

    return (
      <Panel header={title}>
        <ul>{featureItems}</ul>
        <Button onClick={this.newFeature}>New Feature</Button>
      </Panel>
    );
  }
}

FeatureList.propTypes = {
  episode: React.PropTypes.object.isRequired
};

class Feature extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {feature: {name: 'Feature name', scenarios: []}};
  }

  render() {
    let Col = ReactBootstrap.Col;

    let episodeId = this.props.params.episodeId;
    let featureId = this.props.params.featureId;

    return (
      <Col md={8}>
        <h3>{this.state.feature.name}</h3>
        <ScenarioList episodeId={episodeId} featureId={featureId} />
      </Col>
    );
  }
}

class ScenarioList extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('newScenario');

    this.state = {scenarios: []};
    books.getFeature(this.props.episodeId, this.props.featureId, (err, feature) => {
      let scenarios = feature.scenarios;
      this.setState({scenarios});
    });
  }

  newScenario() {
    books.createScenario(this.props.episodeId, this.props.featureId, (err, scenario) => {
      let scenarios = this.state.scenarios;
      scenarios.push(scenario);
      this.setState({scenarios});
    });
  }

  render() {
    let Button = ReactBootstrap.Button;
    let Panel = ReactBootstrap.Panel;
    let Input = ReactBootstrap.Input;

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
  scenarioId: React.PropTypes.string.isRequired
};

class Editor extends React.Component {
  render() {
    let Col = ReactBootstrap.Col;

    return (
      <Col md={12}>
        <EpisodeList />
        <RouteHandler/>
      </Col>
    );
  }
}
