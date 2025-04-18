import {
  Image,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Style} from './Style';
import AppIntroSlider from 'react-native-app-intro-slider';
import AppColor from '../../Constant/AppColor';
import sizeHelper from '../../Helpers/sizeHelper';
import Icon from 'react-native-vector-icons/Feather';
export const Design = ({
  showRealApp,
  sliderData,
  setCurrentIndex,
  handleNext,
  onDone,
  viewref,
}) => {
  const renderItem = (item, index) => {
    return (
      <View style={Style.introSlideContainer}>
        <TouchableOpacity style={Style.skipButton} onPress={onDone}>
          <Text style={Style.skipText}>Skip</Text>
        </TouchableOpacity>
        <Image source={item.item.image} style={Style.introImage} />
        <View style={Style.blueContainer}>
          <Image
            source={require('../../Assets/Images/circle.png')}
            style={Style.circleImg}
          />
          <Text style={Style.title}>{item.item.title}</Text>
          <Text style={Style.text}>{item.item.text}</Text>
        </View>
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: AppColor.blue,
            height: sizeHelper.calHp(100),
            width: sizeHelper.calHp(100),
            borderRadius: sizeHelper.calHp(70),
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 3,
            borderColor: AppColor.white,
            alignSelf: 'center',
            position: 'absolute', // Allows free positioning
            bottom: sizeHelper.calHp(24),
          }}>
          <Icon name={item.item.key===3?'check':'arrow-right'} color={AppColor.white} size={23} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View
        style={{
          backgroundColor: AppColor.blue,
          height: sizeHelper.calHp(100),
          width: sizeHelper.calHp(100),
          borderRadius: sizeHelper.calHp(70),
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 3,
          borderColor: AppColor.white,
          alignSelf: 'center',
          // position: 'absolute', // Allows free positioning
          bottom: sizeHelper.calHp(20), // Adjust vertical position
          // right: 20,
          left: sizeHelper.calWp(-300),
        }}>
        <Icon name={'arrow-right'} color={AppColor.white} size={23} />
      </View>
    );
  };

  return !showRealApp ? (
    <View style={Style.introSlideContainer}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View style={{height:sizeHelper.calHp(30)}}></View>
      <AppIntroSlider
        activeDotStyle={{
          borderRadius: 5,
          height: 8,
          width: 50,
          marginHorizontal: 1.5,
          backgroundColor: AppColor.blue,
          bottom: sizeHelper.calHp(410),
        }}
        dotStyle={{
          borderRadius: 5,
          height: 7,
          width: 7,
          marginHorizontal: 3,
          backgroundColor: AppColor.blue,
          bottom: sizeHelper.calHp(410),
        }}
        ref={ref => (viewref.current = ref)}
        data={sliderData}
        showNextButton={false}
        showDoneButton={false}
        renderItem={renderItem}
        onSlideChange={(index, lastIndex) => {
          setCurrentIndex(index);
          console.log('index, lastIndex', index, lastIndex);
        }}
      />
    </View>
  ) : (
    <View>
      <StatusBar hidden />
      <ImageBackground
        source={require('../../Assets/Images/SplashBackground.png')}
        style={Style.backgroundImg}>
        <Image
          source={require('../../Assets/Images/Finex-Logo-White.png')}
          style={Style.logoImg}
        />
      </ImageBackground>
    </View>
  );
};