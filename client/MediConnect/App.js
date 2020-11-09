// import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-paper';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import StartUpPage from './components/startup';
import DoctorSignInPage from './components/doctor_signin';
import DoctorSignUpPage from './components/doctor_signup';
import PatientSignInPage from './components/patient_signin';
import PatientSignUpPage from './components/patient_signup';
import DoctorHomePage from './components/doctor_home';
import PatientHomePage from './components/patient_home';
import SymptomsPage from './components/symptoms';
import DoctorsPage from './components/doctor_result';
import DoctorSettingsPage from './components/doctor_settings';
import DoctorHomeNavigatorPage from './components/doctor_home_navigator';
import DoctorAppointmentsPage from './components/doctor_appointments';
import DoctorNotificationsPage from './components/doctor_notifications';

const App: () => React$Node = () => {

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="StartUp"
          component={StartUpPage}
          options={{headerShown:false}}/>
        <Stack.Screen
          name="DoctorSignIn"
          component={DoctorSignInPage}
          options={{headerTitle:false}}/>
        <Stack.Screen name="DoctorSignUp"
          component={DoctorSignUpPage}
          options={{headerTitle:false}}/>
        <Stack.Screen name="PatientSignIn"
          component={PatientSignInPage}
          options={{headerTitle:false}}/>
        <Stack.Screen name="PatientSignUp"
          component={PatientSignUpPage}
          options={{headerTitle:false}}/>
        <Stack.Screen name="DoctorHome"
          component={DoctorHomePage}
          options={{headerTitle:false}}/>
        <Stack.Screen
          name="PatientHome"
          component={PatientHomePage}
          options={{headerTitle:false}}/>
        <Stack.Screen
          name="Symptoms"
          component={SymptomsPage}
          options={{headerTitle:false}}/>
        <Stack.Screen
          name="Doctors"
          component={DoctorsPage}
          options={{headerTitle:false}}/>
        <Stack.Screen
          name="DoctorSettings"
          component={DoctorSettingsPage}
          options={{headerTitle:true}}/>
        <Stack.Screen
          name="DoctorHomeNavigator"
          component={DoctorHomeNavigatorPage}
          options={{headerTitle:false}}/>
        <Stack.Screen
          name="DoctorAppointments"
          component={DoctorAppointmentsPage}
          options={{headerTitle:false}}/>
        <Stack.Screen
          name="DoctorNotifications"
          component={DoctorNotificationsPage}
          options={{headerTitle:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export default App;
