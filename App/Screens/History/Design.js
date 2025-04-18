import React from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Header from '../../Components/Header';
import Loading from '../../Components/Loading';
import AppColor from '../../Constant/AppColor';
import moment from 'moment';
import { styles } from './styles';
import sizeHelper from '../../Helpers/sizeHelper';
export const Design = ({
  moveBack,
  logout,
  markedDates,
  isLoading,
  getInfo,
  data,
}) => {
  const renderItem = ({ item, index }) => {
    const calculateWorkingHours = (checkInTime, checkOutTime) => {
      const checkIn = moment(checkInTime, 'hh:mm a'); // Format for 'HH:MM AM/PM'
      if (checkOutTime) {
        const checkOut = moment(checkOutTime, 'hh:mm a');
        const duration = moment.duration(checkOut.diff(checkIn));
        const hours = duration.hours();
        const minutes = duration.minutes();
        return `${hours}h ${minutes}m`; // Return as a readable string
      }
      return 'N/A';
    };
    return (
      <View>
        {item.Title === 'Present' ? (
          <View style={styles.AttendenceDetail}>
            <View style={styles.assignWidth}>
              <View style={styles.leftView}>
                <Text style={styles.leftTxt}>
                  {moment(item.StartDate).format('DD')}
                </Text>
                <Text style={styles.leftTxt}>
                  {moment(item.StartDate).format('MMM')}
                </Text>
              </View>
            </View>

            <View style={styles.assignWidth}>
              <View style={styles.centerView}>
                <Text style={styles.middleTopTxt}>
                  {item.StartTime || 'N/A'}
                </Text>
              </View>
            </View>

            <View style={styles.assignWidth}>
              <View style={styles.centerView}>
                <Text style={styles.middleTopTxt}>{item.EndTime || 'N/A'}</Text>
              </View>
            </View>

            <View style={styles.assignWidth}>
              <View style={styles.centerView}>
                {/* If you plan to calculate working hours, use this */}
                <Text style={styles.workingTxt}>
                  {item.EndTime
                    ? calculateWorkingHours(item.StartTime, item.EndTime)
                    : ''}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.absentContainer}>
            <View style={styles.assignWidth}>
              <View style={styles.leftView}>
                <Text style={styles.leftTxt}>
                  {moment(item.StartDate).format('DD')}
                </Text>
                <Text style={styles.leftTxt}>
                  {moment(item.StartDate).format('MMM')}
                </Text>
              </View>
            </View>
            <View style={[styles.abesent, { backgroundColor: item.Title === 'Weekend' ? AppColor.blue : AppColor.red, }]}>
              <Text style={styles.absentTxt}>{item.Title}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header Heading={'History'} goBack={moveBack} logout={logout} />
      <View style={styles.Calendar}>
        <Calendar
          markingType={'custom'}
          current={new Date().toISOString().split('T')[0]}
          // onDayPress={date => {
          //   console.log(date);
          // }}
          markedDates={markedDates}
          firstDay={1}
          onMonthChange={date => {
            getInfo(date.year, date.month);
          }}
          theme={{
            calendarBackground: AppColor.white,
            textSectionTitleColor: AppColor.black,
            todayTextColor: AppColor.blue,
            dayTextColor: AppColor.black,
            arrowColor: AppColor.blue,
            monthTextColor: AppColor.blue,
            indicatorColor: AppColor.blue,
          }}
        //   markingType="period"
        />
        <View style={styles.allBoxContainer}>
          {/* <View style={styles.boxContainer}> */}
          <View style={styles.boxContainer}>
            <View style={[styles.present, { backgroundColor: AppColor.green }]} />
            <Text style={styles.labels}>Present</Text>
          </View>
          <View style={styles.boxContainer}>
            <View style={[styles.present, { backgroundColor: AppColor.red }]} />
            <Text style={styles.labels}>Absent</Text>
          </View>
          <View style={styles.boxContainer}>
            <View style={[styles.present, { backgroundColor: AppColor.gray4 }]} />
            <Text style={styles.labels}>Weakend</Text>
          </View>
        </View>
      </View>

      <View style={styles.ContainersList}>
        <View style={styles.headerView}>
          <Text style={styles.hdrtxt}>Date</Text>
          <Text style={styles.hdrtxt}>Check In</Text>
          <Text style={styles.hdrtxt}>Check Out</Text>
          <Text style={styles.hdrtxt}>Working Hr's</Text>
        </View>
        {data && data.length > 0 ? (
          <FlatList
            data={data}
            contentContainerStyle={{
              paddingBottom: sizeHelper.calHp(90),
            }}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../Assets/Images/empty-icon.png')}/>
            <Text style={{ fontSize: sizeHelper.calHp(24), color: 'gray',fontFamily:'InterMedium',marginTop:sizeHelper.calHp(10) }}>No record found!</Text>
          </View>
        )}
      </View>
      {isLoading && <Loading />}
    </View>
  );
};
