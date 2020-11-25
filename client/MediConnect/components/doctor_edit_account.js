import React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

class DoctorEditAccount extends Component {

	render() {
		return (

            <View style={styles.container}>
                <View style={styles.field}>
                    <Text style={styles.header}>First Name</Text>
                    <TextInput
                        style={styles.text}
                        underlineColorAndroid="gray"
                        placeholder={global.first_name}
                        autoCapitalize="none"
                        // onChangeText={this.handleSymptom}
                        required
                    />
                </View>

                <View>
                    <Text style={styles.header}>Last Name</Text>
                    <TextInput
                        style={styles.text}
                        underlineColorAndroid="gray"
                        placeholder={global.last_name}
                        autoCapitalize="none"
                        // onChangeText={this.handleSymptom}
                        required
                    />
                </View>

                <View>
                    <Text style={styles.header}>Email</Text>
                    <TextInput
                        style={styles.text}
                        underlineColorAndroid="gray"
                        placeholder={global.email}
                        autoCapitalize="none"
                        // onChangeText={this.handleSymptom}
                        required
                    />
                </View>
                {/* <View>
                    <Text style={styles.header}>Age</Text>
                    <TextInput
                        style={styles.text}
                        underlineColorAndroid="gray"
                        placeholder={global.age}
                        autoCapitalize="none"
                        // onChangeText={this.handleSymptom}
                        required
                    />
                </View> */}
                {/* <View>
                    <Text style={styles.header}>Specialization</Text>
                    <TextInput
                        style={styles.text}
                        underlineColorAndroid="gray"
                        placeholder={global.specialization}
                        autoCapitalize="none"
                        // onChangeText={this.handleSymptom}
                        required
                    />
                </View>

                <View>
                    <Text style={styles.header}>Years of Experience</Text>
                    <TextInput
                        style={styles.text}
                        underlineColorAndroid="gray"
                        placeholder={global.years_of_experience}
                        autoCapitalize="none"
                        // onChangeText={this.handleSymptom}
                        required
                    />
                </View> */}


            </View>

            

		);
	}
}

const styles = StyleSheet.create({

    container: {
		flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center',
		// margin: "15%",
		backgroundColor: 'white',
		fontFamily: 'Iowan Old Style',
		width: '100%',
		height: '100%',
		padding: 30,
		// backgroundColor: linear-gradient(#00ff99 29%, #00ffff 100%);
	},

    header: {
		color: '#02f0c8',
		fontSize: 18,
	},

	text: {
		color: '#5c5c5c',
		fontSize: 17,
    },
    
    field: {
        paddingBottom: 15, 

    },


});

export default DoctorEditAccount;
