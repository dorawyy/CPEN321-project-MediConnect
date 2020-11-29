import React from 'react';
import 'react-native-paper';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { TextInput } from 'react-native-paper';
import stripe from 'tipsi-stripe'
import axios from 'axios';



class PatientPayment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            number: "",
            expmonth: "",
            expyear: "",
            cvv: "",
            client_secret: "",
            intent_id: "", 
            key: "", 
        }
    }

    componentDidMount() {
        // stripe.setOptions({
        //     publishableKey: 'PUBLISHABLE_KEY'
        // })

        axios
	    // .post("http://54.183.200.234:5000/patient/pay", {
	    .post('http://10.0.2.2:5000/patient/pay', {
				// params: {
				// 	// symptoms: [text],
				// },
		})
        .then((res) => {
            console.log(res.data);
            this.setState({
                client_secret: res.data.client_secret,
                intent_id: res.data.intent_id,
                key: res.data.key,
            });
            // console.log(this.state.client_secret)
            // })
            // .catch((err) => {
            // 	console.log(err.response.data);
            // });
        });
    }

    async enterDetails() {
        await stripe.setOptions({
            publishableKey: this.state.key
            // publishableKey: 'pk_test_51Hq5lFCtCqrc6bMbbtRc4piee3sFgVehdWROY9pnYBgxKSXqjH28o9OphIQpiAh12vUXK8sGb4Ec3y5DF9YYvsoC00olyk8YPP'

        })

        console.log(this.state.key)

        try {
            const token = await stripe.paymentRequestWithCardForm({
                requiredBillingAddressFields: 'full',
                prefilledInformation: {
                  billingAddress: {
                    name: 'Gunilla Haugeh',
                    line1: 'Canary Place',
                    line2: '3',
                    city: 'Macon',
                    state: 'Georgia',
                    country: 'US',
                    postalCode: '31217',
                    email: 'ghaugeh0@printfriendly.com',
                  },
                },
              })
    
            console.log(token.card.tokenID)
        } catch (error) {
            console.log(error)

        }






	};

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

                <TouchableOpacity style={styles.button} testID="report_button"
                    onPress={() => {
                        // const {symptom} = this.state;
                        // this.props.navigation.navigate('Doctors');
                        this.enterDetails()
                    }}
                >
							<Text
                            	style={styles.buttonText}
							>
								Enter Detials
							</Text>
				</TouchableOpacity>

                <TouchableOpacity style={styles.button} testID="report_button"
                    onPress={() => {
                        // const {symptom} = this.state;
                        // this.props.navigation.navigate('Doctors');
                        this.enterDetails()
                    }}
                >
							<Text
                            	style={styles.buttonText}
							>
								Make Payment
							</Text>
				</TouchableOpacity>


            </View>
		);
	}
}

const styles = StyleSheet.create({

    
	button: {
		backgroundColor: 'white',
		padding: 10,
		margin: 15,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: 'black',
		borderRadius: 7,
    },
    
    buttonText: {
		fontFamily: 'Iowan Old Style',
		fontSize: 15,
		color: '#02d9b5',
	},


});

export default PatientPayment;
