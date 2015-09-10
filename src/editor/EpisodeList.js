import React from 'react';
import books from '../db/book';
import BaseComponent from '../BaseComponent';
import FeatureList from './FeatureList';

import { Col, Button } from 'react-bootstrap';

export default class EpisodeList extends BaseComponent {
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
      //episodes.push(episode); // this.state.episodes refer to same object in books, therefor push is not necessary
      this.setState({episodes});
    });
  }

  render() {
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