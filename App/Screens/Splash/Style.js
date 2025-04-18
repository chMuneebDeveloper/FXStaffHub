import {StyleSheet} from 'react-native';
import AppColor from '../../Constant/AppColor';
import sizeHelper from '../../Helpers/sizeHelper';

export const Style = StyleSheet.create({
  backgroundImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    height: '12%',
    width: '80%',
    resizeMode: 'contain',
  },
  introSlideContainer: {
    backgroundColor: AppColor.white,
    width: '100%',
    height: '100%',
  },
  introImage: {
    width: '100%',
    height: '55%',
    resizeMode: 'contain',
  },
  skipText: {
    color: AppColor.black1,
    fontSize: sizeHelper.calHp(24),
    fontFamily: 'InterMedium',
  },
  skipButton: {
    paddingVertical: sizeHelper.calHp(35),
    paddingHorizontal: sizeHelper.calWp(25),
  },
  blueContainer: {
    width: '95%',
    backgroundColor: AppColor.blue,
    paddingVertical: sizeHelper.calHp(80),
    paddingHorizontal: sizeHelper.calWp(30),
    borderRadius: sizeHelper.calHp(30),
    marginVertical: sizeHelper.calHp(80),
    alignSelf: 'center',
    overflow: 'hidden',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    color: AppColor.white,
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'InterSBold',
    marginBottom: sizeHelper.calHp(10),
    textAlign: 'center',
  },
  text: {
    color: AppColor.white,
    fontSize: sizeHelper.calHp(20),
    fontFamily: 'InterRegular',
    marginBottom: sizeHelper.calHp(10),
    textAlign: 'center',
    lineHeight: sizeHelper.calHp(35),
  },
  circleImg: {
    position: 'absolute',
    bottom:
      sizeHelper.screenWidth > 450
        ? sizeHelper.calWp(100)
        : sizeHelper.calWp(120),
    left:
      sizeHelper.screenWidth > 450
        ? sizeHelper.calWp(510)
        : sizeHelper.calWp(380),
    resizeMode: 'contain',
  },
});
