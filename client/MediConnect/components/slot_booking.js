import React from 'react';
import {Component} from 'react';
import '../components/user_info';
import { Dropdown } from 'react-native-material-dropdown';
import {LogBox} from 'react-native';
import axios from 'axios';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar
  } from 'react-native';
  // import * as firebase from 'firebase'
  import Animbutton from '../components/animbutton'
  // import Commonstyle from '../../components/commonstyle'
  
  /*
  const jsonData = { "slots" : {
      "slot1": "9:00am to 10:00am",
      "slot2": "10:00am to 11:00am",
      "slot3": "11:00am to 12:00pm",
      "slot4": "1:00pm to 2:00pm",
      "slot5": "2:00pm to 3:00pm",
      "slot6": "3:00pm to 4:00pm"
   }
  }*/

 class SlotBooking extends Component {
   
   /* constructor(props) {
        super(props);
        
       this.state ={
        bookingDate: this.props.navigation.state.params.bookingDate
       }
       
      }
      */
    

   state = {
    //serverData: [],
    bookingDate: this.props.route.params.bookingDate,
    time_slot: '', 
    //specs_data: [{spec0: [], spec1: [], spec2: []}], 
    //bookingDate: this.props.navigation.state.params.bookingDate,
    screenHeight: 0,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
		// Save the content height in state
		this.setState({ screenHeight: contentHeight });
	};

    _onPressBack(){
      const {goBack} = this.props.navigation
      goBack()
    }

  
    saveEdits(){
      console.log(this.state.bookingDate)
      const min = 0
      const sec = 0
      const mil = 0
      const month = this.state.bookingDate.month-1
      const year = this.state.bookingDate.year
      const date = this.state.bookingDate.day
      var start_hour = 0
      var end_hour = 0
      var slot = this.state.time_slot

      console.log(start_hour)
      console.log(end_hour)
      if(slot==='9:00am to 10:00am'){
        start_hour = 9
        end_hour = 10
        console.log(start_hour)
        console.log(end_hour)
      }
      else if(slot==='10:00am to 11:00am'){
        start_hour = 10
        end_hour = 11
        console.log(start_hour)
        console.log(end_hour)
      }
      else if(slot==='11:00am to 12:00pm'){
        start_hour = 11
        end_hour = 12
        console.log(start_hour)
        console.log(end_hour)
      }
      else if(slot==='1:00pm to 2:00pm'){
        start_hour = 13
        end_hour = 14
        console.log(start_hour)
        console.log(end_hour)
      }
      else if(slot==='2:00pm to 3:00pm'){
        start_hour = 14
        end_hour = 
        console.log(start_hour)
        console.log(end_hour)
      }
      else if(slot==='3:00pm to 4:00pm'){
        start_hour = 15
        end_hour = 16
        console.log(start_hour)
        console.log(end_hour)
      }
      else if(slot==='4:00pm to 5:00pm'){
        start_hour = 16
        end_hour = 17
        console.log(start_hour)
        console.log(end_hour)
      }

      console.log(start_hour)
      console.log(end_hour)

      var start_utc = start_hour - 8
      var end_utc = end_hour - 8
     
      var start = new Date(year, month, date, start_utc, min, sec, mil);
      var end = new Date(year, month, date, end_utc, min, sec, mil);
      
      console.log(start)
      console.log(end)
      
      var uid = ''
      uid = global.userID

      axios
			// .post("http://54.183.200.234:5000/patient/appointment", {
			.post('http://10.0.2.2:5000/patient/appointment', {
			  patientId: uid,
        doctorId: '5fc563edbc473b4f04e605a5',
        start_time: start  ,
        end_time: end,
      },
      {
        headers: {
            Cookie: global.jwt,
        },
        })
			.then((res) => {
        if (res.status === 400) {
          console.log(res.body);
        }
        else{
          this.props.navigation.navigate('PatientPayment');
        }
			})
			.catch((err) => {
        console.log(err.response);
        alert('Appointment couldnt be booked.')
			});
   
      //firebase.database().ref('users').child(uid).child("appointments").child(month).child(date).update(userDataJson)
    }

    //
    //<View>
    //<TouchableOpacity onPress={() => this._onPressBack() }><Text>Back</Text></TouchableOpacity>
    //</View>

    render() {

      let data = [{
        value: '9:00am to 10:00am',
      }, {
        value: '10:00am to 11:00am',
      }, {
        value: '11:00am to 12:00pm',
      }, {
        value: '1:00pm to 2:00pm',
      }, {
        value: '2:00pm to 3:00pm',
      }, {
        value: '3:00pm to 4:00pm',
      }, {
        value: '4:00pm to 5:00pm',
      }];
      
     // let _this = this
      //const slots = jsonData.slots
     /* const slotsarr = Object.keys(slots).map( function(k) {
        return (  
                  <View key={k} style={{margin:5}}> 
                    <Animbutton countCheck={0} onColor={"green"} effect={"pulse"} _onPress={(status) => _this._bookSlot(status,k,slots[k]) } text={slots[k]} />
                  </View>)
      });*/
      return (
        <View style={styles.container}>
        <Text style={styles.header}>Choose a time-slot</Text>
        <StatusBar barStyle="light-content"/>
        {/* slotsarr */}
    
        <Text style={styles.header}>Time Slots</Text>
        <Dropdown
          label='Slots'
          data={data}
          useNativeDriver={true}
          onChangeText={     
            (value) => {
                        console.log(value)
                        LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`']);
                        this.setState({
                        time_slot: value }
                        );
                       }}
        />

        <TouchableOpacity style={styles.button}>
					<Text
								style={styles.buttonText}
								onPress={() => {
									this.saveEdits()
								}}
							>
								Accept
					</Text>
				</TouchableOpacity>
        </View>
      );
    }
  }
   
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    header: {
      color: '#02f0c8',
      fontSize: 20,
      padding:10
    },
    field: {
      paddingBottom: 10, 

    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    buttonText: {
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Iowan Old Style',
          fontSize: 20,
          color: 'white', 
          backgroundColor: '#02f0c8',
          paddingTop: 5, 
          paddingBottom: 5, 
          paddingRight: 20, 
          paddingLeft: 20, 
          // padding: 10,
          margin: 10,
          borderRadius: 7,
          // width: 100, 
  
  
    },
  });

  export default SlotBooking;