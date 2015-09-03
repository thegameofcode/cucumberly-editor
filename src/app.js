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

let App = React.createClass({
	render () {
		return (
			<div>
				<h1>App</h1>
				<RouteHandler/>
			</div>
		)
	}
});

// declare our routes and their hierarchy
let routes = (
	<Route handler={App}>
		<DefaultRoute handler={Editor}/>
		<Route path="editor" handler={Editor}/>
		<Route path="subjects" handler={Subjects}/>
	</Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
	React.render(<Root/>, document.body);
});
