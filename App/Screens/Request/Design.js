import {
  View,
  Text,
  Image,
  I18nManager,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../Components/Header';
import AppColor from '../../Constant/AppColor';
import Loading from '../../Components/Loading';
import sizeHelper from '../../Helpers/sizeHelper';
import { SwipeListView } from 'react-native-swipe-list-view';
export const Design = ({
  logout,
  moveBack,
  isLoading,
  requests,
  deleteItem
}) => {

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.CardContainer}>
        <View style={styles.topView}>
          <Text style={styles.leaveType}>{item.LeaveType}</Text>
          <Text style={[styles.Status,
          {
            backgroundColor: item.Status === 0 ? 'rgba(255, 235, 59, 1)' : item.Status === 1 ? 'rgba(221, 255, 221, 1)' : AppColor.red,
            color: item.Status === 0 ? AppColor.black2 : item.Status === 1 ? AppColor.green : AppColor.white,
          }]}>
            {item.Status === 0 ? 'Pending' : item.Status === 1 ? 'Approved' : 'Rejected'}
          </Text>
        </View>
        <View>
          {item.Description && (<Text style={styles.Description}>{item.Description}</Text>)}
        </View>
        <View style={styles.bottomView}>
          <View style={{ width: '45%' }}>
            <Text style={styles.date}>{item.LeaveStartDate + ' - ' + item.LeaveEndDate}</Text>
          </View>
          <View style={styles.aproval}>
            <Text style={styles.leaveType}>Apply Date:</Text>
            <Text style={styles.aprovalBy}>{item.Date}</Text>
          </View>
        </View>
      </View>
    )
  }

  const renderHiddenItem = ({ item, index }) => {
    return (
      <View
        style={
          styles.hiddenItemContainer
        }>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteItem(item, index)}
        >
          <Icon name="trash-2" size={sizeHelper.calHp(40)} color={AppColor.white} />
        </TouchableOpacity>
      </View>
    )

  }

  return (
    <View style={styles.mainContainer}>
      <Header Heading={'Leave Status'} goBack={moveBack} logout={logout} />
      <View style={{ height: '85%', }}>
        {requests && requests?.length > 0 ?
          <SwipeListView
            showsVerticalScrollIndicator={false}
            disableRightSwipe={I18nManager.isRTL ? false : true}
            disableLeftSwipe={I18nManager.isRTL ? true : false}
            data={[...requests].reverse()}
            extraData={[...requests].reverse()}
            renderItem={renderItem}
            renderHiddenItem={(data, index, rowMap) =>
              renderHiddenItem(data, index)
            }
            rightOpenValue={sizeHelper.calWp(-110)}
            leftOpenValue={sizeHelper.calWp(100)}
            keyExtractor={item => item.EmployeeLeaveCode}
          // style={{
          // height: '31.5%',
          // marginHorizontal: sizeHelper.calWp(38),
          // props.orderCode === true
          //   ? sizeHelper.screenWidth > 450
          //     ? sizeHelper.calHp(370)
          //     : sizeHelper.calHp(430)
          //   : sizeHelper.screenWidth > 450
          //   ? sizeHelper.calHp(440)
          //   : sizeHelper.calHp(500),
          // bottom:props.returnInvoiceNumber ? sizeHelper.calHp(190) :0

          // paddingBottom:props.returnInvoiceNumber ? sizeHelper.screenWidth > 450? sizeHelper.calHp(610) : sizeHelper.calHp(710) : sizeHelper.screenWidth > 450? sizeHelper.calHp(40) : 0
          // }}
          />





          //  <FlatList 
          //  data={[...requests].reverse()}
          //  renderItem={renderItem}
          //  keyExtractor={(item,index)=>index.toString()}
          //  contentContainerStyle={{
          //   paddingBottom: sizeHelper.calHp(90),
          // }}
          //  />
          : <View style={styles.NotFoundContainer}>
            <Image
              source={require('../../Assets/Images/empty-icon.png')}
              style={styles.notfoundImg}
            />
            <Text style={{ fontSize: sizeHelper.calHp(24), color: 'gray', fontFamily: 'InterMedium', marginTop: sizeHelper.calHp(10) }}>
              No leaves availed yet
            </Text>
          </View>}
      </View>
      {isLoading && (<Loading />)}
    </View>
  );
};
