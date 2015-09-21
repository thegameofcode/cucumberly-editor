import React, { Component } from 'react';
import Router from 'react-router';

import bookManager from '../manager/book';

import Editor from './editor/Editor';
import Feature from './editor/Feature';
import Subjects from './subjects/Subjects';
import BookStore from '../stores/BookStore';
import BookActions from '../actions/BookActions';

import { Button, Navbar, Nav, NavItem, Modal } from 'react-bootstrap';

let { Route, RouteHandler, DefaultRoute } = Router;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = BookStore.getState();
    this.state.showSaveModal = false;
  }

  onBookStoreChange(state) {
    this.setState(state);
  }

  componentDidMount() {
    this.refs.dirChooser.getDOMNode().setAttribute('nwdirectory', true);

    BookStore.listen(this.onBookStoreChange.bind(this));
    BookActions.fetchBook();
  }

  componentWillUnmount() {
    BookStore.unlisten(this.onBookStoreChange.bind(this));
  }

  saveBookChanges() {
    let dirChooser = this.refs.dirChooser.getDOMNode();
    dirChooser.value = null;
    dirChooser.dispatchEvent(new Event('click'));
  }

  hideSaveModal() {
    this.setState({showSaveModal: false});
  }

  showSaveModal() {
    this.setState({showSaveModal: true});
  }

  onDirSelected() {
    this.hideSaveModal();

    let dirPath = this.refs.dirChooser.getDOMNode().value;
    bookManager.saveBook(dirPath, this.state.book);
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
          <Nav right>
            <NavItem onClick={this.showSaveModal.bind(this)}>Save version</NavItem>
          </Nav>
        </Navbar>
        <RouteHandler book={this.state.book} />

        <Modal show={this.state.showSaveModal} onHide={this.hideSaveModal.bind(this)}>
          <Modal.Header>
            <Modal.Title>Save version</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Do you really want save the changes as a new version?
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.hideSaveModal.bind(this)}>Close</Button>
            <Button bsStyle="primary" onClick={this.saveBookChanges.bind(this)}>Save changes</Button>
          </Modal.Footer>

        </Modal>

        <input ref='dirChooser' onChange={this.onDirSelected.bind(this)} style={{display: 'none'}} type='file' />
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
