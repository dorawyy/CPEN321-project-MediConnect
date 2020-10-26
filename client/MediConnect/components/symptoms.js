//import { NavigationHelpersContext } from '@react-navigation/native';
import React, { version } from 'react';
import { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

  

class Symptoms extends Component {

    state = {
        doctor: [],
    }


    render() {
          
        return (
             <View style={styles.container}>
                    <View>
                        <Text style = {styles.header}>Here</Text>
                        <TextInput style = {styles.text} underlineColorAndroid = "gray" placeholder = "Enter Symptoms" 
                                autoCapitalize = "none" required></TextInput>
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



             </View>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // alignItems: "center",
        justifyContent: "center",
        // margin: "15%",
        backgroundColor: "white",
        fontFamily: 'Iowan Old Style',
        width: "100%",
        height: "100%",
        padding: 30, 
        // backgroundColor: linear-gradient(#00ff99 29%, #00ffff 100%);
    },

    header: {
        color: "#02f0c8", 
    }




});
  

export default Symptoms;
