import React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
// import PushNotification from 'react-native-push-notification';
import {LocalNotification} from '../services/LocalPushController'; 
import '../components/user_info';
import { ScrollView } from 'react-native-gesture-handler';

class AppointmentDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {
			first_name: '',
			last_name: '',
			age: '',
			email: '',
			gender: '',
			weight: '',
			height: '' 
		};
	}


	componentDidMount() {

		axios.get('http://10.0.2.2:5000/patient/' + this.props.route.params.patientID, {
		})
		.then((res) => {

			// this.setState({ first_name: res.data.first_name });
			// console.log(res.data); 
			this.setState({first_name: res.data.first_name});
			this.setState({last_name: res.data.last_name});
			this.setState({email: res.data.email});
			this.setState({age: res.data.age});
			this.setState({height: res.data.height});
			this.setState({weight: res.data.weight});
			this.setState({gender: res.data.gender});

		})
		.catch((err) => {
			console.log(err.response);
		});

	}

	

	render() {

		return (
            <ScrollView style={styles.container}>
                <View style={styles.accountHeader}>
                    <Text style={styles.accountHeaderText}>Patient Details</Text>
                </View>                
                    
                <View style={styles.field}>
					<Text style={styles.header}>First Name: {this.state.first_name}</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.header}>Last Name: {this.state.last_name}</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.header}>Email: {this.state.email}</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.header}>Age: {this.state.age}</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.header}>Height (cm): {this.state.height}</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.header}>Weight (kg): {this.state.weight}</Text>

                </View>
                <View style={styles.field}>
                    <Text style={styles.header}>Gender: {this.state.gender}</Text>
                </View>

            </ScrollView>

			);
			
			
	
		
		
	}
}

const styles = StyleSheet.create({

	container: {
		flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center',
		// margin: "15%",
		backgroundColor: 'white',
		fontFamily: 'Iowan Old Style',
		width: '100%',
		height: '100%',
		padding: 30,
		// backgroundColor: linear-gradient(#00ff99 29%, #00ffff 100%);
	},

    header: {
		color: '#5c5c5c',
		fontSize: 18,
	},

	text: {
		color: '#5c5c5c',

		fontSize: 17,
    },
    
    field: {
        paddingBottom: 10, 

    },

    accountHeader: {
		flexDirection: 'row',
		paddingBottom: 25, 

	}, 

	accountHeaderText: {
		fontSize: 20,
		fontFamily: 'Iowan Old Style',
		color: '#02f0c8',
	},

	icon: {
		paddingRight: 7, 
    },
    
    button: {
		alignItems: 'center',
		justifyContent: 'center',
	},

	buttonText: {
        alignItems: 'center',
		justifyContent: 'center',
		fontFamily: 'Iowan Old Style',
		fontSize: 20,
        color: 'white', 
        backgroundColor: '#02f0c8',
        paddingTop: 5, 
        paddingBottom: 5, 
        paddingRight: 20, 
        paddingLeft: 20, 
        // padding: 10,
        margin: 10,
        borderRadius: 7,
        // width: 100, 


	},


});

export default AppointmentDetails;