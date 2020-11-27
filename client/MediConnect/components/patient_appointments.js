import React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import '../components/user_info';
import { ScrollView } from 'react-native-gesture-handler';

class PatientAppointments extends Component {

	state = {
		serverData: [],
	}

	componentDidMount = () => {
		const uid = global.userID
		axios
			.get("http://54.183.200.234:5000/patient/appointment/" + uid, {
			//.get("http://10.0.2.2:5000/patient/appointment" + uid, {
			})
			.then((res) => {
				console.log(res.data);
				this.setState({
					serverData: res.data,
				});
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};
	/*
	componentDidMount = () => {
		axios
			.get("http://54.183.200.234:5000/patient/appointment", {
			//.post('http://10.0.2.2:5000/patient/search', {
				//symptoms: this.state.symptom,
			})
			.then((res) => {
				console.log(res.data);
				this.setState({
					serverData: res.data,
				});
				this.props.navigation.navigate('Doctors');
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};
	*/


	render() {
		return (
			// <LinearGradient
			// 	start={{x: 0.0, y: 0.25}}
			// 	end={{x: 0.7, y: 1}}
			// 	colors={['#ffffff', '#ffffff', 'rgba(2, 217, 188, 0.2)']}
			// 	style={styles.LinearGradient}
			// >
				<ScrollView>
					<View style={styles.container}>
						<Text style={styles.header}>Appointments</Text>

						<View>
							{this.state.serverData.map(serverData =><View style={styles.doctor} key={serverData.password}>
						
							<Text style={styles.doctorinfo}>{'Doctor Name: ' + serverData.first_name +' ' + serverData.last_name}</Text>
							<Text style={styles.doctorinfo}>{'Email: ' + serverData.email}</Text>
							<Text style={styles.doctorinfo}>{'Speciality: ' + serverData.speciality}</Text>
							<Text style={styles.doctorinfo}>{'Appointment Date: ' + serverData.date}</Text>
							<Text style={styles.doctorinfo}>{'Booked Slot: ' + serverData.slot}</Text>
						
							</View>)}	
						</View>

					</View>
				</ScrollView>
			/* </LinearGradient> */
		);
	}
}

const styles = StyleSheet.create({
	LinearGradient: {
		width: '100%',
		height: '100%',
	},

	container: {
		flex: 1,
		backgroundColor: 'white',
		fontFamily: 'Iowan Old Style',
		width: '100%',
		height: '100%',
		padding: 30,
	},

	header: {
		color: '#02f0c8',
		fontSize: 20,
	},

	icon: {
		width: 50,
		justifyContent: 'center',
	},

	option: {
		padding: 20,
		borderColor: '#02f0c8',
		borderRadius: 7,
		backgroundColor: '#d9d9d9',
		alignItems: 'center',
		margin: 10,
		flexDirection: 'row',
	},

	optionText: {
		fontFamily: 'Iowan Old Style',
		fontSize: 16,
		color: 'black',
	},

	headerText: {
		//textAlign: 'center',
    	fontWeight: 'bold',
    	//fontStyle: 'italic',
    	fontSize: 20,
		fontFamily: 'Iowan Old Style',
		//fontSize: 20,
		color: 'black',
		//padding:20
	},

	containerBox: {
		alignSelf: 'center',
		backgroundColor: '#02f0c8',
		borderRadius: 10,
		shadowColor: 'black',
		shadowOpacity: 1,
		shadowRadius: 4.65,
		elevation: 8,
		width: 270,
		padding: 5,
	},

	text: {
		color: '#5c5c5c',
		fontSize: 15,
	},

	button: {
		backgroundColor: 'white',
		padding: 10,
		margin: 15,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: 'black',
		borderRadius: 7,
	},

	buttonText: {
		fontFamily: 'Iowan Old Style',
		fontSize: 15,
		color: '#02d9b5',
	},

	doctor: {
		backgroundColor: '#d9d9d9',
		height: 120,
		width: 270,
		margin: 15,
		borderRadius: 5,
		shadowColor: 'black',
		shadowOpacity: 1,
		shadowRadius: 4.65,
		elevation: 8,
		padding: 15,
		alignSelf: 'center',
	},

	doctorinfo: {
		fontFamily: 'Iowan Old Style',
		color: 'black',
		fontSize: 11,
	},
});

export default PatientAppointments;
