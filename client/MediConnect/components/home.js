//import { NavigationHelpersContext } from '@react-navigation/native';
import React, { version } from 'react';
import { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios'; 

  

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
                            {/* <Image source={require("../assets/logo.png")} resizeMode="stretch"/> */}
                            <View style={styles.infobox}>
<<<<<<< HEAD
                                <View style ={styles.user_icon}>
                                    <Image source={require("../assets/user_icon.png")} resizeMode="stretch" onPress={() => this.props.navigation.navigate("AccountInfo")}/>
                                </View>
                                <View alignSelf="flex-start">
                                <Text style = {styles.text} underlineColorAndroid="gray">"Age    : 43 years"\n</Text>

                                <Text style = {styles.text} underlineColorAndroid="gray">"Gender : M"\n</Text>

                                <Text style = {styles.text} underlineColorAndroid="gray">"Height : 176 cm"\n</Text>

                                <Text style = {styles.text} underlineColorAndroid="gray">"Weight : 78 kg"\n</Text>

=======
                                {/* <View style ={styles.user_icon}>
                                    <Image source={require("../assets/user_icon.png")} onPress={() => this.props.navigation.navigate("AccountInfo")}/>
                                </View> */}
                                <View >
                                <Text style = {styles.text} >Age    : 43 years</Text>
                                <Text style = {styles.text} >Gender : M</Text>
                                <Text style = {styles.text} >Height : 176 cm</Text>
                                <Text style = {styles.text} >Weight : 78 kg</Text>
                                </View>
>>>>>>> b5f071b96df8c90fdedd41c9f2e39235fcf680c8
                            </View>
                            <TouchableOpacity style={styles.button}><Text style={styles.buttonText} onPress={() => this.props.navigation.navigate("Symptoms")}>Report Symptoms</Text></TouchableOpacity>
                            <View >
                            {this.state.serverData.map(serverData =><View style={styles.doctor} key={serverData.password}>
                                            <Text style={styles.doctorinfo}>{'Doctor Name: ' + serverData.first_name +' ' + serverData.last_name}</Text>
                                            <Text style={styles.doctorinfo}>{'Specialisation: ' + serverData.specialization}</Text>
                                            <Text style={styles.doctorinfo}>{'Doctor Email: ' + serverData.email}</Text>
                                            <Text style={styles.doctorinfo}>{'Doctor Rating: ' + serverData.rating}</Text>
                                            <Text style={styles.doctorinfo}>{'Verified: ' + serverData.verified}</Text>
                                            <Text style={styles.doctorinfo}>{'Years of Experience: ' + serverData.years_of_experience}</Text>
                                        </View>)}
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

    user_icon: {
                // alignSelf:"flex-start",
                borderRadius: 5,
                shadowColor: "black",
                shadowOpacity:1,
                shadowRadius: 2.45,
                padding: 20,
<<<<<<< HEAD
                width: 20,
                height: 20,
=======
                height:1, 
                width:1, 

>>>>>>> b5f071b96df8c90fdedd41c9f2e39235fcf680c8
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
        color: '#02d9b5'
    },

<<<<<<< HEAD
    text: {
             fontFamily: 'Iowan Old Style'
             color:"white",
             fontSize: 12,
    },
=======
     text: {
             fontFamily: 'Iowan Old Style',
             color:"white",
             fontSize: 20,
         }, 

    doctor: {
        flexDirection: 'row',
        justifyContent: "center",
        borderRadius: 7, 
        backgroundColor: "#d9d9d9", 
        height: 150, 
        width: 270, 
        margin: 20,
        padding: 20,
        alignSelf: "center",


    },
    
    doctorinfo: {

        justifyContent: "center",
        borderRadius: 7, 
        height: 150, 
        width: 270, 
        margin: 20,
        padding: 20,    
    }
>>>>>>> b5f071b96df8c90fdedd41c9f2e39235fcf680c8

});
  

export default Home;
