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

const App = () => {
  const toast = useToast();
  const countdownRef = React.useRef(null);
  const [supportModal, setSupportModal] = React.useState<boolean>(false);
  const [nam, setNam] = React.useState<string>();
  const [tel, setTel] = React.useState<string>();
  const [codeGenerated, setCodeGenerated] = React.useState<number>(12);
  const [confirmCode, setConfirmCode] = React.useState<string>();
  const [confirmCodeBool, setConfirmCodeBool] = React.useState<boolean>(false);
  const navigation = useNavigation();
  async function sendConfirmCode() {
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
      });
    console.log('dwaddadd', {
      mobileNumber: tel,
      codeContent: code,
    });
  }
  async function handleLogin() {
    if (codeGenerated === Number(confirmCode)) {
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
            setConfirmCode('');
          } else if (status == 204)
            toast.show(
              'شما هنوز از سمت کارشناسان تایید نشده اید باید صبور باشید',
              toastCustom().info,
            );
          else {
            toast.show('خوش آمدید', toastCustom().success);
            console.log('ppplp', data);
            await asyncStorage.setItem(
              'saba2token',
              parseInt(data.tel) * parseInt(data.tel),
            );
            navigation('HOME');
          }
        });
    } else {
      toast.show('کد وارد شده صحیح نیست', toastCustom().danger);
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
        <View style={styles.loginContainer}>
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
                  opacity: !confirmCodeBool ? 0.6 : 1,
                }}>
                <TextInput
                  placeholder="کد تاییدیه"
                  style={styles.loginFieldItemInput}
                  onChangeText={setConfirmCode}
                  editable={confirmCodeBool}
                  value={confirmCode}
                />

                <View style={styles.loginFieldItemIconView}>
                  <TouchableOpacity
                    onPress={() => {}}
                    activeOpacity={0.5}
                    style={{
                      ...styles.loginFieldItemIcon,
                      backgroundColor: SabaColors.sabaGold,
                    }}>
                    <FontAwesome5 color="#fff" size={24} name="key" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.loginFieldItem}>
                <TouchableOpacity
                  onPress={confirmCodeBool ? handleLogin : sendConfirmCode}
                  disabled={isEmpty(nam) || isEmpty(tel)}
                  style={styles.loginFieldItemButton}
                  activeOpacity={0.5}>
                  <Text style={styles.loginFieldItemButtonText}>
                    {isEmpty(nam)
                      ? 'نام را وارد کنید'
                      : isEmpty(tel)
                      ? 'شماره همراه را با صفر وارد کنید'
                      : tel?.length !== 11
                      ? 'شماره همراه باید 11 رقم باشد'
                      : !isEmpty(tel) && !confirmCodeBool
                      ? 'ارسال کد تاییدیه'
                      : isEmpty(confirmCode)
                      ? 'کد تاییدیه را وارد کنید'
                      : 'درخواست ورود'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
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
    width: '100%',
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
});

export default App;
