import {
  Image,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import AppColor from '../../Constant/AppColor';
import {styles} from './style';
import Icon from 'react-native-vector-icons/Feather';
import sizeHelper from '../../Helpers/sizeHelper';
import {Formik} from 'formik';
import * as yup from 'yup';
import AlertBox from '../../Components/AlertBox';
export const Design = ({
  isVisiblePassword,
  setVisiblePassword,
  rememberPassword,
  setRememberPassword,
  keyboardStatus,
  onClickSignin,
  isLoading,
  username,
  password,
  alert,
  setAlert,
  message
}) => {
  const loginValidationSchema = yup.object().shape({
    userName: yup.string().required('Name is required'),
    password: yup
      .string()
      .min(6, ({min}) => 'Password must be at least of 6 characters')
      .required('Password is required'),
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar hidden />
      <Text style={styles.loginText}>Sign In</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        {!keyboardStatus ? (
          <Image
            source={require('../../Assets/Images/LoginVactor.png')}
            style={styles.introImage}
          />
        ) : (
          ''
        )}

        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            userName: username,
            password: password,
          }}
          validateOnChange={false} // Disable validation on change
          validateOnBlur={false} // Disable validation on blur
          enableReinitialize
          onSubmit={values => {
            onClickSignin(values);
            console.log('value', values);
          }}>
          {({handleChange, handleSubmit, values, errors, isValid}) => (
            <View style={styles.innerContainer}>
              <Text style={styles.heading}>Welcome to Staff Hub</Text>
              <Text style={styles.text}>Sign in to your account.</Text>
              <View style={styles.textInputOuter}>
                <Text style={styles.label}>Username</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    placeholder={'Enter User Name'}
                    placeholderTextColor={'rgba(51, 51, 51, 0.37)'}
                    value={values.userName}
                    error={errors.userName}
                    name={'userName'}
                    onChangeText={handleChange('userName')}
                    style={styles.textInput}
                  />
                  <Icon
                    name={'user'}
                    size={sizeHelper.calHp(35)}
                    color={AppColor.black2}
                  />
                </View>
                {errors.userName && (
                  <Text style={styles.errorText}>{errors.userName}</Text>
                )}
              </View>
              <View>
                <Text style={styles.label}>Password</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    placeholder={'********'}
                    placeholderTextColor={'rgba(51, 51, 51, 0.37)'}
                    secureTextEntry={isVisiblePassword}
                    name={'password'}
                    onChangeText={handleChange('password')}
                    error={errors.password}
                    value={values.password}
                    style={styles.textInput}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setVisiblePassword(!isVisiblePassword);
                    }}>
                    <Icon
                      name={isVisiblePassword ? 'eye-off' : 'eye'}
                      size={sizeHelper.calHp(35)}
                      color={AppColor.black2}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.RememberMeContainer}>
                <TouchableOpacity
                  onPress={() => setRememberPassword(!rememberPassword)}>
                  <Icon
                    name={rememberPassword ? 'check-square' : 'square'}
                    size={sizeHelper.calHp(30)}
                    color={AppColor.black}
                  />
                </TouchableOpacity>
                <Text style={styles.rememberText}>Remember Me</Text>
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {
                  handleSubmit();
                }}>
                {isLoading ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <ActivityIndicator
                      color={'#fff'}
                      size={sizeHelper.calHp(40)}
                    />
                  </View>
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
      {alert&&(
        <AlertBox
        onOkPress={() => setAlert(false)}
        messageTxt={message}
          onConfirm={() => {
            setAlert(null);
          }}
        />
        
       )} 
    </SafeAreaView>
  );
};
