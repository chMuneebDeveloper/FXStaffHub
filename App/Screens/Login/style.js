import {StyleSheet} from 'react-native';
import AppColor from '../../Constant/AppColor';
import sizeHelper from '../../Helpers/sizeHelper';

export const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: AppColor.white,
  },
  loginText: {
    color: AppColor.black1,
    fontSize: sizeHelper.calHp(24),
    fontFamily: 'InterMedium',
    paddingVertical: sizeHelper.calHp(55),
    paddingHorizontal: sizeHelper.calWp(25),
  },
  introImage: {
    width: '80%',
    height: '70%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  innerContainer: {
    paddingHorizontal: sizeHelper.calWp(40),
    paddingVertical: sizeHelper.calHp(20),
  },
  heading: {
    color: AppColor.black2,
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'InterSBold',
  },
  textInputOuter: {
    paddingVertical: sizeHelper.calHp(20),
  },
  text: {
    color: AppColor.black2,
    fontSize: sizeHelper.calHp(22),
    fontFamily: 'InterRegular',
    paddingBottom: sizeHelper.calHp(30),
  },
  label: {
    color: AppColor.black2,
    fontSize: sizeHelper.calHp(23),
    fontFamily: 'InterMedium',
    padding: sizeHelper.calHp(10),
  },
  textInputContainer: {
    backgroundColor: AppColor.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: sizeHelper.calHp(50),
    paddingHorizontal: sizeHelper.calWp(25),
  },
  textInput: {
    color: AppColor.black1,
    fontSize: sizeHelper.calHp(25),
    fontFamily: 'InterMedium',
    flex: 1,
    textAlign: 'left',
  },
  loginButton: {
    marginVertical: sizeHelper.calHp(30),
    backgroundColor: AppColor.blue,
    borderRadius: sizeHelper.calHp(50),
    paddingVertical: sizeHelper.calHp(20),
    paddingHorizontal: sizeHelper.calWp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: AppColor.white,
    fontSize: sizeHelper.calHp(26),
    fontFamily: 'InterMedium',
  },
  rememberText: {
    color: AppColor.black,
    fontSize: sizeHelper.calHp(22),
    fontFamily: 'InterRegular',
    paddingHorizontal: sizeHelper.calWp(10),
  },
  RememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: sizeHelper.calHp(20),
  },
  errorText: {
    color: AppColor.red,
    fontFamily: 'InterRegular',
    marginTop: sizeHelper.calHp(3),
    fontSize: sizeHelper.calHp(20),
    marginStart: sizeHelper.calWp(30),
  },
});
