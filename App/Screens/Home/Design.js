import {
  Image,
  View,
  Alert,
  StatusBar,
  I18nManager,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import AppColor from '../../Constant/AppColor';
import { styles } from './styles';
import Header from '../../Components/Header';
import Icon from 'react-native-vector-icons/Feather';
import sizeHelper from '../../Helpers/sizeHelper';
import AlertBox from '../../Components/AlertBox';

export const Design = ({
  logout,
  currentDateTime,
  attendance,
  setAttendance,
  Links,
  goToNext,
  checkInOut,
  checkinTime,
  checkOutTime,
  workingHours,
  isLoading,
  alert,
  setAlert,
  message
}) => {

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.item}
        disabled={!item.item.active}
        onPress={() => {
          goToNext(item.item.name);
        }}>
        {item.item.image}
        <Text style={styles.renderLabel}>{item.item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header Heading={'Attendance'} logout={logout} />
      <StatusBar hidden />
      <ScrollView>
        <View style={styles.CheckInOut}>
          <Text style={styles.time}>{currentDateTime.format(' h:mm A')}</Text>
          <Text style={styles.date}>
            {currentDateTime.format('dddd, MMM, DD')}
          </Text>
          
          <TouchableOpacity
            onPress={() => {
              // setAttendance(!attendance);
              checkInOut();
            }}
            disabled={isLoading}
            activeOpacity={isLoading ? 1 : 0.1}
            style={[
              styles.tapCricle,
              {
                borderColor: isLoading
                  ? '#cccccc'
                  : attendance
                    ? 'rgba(224, 81, 91, 0.19)'
                    : 'rgba(28, 148, 212, 0.19)',
                shadowColor: isLoading
                  ? '#cccccc'
                  : attendance
                    ? AppColor.red1
                    : AppColor.blue,
                backgroundColor:
                  isLoading
                    ? '#cccccc'
                    : attendance
                      ? AppColor.red1
                      : AppColor.blue,
              },
            ]}>
            {isLoading === true ? (
              <ActivityIndicator size="small" color={AppColor.white} />
            ) : (
              <View style={styles.imgContainer}>
                <Image
                  source={require('../../Assets/Images/tap.png')}
                  style={styles.tapImg}
                  resizeMode="contain"
                />
                <Text style={styles.inOutText}>
                  {attendance ? 'CHECK OUT' : 'CHECK IN'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.finexcloud}>{'Finexcloud'}</Text>
        </View>

        <View style={styles.inOutTimesContainer}>
          <View style={styles.inOutInnerContainer}>
            <Icon
              name={'arrow-right'}
              size={sizeHelper.calHp(45)}
              color={AppColor.blue}
              style={{ paddingVertical: sizeHelper.calHp(10) }}
            />
            <Icon
              name={'clock'}
              size={sizeHelper.calHp(45)}
              color={AppColor.blue}
              style={{ paddingVertical: sizeHelper.calHp(10) }}
            />
            <Text style={styles.check}>
              {checkinTime ? checkinTime : '--:--'}
            </Text>
            <Text style={styles.checkLabel}>{'Check In'}</Text>
          </View>
          <View style={styles.inOutInnerContainer}>
            <Icon
              name={'arrow-left'}
              size={sizeHelper.calHp(45)}
              color={AppColor.blue}
              style={{ paddingVertical: sizeHelper.calHp(10) }}
            />
            <Icon
              name={'clock'}
              size={sizeHelper.calHp(45)}
              color={AppColor.blue}
              style={{ paddingVertical: sizeHelper.calHp(10) }}
            />
            <Text style={styles.check}>
              {checkOutTime ? checkOutTime : '--:--'}
            </Text>
            <Text style={styles.checkLabel}>{'Check Out'}</Text>
          </View>
          <View style={styles.inOutInnerContainer}>
            <Icon
              name={'arrow-right'}
              size={sizeHelper.calHp(45)}
              color={AppColor.blue}
              style={{ paddingVertical: sizeHelper.calHp(10) }}
            />
            <Icon
              name={'clock'}
              size={sizeHelper.calHp(45)}
              color={AppColor.blue}
              style={{ paddingVertical: sizeHelper.calHp(10) }}
            />
            <Text style={styles.check}>
              {workingHours
                ? workingHours.hours + ':' + workingHours.minutes
                : '--:--'}
            </Text>
            <Text style={styles.checkLabel}>{"Working Hr's"}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.quickHeading}>{'Quick Links:'}</Text>
          <View style={{ alignSelf: 'center' }}>
            <FlatList
              data={Links}
              renderItem={renderItem}
              numColumns={3}
              contentContainerStyle={{
                paddingBottom: sizeHelper.calHp(110),
              }}
              keyExtractor={item => item.name}
              nestedScrollEnabled
            />
          </View>
        </View>
      </ScrollView>
      {alert && (
        <AlertBox
          onOkPress={() => setAlert(false)}
          messageTxt={message}
          onConfirm={() => {
            setAlert(null);
          }}
        />

      )}
    </View>
  );
};
