import React from 'react';
import books from '../db/book';
import BaseComponent from '../BaseComponent';
import ScenarioList from './ScenarioList';

import EditableLabel from '../ui/EditableLabel';

import { Col } from 'react-bootstrap';

export default class Feature extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('onFeatureChange');
  }

  loadFeature(episodeId, featureId) {
    books.getFeature(episodeId, featureId, (err, feature) => {
      this.setState({feature});
    });
  }

  componentDidMount() {
    this.loadFeature(this.props.params.episodeId, this.props.params.featureId);
  }

  componentWillReceiveProps(nextProps) {
    this.loadFeature(nextProps.params.episodeId, nextProps.params.featureId);
  }

  onFeatureChange() {
    let episodeId = this.props.params.episodeId;
    let featureId = this.props.params.featureId;

    let featureData = {
      name: this.refs.name.getText(),
      description: {
        motivation: this.refs.motivation.getText(),
        beneficiary: this.refs.beneficiary.getText(),
        expectedBehaviour: this.refs.expectedBehaviour.getText()
      }
    };

    books.updateFeature(episodeId, featureId, featureData, (err, feature) => {
      if (err) return alert('Error saving feature');
      this.setState({feature});
    });
  }

  render() {
    let episodeId = this.props.params.episodeId;
    let episode = this.props.book.episodes.filter((episode) => episode.id === episodeId)[0];

    let featureId = this.props.params.featureId;
    let feature = episode.features.filter((feature) => feature.id === featureId)[0];

    let description = feature.description;

    return (
      <Col md={8}>
        <EditableLabel ref='name' tag='h2' initialText={feature.name} defaultText='Feature name' onChange={this.onFeatureChange} />

        <p>
          <span>In order to </span><EditableLabel ref="motivation" initialText={description.motivation} onChange={this.onFeatureChange} /><br/>
          <span>As a </span><EditableLabel ref="beneficiary" initialText={description.beneficiary} onChange={this.onFeatureChange} /><br/>
          <span>I want to </span><EditableLabel ref="expectedBehaviour" initialText={description.expectedBehaviour} onChange={this.onFeatureChange} />
        </p>

        <ScenarioList episodeId={episodeId} featureId={feature.id} scenarios={feature.scenarios} />
      </Col>
    );
  }
}
