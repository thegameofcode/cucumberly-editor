import React from 'react';
import books from '../db/book';
import BaseComponent from '../BaseComponent';
import ScenarioList from './ScenarioList';

import { Col } from 'react-bootstrap';

export default class Feature extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {feature: {name: 'Feature name', scenarios: []}};
  }

  render() {
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
