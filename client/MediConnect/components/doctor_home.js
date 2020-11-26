//import { NavigationHelpersContext } from '@react-navigation/native';
import React from 'react';
import 'react-native-paper';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationEvents } from "react-navigation";



// import { Header } from 'react-native/Libraries/NewAppScreen';



class Home extends Component {

    // shouldComponentUpdate() {
    //     this.setState({first_name: global.first_name});
    //     this.setState({last_name: global.last_name});
    //     this.setState({email: global.email});
    //     this.setState({age: global.age});
    //     this.setState({specialization: global.specialization});
    //     this.setState({years_of_experience: global.years_of_experience});
	// }; 

	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			age: 0,
			specialization: '',
			years_of_experience: 0,
		};	
		// this will fire every time Page 1 receives navigation focus
		this.props.navigation.addListener('focus', () => {
			this.setState({first_name: global.first_name});
			this.setState({last_name: global.last_name});
			this.setState({email: global.email});
			this.setState({age: global.age});
			this.setState({specialization: global.specialization});
			this.setState({years_of_experience: global.years_of_experience});
		})
	}

		
	// componentDidUpdate() {
    //     this.setState({first_name: global.first_name});
    //     this.setState({last_name: global.last_name});
    //     this.setState({email: global.email});
    //     this.setState({age: global.age});
    //     this.setState({specialization: global.specialization});
	// 	this.setState({years_of_experience: global.years_of_experience});
	// 	console.log(this.state.first_name); 
	// 	// console.log("mounting"); 
	// }; 


	// constructor(props){
		// state = {
		// 	first_name: '',
		// 	last_name: '',
		// 	email: '',
		// 	age: 0,
		// 	specialization: '',
		// 	years_of_experience: 0,
		// };
	  
	// 	this.forceChange = this.forceChange.bind(this);
	//  }
  
	//  forceChange(){
	// 	this.setState(prevState => ({
	// 		temp: prevState.temp++
	// 	})); 
	// }

	refresh() {
		this.forceUpdate(); 
	}
	

	render() {

		console.log(global.first_name); 

		return (
			// <Header forceUpdate={this.forceUpdate}>
			<View testID="homepage" style={styles.container}>
				<View style={styles.welcome} >
					<View style={styles.welcomeImage} ><Image source={require('../assets/logo.png')} /></View>
					<LinearGradient
						start={{x: 0.8, y: 1}}
						end={{x: 0.7, y: 0.8}}
						colors={['#ffffff', '#ffffff', 'rgba(2, 217, 188, 0.2)']}
						// style={styles.welcomeTextContainer}
					>
						<Text style={styles.welcomeText}>Welcome, {global.first_name} {global.last_name}!</Text>
					</LinearGradient>
				</View>
				<View style={styles.infobox}>
					<View>
						<View style={styles.accountHeader}>
							<Icon style={styles.icon} name="user" size={30} color={'#5c5c5c'} />
							<Text style={styles.accountHeaderText}>Account Details</Text>
						</View>
						{/* <Text style={styles.text}>First Name : {global.first_name}</Text>
						<Text style={styles.text}>Last Name : {global.last_name}</Text> */}
						<Text style={styles.text}>Age : {global.age} years</Text>
						<Text style={styles.text}>Email : {global.email}</Text>
						<Text style={styles.text}>Rating : {global.rating}</Text>
						<Text style={styles.text}>Specialization : {global.specialization}</Text>
						<Text style={styles.text}>Verified : {(global.verified)? 'Yes' : 'No'}</Text>
						<Text style={styles.text}>Years of Experience : {global.years_of_experience}</Text>

					</View>
				</View>
			</View>
			// </Header>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		fontFamily: 'Iowan Old Style',
		width: '100%',
		height: '100%',
	},

	welcome: {
		width: '100%', 
		height: 220, 
		marginBottom: 10, 
		marginTop: 10, 
	},

	welcomeImage: {
		height: '75%', 
		alignItems: 'center',
		justifyContent: 'center',
		// marginBottom: 20, 
	}, 

	userIcon: {
		height: 100, 
	}, 

	user_icon: {
		borderRadius: 5,
		shadowColor: 'black',
		shadowOpacity: 1,
		shadowRadius: 2.45,
		padding: 20,
		width: 20,
		height: 20,
	},

	infobox: {
		alignSelf: 'center',
		backgroundColor: '#02f0c8',
		borderRadius: 10,
		shadowColor: 'black',
		shadowOpacity: 1,
		shadowRadius: 4.65,
		elevation: 8,
		width: 330,
		padding: 20,
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
		fontSize: 17,
		color: '#02d9b5',
	},

	text: {
		fontFamily: 'Iowan Old Style',
		color: '#5c5c5c',
		fontSize: 17,
	},

	welcomeText: {
		fontFamily: 'Iowan Old Style',
		color: '#5c5c5c',
		fontSize: 20,
		paddingLeft: 40, 
		paddingTop: 10, 
		paddingBottom: 10, 
		// backgroundColor: '#d9d9d9', 

	},


	doctor: {
		borderRadius: 7,
		backgroundColor: '#d9d9d9',
		height: 150,
		width: 270,
		margin: 20,
		shadowColor: 'black',
		shadowOpacity: 1,
		shadowRadius: 4.65,
		elevation: 8,
		padding: 20,
		alignSelf: 'center',
	},

	doctorinfo: {
		fontFamily: 'Iowan Old Style',
		color: 'black',
		fontSize: 12,
	},

	accountHeader: {
		flexDirection: 'row',
		paddingBottom: 10, 
	}, 

	accountHeaderText: {
		fontSize: 20,
		fontFamily: 'Iowan Old Style',
		color: '#5c5c5c'
	},

	icon: {
		paddingRight: 10, 
	}
});

export default Home;
