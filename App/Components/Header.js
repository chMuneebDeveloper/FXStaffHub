import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import react from 'react';
import sizeHelper from '../Helpers/sizeHelper';
import AppColor from '../Constant/AppColor';
import Icon from 'react-native-vector-icons/Feather';

const Header = ({Heading, goBack, logout}) => {
  
  return (
    <ImageBackground
      source={require('../Assets/Images/Headerbg.png')}
      style={styles.headerBg}>
      <View>
        {goBack && (
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              goBack();
            }}>
            <Icon
              name={'chevron-left'}
              size={sizeHelper.calHp(45)}
              color={AppColor.white}
            />
          </TouchableOpacity>
        ) 
        // : (
        //   ''
        // )
        }
        <Text style={styles.headerText}>{Heading}</Text>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            logout();
          }}>
          <Icon
            name={'power'}
            size={sizeHelper.calHp(35)}
            color={AppColor.white}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerBg: {
    width: '100%',
    height: sizeHelper.calHp(150),
    resizeMode: 'cover',
    paddingTop: sizeHelper.calHp(70),
  },
  headerText: {
    color: AppColor.white,
    fontSize: sizeHelper.calHp(28),
    fontFamily: 'InterMedium',
    textAlign: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  back: {
    position: 'absolute',
    left: sizeHelper.calWp(20),
  },
  logout: {
    position: 'absolute',
    right: sizeHelper.calWp(20),
  },
});
export default Header;
