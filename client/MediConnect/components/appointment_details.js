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

	

	render() {


		return (
				<ScrollView>
                    <Text>in appointmetn details</Text>
				</ScrollView>
			);
			
			
	
		
		
	}
}

const styles = StyleSheet.create({

});

export default AppointmentDetails;
