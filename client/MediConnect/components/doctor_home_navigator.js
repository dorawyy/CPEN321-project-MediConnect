//import { NavigationHelpersContext } from '@react-navigation/native';
import React from 'react';
import 'react-native-paper';
import {Component} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import DoctorSettingsPage from './doctor_settings';
import DoctorHome from './doctor_home';
import DoctorAppointments from './doctor_appointments';
import DoctorNotifications from './doctor_notifications';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

class DoctorHomeNavigator extends Component {
	
	componentDidUpdate() {
		// this.forceUpdate(); 
		console.log("Here")
		return true; 
	}

	render() {
		return (
			<Tab.Navigator
			initialRouteName="Home"
			activeColor='#02d9b5'
			inactiveColor="#95a5a6"
			labeled={false}
			shifting={true}
			sceneAnimationEnabled={true}
			barStyle={{ 
				backgroundColor: 'white',
			}}
			>
				<Tab.Screen
					name="Home"
					component={DoctorHome}
					options={{
						tabBarLabel: 'Home',
						tabBarIcon: ({color}) => (
							<MaterialCommunityIcons name="home" color={color} size={26} />
						),
					}}
				/>
				<Tab.Screen
					name="Appointments"
					component={DoctorAppointments}
					options={{
						tabBarLabel: 'Appointments',
						tabBarIcon: ({color}) => (
							<MaterialCommunityIcons name="calendar" color={color} size={26} />
						),
					}}
				/>
				<Tab.Screen
					name="Notifications"
					component={DoctorNotifications}
					options={{
						tabBarLabel: 'Notifications',
						tabBarIcon: ({color}) => (
							<MaterialCommunityIcons name="bell" color={color} size={26} />
						),
					}}
				/>
				<Tab.Screen
					name="Settings"
					component={DoctorSettingsPage}
					options={{
						tabBarLabel: 'Settings',
						tabBarIcon: ({color}) => (
							<MaterialCommunityIcons name="wrench" color={color} size={26} />
						),
					}}
				/>
			</Tab.Navigator>
		);
	}
}

export default DoctorHomeNavigator;
