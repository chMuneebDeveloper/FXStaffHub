import {StyleSheet} from 'react-native';
import AppColor from '../../Constant/AppColor';
import sizeHelper from '../../Helpers/sizeHelper';

export const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: AppColor.white1,
  },
  CheckInOut: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: sizeHelper.calHp(70),
  },
  time: {
    color: AppColor.black3,
    fontSize: sizeHelper.calHp(60),
    fontFamily: 'InterMedium',
  },
  date: {
    color: AppColor.gray1,
    fontSize: sizeHelper.calHp(24),
    fontFamily: 'InterMedium',
  },
  tapCricle: {
    margin: sizeHelper.calHp(50),
    height: sizeHelper.calHp(300),
    width: sizeHelper.calHp(300),
    borderRadius: sizeHelper.calHp(200),
    borderWidth: sizeHelper.calHp(12),
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    padding: sizeHelper.calHp(20),
  },
  tapImg: {
    height: sizeHelper.calHp(100),
    width: sizeHelper.calHp(100),
    resizeMode: 'contain',
  },
  inOutText: {
    margin: sizeHelper.calHp(20),
    color: AppColor.white,
    fontSize: sizeHelper.calHp(26),
    fontFamily: 'InterMedium',
  },
  finexcloud: {
    color: AppColor.blue,
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(28),
    // marginTop: sizeHelper.calHp(20)
  },
  inOutTimesContainer: {
    backgroundColor: AppColor.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: sizeHelper.calHp(10),
    justifyContent: 'space-between',
    paddingVertical: sizeHelper.calHp(10),
    paddingHorizontal: sizeHelper.calHp(20),
    flexDirection: 'row',
  },
  check: {
    paddingVertical: sizeHelper.calHp(10),
    color: AppColor.black,
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(24),
  },
  checkLabel: {
    paddingVertical: sizeHelper.calHp(10),
    color: AppColor.gray2,
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(24),
  },
  inOutInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickHeading: {
    color: AppColor.black2,
    fontFamily: 'InterSBold',
    fontSize: sizeHelper.calHp(34),
    paddingVertical: sizeHelper.calHp(30),
    paddingHorizontal: sizeHelper.calWp(35),
  },
  item: {
    backgroundColor: AppColor.white,
    height: sizeHelper.calHp(190),
    width: sizeHelper.calWp(210),
    // paddingHorizontal:sizeHelper.calWp(50),
    // paddingVertical: sizeHelper.calHp(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeHelper.calHp(10),
    margin: sizeHelper.calHp(10),
  },
  renderImg: {
    height: sizeHelper.calHp(80),
    width: sizeHelper.calHp(80),
    resizeMode: 'contain',
  },
  renderLabel: {
    color: AppColor.black2,
    fontFamily: 'InterSBold',
    fontSize: sizeHelper.calHp(26),
    paddingTop: sizeHelper.calHp(10),
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
