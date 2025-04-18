import { View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Design } from './Design';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const SplashScreen = props => {
  const [showRealApp, setRealApp] = useState(false);
  const [sliderData, setSliderData] = useState([
    {
      key: 1,
      title: 'Welcome to FX Staff Hub',
      text: 'The app offers an all-in-one solution for human resource management concerns in the palm of your hand. Just log in with your access credentials to benefit from its features.',
      image: require('../../Assets/Images/Slide1.png'),
      backgroundColor: '#25272E',
    },

    {
      key: 2,
      title: 'Welcome to FX Staff Hub',
      text: 'The app keeps all the information you give it secure and prevents any possible breach. Only the assigned access to data with the provided login information is applicable.',
      image: require('../../Assets/Images/Slide2.png'),
      backgroundColor: '#25272E',
    },
    {
      key: 3,
      title: 'Manage Your Calendar',
      text: 'Keep track of your attendance and apply for leaves through the app in the most transparent way. The app keeps your data secure and manages your work calendar accurately.',
      image: require('../../Assets/Images/Slide3.png'),
      backgroundColor: '#25272E',
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewref = useRef(null);

  const handleNext = () => {
    if (currentIndex === 2) {
      onDone();
    } else {
      setCurrentIndex(prevIndex => (prevIndex + 1) % sliderData.length);
      viewref.current.goToSlide(currentIndex + 1, true);
    }
  };

  const onDone = () => {
    console.log('On Done function all');
    setRealApp(true);
    AsyncStorage.setItem('MY_REAL_APP', 'true', err => {
      if (err) {
        console.log('an error');
        throw err;
      }
      console.log('success');
    }).catch(err => {
      console.log('error is: ' + err);
    });
  };

  const showRealAppFun = async () => {
    try {
      getAppInfo();
      if (showRealApp) {
        let UserLogin = await AsyncStorage.getItem('ACCESS_TOKEN');
        await loadData(UserLogin);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const getAppInfo = async () => {
    var val = await AsyncStorage.getItem('MY_REAL_APP').then(v => {
      console.log('app state is', v);
      if (v == 'true') {
        setRealApp(true);
      } else {
        setRealApp(false);
      }
    });
  };

  useEffect(() => {
    showRealAppFun();
  }, [showRealApp]);

  const loadData = async UserLogin => {
    if (UserLogin) {
      props.navigation.replace('Main');
    } else {
      setTimeout(() => {
        props.navigation.replace('Auth');
      }, 1000);
    }
  };

  const currentData = sliderData[currentIndex];
  return (
    <View>
      <Design
        showRealApp={showRealApp}
        sliderData={sliderData}
        handleNext={handleNext}
        setCurrentIndex={setCurrentIndex}
        currentData={currentData}
        onDone={onDone}
        viewref={viewref}
      />
    </View>
  );
};

export default SplashScreen;
