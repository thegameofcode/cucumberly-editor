import React from 'react';
import BaseComponent from '../BaseComponent';
import BookActions from '../../actions/BookActions';
import FeatureList from './FeatureList';

import { Col, Button } from 'react-bootstrap';

export default class EpisodeList extends BaseComponent {
  constructor(props) {
    super(props);

    super.bindMethods('newEpisode');
  }

  newEpisode() {
    BookActions.createEpisode();
  }

  render() {
    let episodeItems = this.props.episodes.map((episode) =>
        <FeatureList key={`episode_${episode.id}`} episode={episode} />
    );

    return (
      <Col md={3} className='episodeList'>
        <h3>Episodes</h3>
        <div>{episodeItems}</div>
        <Button onClick={this.newEpisode}>New Episode</Button>
      </Col>
    );
  }
}

EpisodeList.defaultProps = {
  episodes: []
};
