import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import 'react-native-paper'; 

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  Component,
} from 'react'; 

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();

// import AuthContext from './page.components/context'
import StartUpPage from './components/startup';
import DoctorSignInPage from './components/doctor_signin';
import DoctorSignUpPage from './components/doctor_signup';
import PatientSignInPage from './components/patient_signin';
import PatientSignUpPage from './components/patient_signup';
import DoctorHomePage from './components/doctor_home';
import PatientHomePage from './components/patient_home';
import SymptomsPage from './components/symptoms';
import DoctorsPage from './components/doctors_result';
import DoctorSettingsPage from './components/doctor_settings';
import DoctorHomeNavigatorPage from './components/doctor_home_navigator';
import DoctorAppointmentsPage from './components/doctor_appointments';
import DoctorNotificationsPage from './components/doctor_notifications';


const App: () => React$Node = () => {

  // const [isLoading, setIsLoading] = React.useState(true); 
  // const [userToken, setUserToken] = React.useState(null);
  // const timeout = 1000;

  // const authContext = React.useMemo(() => ({
  //   signIn: () => {
  //     setUserToken('alsj'); 
  //     setIsLoading(false);
  //   },
  //   signOut: () => {
  //     setUserToken(null); 
  //     setIsLoading(false); 
  //   }, 
  //   signUp: () => {
  //     setUserToken('alsj'); 
  //     setIsLoading(false);
  //   }, 
  // }))

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, timeout);
  // }, [])

  // if (isLoading) {
  //   return(
  //     <View>
  //       <ActivityIndicator size="large"></ActivityIndicator>
  //     </View>
  //   )
  // }

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartUp" component={StartUpPage} options={{headerShown:false}}/>
        <Stack.Screen name="DoctorSignIn" component={DoctorSignInPage} options={{headerTitle:false}}/>
        <Stack.Screen name="DoctorSignUp" component={DoctorSignUpPage} options={{headerTitle:false}}/>
        <Stack.Screen name="PatientSignIn" component={PatientSignInPage} options={{headerTitle:false}}/>
        <Stack.Screen name="PatientSignUp" component={PatientSignUpPage} options={{headerTitle:false}}/>
        <Stack.Screen name="DoctorHome" component={DoctorHomePage} options={{headerTitle:false}}/>
        <Stack.Screen name="PatientHome" component={PatientHomePage} options={{headerTitle:false}}/>
        <Stack.Screen name="Symptoms" component={SymptomsPage} options={{headerTitle:false}}/>
        <Stack.Screen name="Doctors" component={DoctorsPage} options={{headerTitle:false}}/>
        <Stack.Screen name="DoctorSettings" component={DoctorSettingsPage} options={{headerTitle:true}}/>
        <Stack.Screen name="DoctorHomeNavigator" component={DoctorHomeNavigatorPage} options={{headerTitle:false}}/>
        <Stack.Screen name="DoctorAppointments" component={DoctorAppointmentsPage} options={{headerTitle:false}}/>
        <Stack.Screen name="DoctorNotifications" component={DoctorNotificationsPage} options={{headerTitle:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
