import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import AppColor from '../Constant/AppColor';
import sizeHelper from '../Helpers/sizeHelper';

const Loading = ({ message = "Loading..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={AppColor.blue} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width:'100%',
    position:'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
  },
  text: {
    fontFamily: 'InterMedium',
    textTransform: 'capitalize',
    marginTop: sizeHelper.calHp(10),
    fontSize: sizeHelper.calHp(26),
    color: AppColor.white,
  },
});

export default Loading;
