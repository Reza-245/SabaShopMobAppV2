/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useMemo} from 'react';
import SabaColors from '../utils/SabaColors.json';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import MenuModal from '../components/_menuModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {isEmpty, random} from 'lodash';
import {useToast} from 'react-native-toast-notifications';
import {toastCustom} from '../utils/toastCustom';
import asyncStorage from '@react-native-async-storage/async-storage';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import endpoints from '../utils/endpoints.json';
import {useNavigation} from '@react-navigation/native';
import {CounterDown} from '../utils/useCounterDown';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
const App = () => {
  const toast = useToast();
  const [supportModal, setSupportModal] = React.useState<boolean>(false);
  const [nam, setNam] = React.useState<string>();
  const [tel, setTel] = React.useState<string>();
  const [codeGenerated, setCodeGenerated] = React.useState<number>(12);
  const [confirmCode, setConfirmCode] = React.useState<string>();
  const [confirmCodeBool, setConfirmCodeBool] = React.useState<boolean>(false);
  const navigation = useNavigation();
  const [counter, setCounter] = React.useState<number>(0);
  const [switcher, setSwitcher] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  function resetTimer() {
    setCounter(55);
    setSwitcher(true);
  }
  useMemo(() => {
    if (counter != 0)
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    else {
      setConfirmCodeBool(false);
      setSwitcher(false);
      setConfirmCode('');
    }
  }, [counter]);
  async function sendConfirmCode() {
    toast.show('درحال ارسال کد تاییدیه', toastCustom().info);
    resetTimer();
    setConfirmCodeBool(true);
    const code = Math.round(Math.random() * (9999 - 1000) + 1000);
    setCodeGenerated(code);
    await axios
      .post(
        endpoints.sendSms,
        JSON.stringify({
          mobileNumber: tel,
          codeContent: code,
        }),
      )
      .then(({data, status}) => {
        toast.show(
          'کد تاییدیه با موفقیت به شماره همراه شما ارسال شد',
          toastCustom().success,
        );
      })
      .catch(() => {});
  }
  async function handleLogin() {
    setLoading(true);
    if (codeGenerated === Number(confirmCode) && !loading) {
      await axios
        .post(
          endpoints.login,
          JSON.stringify({
            tel,
            nam,
          }),
        )
        .then(async ({data, status}) => {
          if (status == 201) {
            toast.show(
              'ثبت نام با موفقیت انجام شد تا تایید نهایی توسط کارشناسان لطفا صبور باشید',
              toastCustom().successInfo,
            );
            setConfirmCode('');
            setNam('');
            setTel('');
            setConfirmCodeBool(false);
          } else if (status == 204)
            toast.show(
              'شما هنوز از سمت کارشناسان تایید نشده اید باید صبور باشید',
              toastCustom().info,
            );
          else {
            toast.show('خوش آمدید', toastCustom().success);
            await asyncStorage.setItem('saba2token', `${data.nam}|${data.id}`);
            navigation.replace('MAIN');
          }
        })
        .finally(() => setLoading(false));
    } else {
      toast.show('کد وارد شده صحیح نیست', toastCustom().danger);
      setLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <MenuModal
        supportModal={supportModal}
        setSupportModal={setSupportModal}
      />
      <View style={styles.loginPageContainer}>
        <View style={styles.loginNavigation}>
          <View style={styles.loginNavigationImgView}>
            <Image
              source={require('../assets/img/sabaLogo.png')}
              style={styles.loginNavigationImg}
            />
          </View>
          <View style={styles.loginNavigationInfoView}>
            <View style={styles.loginNavigationInfoNameView}>
              <TouchableOpacity
                onPress={() => setSupportModal(true)}
                activeOpacity={0.5}>
                <Ionicons
                  name="ios-menu"
                  size={34}
                  color={SabaColors.sabaWhite}
                />
              </TouchableOpacity>

              <Text style={styles.loginNavigationInfoName}>فروشگاه صبا</Text>
            </View>
          </View>
        </View>
        <KeyboardAvoidingView behavior="position" style={styles.loginContainer}>
          <View style={styles.loginView}>
            <View style={styles.loginIconView}>
              <Image
                style={styles.loginIcon}
                source={require('../assets/img/login/Shield.png')}
              />
            </View>
            <View style={styles.loginFieldsView}>
              <View style={styles.loginFieldItem}>
                <TextInput
                  placeholder="نام و نام خانوادگی"
                  style={styles.loginFieldItemInput}
                  onChangeText={setNam}
                  value={nam}
                  placeholderTextColor={SabaColors.sabaDarkGary}
                />
                <View style={styles.loginFieldItemIconView}>
                  <View style={styles.loginFieldItemIcon}>
                    <FontAwesome5 color="#fff" size={24} name="user-alt" />
                  </View>
                </View>
              </View>
              <View
                style={{
                  ...styles.loginFieldItem,
                  opacity: isEmpty(nam) ? 0.6 : 1,
                }}>
                <TextInput
                  placeholder="شماره همراه"
                  style={styles.loginFieldItemInput}
                  onChangeText={value => setTel(value.replace(/[^0-9]/g, ''))}
                  keyboardType="number-pad"
                  editable={!isEmpty(nam)}
                  placeholderTextColor={SabaColors.sabaDarkGary}
                  value={tel}
                />
                <View style={styles.loginFieldItemIconView}>
                  <View
                    style={{
                      ...styles.loginFieldItemIcon,
                      backgroundColor: SabaColors.sabaIndigo,
                    }}>
                    <Ionicons color="#fff" size={24} name="ios-send" />
                  </View>
                </View>
              </View>
              <View
                style={{
                  ...styles.loginFieldItem,
                  backgroundColor: !confirmCodeBool
                    ? SabaColors.sabaDarkGary
                    : '#fff',
                }}>
                <TextInput
                  placeholder="کد تاییدیه"
                  style={{
                    ...styles.loginFieldItemInput,
                    opacity: !confirmCodeBool ? 0.6 : 1,
                  }}
                  placeholderTextColor={SabaColors.sabaDarkGary}
                  onChangeText={setConfirmCode}
                  editable={confirmCodeBool}
                  value={confirmCode}
                  keyboardType="number-pad"
                />

                <View style={styles.loginFieldItemIconView}>
                  <TouchableOpacity
                    onPress={() => !switcher && sendConfirmCode()}
                    activeOpacity={0.5}
                    disabled={isEmpty(nam) || isEmpty(tel) || confirmCodeBool}
                    style={{
                      ...styles.loginFieldItemIcon,
                      backgroundColor: SabaColors.sabaGold,
                    }}>
                    {switcher ? (
                      <Text style={styles.loginTimer}>{counter}</Text>
                    ) : (
                      <FontAwesome5 color="#fff" size={24} name="key" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.loginFieldItem}>
                <TouchableOpacity
                  onPress={() => confirmCodeBool && handleLogin()}
                  disabled={
                    isEmpty(nam) ||
                    isEmpty(tel) ||
                    !confirmCodeBool ||
                    isEmpty(confirmCode)
                  }
                  style={styles.loginFieldItemButton}
                  activeOpacity={0.5}>
                  {loading ? (
                    <MaterialIndicator color="#fff" size={34} />
                  ) : (
                    <Text style={styles.loginFieldItemButtonText}>
                      {isEmpty(nam)
                        ? 'نام را وارد کنید'
                        : isEmpty(tel)
                        ? 'شماره همراه را با صفر وارد کنید'
                        : tel?.length !== 11
                        ? 'شماره همراه باید 11 رقم باشد'
                        : !isEmpty(tel) && !confirmCodeBool
                        ? 'برای ارسال کد تاییدیه روی کلید زرد کلیک کنید'
                        : isEmpty(confirmCode)
                        ? 'کد تاییدیه را وارد کنید'
                        : 'درخواست ورود'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};
const MainScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  loginPageContainer: {
    backgroundColor: SabaColors.sabaBlack,
    height: MainScreen.height,
    width: MainScreen.width,
  },
  // * ---------------------------------------------- Navigation
  loginNavigation: {
    flexDirection: 'row',
    height: 60,
    width: MainScreen.width,
    paddingVertical: 6,
  },
  loginNavigationImgView: {
    height: '100%',
    resizeMode: 'contain',
    width: '40%',
    justifyContent: 'flex-start',
    paddingLeft: 8,
  },
  loginNavigationImg: {
    height: '100%',
    resizeMode: 'contain',
    width: '50%',
  },
  loginNavigationInfoView: {
    height: '100%',
    width: '60%',
  },
  loginNavigationInfoNameView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    height: '100%',
    paddingLeft: 12,
  },
  loginNavigationInfoName: {
    fontSize: 17,
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaWhite,
    marginRight: 12,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 4,
  },
  // * ---------------------------------------------- Login --------------------------------------- // height (screenHeight-85)
  loginContainer: {
    height: MainScreen.height - 85,
    justifyContent: 'center',
  },
  loginView: {
    height: 600,
    paddingHorizontal: 60,
  },
  loginIconView: {
    height: 200,
    paddingVertical: 20,
  },
  loginIcon: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  loginFieldsView: {
    height: 280,
    justifyContent: 'space-evenly',
  },
  loginFieldItem: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    borderRadius: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  loginFieldItemInput: {
    fontFamily: 'shabnam',
    borderRadius: 50,
    height: '100%',
    width: '86%',
    textAlign: 'right',
    paddingHorizontal: 12,
    color: SabaColors.sabaBlack,
  },
  loginFieldItemButton: {
    fontFamily: 'shabnam',
    borderRadius: 50,
    height: '100%',
    width: '100%',
    textAlign: 'right',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SabaColors.sabaGreen,
  },
  loginFieldItemButtonText: {
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaWhite,
  },
  loginFieldItemIconView: {
    borderRadius: 25,
    height: '100%',
    width: '14%',
    padding: 3,
  },
  loginFieldItemIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SabaColors.sabaOrange,
    borderRadius: 25,
    height: '100%',
    width: 44,
  },
  signupTextView: {},
  signupText: {
    fontFamily: 'shabnam',
    color: SabaColors.sabaGreen,
    fontSize: 11,
    textAlign: 'center',
    textShadowColor: SabaColors.sabaGreen,
    textShadowRadius: 4,
  },
  loginTimer: {
    fontFamily: 'shabnamMed',
    color: '#fff',
  },
});

export default App;
