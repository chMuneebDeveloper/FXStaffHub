import { View, Alert, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Design } from './Design';
import { signIn } from '../../Constant/URLs';
import { sha1 } from 'react-native-sha1';
import { ServerCall } from '../../Redux/actions/asynchronousAction';

const LoginScreen = props => {
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onClickSignin = async values => {
    setLoading(true);
    let accessToken, loginUserInfo;
    setUsername(values.userName);
    setPassword(values.password);
    sha1(values.password).then(async hash => {
      loginUserInfo = {
        loginid: values.userName,
        Password: hash,
      };

      const loginURL = signIn;

      const response = await ServerCall('', loginURL, 'POST', loginUserInfo);
      console.log('---------', response.CheckInTime);
      if (response.success) {
        if (response.Token) {
          accessToken = response.Token;
          if (response?.CheckInTime !== "") {
            console.log('--------1-', response);
            await AsyncStorage.setItem('Check_In', response?.CheckInTime);
          } else {
            console.log('-----2----', response);
            await AsyncStorage.removeItem('Check_In');
          }
          await AsyncStorage.setItem('ACCESS_TOKEN', accessToken);

          setLoading(false);
          setSuccess(true);
          props.navigation.replace('Main');
        } else {
          setLoading(true);
          setAlert(true);
          setMessage('No Access Token');
          setLoading(false);
        }
      } else {
        setLoading(true);
        setAlert(true);
        setMessage(response.ReturnMessage);
        setLoading(false);
      }
    });
  };

  const getData = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedPassword = await AsyncStorage.getItem('password');
      console.log('Data saved successfully!', savedUsername, savedPassword);
      if (savedUsername !== null) {
        setUsername(savedUsername);
        setRememberPassword(true);
      }
      if (savedPassword !== null) {
        setPassword(savedPassword);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const saveData = async values => {
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
      console.log('Data saved successfully!');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (rememberPassword === true) {
      saveData();
    }
  }, [success]);
  return (
    <View>
      <Design
        isVisiblePassword={isVisiblePassword}
        setVisiblePassword={setVisiblePassword}
        rememberPassword={rememberPassword}
        setRememberPassword={setRememberPassword}
        keyboardStatus={keyboardStatus}
        onClickSignin={onClickSignin}
        isLoading={isLoading}
        username={username}
        password={password}
        alert={alert}
        setAlert={setAlert}
        message={message}
      />
    </View>
  );
};
export default LoginScreen;
