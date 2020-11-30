import React from 'react';
import {Component} from 'react';
import '../components/user_info';
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
  
  const jsonData = { "slots" : {
      "slot1": "9:00am to 10:00am",
      "slot2": "10:00am to 11:00am",
      "slot3": "11:00am to 12:00pm",
      "slot4": "1:00pm to 2:00pm",
      "slot5": "2:00pm to 3:00pm",
      "slot6": "3:00pm to 4:00pm"
   }
  }

 class SlotBooking extends Component {
   
    constructor(props) {
        super(props);
        /* 
       this.state ={
        bookingDate: this.props.navigation.state.params.bookingDate
       }
       */
      }
    

   state = {
    serverData: [],
    bookingDate: this.props.route.params.bookingDate, 
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

  
    _bookSlot(status,key,value){
      console.log(this.state.bookingDate)
      const min = 0
      const sec = 0
      const month = this.state.bookingDate.month-1
      const year = this.state.bookingDate.year
      const date = this.state.bookingDate.day
      var start_hour = 0
      var end_hour = 0

      if(key=0){
        start_hour = 9
        end_hour = 10
      }
      else if(key=1){
        start_hour = 10
        end_hour = 11
      }
      else if(key=2){
        start_hour = 11
        end_hour = 12
      }
      else if(key=3){
        start_hour = 13
        end_hour = 14
      }
      else if(key=4){
        start_hour = 14
        end_hour = 15
      }
      else if(key=5){
        start_hour = 15
        end_hour = 16
      }
     
      var uid = ''
      if(status)
      uid = global.userID
      else
      uid = '0'

      axios
			// .post("http://54.183.200.234:5000/patient/appointment", {
			.post('http://10.0.2.2:5000/patient/appointment', {
			  patientId: uid,
        doctorId: '5f9bc47ffb8e8538dc0b5254',
        start_time:  new Date(year, month, date, start_hour, min, sec),
        end_time: new Date(year, month, date, end_hour, min, sec)
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err.response);
			});
   
      //firebase.database().ref('users').child(uid).child("appointments").child(month).child(date).update(userDataJson)
    }

    //
    //<View>
    //<TouchableOpacity onPress={() => this._onPressBack() }><Text>Back</Text></TouchableOpacity>
    //</View>

    render() {
      
      let _this = this
      const slots = jsonData.slots
      const slotsarr = Object.keys(slots).map( function(k) {
        return (  
                  <View key={k} style={{margin:5}}> 
                    <Animbutton countCheck={0} onColor={"green"} effect={"pulse"} _onPress={(status) => _this._bookSlot(status,k,slots[k]) } text={slots[k]} />
                  </View>)
      });
      return (
        <View style={styles.container}>
        <Text style={styles.header}>Choose a time-slot</Text>
        <StatusBar barStyle="light-content"/>
        { slotsarr }
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
  });

  export default SlotBooking;