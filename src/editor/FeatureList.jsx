import React from 'react';
import BookActions from '../actions/BookActions';
import BaseComponent from '../BaseComponent';
import Router from 'react-router';
import { Panel, Button } from 'react-bootstrap';

let { Link } = Router;

export default class FeatureList extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('newFeature');
  }

  newFeature() {
    BookActions.createFeature(this.props.episode.id);
  }

  render() {

    let featureItems = this.props.episode.features.map((feature) => {
      return <li key={`feature_${feature.id}`}><Link to='feature' params={{episodeId: this.props.episode.id, featureId: feature.id}}>{feature.name}</Link></li>
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

FeatureList.defaultProps = {
  episode: {id:'', features: []}
};
