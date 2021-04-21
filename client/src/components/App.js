import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Recommendations from './Recommendations';
import BestMovies from './BestMovies';
import Search from './Search';
import Explore from './Explore';
import Quotes from './Quotes';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => <Dashboard />}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => <Dashboard />}
						/>
						<Route
							path="/recommendations"
							render={() => <Recommendations />}
						/>
						<Route
							path="/bestmovies"
							render={() => <BestMovies />}
						/>
						<Route
							path="/search"
							render={() => <Search />}
						/>
						<Route
							path="/explore"
							render={() => <Explore />}
						/>
						<Route
							path="/quotes"
							render={() => <Quotes />}
						/>
					</Switch>
				</Router>
			</div>
		);
	};
};
