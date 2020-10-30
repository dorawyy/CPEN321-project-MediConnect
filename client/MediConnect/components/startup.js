//import { NavigationHelpersContext } from '@react-navigation/native';
import React, { version } from 'react';
import { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

  

class StartUp extends Component {


    render() {
          
        return (
            <View style={styles.container}>
                <Image source={require("../assets/logo.png")} resizeMode="stretch"/>
                <TouchableOpacity style={styles.button}><Text style={styles.buttonText} onPress={() => this.props.navigation.navigate("DoctorSignUp")}>Sign Up</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={styles.buttonText} onPress={() => this.props.navigation.navigate("DoctorSignIn")}>Sign In</Text></TouchableOpacity>
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
        color: '#02d9b5'
     }, 


});
  

export default StartUp;
