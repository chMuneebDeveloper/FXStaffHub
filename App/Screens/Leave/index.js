import React, {useState, useEffect} from 'react';
import {Alert, Keyboard} from 'react-native';
import {Design} from './Design';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppColor from '../../Constant/AppColor';
import {getLeaveTypes, getLeaveBalance, applyLeave} from '../../Constant/URLs';
import {ServerCall} from '../../Redux/actions/asynchronousAction';
import moment from 'moment';
const LeaveScreen = props => {
  const [range, setRange] = useState({startDate: null, endDate: null});
  const [addNotes, setAddNotes] = useState('');
  const [selectedLeave, setSelectedLeave] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [leaveType, setLeaveType] = useState([]);
  const [leaveBlance, setLeaveBlance] = useState({});
  const [isLabel, setIsLabel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [alert,setAlert]=useState(false);
  const [onPressOk,setSetOnPress]=useState(false);
  const [message, setMessage] = useState('');

  const markDatesInRange = (startDate, endDate) => {
    const marked = {};
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0];

      // Check if it's the first or last day in the range
      if (dateString === startDate) {
        marked[dateString] = {
          selected: true,
          marked: false,
          selectedColor: AppColor.blue,
          startingDay: true,
          color: AppColor.blue,
        };
      } else if (dateString === endDate) {
        marked[dateString] = {
          selected: true,
          marked: false,
          selectedColor: AppColor.blue,
          endingDay: true,
          color: AppColor.blue,
        };
      } else {
        marked[dateString] = {
          selected: true,
          marked: false,
          selectedColor: AppColor.blue,
          color: AppColor.blue,
        };
        setCalendarVisible(false);
      }
    }

    return marked;
  };

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

  const handleDayPress = day => {
    const date = day.dateString;
    // If there's no start date or both start and end dates are set
    if (!range.startDate || (range.startDate && range.endDate)) {
      // Set the range to only include the start date
      setRange({startDate: date, endDate: null});
      setMarkedDates({
        [date]: {
          selected: true,
          marked: false,
          selectedColor: AppColor.blue,
          startingDay: true,
          color: AppColor.blue,
        },
      });
    } else {
      // Set the range with both start and end dates
      const newRange = {
        startDate: range.startDate,
        endDate: date,
      };
      setRange(newRange);

      // Mark the dates in range, including startingDay and endingDay
      setMarkedDates(markDatesInRange(newRange.startDate, newRange.endDate));
    }
  };

  const openCalendar = () => {
    setCalendarVisible(true);
  };

  const moveBack = () => {
    props.navigation.goBack();
  };

  const onClickLogoutFunction = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      {
        text: 'Yes',
        onPress: async () => {
          await logout();
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

  const getLeaveTypee = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem('ACCESS_TOKEN');
      const url = getLeaveTypes;
      const response = await ServerCall(token, url, 'GET', null, props.navigation.navigate);
      console.log('response.......', response);
      if (response?.Data && response.IsSuccess) {
        
        setLeaveType(JSON.parse(response.Data));
      }
      setIsLoading(false);
    } catch (error) {
      setMessage(response.ReturnMessage);
      setAlert(true);
      console.log('Error:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLeaveTypee();
  }, []);

  const cheeckLeaveBlances = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem('ACCESS_TOKEN');
      let endDate = range.endDate ? range.endDate : range.startDate;
      const url =
        getLeaveBalance +
        range.startDate.replace(/-/g, '') +
        '/' +
        endDate.replace(/-/g, '') +
        '/' +
        selectedLeave;

      console.log(' url...', url);
      const response = await ServerCall(token, url, 'GET', null, props.navigation.navigate);
      console.log('response.......', response);
      if (response.IsSuccess) {
        const leaveBlance = response.Data;
        setLeaveBlance(leaveBlance);
        if (
          leaveBlance.CurrentLeaveBalance === 0 &&
          leaveBlance.DurationInDays <= leaveBlance.CurrentLeaveBalance
        ) {
          setMessage('Leeave start date and leave end date is not beetweeen contract date.');
      setAlert(true);
         
        } else {
          setIsLabel(true);
          console.log('Successfully working');
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setIsLoading(false);
    }
  };

  const applyForLeaves = async () => {
    try {
      setIsLoading(true);
      const payload = {
        Action: 'Save',
        LeaveStartDate: moment(range.startDate, 'YYYYMMDD').format(
          'DD/MM/YYYY',
        ),
        LeaveEndDate: moment(
          range.endDate ? range.endDate : range.startDate,
          'YYYYMMDD',
        ).format('DD/MM/YYYY'),
        Date: moment().format('DD/MM/YYYY'),
        LeaveTypeCode: selectedLeave,
        Description: addNotes,
        AccrediationLeaves: leaveBlance.AccrediationLeaves,
        AccreditationLeavesBalance: leaveBlance.AccreditationLeavesBalance,
        CurrentLeaveBalance: leaveBlance.CurrentLeaveBalance,
        CurrentLeaveExpires: leaveBlance.CurrentLeaveExpires,
        DurationInDays: leaveBlance.DurationInDays,
        EligibleToTake: leaveBlance.EligibleToTake,
        EmployeeContractCode: leaveBlance.NewEmployeeContractCode,
        OLdEmployeeContractCode: leaveBlance.OLdEmployeeContractCode,
        OldLeaveBalance: leaveBlance.OldLeaveBalance,
        OldLeaveExpires: leaveBlance.OldLeaveExpires,
        PerDayAmount: leaveBlance.PerDayAmount,
        SickLeavesBalance: leaveBlance.SickLeavesBalance,
        TotalAmount: leaveBlance.TotalAmount,
        TotalTakenLeaves: leaveBlance.TotalTakenLeaves,
        UnpaidLeavesBalance: leaveBlance.UnpaidLeavesBalance,
      };

      let token = await AsyncStorage.getItem('ACCESS_TOKEN');
      const url = applyLeave;
      // console.log(url, token, payload);
      const response = await ServerCall(token, url, 'POST', payload,props.navigation.navigate );
      if (response.IsSuccess) {
        setMessage('Leave application submitted successfully.');
      setAlert(true);
      setSetOnPress(true);

        // Resetting form fields
        setRange({startDate: null, endDate: null});
        setMarkedDates({});
        setAddNotes('');
        setSelectedLeave('');
        setIsLabel(false);
      } else {
        setMessage(response.ReturnMessage || 'Something went wrong');
      setAlert(true);
       
      }
      setIsLoading(false);
    } catch (error) {
      setMessage('Error', 'An unexpected error occurred. Please try again.', error);
      setAlert(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLabel(false);
  }, [range, selectedLeave]);

  return (
    <Design
      moveBack={moveBack}
      logout={onClickLogoutFunction}
      leaveType={leaveType}
      range={range}
      addNotes={addNotes}
      setAddNotes={setAddNotes}
      selectedLeave={selectedLeave}
      setSelectedLeave={setSelectedLeave}
      markedDates={markedDates}
      calendarVisible={calendarVisible}
      setCalendarVisible={setCalendarVisible}
      handleDayPress={handleDayPress}
      openCalendar={openCalendar}
      cheeckLeaveBlances={cheeckLeaveBlances}
      leaveBlance={leaveBlance}
      isLabel={isLabel}
      applyForLeaves={applyForLeaves}
      isLoading={isLoading}
      keyboardStatus={keyboardStatus}
      open={open}
      setOpen={setOpen}
      alert={alert}
        setAlert={setAlert}
        message={message}
        onPressOk={onPressOk}
        navigation={props.navigation}
    />
  );
};
export default LeaveScreen;
