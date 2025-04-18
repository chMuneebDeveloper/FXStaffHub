import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AppColor from '../Constant/AppColor';
import sizeHelper from '../Helpers/sizeHelper';

const AlertBox = ({
    onOkPress,
    messageTxt,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.MainView}>
        <View style={styles.alertBox}>
          <Text style={styles.TitleTxt}>Message:</Text>
          <Text style={styles.message}>
            {messageTxt}
          </Text>
          <TouchableOpacity onPress={onOkPress} style={styles.okButton}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  MainView:{
    backgroundColor:AppColor.blue,
    borderRadius: sizeHelper.calHp(12),
    paddingBottom:sizeHelper.calHp(7),
    width: '80%',
    elevation:10,
  },
  alertBox: {
    backgroundColor: 'white',
    borderRadius: sizeHelper.calHp(12),
    paddingHorizontal: sizeHelper.calHp(30),
    paddingVertical: sizeHelper.calHp(22),
  },
  TitleTxt: {
    color: AppColor.black1,
    fontFamily: 'InterSBold',
    fontSize: sizeHelper.calHp(26),
    marginBottom: sizeHelper.calHp(10),
  },
  message: {
    color: AppColor.black1,
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(21),
  },
  okButton: {
    backgroundColor: AppColor.blue,
    paddingVertical: sizeHelper.calHp(8),
    paddingHorizontal: sizeHelper.calWp(30),
    borderRadius: 3,
    alignSelf: 'flex-end',
    marginTop:sizeHelper.calHp(15)
  },
  okButtonText: {
    color: 'white',
    fontSize: sizeHelper.calHp(21),
    fontFamily: 'InterMedium',
  },
});

export default AlertBox;