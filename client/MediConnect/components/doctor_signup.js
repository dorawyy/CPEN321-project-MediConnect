//import { NavigationHelpersContext } from '@react-navigation/native';
import React, { version } from 'react';
import { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios'; 
import LinearGradient from 'react-native-linear-gradient';


  

class DoctorSignUp extends Component {

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

    // signup = (firstName, lastName, email, password) => {
    //     alert('First Name: ' + firstName + '\nLast Name: ' + lastName  + '\nEmail: ' + email + '\nPassword: ' + password)
    // }

    async signup() {

        // axios.post("http://54.183.200.234:5000/doctor/signup", {
        axios.post("http://10.0.2.2:5000/doctor/signup", {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
          })
        .then((res) => {
              console.log(res.data); 
              this.props.navigation.navigate("DoctorHomeNavigator");
            })
        .catch((err) =>{ 
            console.log(err.response.data);
            alert(err.response.data.first_name + '\n' + err.response.data.last_name + '\n' + err.response.data.email + '\n' + err.response.data.password);
          });    
    
    }

    render() {
          
        return (
            <LinearGradient   start={{x: 0.0, y: 0.25}} end={{x: 0.7, y: 1}}
            colors={['#ffffff', '#ffffff', 'rgba(2, 217, 188, 0.2)']} style={styles.LinearGradient}>
  
                <View style={styles.container}>
                    <Image style={styles.logo} source={require("../assets/logo.png")} resizeMode="stretch"/>
                    <View style={styles.toggle}>
                        <View style={styles.toggleDoctor}>
                            <TouchableOpacity style={styles.toggletextDoctor}><Text>DOCTOR</Text></TouchableOpacity>
                        </View>
                        <View style={styles.togglePatient}>
                            <TouchableOpacity><Text style={styles.buttonText} onPress={() => this.props.navigation.navigate("PatientSignUp")}>PATIENT</Text></TouchableOpacity>
                        </View>
                    </View>
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
                            <TextInput style = {styles.text} secureTextEntry={true} underlineColorAndroid = "gray" placeholder = "Password" 
                                    autoCapitalize = "none" onChangeText = {this.handlePassword} required></TextInput>
                        </View>

                        <TouchableOpacity style = {styles.submitButton} onPress = {() => this.signup(this.state.firstName, this.state.lastName, this.state.email, this.state.password)}>
                            <Text style = {styles.submitButtonText}> SIGN UP </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </LinearGradient>

        );
    }
}

const styles = StyleSheet.create({


    LinearGradient: {
        width: "100%",
        height: "100%", 
    },

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // margin: "15%",
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
        color:"#5c5c5c", 
     }, 

    text: {
        fontFamily: 'Iowan Old Style', 
        color:"#5c5c5c", 
        fontSize: 15, 
    },

    toggle: {
        // alignItems: "center",
        // justifyContent: "center",
        flexDirection: 'row', 
        backgroundColor: '#d9d9d9', 
        width: 270, 
        height: 40, 
        borderRadius: 7, 
        margin: 10, 
        fontFamily: 'Iowan Old Style', 
    },

    toggleDoctor: {
        // color:"#5c5c5c", 
        alignItems: "center",
        justifyContent: "center",
        width: 135, 
        backgroundColor: "#02f0c8", 
        borderRadius: 7, 
        color: "white", 
        fontSize: 50, 
    }, 

    togglePatient: {
        justifyContent: "center",
        alignItems: "center",
        width: 135, 
        borderRadius: 7, 

    }, 

    logo: {
        marginBottom: 0, 
        height: 180, 
        width: 180, 
    }

});
  

export default DoctorSignUp;