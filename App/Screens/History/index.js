import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { Design } from './Design';
import { getAttendance } from '../../Constant/URLs';
import { ServerCall } from '../../Redux/actions/asynchronousAction';
import AppColor from '../../Constant/AppColor';

const HistoryScreen = props => {
  const [data, setData] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const moveBack = () => {
    props.navigation.goBack();
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

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('ACCESS_TOKEN');
      await AsyncStorage.removeItem('Check_In');
      props.navigation.replace('Auth');
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  const getInfo = async (year, month) => {
    try {
      setIsLoading(true);
      const access_token = await AsyncStorage.getItem('ACCESS_TOKEN');
      console.log('access_token:', access_token);
      const url =
        getAttendance +
        '/' +
        (month ? month : moment().month() + 1) +
        '/' +
        (year ? year : moment().year());
      const response = await ServerCall(access_token, url, 'GET', props.navigation.navigate);
      const getData = JSON.parse(response.Data);
      const sortedData = getData.sort((a, b) => new Date(a.StartDate) - new Date(b.StartDate));
      if (response.IsSuccess) {
        setData(sortedData);
      } else {
        Alert.alert('Error', 'Failed to fetch data.');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getInfo();
  }, []);

  const getDateRange = (start, end) => {
    const startDate = moment(start);
    const endDate = moment(end);
    const range = {};

    while (startDate.isSameOrBefore(endDate)) {
      range[startDate.format('YYYY-MM-DD')] = true;
      startDate.add(1, 'day');
    }

    return Object.keys(range);
  };

  useEffect(() => {
    const transformedData = {};

    data && data.forEach(item => {
      const { StartDate, EndDate, StatusClass, Title, TYPE } = item;

      // Determine dotColor based on StatusClass
      let dotColor = '#000';
      if (StatusClass === 'status-green') dotColor = AppColor.green;
      else if (StatusClass === 'status-red') dotColor = AppColor.red;
      else if (StatusClass === 'status-grey') dotColor = AppColor.gray4;

      if (TYPE === 'status-leave' && StartDate && EndDate) {
        // Handle range marking for leave
        const range = getDateRange(StartDate, EndDate);
        range.forEach(date => {
          transformedData[date] = {
            marked: true,
            dotColor,
            customStyles: {
              container: { backgroundColor: dotColor },
              text: { color: 'white' },
            },
            title: Title,
          };
        });
      } else {
        // Single-day marking
        transformedData[StartDate] = {
          marked: true,
          dotColor,
          customStyles: {
            container: { backgroundColor: dotColor },
            text: { color: 'white' },
          },
          title: Title,
        };
      }
    });

    setMarkedDates(transformedData); // Update markedDates state
  }, [data]);

  return (
    <Design
      moveBack={moveBack}
      logout={onClickLogoutFunction}
      markedDates={markedDates}
      isLoading={isLoading}
      getInfo={getInfo}
      data={data}
    />
  );
};
export default HistoryScreen;
