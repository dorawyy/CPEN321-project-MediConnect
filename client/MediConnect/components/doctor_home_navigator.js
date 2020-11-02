//import { NavigationHelpersContext } from '@react-navigation/native';
import React, { version } from 'react';
import 'react-native-paper'
import { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios'; 
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import DoctorSettingsPage from './doctor_settings';
import DoctorHome from './doctor_home';
import DoctorAppointments from './doctor_appointments';
import DoctorNotifications from './doctor_notifications';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createMaterialBottomTabNavigator();
  

class Home extends Component {

    render() {
          
        return (
            <Tab.Navigator >
                <Tab.Screen
                    name="Settings"
                    component={DoctorSettingsPage}
                    options={{
                           tabBarLabel: 'Settings',
                           tabBarIcon: ({ color }) => (
                             <MaterialCommunityIcons name="wrench" color={color} size={26} />
                           ),
                  }}/>

                <Tab.Screen
                    name="Home"
                    component={DoctorHome}
                    options={{
                           tabBarLabel: 'Home',
                           tabBarIcon: ({ color }) => (
                             <MaterialCommunityIcons name="home" color={color} size={26} />
                           ),
                  }}/>

                <Tab.Screen
                    name="Appointments"
                    component={DoctorAppointments}
                    options={{
                           tabBarLabel: 'Appointments',
                           tabBarIcon: ({ color }) => (
                             <MaterialCommunityIcons name="calendar" color={color} size={26} />
                           ),
                  }}/>

                <Tab.Screen
                    name="Notifications"
                    component={DoctorNotifications}
                    options={{
                           tabBarLabel: 'Notifications',
                           tabBarIcon: ({ color }) => (
                              <MaterialCommunityIcons name="bell" color={color} size={26} />
                           ),
                  }}/>

            </Tab.Navigator>

        );
    }
}

const styles = StyleSheet.create({

});
  

export default Home;