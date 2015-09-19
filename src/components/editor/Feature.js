import React from 'react';
import BaseComponent from '../BaseComponent';
import ScenarioList from './ScenarioList';

import EditableLabel from '../ui/EditableLabel';
import BookActions from '../../actions/BookActions';

import { Col } from 'react-bootstrap';

export default class Feature extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('onFeatureChange');
  }

  onFeatureChange() {
    const episodeId = this.props.params.episodeId;
    const featureId = this.props.params.featureId;

    const featureData = {
      name: this.refs.name.getText(),
      description: {
        motivation: this.refs.motivation.getText(),
        beneficiary: this.refs.beneficiary.getText(),
        expectedBehaviour: this.refs.expectedBehaviour.getText()
      }
    };

    BookActions.saveFeature(episodeId, featureId, featureData);
  }

  render() {
    if (!this.props.book.episodes) {
      return <div>Loading...</div>;
    }

    const episodeId = this.props.params.episodeId;
    const episode = this.props.book.episodes.filter((ep) => ep.id === episodeId)[0];

    const featureId = this.props.params.featureId;
    const feature = episode.features.filter((f) => f.id === featureId)[0];

    const description = feature.description;

    return (
      <Col md={9} className='col-md-offset-3'>
        <EditableLabel ref='name' tag='h2' initialText={feature.name} defaultText='Feature name' onChange={this.onFeatureChange} />

        <p>
          <span>In order to </span><EditableLabel ref='motivation' initialText={description.motivation} onChange={this.onFeatureChange} /><br/>
          <span>As a </span><EditableLabel ref='beneficiary' initialText={description.beneficiary} onChange={this.onFeatureChange} /><br/>
          <span>I want to </span><EditableLabel ref='expectedBehaviour' initialText={description.expectedBehaviour} onChange={this.onFeatureChange} />
        </p>

        <ScenarioList episodeId={episodeId} featureId={feature.id} scenarios={feature.scenarios} />
      </Col>
    );
  }
}
