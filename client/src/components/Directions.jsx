/* global google */
import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleMapReady = this.handleMapReady.bind(this);
  }

  handleMapReady(mapProps, map) {
    this.calculateAndDisplayRoute(map);
  }

  calculateAndDisplayRoute(map) {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
     
    const waypoints = this.props.data.map(item =>{
      return{
        location: {lat: item.lat, lng:item.lng},
        stopover: true
      }
    })
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    directionsService.route({
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        let total = 0;
        const myroute = response.routes[0];
        if (!myroute) {
          return;
        }
        for (let i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        this.props.route(myroute)
        this.props.dist(total)
        // console.log(response.routes[0].legs[0].distance.text)
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  render() {
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          className={"map"}
          zoom={this.props.zoom}
          initialCenter={this.props.center}
          onReady={this.handleMapReady}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCpGCLMhBR7m7MYVvai-fZyaDbY9qJLkfg",
  libraries: []
})(MapContainer);
