import React from 'react';
import BookActions from '../../actions/BookActions';
import BaseComponent from '../BaseComponent';
import EditableLabel from '../ui/EditableLabel';
import Router from 'react-router';
import { Panel, Button, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';

let { Link } = Router;

export default class FeatureList extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('newFeature', 'removeEpisode', 'onEpisodeChange');
  }

  newFeature() {
    BookActions.createFeature(this.props.episode.id);
  }

  removeEpisode() {
    BookActions.removeEpisode(this.props.episode.id);
  }

  removeFeature(episodeId, featureId) {
    BookActions.removeFeature(episodeId, featureId);
  }

  onEpisodeChange() {
    let episode = {
      id: this.props.episode.id,
      name: this.refs.episodeName.getText()
    };

    BookActions.saveEpisode(episode);
  }

  render() {
    let episodeId = this.props.episode.id;
    let featureItems = this.props.episode.features.map((feature) => {
      return (
          <ListGroupItem key={`feature_${feature.id}`}>
            <Link to='feature' params={{episodeId: episodeId, featureId: feature.id}}>{feature.name}</Link>
            <Button bsSize='xsmall' bsStyle='link' className='pull-right' onClick={() => this.removeFeature(episodeId, feature.id)}><Glyphicon glyph='remove' /></Button>
          </ListGroupItem>
      );
    });

    const header = (
        <div>
          <EditableLabel ref='episodeName' defaultText='Episode Name' initialText={this.props.episode.name} onChange={this.onEpisodeChange} />
          <Button bsSize='xsmall' className='pull-right' onClick={this.removeEpisode}><Glyphicon glyph='remove' /></Button>
        </div>
    );

    return (
      <Panel header={header}>
        <ListGroup>{featureItems}</ListGroup>
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
