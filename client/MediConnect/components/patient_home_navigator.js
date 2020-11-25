//import { NavigationHelpersContext } from '@react-navigation/native';
import React from 'react';
import 'react-native-paper';
import {Component} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import PatientSettingsPage from './patient_settings'; 
import PatientHome from './patient_home';
import PatientAppointments from './patient_appointments';
import DoctorNotifications from './doctor_notifications';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

class PatientHomeNavigator extends Component {
	render() {
		return (
			<Tab.Navigator
			initialRouteName="Home"
			activeColor="#00aea2"
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
					component={PatientHome}
					options={{
						tabBarLabel: 'Home',
						tabBarIcon: ({color}) => (
							<MaterialCommunityIcons name="home" color={color} size={26} />
						),
					}}
				/>
				<Tab.Screen
					name="Appointments"
					component={PatientAppointments}
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
					component={PatientSettingsPage}
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

export default PatientHomeNavigator;
