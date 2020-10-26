//import { NavigationHelpersContext } from '@react-navigation/native';
import React, { version } from 'react';
import { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

  

class Home extends Component {


    render() {
          
        return (
             <View style={styles.container}>
                            <Image source={require("../assets/logo.png")} resizeMode="stretch"/>
                            <View style={styles.infobox}>
                                <View style ={styles.user_icon}>
                                    <Image source={require("../assets/user_icon.png")} resizeMode="stretch" onPress={() => this.props.navigation.navigate("AccountInfo")}/>
                                </View>
                                <View alignSelf="flex-start">
                                <Text style = {styles.text} underlineColorAndroid="gray">"Age    : 43 years"\n</Text>

                                <Text style = {styles.text} underlineColorAndroid="gray">"Gender : M"\n</Text>

                                <Text style = {styles.text} underlineColorAndroid="gray">"Height : 176 cm"\n</Text>

                                <Text style = {styles.text} underlineColorAndroid="gray">"Weight : 78 kg"\n</Text>

                            </View>
                            <TouchableOpacity style={styles.button}><Text style={styles.buttonText} onPress={() => this.props.navigation.navigate("Report Symptoms")}>Report Symptoms</Text></TouchableOpacity>
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
                alignSelf:"flex-start",
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
            // height: 300,
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
        color: '#02d9b5'
    },

    text: {
             fontFamily: 'Iowan Old Style'
             color:"white",
             fontSize: 12,
    },

});
  

export default Home;
