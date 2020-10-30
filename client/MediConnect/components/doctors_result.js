import React, { version } from 'react';
import { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';


class Doctors extends Component {

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
                    <Text style = {styles.header}>Doctors Found</Text>
                    <View>
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
        // alignItems: "center",
        //justifyContent: "center",
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
        fontSize: 20
    },

    text: {
            color:"#5c5c5c",
            fontSize: 15,
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
            fontSize: 15,
            color: '#02d9b5'
     },

     doctor: {
             //display: None,
             //borderRadius: 7,
             backgroundColor: "#d9d9d9",
             height: 120,
             width: 270,
             margin: 15,
             borderRadius: 5,
             shadowColor: "black",
             shadowOpacity:1,
             shadowRadius: 4.65,
             elevation: 8,
             padding: 15,
             alignSelf: "center",

         },

         doctorinfo: {
             fontFamily: 'Iowan Old Style',
             color:"black",
             fontSize: 11,
         }

});

export default Doctors;