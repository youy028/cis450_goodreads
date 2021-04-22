import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Recommendations from './Recommendations';
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
							render={() => <Explore />}
						/>
						<Route
							path="/recommendations"
							render={() => <Recommendations />}
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
