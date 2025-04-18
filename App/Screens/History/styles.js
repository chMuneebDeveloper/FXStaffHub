import {StyleSheet} from 'react-native';
import AppColor from '../../Constant/AppColor';
import sizeHelper from '../../Helpers/sizeHelper';

export const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: AppColor.white1,
  },

  Calendar: {
    padding: sizeHelper.calHp(15),
    borderRadius: sizeHelper.calHp(20),
    backgroundColor: AppColor.white,
    width: '94%',
    marginTop: sizeHelper.calHp(40),
  },
  labels: {
    fontSize: sizeHelper.calHp(20),
    color: AppColor.black1,
    fontFamily: 'InterMedium',
    textTransform: 'capitalize',
    paddingHorizontal: sizeHelper.calWp(10),
  },
  present: {
    height: sizeHelper.calHp(20),
    width: sizeHelper.calHp(20),
    borderRadius: sizeHelper.calHp(20),
    top: sizeHelper.calHp(7),
  },
  boxContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  allBoxContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: sizeHelper.calHp(50),
    justifyContent: 'space-between',
    width: '90%',
  },

  ContainersList: {
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calHp(10),
    width: '94%',
    height: sizeHelper.calHp(550),
    marginTop: sizeHelper.calHp(40),
  },
  headerView: {
    backgroundColor: AppColor.blue,
    flexDirection: 'row',
    paddingVertical: sizeHelper.calHp(15),
    borderTopLeftRadius: sizeHelper.calHp(10),
    borderTopRightRadius: sizeHelper.calHp(10),
    width: '100%',
    justifyContent: 'space-between',
  },
  hdrtxt: {
    color: '#fff',
    fontSize: sizeHelper.calHp(22),
    fontFamily: 'InterMedium',
    width: '24%',
    textAlign: 'center',
  },
  AttendenceDetail: {
    paddingVertical: sizeHelper.calHp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: AppColor.gray4,
  },
  assignWidth: {
    width: '24%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftView: {
    backgroundColor: AppColor.gray4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: sizeHelper.calHp(10),
    paddingHorizontal: sizeHelper.calHp(18),
    borderRadius: sizeHelper.calHp(6),
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftTxt: {
    color: AppColor.black1,
    fontFamily: 'InterSBold',
    fontSize: sizeHelper.calHp(19),
  },
  middleTopTxt: {
    color: AppColor.black,
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(22),
    paddingBottom: sizeHelper.calHp(6),
  },
  workingTxt: {
    color: AppColor.red2,
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(22),
    paddingBottom: sizeHelper.calHp(6),
  },
  BottomTopTxt: {
    color: AppColor.black,
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(22),

    paddingTop: sizeHelper.calHp(6),
  },
  absentContainer: {
    flexDirection:'row',
    paddingVertical: sizeHelper.calHp(20),
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    paddingRight: sizeHelper.calHp(20),
    borderColor: AppColor.gray4,
  },
  abesent: {
    // width: '95%',
    flex:1,
    padding: sizeHelper.calHp(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeHelper.calHp(10),
    alignSelf: 'center',
  },
  absentTxt: {
    textTransform: 'uppercase',
    color: AppColor.white,
    fontSize: sizeHelper.calHp(24),
    fontFamily: 'InterMedium',
  },
});
