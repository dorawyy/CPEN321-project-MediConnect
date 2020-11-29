import React from 'react';
import 'react-native-paper';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { TextInput } from 'react-native-paper';


class PatientPayment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            number: "",
            expmonth: "",
            expyear: "",
            cvv: "",

        }
    }

	render() {
		return (
            <View>
                <TextInput
                placeholder={"Enter credit card number"}
                onChangeText={(number) => this.setState(number)}
                >

                </TextInput>
                <TextInput
                placeholder={"Enter exp month"}
                onChangeText={(expmonth) => this.setState(expmonth)}
                >

                </TextInput>
                <TextInput
                placeholder={"Enter exp year"}
                onChangeText={(expyear) => this.setState(expyear)}
                >

                </TextInput>
                <TextInput
                placeholder={"Enter cvv"}
                onChangeText={(cvv) => this.setState(cvv)}
                >

                </TextInput>


            </View>
		);
	}
}

const styles = StyleSheet.create({

});

export default PatientPayment;
