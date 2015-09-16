import React from 'react';
import books from '../db/book';
import BaseComponent from '../BaseComponent';
import FeatureList from './FeatureList';

import { Col, Button } from 'react-bootstrap';

export default class EpisodeList extends BaseComponent {
  constructor(props) {
    super(props);

    super.bindMethods('newEpisode');
  }

  newEpisode() {
    books.createEpisode((err, episodes) => {
      this.setState({episodes});
    });
  }

  render() {
    let episodeItems = this.props.episodes.map((episode) =>
        <FeatureList key={`episode_${episode.id}`} episode={episode} />
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

EpisodeList.defaultProps = {
  episodes: []
};
