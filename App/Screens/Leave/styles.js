import {StyleSheet} from 'react-native';
import AppColor from '../../Constant/AppColor';
import sizeHelper from '../../Helpers/sizeHelper';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColor.white1,
  },
  Container: {
    marginHorizontal: sizeHelper.calWp(30),
    marginTop: sizeHelper.calHp(30),
  },
  titleTxt: {
    color: AppColor.black1,
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(28),
    marginBottom: sizeHelper.calHp(10),
  },
  TopView: {
    backgroundColor: AppColor.white3,
    borderRadius: sizeHelper.calHp(50),
    borderWidth:0,
  },
  DataView: {
    backgroundColor: AppColor.white3,
    padding: sizeHelper.calHp(22),
    borderRadius: sizeHelper.calHp(50),
    // flexDirection:'row',
    // justifyContent: 'space-between',
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: sizeHelper.calHp(30),
  },
  InsideMiddle: {
    width: '48%',
  },
  BottomView: {
    backgroundColor: AppColor.white3,
    paddingHorizontal: sizeHelper.calHp(15),
    borderRadius: sizeHelper.calHp(12),
    minHeight: sizeHelper.calHp(250),
  },
  BtnView: {
    padding: sizeHelper.calHp(18),
    borderRadius: sizeHelper.calHp(50),
    marginTop: sizeHelper.calHp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: AppColor.white,
    fontSize: sizeHelper.calHp(28),
    fontFamily: 'InterMedium',
  },
  dropdown: {},
  calendarModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarStyle: {
    backgroundColor: AppColor.white,
    borderRadius: sizeHelper.calWp(10),
    padding: sizeHelper.calWp(20),
    width: '80%',
    paddingVertical: sizeHelper.calHp(50),
  },
  calenderButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  graphes: {
    height: '28%',
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColor.white,
        borderRadius: sizeHelper.calHp(15),
        marginVertical: sizeHelper.calHp(10),
      },
  leaveBlace: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyLeave: {
    height: '100%',
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  smallProgress: {
    flexDirection: 'row',
    width: '92%',
    alignSelf: 'flex-start',
    justifyContent: 'between-space',
    paddingHorizontal: sizeHelper.calWp(100),
    top: sizeHelper.calHp(190),
    position:'absolute',
    right:sizeHelper.calWp(250)
  },
  cricleOuter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  interText: {
    fontFamily: 'InterSBold',
    fontSize: sizeHelper.calHp(40),
    color: AppColor.black2,
  },
  smallText: {
    fontFamily: 'InterSBold',
    fontSize: sizeHelper.calHp(26),
    color: AppColor.black2,
  },
  interLabel: {
    fontFamily: 'InterSBold',
    fontSize: sizeHelper.calHp(23),
    color: AppColor.gray1,
  },
  smallLabel: {
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(20),
    color: AppColor.gray3,
    paddingVertical: sizeHelper.calHp(5),
  },
  leaveContainer:{
    paddingTop: sizeHelper.calHp(50),
  },
  dropDownContainer:{
    borderWidth:0,
    borderRadius:sizeHelper.calHp(10),
    paddingVertical:sizeHelper.calHp(10)
  },
  dropDownText:{
    color:AppColor.black,
    fontSize: sizeHelper.calHp(23),
    fontFamily: 'InterMedium',
  },
  itemContainer:{
    borderBottomWidth:0.5,
    borderColor:'#D6D6D6',
    paddingStart: sizeHelper.calHp(25),
    // marginTop:sizeHelper.calHp(20)
    height:sizeHelper.calHp(80),
    justifyContent: 'center',
  },
  placeholdertxt:{
    color: AppColor.black,
    fontSize: sizeHelper.calHp(22),
    fontFamily: 'InterRegular',
  },
});
