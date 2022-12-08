import React, { Component } from 'react';
import Map from './Map';
import YtSearch from './YtSearch';
import Directions from './Directions';
import Header from './Header';
import CarouselFade from './CarouselFade';
class Home extends Component {

	state= {
		getPlace:'',
		getLatLong: [],
		mapSubmit: true
	}

	render() {

		// /** getPlace function **/ Get the place name to display youtube videos
		const getPlace = (data) => {
			this.setState({
				getPlace: data
			})
			return getPlace;
		}
		const getLatLong = (latLong) => {
			latLong.map(l=>{
				if(l !== undefined) {
					this.setState({
						getLatLong: [...this.state.getLatLong, {lat: l.lat, lng: l.lng}]
					})
					return getLatLong;
				}
			})

		}
		const getRoute = () => {
			if(this.state.mapSubmit===false) {
			this.setState({
				mapSubmit: true
			}) } else {
			this.setState({
				mapSubmit: false
			})
		}
		}
		return(

			<>
				<Header />
				<CarouselFade />
				<div className='container'>
				{this.state.mapSubmit===true?
				<>
					<Map
						google={this.props.google}
						center={{lat: 28.5021836, lng: 77.0916546}}
						height='300px'
						zoom={15}
						getPlace = {getPlace}
						getLatLong = {getLatLong}
					/>
					<button className="btn btn-warning" onClick={getRoute}>Get Route</button>
				</>
				:
				<>
					<Directions center={{ lat: -24.9923319, lng: 135.2252427 }} zoom={4} data={this.state.getLatLong} />
					<button className="btn btn-warning mt-2" onClick={getRoute}>Get Back</button>
				</>}
				<YtSearch getPlace = {this.state.getPlace.length>3 && this.state.getPlace} />
				</div>
			</>
		);
	}
}

export default Home;
