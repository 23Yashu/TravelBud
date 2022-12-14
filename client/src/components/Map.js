import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { GoogleMapsAPI } from '../client-config';
Geocode.setApiKey( GoogleMapsAPI );
Geocode.enableDebug();
class Map extends Component{
    constructor( props ){
        super( props );
        this.state = {
            address: '',
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            selectedLocations: []
        }
        this.addSelectedLocation = this.addSelectedLocation.bind(this)
        this.removeSelectedLocation = this.removeSelectedLocation.bind(this)
        // this.colorChange=this.colorChange.bind(this)
    }
    /**
     * Get the current address from the default map position and set those values in the state
     */
    // colorChange(){
    //  google.maps.event.addListener(marker, 'click', function() {
    //      infowindow.open(map);
    //      //Change the marker icon
    //      marker.setIcon('https://www.google.com/mapfiles/marker_green.png');
    //    });
    // }
    addSelectedLocation(){
      this.setState({
        selectedLocations: [...this.state.selectedLocations, {'address': this.state.address, 'lat': this.state.markerPosition.lat, 'lng': this.state.markerPosition.lng} ]
      })
      this.out()
    }
    removeSelectedLocation(index){
        this.setState({
            selectedLocations: this.state.selectedLocations.filter((_, i) => i !== index)
        });
    }
    componentDidMount() {
        Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
            response => {
                const address = response.results[0].formatted_address;
                this.setState( {
                    address: ( address ) ? address : '',
                } )
            },
            error => {
                console.error( error );
            }
        );
    };
    /**
     * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
     *
     * @param nextProps
     * @param nextState
     * @return {boolean}
     */
    shouldComponentUpdate( nextProps, nextState ){
        if (
            this.state.markerPosition.lat !== this.props.center.lat ||
            this.state.address !== nextState.address
        ) {
            return true
        } else if ( this.props.center.lat === nextProps.center.lat ){
            return false
        }
    }
    /**
     * Get the city and set the city input value to the one selected
     *
     * @param addressArray
     * @return {string}
     *
    /**
     * Get the area and set the area input value to the one selected
     *
     * @param addressArray
     * @return {string}
     */
    /**
     * Get the address and set the address input value to the one selected
     *
     * @param addressArray
     * @return {string}
     */
    /**
     * And function for city,state and address input
     * @param event
     */
    onChange = ( event ) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    /**
     * This Event triggers when the marker window is closed
     *
     * @param event
     */
    onInfoWindowClose = ( event ) => {
    };
    /**
     * When the marker is dragged you get the lat and long using the functions available from event object.
     * Use geocode to get the address, city, area and state from the lat and lng positions.
     * And then set those values in the state.
     *
     * @param event
     */
    onMarkerDragEnd = ( event ) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();
        Geocode.fromLatLng( newLat , newLng ).then(
            response => {
                const address = response.results[0].formatted_address;
                this.setState( {
                    address: ( address ) ? address : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                } )
            },
            error => {
                console.error(error);
            }
        );
    };
    /**
     * When the user types an address in the search box
     * @param place
     */
    onPlaceSelected = ( place ) => {
        const address = place.formatted_address,
        latValue = place.geometry.location.lat(),
        lngValue = place.geometry.location.lng();
        // Set these values in the state.
        this.props.getPlace(address.split(',')[0]);
        this.setState({
            address: ( address ) ? address : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
    };
    out = () => {
        console.log(this.state.selectedLocations);
        this.props.getLatLong(this.state.selectedLocations);
    };
    render(){
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <React.Fragment>
                        <GoogleMap google={ this.props.google }
                                defaultZoom={ this.props.zoom }
                                defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                        >
                            {/* InfoWindow on top of marker */}
                            <InfoWindow
                                onClose={this.onInfoWindowClose}
                                position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
                            >
                                <div>
                                    <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
                                </div>
                            </InfoWindow>
                            {/*Marker*/}
                            <Marker google={this.props.google}
                                    name={'Dolores park'}
                                    draggable={true}
                                    onDragEnd={ this.onMarkerDragEnd }
                                    position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                            />
                            {/* <Marker /> */}
                                    {this.state.selectedLocations.map((item,index)=>{
                                        return <Marker google={this.props.google}
                                                        name={'Dolores park'}
                                                        draggable={true}
                                                        onDragEnd={ this.onMarkerDragEnd }
                                                        position={{ lat: item.lat, lng: item.lng }}
                                                />
                                    })}
                            {/* For Auto complete Search Box */}
                            <Autocomplete
                                style={{
                                    width: '100%',
                                    height: '40px',
                                    paddingLeft: '16px',
                                    marginTop: '2px'
                                }}
                                className="searcher form-control"
                                onPlaceSelected={ this.onPlaceSelected }
                                types={['(regions)']}
                            />
                        </GoogleMap>
                        <React.Fragment>
                        </React.Fragment>
                    </React.Fragment>
                )
            )
        );
        let map;
        if( this.props.center.lat !== undefined ) {
            map = <div>
                <div>
                    <div className="form-group">
                        <label htmlFor="">Address</label>
                        <input type="text" name="address" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
                        <br></br>
                        <div>
                            <button className="btn btn-success" onClick={this.addSelectedLocation}>Click To Mark Location</button>
                        </div>
                    </div>
                </div>
                <AsyncMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places`}
                    loadingElement={
                        <div style={{ height: `100%` }} />
                    }
                    containerElement={
                        <div style={{ height: this.props.height }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                />
                <br></br>
                {
                    this.state.selectedLocations.map((item,index)=>{
                        return <p>{item.address} <button className="btn btn-danger" onClick={() => {
                            this.removeSelectedLocation(index)
                        }}>remove</button></p>
                    })
                }
            </div>
        } else {
            map = <div style={{height: this.props.height}} />
        }
        return( map )
    }
}
export default Map