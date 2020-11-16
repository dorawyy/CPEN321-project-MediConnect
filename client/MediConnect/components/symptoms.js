//import { NavigationHelpersContext } from '@react-navigation/native';
import React from 'react';
import {Component} from 'react';
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import axios from 'axios';

// export const SymptomsContext = React.createContext(); 

class Symptoms extends Component {
	state = {
		serverData: [],
		symptom: '',
	};

	handleSymptom = (text) => {
		this.setState({symptom: text});
	};

	async reportSymptom(text) {
		// console.log(text); 

		// axios
		// 	.get("http://54.183.200.234:5000/patient/search", {
		// 	// .post('http://10.0.2.2:5000/patient/search', {
		// 		params: {
		// 			symptoms: [text],
		// 		},
		// 	})
		// 	.then((res) => {
		// 		// console.log(symptom); 
		// 		console.log(res.data);
		// 		this.setState({
		// 			serverData: res.data,
		// 		});
				this.props.navigation.navigate('Doctors', {symptoms: text, data: this.state.serverData});
			// })
			// .catch((err) => {
			// 	console.log(err.response.data);
			// });
	};

	render() {
		return (
			// <SymptomsContext.Provider
			// values={{
			// 	symptom: this.state.symptom
			// }}
			// >
				<View style={styles.container}>
					<View>
						<Text style={styles.header}>Enter Your Symptom Here</Text>
						<TextInput
							style={styles.text}
							underlineColorAndroid="gray"
							placeholder="Enter Symptoms"
							autoCapitalize="none"
							onChangeText={this.handleSymptom}
							required
						/>
						<TouchableOpacity style={styles.button}>
							<Text
								style={styles.buttonText}
								onPress={() => {
									// const {symptom} = this.state;
									// this.props.navigation.navigate('Doctors');
									this.reportSymptom(
										this.state.symptom,
									)
								}}
							>
								Report Symptoms
							</Text>
						</TouchableOpacity>
					</View>
					{/* <DoctorsResults symptom={this.state.symptom}></DoctorsResults> */}
				</View>
			// </SymptomsContext.Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// margin: "15%",
		backgroundColor: 'white',
		fontFamily: 'Iowan Old Style',
		width: '100%',
		height: '100%',
		padding: 30,
		// backgroundColor: linear-gradient(#00ff99 29%, #00ffff 100%);
	},

	header: {
		color: '#02f0c8',
		fontSize: 18,
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
		//display: None,
		borderRadius: 7,
		backgroundColor: '#d9d9d9',
		height: 105,
		width: 270,
		margin: 5,
		shadowColor: 'black',
		shadowOpacity: 1,
		shadowRadius: 4.65,
		elevation: 8,
		padding: 10,
		alignSelf: 'center',
	},

	doctorinfo: {
		fontFamily: 'Iowan Old Style',
		color: 'black',
		fontSize: 11,
	},
});

export default Symptoms;
