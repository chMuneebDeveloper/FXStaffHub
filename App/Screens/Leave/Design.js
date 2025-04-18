import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';
import Header from '../../Components/Header';
import { styles } from './styles';
import sizeHelper from '../../Helpers/sizeHelper';
import AppColor from '../../Constant/AppColor';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import * as Progress from 'react-native-progress';
import Loading from '../../Components/Loading';
import DropDownPicker from 'react-native-dropdown-picker';
import AlertBox from '../../Components/AlertBox';

export const Design = ({
  moveBack,
  leaveType,
  logout,
  range,
  addNotes,
  setAddNotes,
  selectedLeave,
  setSelectedLeave,
  markedDates,
  calendarVisible,
  setCalendarVisible,
  handleDayPress,
  openCalendar,
  cheeckLeaveBlances,
  leaveBlance,
  applyForLeaves,
  isLabel,
  isLoading,
  keyboardStatus,
  open,
  setOpen,
  alert,
  setAlert,
  message,
  onPressOk, navigation
}) => {
  return (
    <View style={styles.mainContainer}>
      <Header Heading={'Apply Leave'} goBack={moveBack} logout={logout} />

      <StatusBar hidden />
      <View style={styles.Container}>
        {Object.keys(leaveBlance).length > 0 && !keyboardStatus ? (
          <View style={styles.graphes}>
            <View style={styles.leaveBlace}>
              <Progress.Circle
                size={sizeHelper.calHp(250)}
                progress={1}
                thickness={5}
                color={AppColor.blue}
                showsText={false}
                style={styles.cricleOuter}
                unfilledColor={AppColor.while2}>
                <View style={styles.textContainer}>
                  <Text style={styles.interText}>
                    {leaveBlance.CurrentLeaveBalance}
                  </Text>
                  <Text style={styles.interLabel}>Current Balance</Text>
                </View>
              </Progress.Circle>
            </View>
            <View style={styles.smallProgress}>
              <View style={styles.applyLeave}>
                <Progress.Circle
                  size={sizeHelper.calHp(90)}
                  borderColor={AppColor.while2}
                  progress={
                    leaveBlance.CurrentLeaveBalance
                      ? ((100 / leaveBlance.CurrentLeaveBalance) *
                        leaveBlance.DurationInDays) /
                      100
                      : 0
                  }
                  thickness={4}
                  color={AppColor.yellow}
                  showsText={false}
                  unfilledColor={AppColor.while2}
                  style={styles.cricleOuter}>
                  <View style={styles.textContainer}>
                    <Text style={styles.smallText}>
                      {leaveBlance.DurationInDays}
                    </Text>
                  </View>
                </Progress.Circle>
                <Text style={styles.smallLabel}>Apply Leaves</Text>
              </View>
              <View style={styles.applyLeave}>
                <Progress.Circle
                  size={sizeHelper.calHp(90)}
                  progress={
                    leaveBlance.CurrentLeaveBalance
                      ? ((100 / leaveBlance.CurrentLeaveBalance) *
                        (leaveBlance.CurrentLeaveBalance -
                          leaveBlance.DurationInDays)) /
                      100
                      : 0
                  }
                  unfilledColor={AppColor.while2}
                  borderColor={AppColor.while2}
                  thickness={5}
                  color={AppColor.aqua}
                  showsText={false}
                  style={styles.cricleOuter}>
                  <View style={styles.textContainer}>
                    <Text style={styles.smallText}>
                      {leaveBlance.CurrentLeaveBalance -
                        leaveBlance.DurationInDays}
                    </Text>
                  </View>
                </Progress.Circle>
                <Text style={styles.smallLabel}>Remaining</Text>
              </View>
            </View>
          </View>
        ) : (
          ''
        )}

        <View style={styles.leaveContainer}>
          <Text style={styles.titleTxt}>Leave Type</Text>
          <View>
            {/* <View style={styles.TopView}> */}
              <DropDownPicker
                open={open}
                value={selectedLeave}
                items={
                  leaveType && leaveType.length > 0
                    ? leaveType.map((item) => ({
                        label: item?.Name,
                        value: item?.Id,
                      }))
                    : []
                }
                maxHeight={sizeHelper.calHp(400)}
                setOpen={setOpen}
                setValue={setSelectedLeave}
                placeholder="Select Leave Type"
                style={styles.TopView}
                containerStyle={{
                  borderRadius: sizeHelper.calWp(15),
                  padding: 0,
                  margin: 0,
                }}
                placeholderStyle={styles.placeholdertxt}
                dropDownContainerStyle={{
                  width: '100%',
                  borderWidth: 0,
                }}
                nestedScrollEnabled={true}
                dropDownMaxHeight={sizeHelper.calHp(100)}
                listMode="SCROLLVIEW"
                listItemContainerStyle={styles.itemContainer}
                textStyle={styles.dropDownText}
                scrollViewProps={{
                  nestedScrollEnabled: true, // Enables nested scrolling for better interaction
                  decelerationRate: "fast"
                }}
                zIndex={isLoading ? 0 : alert ? 0 : 1}
              />
            <View>








            </View>

            {/* <Picker
                selectedValue={selectedLeave}
                mode={'dropdown'}
                dropdownIconColor={AppColor.black}
                numberOfLines={5}
                onValueChange={itemValue => setSelectedLeave(itemValue)}>
                <Picker.Item
                  label="Select Leave Type"
                  value=""
                  enabled={false}
                  style={{height:200}}
                />

                {leaveType &&
                  leaveType?.map(item => {
                    return (
                      <Picker.Item
                        key={item?.Id}
                        label={item?.Name}
                        value={item?.Id}
                      />
                    );
                  })}
              </Picker> */}
            {/* </View> */}
          </View>
        </View>

        <View style={styles.middleContainer}>
          <View style={styles.InsideMiddle}>
            <Text style={styles.titleTxt}>Start Date</Text>
            <View style={styles.DataView}>
              <TouchableOpacity
                onPress={openCalendar}
                style={styles.calenderButton}>
                <Text style={{color:AppColor.black1}}>
                  {range.startDate
                    ? moment(range.startDate).format('DD/MM/YYYY')
                    : 'Select Start Date'}
                </Text>
                <Icon
                  name="calendar"
                  size={sizeHelper.calHp(30)}
                  color={AppColor.black}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.InsideMiddle}>
            <Text style={styles.titleTxt}>End Date</Text>
            <View style={styles.DataView}>
              <TouchableOpacity
                onPress={openCalendar}
                style={styles.calenderButton}>
                <Text style={{color:AppColor.black1}}>
                  {range.endDate
                    ? moment(range.endDate).format('DD/MM/YYYY')
                    : range.startDate
                      ? moment(range.startDate).format('DD/MM/YYYY')
                      : 'Select End Date'}
                </Text>

                <Icon
                  name="calendar"
                  size={sizeHelper.calHp(30)}
                  color={AppColor.black}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ marginTop: sizeHelper.calHp(30) }}>
          <Text style={styles.titleTxt}>Additional Note</Text>
          <View style={styles.BottomView}>
            <TextInput
              placeholder="Enter notes..."
              placeholderTextColor={AppColor.black1}
              multiline={true}
              onChangeText={setAddNotes}
              value={addNotes}
              maxLength={300}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.BtnView,
            {
              backgroundColor:
                selectedLeave === '' || range.startDate === null
                  ? AppColor.gray1
                  : AppColor.blue,
            },
          ]}
          onPress={() => {
            isLabel ? applyForLeaves() : cheeckLeaveBlances();
          }}
          disabled={selectedLeave === '' || range.startDate === null}>
          <Text style={styles.btnTxt}>{isLabel ? 'Submit' : 'Proceed'}</Text>
        </TouchableOpacity>
      </View>
      {alert && (
        <AlertBox
          onOkPress={() => {
            setAlert(false);
            onPressOk ? navigation.navigate('ResquestScreen') : null;
          }}
          messageTxt={message}
          onConfirm={() => {
            setAlert(null);
          }}
        />

      )}
      {isLoading && <Loading />}
      <Modal visible={calendarVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setCalendarVisible(false)}>
          <View style={styles.calendarModal}>
            <TouchableWithoutFeedback>
              <View style={styles.calendarStyle}>
                <Calendar
                  current={new Date().toISOString().split('T')[0]}
                  onDayPress={handleDayPress}
                  markedDates={markedDates}
                  markingType="period"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
