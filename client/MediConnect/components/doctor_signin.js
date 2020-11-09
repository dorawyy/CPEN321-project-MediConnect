import React from 'react';
import {Component} from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
// import CookieManager from '@react-native-community/cookies';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const { signIn } = React.useContext(AuthContext);

class DoctorSignIn extends Component {
	state = {
		email: '',
		password: '',
		emailList: [],
		serverData: [],
		user: [],
	};

	handleEmail = (text) => {
		this.setState({email: text});
	};

	handlePassword = (text) => {
		this.setState({password: text});
	};

	async signin() {
		// var current_user = '';
		// CookieManager.clearAll();
		// axios.post("http://54.183.200.234:5000/doctor/signin", {
		axios
			.post('http://10.0.2.2:5000/doctor/signin', {
				withCredentials: true,
				email: this.state.email,
				password: this.state.password,
				// email: "f@gmail.com",
				// password: "12345678",
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
			.then((res) => {
				console.log(res.data);
				// current_user = res.user;

				this.setState({
					user: res.data,
					cookie: res.headers['set-cookie'],
				});

				console.log(res.headers['set-cookie']);

				// CookieManager.clearAll() //clearing cookies stored

				// const cookie = AsyncStorage.getItem('cookie')
				// fetch('api/data', {
				//     headers: {
				//         'cookie': cookie
				//     }
				// })

				// CookieManager.setFromResponse(
				//     '{{res.data.url}}',
				//     'user_session=abcdefg; path=/he; expires=Thu, 1 Jan 2030 00:00:00 -0000; secure; HttpOnly')
				//       .then((success) => {
				//         console.log('CookieManager.setFromResponse =>', success);
				//       });

				// CookieManager.get("http://10.0.2.2:5000/doctor")
				//     .then((res) => {
				//         console.log('CookieManager.get =>', res); // => 'user_session=abcdefg; path=/;'
				//     });

				// // Get cookies for a url
				// CookieManager.get('http://10.0.2.2:5000/doctor/signin')
				// .then((cookies) => {
				// console.log('CookieManager.get =>', cookies);
				// });
				this.props.navigation.navigate('DoctorHomeNavigator');
			})
			.catch((err) => {
				console.log(err.response);
				// alert(err.response.data.email + '\n' + err.response.data.password);
			});
	}

	render() {
		return (
			<LinearGradient
				start={{x: 0.0, y: 0.25}}
				end={{x: 0.7, y: 1}}
				colors={['#ffffff', '#ffffff', 'rgba(2, 217, 188, 0.2)']}
				style={styles.LinearGradient}
			>
				<View style={styles.container}>
					<Image
						style={styles.logo}
						source={require('../assets/logo.png')}
						resizeMode="stretch"
					/>
					<View style={styles.toggle}>
						<View style={styles.toggleDoctor}>
							<TouchableOpacity
								testID="doctorToggle"
								style={styles.toggletextDoctor}
							>
								<Text>DOCTOR</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.togglePatient}>
							<TouchableOpacity testID="patientToggle">
								<Text
									style={styles.buttonText}
									onPress={() =>
										this.props.navigation.navigate('PatientSignIn')
									}
								>
									PATIENT
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.loginbox}>
						<View>
							<TextInput
								testID="email"
								style={styles.text}
								underlineColorAndroid="gray"
								placeholder="Email"
								autoCapitalize="none"
								onChangeText={this.handleEmail}
								required
							/>
						</View>
						<View>
							<TextInput
								testID="password"
								style={styles.text}
								secureTextEntry={true}
								underlineColorAndroid="gray"
								placeholder="Password"
								autoCapitalize="none"
								onChangeText={this.handlePassword}
								required
							/>
						</View>
						<TouchableOpacity
							testID="signin_button"
							style={styles.submitButton}
							onPress={() => this.signin()}
						>
							<Text style={styles.submitButtonText}>SIGN IN</Text>
						</TouchableOpacity>
					</View>
					{/* <Text>{this.state.serverData}</Text> */}
					{/* <View>{this.state.serverData.map(serverData =><Text key={serverData.password}>{serverData.email}</Text>)}</View> */}
				</View>
			</LinearGradient>
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
		alignItems: 'center',
		justifyContent: 'center',
		fontFamily: 'Iowan Old Style',
		width: '100%',
		height: '100%',
	},

	loginbox: {
		alignSelf: 'center',
		backgroundColor: '#02f0c8',
		borderRadius: 10,
		shadowColor: 'black',
		shadowOpacity: 1,
		shadowRadius: 4.65,
		elevation: 8,
		width: 270,
		padding: 20,
	},

	submitButton: {
		backgroundColor: 'white',
		padding: 10,
		margin: 15,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: 'black',
		borderRadius: 7,
		fontFamily: 'Iowan Old Style',
	},

	submitButtonText: {
		fontFamily: 'Iowan Old Style',
		fontSize: 17,
		color: '#5c5c5c',
	},

	text: {
		color: '#5c5c5c',
		fontSize: 15,
		fontFamily: 'Iowan Old Style',
	},

	toggle: {
		flexDirection: 'row',
		backgroundColor: '#d9d9d9',
		width: 270,
		height: 40,
		borderRadius: 7,
		margin: 10,
		fontFamily: 'Iowan Old Style',
	},

	toggleDoctor: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 135,
		backgroundColor: '#02f0c8',
		borderRadius: 7,
		color: 'white',
	},

	togglePatient: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 135,
		borderRadius: 7,
	},

	logo: {
		marginBottom: 0,
		height: 180,
		width: 180,
	},
});

export default DoctorSignIn;
