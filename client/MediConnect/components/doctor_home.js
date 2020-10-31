//import { NavigationHelpersContext } from '@react-navigation/native';
import React, { version } from 'react';
import 'react-native-paper'
import { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios'; 
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import DoctorSettingsPage from './doctor_settings';
import DoctorSignIn from './doctor_signin';


const Tab = createMaterialBottomTabNavigator();
  

class Home extends Component {

    state = {
        serverData: [],
    }

    componentDidMount = () => {
        axios
        .post("http://54.183.200.234:5000/patient/search", {
            symptoms: ["Chest pain"],
        })
        .then((res) => {
            console.log(res.data), 
            this.setState({
                serverData: res.data,             
           });
        })
        .catch((err) => console.log(err));
    }


    render() {
          
        return (
             <View style={styles.container}>
                            <View style={styles.infobox}>

                                <View >
                                <Text style = {styles.text} >Age    : 43 years</Text>
                                <Text style = {styles.text} >Gender : M</Text>
                                <Text style = {styles.text} >Height : 176 cm</Text>
                                <Text style = {styles.text} >Weight : 78 kg</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.button}><Text style={styles.buttonText} onPress={() => this.props.navigation.navigate("DoctorAppointments")}>Manage Appointments</Text></TouchableOpacity>
             </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // margin: "15%",
        backgroundColor: "white",
        fontFamily: 'Iowan Old Style',
        width: "100%",
        height: "100%",
        // backgroundColor: linear-gradient(#00ff99 29%, #00ffff 100%);
    },

    user_icon: {
                // alignSelf:"flex-start",
                borderRadius: 5,
                shadowColor: "black",
                shadowOpacity:1,
                shadowRadius: 2.45,
                padding: 20,

                       width: 20,
                       height: 20,


    },

    infobox: {
            alignSelf: "center",
            backgroundColor: "#02f0c8",
            borderRadius: 10,
            shadowColor: "black",
            shadowOpacity:1,
            shadowRadius: 4.65,
            elevation: 8,
            // height: 100,
            width: 270,
            // marginTop: 20,
            padding: 20,
        },


    button: {
        backgroundColor: 'white',
        padding: 10,
        margin: 15,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "black",
        borderRadius: 7,
    },

    buttonText:{
        fontFamily: 'Iowan Old Style',
        fontSize: 17,
        color: '#02d9b5',
    },


    text: {
             fontFamily: 'Iowan Old Style',
             color:"white",
             fontSize: 20,
    },


    doctor: {
        borderRadius: 7, 
        backgroundColor: "#d9d9d9", 
        height: 150,
        width: 270, 
        margin: 20,
        borderRadius: 20,
        shadowColor: "black",
        shadowOpacity:1,
        shadowRadius: 4.65,
        elevation: 8,
        padding: 20,
        alignSelf: "center",

    },
    
    doctorinfo: {
        fontFamily: 'Iowan Old Style',
        color:"black",
        fontSize: 12,
    }

});
  

export default Home;
