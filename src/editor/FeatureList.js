import React from 'react';
import books from '../db/book';
import BaseComponent from '../BaseComponent';

import { Panel, Button } from 'react-bootstrap';

export default class FeatureList extends BaseComponent {
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
