import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { googleApiKey } from '../keys/Keys';
import { geolocated } from 'react-geolocated';

const GoogleMap = props => {
  const styles = {
    width: '320px',
    height: '450px'
  };

  return (
    <Fragment>
      <h1 className='large text-primary'> GoogleMap</h1>
      <p className='lead'>
        <i className='fas fa-user' />
        Shows where you are. Turn on geo-function on your browser, first!
      </p>
      <div className='maps-group'>
        <div className='map-google'>
          <Map
            google={props.google}
            zoom={10}
            style={styles}
            initialCenter={{
              lat:
                props.coords && props.coords.latitude
                  ? props.coords.latitude
                  : 37.5665,
              lng:
                props.coords && props.coords.longitude
                  ? props.coords.longitude
                  : 126.978
            }}
          >
            <Marker
              position={{
                lat:
                  props.coords && props.coords.latitude
                    ? props.coords.latitude
                    : 37.5665,
                lng:
                  props.coords && props.coords.longitude
                    ? props.coords.longitude
                    : 126.978
              }}
            />
          </Map>
        </div>
      </div>
    </Fragment>
  );
};

GoogleMap.propTypes = {};

export default GoogleApiWrapper({
  apiKey: googleApiKey
})(
  geolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
  })(GoogleMap)
);
