import React, { Component } from 'react';
import Map from './Map';
import YtSearch from './YtSearch';
import Directions from './Directions';
import Header from './Header';
import Itinerary from './Itinerary';
import Calendar from './Calendar';
class Home extends Component {

	state= {
		getPlace:'',
		getLatLong: [],
		mapSubmit: false,
		getDistance: 0,
		getStops: [],
		showItinerary: false,
		getStartDate:0,
		getEndDate:0,
		getDays:0,
		showCalendar: false,
		getFlag: false
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
						getLatLong: [...this.state.getLatLong, {lat: l.lat, lng: l.lng, address: l.address}]
					})
					return getLatLong;
				}
				return getLatLong;
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
		const getItinerary = () => {
			window.alert("Make sure You have applied for leaves! 😉")
			this.setState({
				showItinerary: true,
				showCalendar: false
			})
		}
		const getStops = (data) => {
			this.setState({
				getStops: data
			})
		}
		const getDistance = (data) => {
			this.setState({
				getDistance: data
			})
		}
		const getStartDate = (data) => {
			this.setState({
				getStartDate: data
			})
		}
		const getEndDate = (data) => {
			this.setState({
				getEndDate: data
			})
		}
		const getDays = (data) => {
			this.setState({
				getDays: data
			})
		}
		const getFlag = (data) => {
			this.setState({
				getFlag: data
			})
		}
		const getTemperature = (data) => {
			this.setState({
				getTemperature: data
			})
		}
		const getDates = () => {
			this.setState({
				showCalendar: true,
				mapSubmit: false
			})
		}
		return(
			
			<>
				<Header />
				<div className='main-wrapper container mt-5 overflow-hidden'>
				{this.state.mapSubmit===false?
				<>
				{!this.state.showCalendar && !this.state.showItinerary &&
				<div>
					<Map
						google={this.props.google}
						center={{lat: 28.5021836, lng: 77.0916546}}
						height='300px'
						zoom={12}
						getPlace = {getPlace}
						getLatLong = {getLatLong}
						getTemperature = {getTemperature}
					/>
					{this.state.getLatLong.length>2 && <button className="btn btn-warning mt-4" onClick={getRoute}>Get Route</button>}
					</div>
				}
				</>
				:
				
				<>
					<h4>Here is your Route!</h4>
					<Directions center={{ lat: 28.5021836, lng: 77.0916546 }} zoom={4} data={this.state.getLatLong} dist={getDistance} route={getStops} />
					<button className="btn btn-warning mt-2" onClick={getDates}>Lets select the Dates</button>
				
				</>}
				{this.state.showItinerary && 
					<>
					<Itinerary temp = {this.state.getTemperature} start={this.state.getStartDate} end={this.state.getEndDate} days={this.state.getDays} place={this.state.getPlace} info={this.state.getLatLong} dist={this.state.getDistance} stops={this.state.getStops}/>
					<YtSearch getPlace = {this.state.getPlace.length>2 && this.state.getPlace} />
					</>
				}
				{this.state.showCalendar && <div className='text-center bg-dark pb-2'>
				<Calendar start={getStartDate} end={getEndDate} days={getDays} flag={getFlag} />
				{!this.state.showItinerary && this.state.getFlag && <button className="btn btn-warning mt-2" onClick={getItinerary}>Get your Itinerary</button>}
				</div>}
				</div>
			</>
		);
	}
}

export default Home;
