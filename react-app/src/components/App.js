import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getSetsData} from '../actions/FirebaseActions';

import AppBar from './AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {

  componentDidMount() {
    this.props.onGetSets();
  }

  render() {
    let events = this.props.events;
    let eventKeys = events?Object.keys(events):null;
    return (
      <MuiThemeProvider>
        <div>
          <AppBar />
          {events &&
            <div>
              <h1>Events:</h1>
              <hr/>
              {eventKeys.map(function(key){
                let e = events[key]
                return (
                  <div key={key}>
                    <h1>{e.name}</h1>
                    <div dangerouslySetInnerHTML={{__html:e.desc}}/>
                    <h4>Group: {e.groupName}</h4>
                    <ul>
                      <li>{e.address}</li>
                      <li>Capacity: {e.maxSize}</li>
                      <li>Registered: {e.registered}</li>
                    </ul>
                  </div>
                )
              })}
            </div>
          }

        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  console.log(state);
  return {
    ...ownProps,
    auraSets: state.FirebaseDataBase.auraSetsData?state.FirebaseDataBase.auraSetsData:{message:'Loading...'},
    events: (state.FirebaseDataBase.auraSetsData 
      && state.FirebaseDataBase.auraSetsData.gdgla 
      && state.FirebaseDataBase.auraSetsData.gdgla.events)
      ?state.FirebaseDataBase.auraSetsData.gdgla.events:undefined
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSets: () => dispatch(getSetsData())
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp