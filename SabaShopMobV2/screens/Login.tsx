import {useMemo, useState, useEffect} from 'react';
import SabaColors from '../utils/SabaColors.json';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import MenuModal from '../components/_menuModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {isEmpty} from 'lodash';
import {useToast} from 'react-native-toast-notifications';
import ToastCustom from '../utils/toastCustom';
import asyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import endpoints from '../utils/endpoints.json';
import {useNavigation} from '@react-navigation/native';
import {MaterialIndicator} from 'react-native-indicators';
import _ErrorLayout from '../layouts/ErrorLayout';
import ResCalculator from '../utils/responsiv/Responsiv';
import mainHeight from '../utils/responsiv/MainScreen';
const App = () => {
  try {
    const toast = useToast();
    const [supportModal, setSupportModal] = useState<boolean>(false);
    const [savedProfile, setSavedProfile] = useState<boolean>(false);
    const [nam, setNam] = useState<string>();
    const [tel, setTel] = useState<string>();
    const [codeGenerated, setCodeGenerated] = useState<number>(12);
    const [confirmCode, setConfirmCode] = useState<string>();
    const [confirmCodeBool, setConfirmCodeBool] = useState<boolean>(false);
    const navigation = useNavigation();
    const [counter, setCounter] = useState<number>(0);
    const [switcher, setSwitcher] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

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

    useEffect(() => {
      async function checkProfile() {
        const profileData = await asyncStorage.getItem('profileData');
        if (!isEmpty(profileData)) {
          setNam(profileData?.split('|')[0]);
          setTel(profileData?.split('|')[1]);
          setSavedProfile(true);
        }
      }
      checkProfile();
    }, []);
    function sendConfirmCode() {
      toast.show('درحال ارسال کد تاییدیه', ToastCustom.info);
      resetTimer();
      setConfirmCodeBool(true);
      const code = Math.round(Math.random() * (9999 - 1000) + 1000);
      setCodeGenerated(code);
      axios
        .post(
          endpoints.sendSms,
          JSON.stringify({
            mobileNumber: tel,
            codeContent: code,
          }),
        )
        .then(() => {
          toast.show(
            'کد تاییدیه با موفقیت به شماره همراه شما ارسال شد',
            ToastCustom.success,
          );
        })
        .catch(() => {});
    }
    function handleExitCount() {
      asyncStorage.removeItem('profileData');
      setNam('');
      setTel('');
      setSavedProfile(false);
    }
    function handleLogin() {
      setLoading(true);
      if ((codeGenerated === Number(confirmCode) || savedProfile) && !loading) {
        axios
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
                ToastCustom.successInfo,
              );
              setConfirmCode('');
              setConfirmCodeBool(false);
            } else if (status == 204) {
              toast.show(
                'شما هنوز از سمت کارشناسان تایید نشده اید صبور باشید',
                ToastCustom.info,
              );
            } else {
              toast.show('خوش آمدید', ToastCustom.success);
              await asyncStorage.setItem(
                'saba2token',
                `${data.nam}|${data.id}`,
              );
              navigation.replace('MAIN');
            }
            await asyncStorage.setItem('profileData', `${nam}|${tel}`);
            setSavedProfile(true);
            setSwitcher(false);
            setCounter(0);
            setConfirmCode('');
          })
          .catch()
          .finally(() => setLoading(false));
      } else {
        toast.show('کد وارد شده صحیح نیست', ToastCustom.danger);
        setLoading(false);
      }
    }
    return (
      <SafeAreaView>
        <MenuModal
          supportModal={supportModal}
          setSupportModal={setSupportModal}
          showMenu={false}
        />
        <View style={styles.loginPageContainer}>
          <View style={styles.loginNavigation}>
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

                <Text style={styles.loginNavigationInfoName}>
                  بازرگانی آریــانــا
                </Text>
              </View>
            </View>
          </View>
          <KeyboardAvoidingView
            behavior="position"
            style={styles.loginContainer}>
            <View style={styles.loginView}>
              <View style={styles.loginIconView}>
                <Image
                  style={styles.loginIcon}
                  source={require('../assets/img/AryanaLogo512.png')}
                />
              </View>
              <View style={styles.loginFieldsView}>
                <View
                  style={{
                    ...styles.loginFieldItem,
                    opacity: savedProfile ? 0.6 : 1,
                  }}>
                  <TextInput
                    placeholder="نام و نام خانوادگی"
                    style={styles.loginFieldItemInput}
                    onChangeText={setNam}
                    value={nam}
                    editable={!savedProfile}
                    placeholderTextColor={'rgba(140,140,140,0.8)'}
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
                    opacity: isEmpty(nam) || savedProfile ? 0.6 : 1,
                  }}>
                  <TextInput
                    placeholder="شماره همراه"
                    style={styles.loginFieldItemInput}
                    onChangeText={value => setTel(value.replace(/[^0-9]/g, ''))}
                    keyboardType="number-pad"
                    editable={!isEmpty(nam) && !savedProfile}
                    placeholderTextColor={'rgba(140,140,140,0.8)'}
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
                    backgroundColor:
                      !confirmCodeBool || savedProfile
                        ? SabaColors.sabaSlate2
                        : SabaColors.sabaSlate2,
                  }}>
                  <TextInput
                    placeholder="کد تاییدیه"
                    style={{
                      ...styles.loginFieldItemInput,
                      opacity: !confirmCodeBool || savedProfile ? 0.6 : 1,
                    }}
                    placeholderTextColor={'rgba(140,140,140,0.8)'}
                    onChangeText={setConfirmCode}
                    editable={confirmCodeBool && !savedProfile}
                    value={confirmCode}
                    keyboardType="number-pad"
                  />

                  <View style={styles.loginFieldItemIconView}>
                    <TouchableOpacity
                      onPress={() => !switcher && sendConfirmCode()}
                      activeOpacity={0.5}
                      disabled={
                        isEmpty(nam) ||
                        isEmpty(tel) ||
                        confirmCodeBool ||
                        savedProfile
                      }
                      style={{
                        ...styles.loginFieldItemIcon,
                        backgroundColor: SabaColors.sabaGreen,
                      }}>
                      {switcher ? (
                        <Text style={styles.loginTimer}>{counter}</Text>
                      ) : (
                        <FontAwesome5 color="#fff" size={24} name="key" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                {savedProfile && (
                  <TouchableOpacity
                    onPress={handleExitCount}
                    style={styles.loginFieldExit}>
                    <Text style={styles.loginFieldExitText}>خروج از حساب</Text>
                  </TouchableOpacity>
                )}
                <View style={styles.loginFieldItem}>
                  <TouchableOpacity
                    onPress={() =>
                      confirmCodeBool || savedProfile ? handleLogin() : null
                    }
                    disabled={
                      (isEmpty(nam) ||
                        isEmpty(tel) ||
                        !confirmCodeBool ||
                        isEmpty(confirmCode)) &&
                      !savedProfile
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
                          : !isEmpty(tel) && !confirmCodeBool && !savedProfile
                          ? 'برای ارسال کد تاییدیه روی کلید سبز کلیک کنید'
                          : isEmpty(confirmCode) && !savedProfile
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
  } catch (err: any) {
    return <_ErrorLayout pageError="Login" errorDes={err.message} />;
  }
};
const MainScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  loginPageContainer: {
    backgroundColor: SabaColors.sabaSlate,
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
  loginNavigationInfoView: {
    height: '100%',
    width: '100%',
  },
  loginNavigationInfoNameView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    height: '100%',
    paddingLeft: 12,
  },
  loginNavigationInfoName: {
    fontSize: ResCalculator(610, 13, 17),
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaWhite,
    marginRight: 12,
  },
  // * ---------------------------------------------- Login --------------------------------------- // height (screenHeight-85)
  loginContainer: {
    height: mainHeight,
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
    backgroundColor: SabaColors.sabaSlate2,
    width: '100%',
    height: 50,
    borderRadius: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  loginFieldExit: {
    paddingHorizontal: 6,
  },
  loginFieldExitText: {
    color: SabaColors.sabaWhite,
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 9, 11),
  },

  loginFieldItemInput: {
    fontFamily: 'shabnam',
    borderRadius: 50,
    height: '100%',
    width: '86%',
    textAlign: 'right',
    paddingHorizontal: 12,
    color: SabaColors.sabaWhite,
    backgroundColor: SabaColors.sabaSlate2,
    fontSize: ResCalculator(610, 11, 14),
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
    fontSize: ResCalculator(610, 11, 14),
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
  },
  loginTimer: {
    fontFamily: 'shabnamMed',
    color: '#fff',
  },
});

export default App;
