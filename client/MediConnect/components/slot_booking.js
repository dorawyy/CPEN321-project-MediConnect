import {
    // AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar, 
    Component,
  } from 'react-native';
  // import * as firebase from 'firebase'
  // import Animbutton from '../../components/animbutton'
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
  export default class Slot extends Component {
    // constructor(props) {
    //    super(props);
    //    this.state ={
    //      bookingDate: this.props.navigation.state.params.bookingDate
    //    }
   
    //  }
    _onPressBack(){
      const {goBack} = this.props.navigation
      goBack()
    }

    /*
    _bookSlot(status,key,value){
      const month = this.state.bookingDate.month
      const date = this.state.bookingDate.day
      const user = firebase.auth().currentUser
      const uid = user.uid
      let userDataJson = {}
      if(status)
      userDataJson[key] = uid
      else
      userDataJson[key] = null
   
      firebase.database().ref('users').child(uid).child("appointments").child(month).child(date).update(userDataJson)
    }
    */

    //<Animbutton countCheck={0} onColor={"green"} effect={"pulse"} _onPress={(status) => _this._bookSlot(status,k,slots[k]) } text={slots[k]} />

    render() {
      let _this = this
      const slots = jsonData.slots
      const slotsarr = Object.keys(slots).map( function(k) {
        return (  <View key={k} style={{margin:5}}> 
                  </View>)
      });
      return (
        <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <View>
          <TouchableOpacity onPress={() => this._onPressBack() }><Text>Back</Text></TouchableOpacity>
        </View>
        { slotsarr }
        </View>
      );
    }
  }
   
  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });