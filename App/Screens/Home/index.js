import {
  Image,
  View,
  Alert,
  StatusBar,
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform, Linking
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { Design } from './Design';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import { ServerCall } from '../../Redux/actions/asynchronousAction';
import { markAttendance } from '../../Constant/URLs';
import Leaves from '../.././Assets/SVG/Leaves.svg';
import Request from '../.././Assets/SVG/Request.svg';
import History from '../.././Assets/SVG/History.svg';
import Setting from '../.././Assets/SVG/Setting.svg';
import Support from '../.././Assets/SVG/Support.svg';
import Tracking from '../.././Assets/SVG/Tracking.svg';
import sizeHelper from '../../Helpers/sizeHelper';

const HomeScreen = props => {
  const [currentDateTime, setCurrentDateTime] = useState(moment());
  const [attendance, setAttendance] = useState(false);
  const [checkinTime, setCheckinTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const Links = [
    {
      name: 'Leaves',
      active:true,
      image: (
        <Leaves width={sizeHelper.calHp(80)} height={sizeHelper.calHp(80)} />
      ),
    },
    {
      name: 'Request',
      active:true,
      image: (
        <Request width={sizeHelper.calHp(80)} height={sizeHelper.calHp(80)} />
      ),
    },
    {
      name: 'History',
      active:true,
      image: (
        <History width={sizeHelper.calHp(80)} height={sizeHelper.calHp(80)} />
      ),
    },
    // {              // add these funcationalities in feature
    //   name: 'Tracking',
    //   active:false, // add funcationalties in feature
    //   image: (
    //     <Tracking width={sizeHelper.calHp(80)} height={sizeHelper.calHp(80)} />
    //   ),
    // },
    // {              // add these funcationalities in feature
    //   name: 'Setting',
    //   active:false, // add funcationalties in feature
    //   image: (
    //     <Setting width={sizeHelper.calHp(80)} height={sizeHelper.calHp(80)} />
    //   ),
    // },
    {
      name: 'Support',
      active:true, 
      image: (
        <Support width={sizeHelper.calHp(80)} height={sizeHelper.calHp(80)} />
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(moment());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const onClickLogoutFunction = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      {
        text: 'Yes',
        onPress: async () => {
          await logout(); // Ensure `logout` is awaited if it's asynchronous
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const logout = async () => {
    try {

      await AsyncStorage.removeItem('ACCESS_TOKEN');
      await AsyncStorage.removeItem('Check_In');
      // await AsyncStorage.removeItem('Check_Out');
      // await AsyncStorage.removeItem('Check_In');
      props.navigation.replace('Auth');
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setMessage('Location permission is required to access your location.');
        setAlert(true);
        setIsLoading(false);
        return false;
      }
    }
    return true;
  };

  const formattedTime = () => {
    const currentDateTime = new Date();
    let hours = currentDateTime.getHours();
    let minutes = currentDateTime.getMinutes();
    let period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = ('0' + minutes).slice(-2);
    return `${hours}:${minutes} ${period}`;
  };

  const formattedDate = () => {
    const currentDateTime = new Date();
    return (
      currentDateTime.getFullYear() +
      ('0' + (currentDateTime.getMonth() + 1)).slice(-2) +
      ('0' + currentDateTime.getDate()).slice(-2)
    );
  };

  const checkInOut = async () => {
    setIsLoading(true);
    const hasPermission = await checkPermissions();
    if (!hasPermission) return;
    Geolocation.getCurrentPosition(
      async position => {

        const { latitude, longitude } = position.coords;
        const payload = {
          Date: formattedDate(),
          Time: formattedTime(),
          Type: attendance === true ? 2 : 1,
          Latitude: latitude.toString(),
          Longitude: longitude.toString(),
        };

        let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');
        const getURL = markAttendance;
        // console.log("first---------", payload)
        try {
          const responce = await ServerCall(UserLogin, getURL, 'POST', payload, props.navigation.navigate);
          if (responce.ReturnMessage === 'Success') {
            if (payload.Type === 1) {
              setAttendance(true);
              await AsyncStorage.removeItem('Check_Out');
              await AsyncStorage.setItem('Check_In', payload.Time);
              Toast.show('Attendance marked successfully!', Toast.LONG);
              setCheckinTime(payload.Time);
              setCheckOutTime(null);
              setWorkingHours(null);
            } else {
              setAttendance(false);
              await AsyncStorage.setItem('Check_Out', payload.Time);
              setCheckOutTime(payload.Time);
              const checkin = await AsyncStorage.getItem('Check_In');
              const workingHours = calculateWorkingHours(checkin, payload.Time);
              setWorkingHours(workingHours);
              Toast.show('Attendance checked out successfully!', Toast.LONG);
            }
          }
          else {
            setMessage(responce.ReturnMessage);
            console.log('first...........')
            setIsLoading(false);
            setAlert(true);
          }
          console.log('Location data sent successfully!');
        } catch (error) {
          console.error('Error sending location data', error);
        } finally {
          setIsLoading(false);
        }
      },
      error => {
        console.error(error);
        setMessage("Please turn on your mobile location.");
        setIsLoading(false);
        setAlert(true);
      },
    );
    setIsLoading(false);
  };

  const calculateWorkingHours = (checkInTime, checkOutTime) => {
    // Parse the check-in and check-out times using moment
    const checkIn = moment(checkInTime, 'hh:mm a'); // Format for 'HH:MM AM/PM'
    const checkOut = moment(checkOutTime, 'hh:mm a');

    // Calculate the difference in minutes
    const duration = moment.duration(checkOut.diff(checkIn));
    // Extract hours and minutes from the duration
    const hours = duration.hours();
    const minutes = duration.minutes();

    return { hours, minutes };
  };

  const checkinoutTime = async () => {
    setIsLoading(true);
    try {
      const checkin = await AsyncStorage.getItem('Check_In');
      const checkout = await AsyncStorage.getItem('Check_Out');
      if (checkin) {
        setCheckinTime(checkin);
        setAttendance(true);
        if (checkout) {
          setCheckOutTime(checkout);
          const workingHours = calculateWorkingHours(checkin, checkout);
          setWorkingHours(workingHours);
          setAttendance(false);
        }
      }
    } catch (error) {
      console.error('Error retrieving check-in/check-out times:', error);
    }
    setIsLoading(false);
  };

  const openWhatsApp = () => {
    const phoneNumber = '+923100275333'; // WhatsApp number with country code
    const url = `whatsapp://send?phone=${phoneNumber}`;

    Linking.openURL(url)
      .then((supported) => {
        if (!supported) {
          setMessage("WhatsApp is not installed on this device.");
          setAlert(true);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  useEffect(() => {
    checkinoutTime();
  }, []);

  const goToNext = type => {
    console.log('Go to next', type);
    if (type === 'Leaves') {
      props.navigation.navigate('LeaveScreen');
    }
    if (type === 'Request') {
      props.navigation.navigate('ResquestScreen');
    }
    if (type === 'History') {
      props.navigation.navigate('HistoryScreen');
    } if (type === 'Support') {
      openWhatsApp()
    } else {
    }
  };

  return (
    <View>
      <Design
        logout={onClickLogoutFunction}
        currentDateTime={currentDateTime}
        attendance={attendance}
        setAttendance={setAttendance}
        Links={Links}
        goToNext={goToNext}
        checkInOut={checkInOut}
        checkinTime={checkinTime}
        checkOutTime={checkOutTime}
        workingHours={workingHours}
        isLoading={isLoading}
        alert={alert}
        setAlert={setAlert}
        message={message}
      />
    </View>
  );
};
export default HomeScreen;
