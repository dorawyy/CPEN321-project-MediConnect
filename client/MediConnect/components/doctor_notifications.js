import React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CheckBox} from 'react-native-elements';
// import PushNotification from 'react-native-push-notification'; 
import {Notifications} from 'react-native-notifications';


class DoctorNotifications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notifsSelect: [],
			notifs: [], 
		};

		this.state.notifs =  [["notif1", "notif 1 body"], ["notif2", "notif 2 body"], ["notif3", "notif 3 body"]]

		for (var i = 0; i < this.state.notifs.length; i++) {
			this.state.notifsSelect[i] = false; 
		}

		// console.log(this.state.isTaskDone[0])
		// console.log(this.state.isTaskDone[1])
		// console.log(this.state.isTaskDone[2])



		// PushNotification.configure({
		// 	// (optional) Called when Token is generated (iOS and Android)
		// 	onRegister: function (token) {
		// 	  console.log("TOKEN:", token);
		// 	},
		  
		// 	// (required) Called when a remote is received or opened, or local notification is opened
		// 	onNotification: function (notification) {
		// 	  console.log("NOTIFICATION:", notification);
		// 	},

		// 	permissions: {
		// 		alert: true,
		// 		badge: true,
		// 		sound: true,
		// 	  },
		  
		// 	popInitialNotification: true,
		// 	requestPermissions: Platform.OS === 'ios'
		//   });


		//// new notifs packae -------------------------------------------

		// Notifications.registerRemoteNotifications();

		// Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
		//   console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
		//   completion({alert: false, sound: false, badge: false});
		// });
	
		// Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
		//   console.log(`Notification opened: ${notification.payload}`);
		//   completion();
		// });
	}

	switchCheck(count) {
		// this.setState({
			this.state.notifsSelect[count] =  !(this.state.notifsSelect[count])
		// });
		this.forceUpdate()

		console.log(count)
	}

	testNotif = () => {
		console.log("Inside test notif")
		// PushNotification.localNotification({
		// 	title: "My Notification Title", // (optional)
		// 	message: "My Notification Message", // (required)
		//   });
		Notifications.postLocalNotification({
			title: "Local notification",
			body: "hey kk!",
			// sound: "chime.aiff",
			silent: false,

		})
	}

	allRead = () => {
		console.log("here!")
		this.setState({
			notifs: [], 
			notifsSelect: [], 
		})
		this.forceUpdate()

		 // remove from backend as well!!!!!!!!!!
	}

	someRead = () => {

		for (var i = 0; i < this.state.notifs.length; i++) {
			if (this.state.notifsSelect[i] == true) {
				this.state.notifs.splice(i, 1)
				this.state.notifsSelect.splice(i, 1)
				i = -1; 
			}
		}

		// this.state.setState.splice(index, 1);
		// console.log(this.state.notifs)
		// console.log(this.state.notifsSelect)

		this.forceUpdate()

				 // remove from backend as well!!!!!!!!!!
	}

	render() {

		let notifsRender; 

		if (this.state.notifs.length == 0) {
			notifsRender = 
			(<View style={styles.noNotifsContainer}>
				<Text style={styles.noNotifs}>
					You have no notifications!
				</Text>
			</View>)
		} else {
			notifsRender = 
			(this.state.notifs.map((notif, count) =>(
				<View key={count}>
				<TouchableOpacity
					style={styles.option}
					onPress={() => this.switchCheck(count)}
				>
					<CheckBox
						checked={this.state.notifsSelect[count]}
						uncheckedColor="white"
						checkedColor='#5c5c5c'
						// onPress={this.switchTaskDone(count)}
					/>
					<View>
						<Text style={styles.optionText}>{notif[0]}</Text>
						<Text style={styles.optionBody}>{notif[1]}</Text>
					</View>
				</TouchableOpacity>
			</View>)

			))
		}

		return (
			<ScrollView
				style= {{backgroundColor: 'white'}}
			>
				<View style={styles.container}>
					{notifsRender}

				</View>
				<View style={styles.buttonsContainer}>
					<TouchableOpacity style={styles.button} testID='Notifications_Page'>
						<Text style={styles.buttonText} onPress={() => this.someRead()}>Mark selected as read</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={() => this.allRead()}>
						<Text style={styles.buttonText}>Mark all as read</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={()=>this.testNotif()}>
						<Text style={styles.buttonText}>test notifffssssssss</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
			
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
		backgroundColor: 'white'
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
		// height: 50,
	},

	buttonsContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},

	button: {
		backgroundColor: '#02f0c8',
		padding: 10,
		margin: 5,
		height: 40,
		shadowColor: 'black',
		borderRadius: 7,
		width: 250, 
		alignItems: 'center',
		justifyContent: 'center',
	},

	buttonText: {
		fontFamily: 'Iowan Old Style',
		fontSize: 17,
		color: '#5c5c5c',
	},

	optionText: {
		fontFamily: 'Iowan Old Style',
		fontSize: 17,
		color: '#5c5c5c', 
	},

	optionBody: {
		fontFamily: 'Iowan Old Style',
		fontSize: 16,
		color: '#5c5c5c', 
	},

	noNotifs: {
		fontFamily: 'Iowan Old Style',
		fontSize: 20,
		color: '#5c5c5c', 
	},

	noNotifsContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	}
});

export default DoctorNotifications;
