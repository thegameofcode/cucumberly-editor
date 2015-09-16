import React from 'react';
import Router from 'react-router';
import BaseComponent from '../BaseComponent';
import EpisodeList from './EpisodeList';

import { Col } from 'react-bootstrap';

let { RouteHandler } = Router;

export default class Editor extends BaseComponent {
  render() {
    return (
      <Col md={12}>
        <EpisodeList episodes={this.props.book.episodes} />
        <RouteHandler book={this.props.book} />
      </Col>
    );
  }
}
