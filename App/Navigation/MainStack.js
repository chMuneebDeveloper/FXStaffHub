import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Screens
import LoginScreen from '../Screens/Login/index';
import SplashScreen from '../Screens/Splash/index';
import HomeScreen from '../Screens/Home/index';
import LeaveScreen from '../Screens/Leave/index';
import RequestScreen from '../Screens/Request/index';
import HistoryScreen from '../Screens/History/index';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'home'}
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name={'splash'}
        component={SplashScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'login'}
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'home'}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'LeaveScreen'}
        component={LeaveScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'ResquestScreen'}
        component={RequestScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'HistoryScreen'}
        component={HistoryScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
