import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
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
const Stack = createStackNavigator();

// import AuthContext from './page.components/context'
import StartUpPage from './components/startup';
import SignInPage from './components/signin';
import SignUpPage from './components/signup';
import HomePage from './components/home';

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
        <Stack.Screen name="SignIn" component={SignInPage} options={{headerTitle:false}}/>
        <Stack.Screen name="SignUp" component={SignUpPage} options={{headerTitle:false}}/>
        <Stack.Screen name="Home" component={HomePage} options={{headerTitle:false}}/>
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
