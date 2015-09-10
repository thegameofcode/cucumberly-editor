import React, { Component } from 'react';
import Router from 'react-router';

import Editor from './editor/Editor';
import Feature from './editor/Feature';
import Subjects from './subjects/Subjects';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

let { Route, RouteHandler, DefaultRoute } = Router;

class App extends Component {
  render() {
    return (
      <div>
        <Navbar brand='Cucumberly' inverse toggleNavKey={0}>
          <Nav activeKey={1}>
            <NavItem eventKey={1} href='#/editor'>Editor</NavItem>
            <NavItem eventKey={3} disabled>Subjects</NavItem>
          </Nav>
        </Navbar>
        <RouteHandler/>
      </div>
    );
  }
}

// declare our routes and their hierarchy
let routes = (
  <Route handler={App}>
    <DefaultRoute handler={Editor}/>
    <Route path='editor' handler={Editor}>
      <Route path='episode/:episodeId/feature/:featureId' handler={Feature} />
    </Route>
    <Route path='subjects' handler={Subjects}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
