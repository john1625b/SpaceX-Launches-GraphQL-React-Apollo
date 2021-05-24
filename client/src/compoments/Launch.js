import React, {Component, Fragment} from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo';
import classNames from "classnames";
import {Link} from "react-router-dom";

const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!) {
        launch(flight_number: $flight_number) {
            mission_name
            flight_number
            launch_year
            launch_success
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`;

class Launch extends Component {
    render() {
        let {flight_number} = this.props.match.params;
        flight_number = parseInt(flight_number);
        return (
            <Fragment>
                <Query query={LAUNCH_QUERY} variables={{flight_number}}>
                    {
                        ({loading, error, data}) => {
                            if (loading) return <h4>Loading...</h4>;
                            if (error) {
                                console.log(error);
                                return (<div>Encountered Error</div>)
                            } else {
                                console.log(data);
                                const {mission_name, flight_number, launch_year, launch_success} = data.launch;
                                const {rocket_id, rocket_name, rocket_type} = data.launch.rocket;
                                return (
                                    <div>
                                        <h1 className="display-4 my-3">
                                            <span className="text-dark">Mission: </span>
                                            {mission_name}
                                        </h1>
                                        <h4 className="my-3">Launch Details</h4>
                                        <ul className="list-group">
                                            <li className="list-group-item">{flight_number}</li>
                                            <li className="list-group-item">{launch_year}</li>
                                            <li className="list-group-item">
                                                Launch Successful:
                                                <span className={classNames({
                                                    'text-success': launch_success,
                                                    'text-danger': !launch_success,
                                                })}>
                                                    {launch_success ?
                                                        ' Yes' :
                                                        ' No'
                                                    }
                                                </span>
                                            </li>
                                        </ul>
                                        <h4 className="my-3">Rocket Details</h4>
                                        <li className="list-group-item">{rocket_id}</li>
                                        <li className="list-group-item">{rocket_name}</li>
                                        <li className="list-group-item">{rocket_type}</li>
                                    </div>
                                )
                            }
                        }
                    }
                </Query>
                <hr/>
                <Link to={`/`} className="btn btn-secondary">Back</Link>
            </Fragment>
        );
    }
}

export default Launch;