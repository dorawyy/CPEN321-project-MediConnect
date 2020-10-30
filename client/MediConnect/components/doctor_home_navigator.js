//import { NavigationHelpersContext } from '@react-navigation/native';
import React, { version } from 'react';
import 'react-native-paper'
import { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios'; 
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import DoctorSettingsPage from './doctor_settings';
import DoctorHome from './doctor_home';


const Tab = createMaterialBottomTabNavigator();
  

class Home extends Component {

    render() {
          
        return (
            <Tab.Navigator >
                <Tab.Screen name="Settings" component={DoctorSettingsPage} />
                <Tab.Screen name="Home" component={DoctorHome} />
            </Tab.Navigator>

        );
    }
}

const styles = StyleSheet.create({

});
  

export default Home;
