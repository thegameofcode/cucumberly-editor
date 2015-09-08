/*var Router = require('react-router');
 var Route = Router.Route;
 */

let Router = ReactRouter;
let Route = Router.Route;
let RouteHandler = Router.RouteHandler;
let DefaultRoute = Router.DefaultRoute;

let Subjects = React.createClass({
  render: () => <h2>Subjects</h2>
});

class App extends React.Component {
  render() {
    let Navbar = ReactBootstrap.Navbar;
    let Nav = ReactBootstrap.Nav;
    let NavItem = ReactBootstrap.NavItem;

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
