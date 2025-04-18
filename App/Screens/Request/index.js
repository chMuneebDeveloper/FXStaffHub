import React, {useEffect, useState} from 'react';
import {View, Alert, BackHandler} from 'react-native';
import {Design} from './Design';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyLeave, getLeaveRequest} from '../../Constant/URLs';
import {ServerCall} from '../../Redux/actions/asynchronousAction';
import Toast from 'react-native-simple-toast';
const RequestScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  const moveBack = () => {
    props.navigation.replace('Main');
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('ACCESS_TOKEN');
      props.navigation.replace('Auth');
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

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

  const getAllRequest = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');
    const url = getLeaveRequest;
    const response = await ServerCall(
      token,
      url,
      'GET',
      null,
      props.navigation.navigate,
    );
    if (response.IsSuccess) {
      const getClearData = JSON.parse(response.Data);
      setRequests(getClearData);
    } else {
      Alert.alert('Error', 'Failed to fetch data.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllRequest();
  }, []);

  const deleteItem = async item => {
    try {
      // setIsLoading(true);
      if (item.Status === 1) {
        Toast.show('You cannot delete approved leaves', Toast.LONG);
      } else {
        const payload = {
          Action: 'Delete',
          EmployeeLeaveCode: item.EmployeeLeaveCode,
          EmployeeCode: item.EmployeeCode,
          Date: item.Data,
          RowIndex: item.RowIndex,
          Total: item.Total,
          EmployeeName: item.EmployeeName,
          TotalLeaveDays: item.TotalLeaveDays,
          LeaveType: item.LeaveType,
          LeaveStartDate: item.LeaveStartDate,
          LeaveEndDate: item.LeaveEndDate,
          Description: item.Description,
          DurationInDays: item.DurationInDays,
          Status: item.Status,
          Description: item.Description,
        };
        console.log(JSON.stringify(payload));
        setIsLoading(true);
        let token = await AsyncStorage.getItem('ACCESS_TOKEN');
        const url = applyLeave;
        console.log(url, token, payload);
        const response = await ServerCall(
          token,
          url,
          'POST',
          payload,
          props.navigation.navigate,
        );
        if (response.IsSuccess) {
          Toast.show('Leave deleted successfully!', Toast.LONG);
          setTimeout(() => {
            getAllRequest();
          }, 1000);
        } else {
          Alert.alert(
            'Message: ',
            response.ReturnMessage || 'Something went wrong',
          );
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleBackPress = () => {
      props.navigation.navigate('home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View>
      <Design
        logout={onClickLogoutFunction}
        moveBack={moveBack}
        isLoading={isLoading}
        requests={requests}
        deleteItem={deleteItem}
      />
    </View>
  );
};
export default RequestScreen;
