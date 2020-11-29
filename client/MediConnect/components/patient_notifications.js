import React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CheckBox} from 'react-native-elements';

class PatientNotifications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isTaskDone: props.checked,
		};
	}

	switchTaskDone = () => {
		this.setState({
			isTaskDone: !this.state.isTaskDone,
		});
	};

	render() {
		return (
			<View
				// start={{x: 0.0, y: 0.25}}
				// end={{x: 0.7, y: 1}}
				// colors={['#ffffff', '#ffffff', 'rgba(2, 217, 188, 0.2)']}
				// style={styles.LinearGradient}
			>
				<View style={styles.container}>
					<View>
						<TouchableOpacity
							style={styles.option}
							onPress={this.switchTaskDone}
						>
							<CheckBox
								checked={this.state.isTaskDone}
								uncheckedColor="white"
								checkedColor="blue"
								onPress={this.switchTaskDone}
							/>
							<Text style={styles.optionText}>Notification 1</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity
							style={styles.option}
							onPress={this.switchTaskDone}
						>
							<CheckBox
								checked={this.state.isTaskDone}
								uncheckedColor="white"
								checkedColor="blue"
								onPress={this.switchTaskDone}
							/>
							<Text style={styles.optionText}>Notification 2</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity
							style={styles.option}
							onPress={this.switchTaskDone}
						>
							<CheckBox
								checked={this.state.isTaskDone}
								uncheckedColor="white"
								checkedColor="blue"
								onPress={this.switchTaskDone}
							/>
							<Text style={styles.optionText}>Notification 3</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity
							style={styles.option}
							onPress={this.switchTaskDone}
						>
							<CheckBox
								checked={this.state.isTaskDone}
								uncheckedColor="white"
								checkedColor="blue"
								onPress={this.switchTaskDone}
							/>
							<Text style={styles.optionText}>Notification 4</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity
							style={styles.option}
							onPress={this.switchTaskDone}
						>
							<CheckBox
								checked={this.state.isTaskDone}
								uncheckedColor="white"
								checkedColor="blue"
								onPress={this.switchTaskDone}
							/>
							<Text style={styles.optionText}>Notification 5</Text>
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Mark as read</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Delete</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	// LinearGradient: {
	// 	width: '100%',
	// 	height: '100%',
	// },

	container: {
		padding: 30,
	},

	icon: {
		width: 50,
		justifyContent: 'center',
	},

	option: {
		padding: 10,
		borderColor: '#02f0c8',
		borderRadius: 7,
		backgroundColor: '#d9d9d9',
		alignItems: 'center',
		margin: 10,
		flexDirection: 'row',
		width: 320,
		height: 50,
	},

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

	optionText: {
		fontFamily: 'Iowan Old Style',
		fontSize: 15,
		color: 'black',
	},
});

export default PatientNotifications;
