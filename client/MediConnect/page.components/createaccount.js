//import { NavigationHelpersContext } from '@react-navigation/native';
import React, { version } from 'react';
import { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

  

class CreateAccount extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    handleFirstName = (text) => {
        this.setState({ firstName: text })
    }

    handleLastName = (text) => {
        this.setState({ lastName: text })
    }

    handleEmail = (text) => {
        this.setState({ email: text })
    }
    
    handlePassword = (text) => {
        this.setState({ password: text })
    }

    signup = (firstName, lastName, email, password) => {
        alert('First Name: ' + firstName + '\nLast Name: ' + lastName  + '\nEmail: ' + email + '\nPassword: ' + password)
    }

    render() {
          
        return (
            <View style={styles.container}>
                <Image source={require("../assets/logo.png")} resizeMode="stretch"/>
                <View style={styles.accountbox}>
                    <View>
                        <TextInput style = {styles.text} underlineColorAndroid = "gray" placeholder = "First Name" 
                                autoCapitalize = "none" onChangeText = {this.handleFirstName} required></TextInput>
                    </View>
                    <View>
                        <TextInput style = {styles.text} underlineColorAndroid = "gray" placeholder = "Last Name" 
                                autoCapitalize = "none" onChangeText = {this.handleLastName} required></TextInput>
                    </View>
                    <View>
                        <TextInput style = {styles.text} underlineColorAndroid = "gray" placeholder = "Email" 
                                autoCapitalize = "none" onChangeText = {this.handleEmail} required></TextInput>
                    </View>
                    <View>
                        <TextInput style = {styles.text} underlineColorAndroid = "gray" placeholder = "Password" 
                                autoCapitalize = "none" onChangeText = {this.handlePassword} required></TextInput>
                    </View>

                    <TouchableOpacity style = {styles.submitButton} onPress = {() => this.signup(this.state.firstName, this.state.lastName, this.state.email, this.state.password)}>
                        <Text style = {styles.submitButtonText}> SIGN UP </Text>
                    </TouchableOpacity>
                </View>
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

    accountbox: {
        alignSelf: "center",
        backgroundColor: "#02f0c8", 
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity:1,
        shadowRadius: 4.65,
        elevation: 8,
        // height: 300,
        width: 270, 
        marginTop: 0, 
        padding: 20, 
    },

    submitButton: {
        backgroundColor: 'white',
        padding: 10,
        margin: 15,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "black",
        borderRadius: 7, 
     },
     
     submitButtonText:{
        fontFamily: 'Iowan Old Style', 
        fontSize: 17, 
        color: '#02d9b5'
     }, 

    text: {
        color:"#5c5c5c", 
        fontSize: 15, 
    }

});
  

export default CreateAccount;
