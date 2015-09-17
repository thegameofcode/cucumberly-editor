import React, { Component } from 'react';
import Router from 'react-router';

import Editor from './editor/Editor';
import Feature from './editor/Feature';
import Subjects from './subjects/Subjects';
import BookStore from '../stores/BookStore';
import BookActions from '../actions/BookActions';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

let { Route, RouteHandler, DefaultRoute } = Router;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = BookStore.getState();
    console.log('App state', this.state)
  }

  onBookStoreChange(state) {
    console.log('onBookStoreChange', state)
    this.setState(state);
  }

  componentDidMount() {
    BookStore.listen(this.onBookStoreChange.bind(this));

    BookActions.fetchBook();
  }

  componentWillUnmount() {
    BookStore.unlisten(this.onBookStoreChange.bind(this));
  }

  render() {
    if (this.state.err) {
      alert('ERROR: ' + this.state.err);
    }

    return (
      <div>
        <Navbar brand='Cucumberly' inverse fixedTop fluid toggleNavKey={0}>
          <Nav activeKey={1}>
            <NavItem eventKey={1} href='#/editor'>Editor</NavItem>
            <NavItem eventKey={3} disabled>Subjects</NavItem>
          </Nav>
        </Navbar>
        <RouteHandler book={this.state.book} />
      </div>
    );
  }
}

// declare our routes and their hierarchy
let routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Editor}/>
    <Route path='editor' handler={Editor}>
      <Route name='feature' path='episode/:episodeId/feature/:featureId' handler={Feature} />
    </Route>
    <Route path='subjects' handler={Subjects}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
