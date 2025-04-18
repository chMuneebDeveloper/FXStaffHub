import * as React from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import SplashScreen from '../Screens/Splash/index';

const Stack = createNativeStackNavigator();

const RootStack = props => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'splash'} component={SplashScreen} />
      <Stack.Screen name={'Main'} component={MainStack} />
      <Stack.Screen name={'Auth'} component={AuthStack} />
    </Stack.Navigator>
  );
};

export default RootStack;
