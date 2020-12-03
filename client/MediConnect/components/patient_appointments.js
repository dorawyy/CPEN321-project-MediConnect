import React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import '../components/user_info';
import { ScrollView } from 'react-native-gesture-handler';

class PatientAppointments extends Component {

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
				<View style={styles.container}>
					<View>
						<Text style={styles.headerText} testID='Appointments_Page'>Appointments</Text>
					</View>

					<View>
						<TouchableOpacity style={styles.option}>
							<Text style={styles.optionText}
							onPress={() => this.props.navigation.navigate('CreateAppointment')}>Create an appointment</Text>
						</TouchableOpacity>
					</View>

				</View>
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
		padding: 30,
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
	}
});

export default PatientAppointments;
