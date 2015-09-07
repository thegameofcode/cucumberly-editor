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
    let Button = ReactBootstrap.Button;
    let episodeItems = this.state.episodes.map((episode) =>
        <FeatureList episode={episode} />
    );

    return (
      <div>
        <h3>Episodes</h3>
        <div>{episodeItems}</div>
        <Button onClick={this.newEpisode}>New Episode</Button>
      </div>
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
    let featureItems = this.state.features.map((feature) => {
      return <li><a href={'#/editor/episode/' + this.props.episode.id + '/feature/' + feature.id}>{feature.name}</a></li>
    });

    return (
      <div>
        <h3>Features</h3>
        <ul>{featureItems}</ul>
        <span>{this.props.episode.name}</span>
        <Button onClick={this.newFeature}>New Feature</Button>
      </div>
    );
  }
}

FeatureList.propTypes = {
  episode: React.PropTypes.object.isRequired
};

class Feature extends BaseComponent {
  constructor(props) {
    super(props);
    var featureId = this.props.params.featureId;
    this.state = {feature: {id: featureId, name: 'Feature name', scenarios: []}};
  }

  render() {
    return (
      <div>
        <h3>Feature {this.state.feature.id}</h3>
      </div>
    );
  }
}

/*let ScenarioList = React.createClass({
  getInitialState() {
    return {scenarios: []};
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
});*/

let Editor = React.createClass({
  render() {
    return (
      <div>
        <h2>Editor</h2>
        <EpisodeList />
        <RouteHandler/>
      </div>
    );
  }
});
