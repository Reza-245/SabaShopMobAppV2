import SabaColors from '../utils/SabaColors.json';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  useFocusEffect,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import ToastCustom from '../utils/toastCustom';
import _ErrorLayout from '../layouts/ErrorLayout';
import {useCallback, useEffect} from 'react';
import {isEmpty} from 'lodash';
const Profile = () => {
  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   return true;
  // });

  try {
    const toast = useToast();
    const navigate = useNavigation<any>();
    // useEffect(() => {
    //   if (!isEmpty(toast)) {
    //     let counts1: number = 0;
    //     BackHandler.addEventListener('hardwareBackPress', () => {
    //       if (counts1 > 0) BackHandler.exitApp();
    //       counts1++;
    //       toast.show(
    //         'برای بستن برنامه، دوبار برگشت بزنید',
    //         ToastCustom.toastInfo,
    //       );
    //       setTimeout(() => (counts1 = 0), 1000);
    //       return true;
    //     });
    //   }
    // }, [toast]);

    async function logout() {
      await AsyncStorage.removeItem('saba2token');
      navigate.replace('LOGIN');
      toast.show('با موفقیت خارج شدید', ToastCustom.info);
    }
    return (
      <>
        <View style={styles.profileMenuView}>
          <TouchableOpacity activeOpacity={0.5} style={styles.profileMenuItem}>
            <View style={styles.profileMenuItemRight}>
              <View style={styles.profileMenuItemRightIconView}>
                <FontAwesome5 name="user-alt" color="#fff" size={24} />
              </View>
              <Text style={styles.profileMenuItemRightIconText}>
                مشاهده حساب کاربری
              </Text>
            </View>
            <View style={styles.profileMenuItemLeft}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={30}
                color={SabaColors.sabaDarkGary}
                style={{
                  textShadowColor: SabaColors.sabaDarkGary,
                  textShadowRadius: 9,
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.profileMenuItem}>
            <View style={styles.profileMenuItemRight}>
              <View
                style={{
                  ...styles.profileMenuItemRightIconView,
                  backgroundColor: SabaColors.sabaOrange,
                }}>
                <FontAwesome5 name="lock" color="#fff" size={25} />
              </View>
              <Text style={styles.profileMenuItemRightIconText}>
                تغییر گذرواژه
              </Text>
            </View>
            <View style={styles.profileMenuItemLeft}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={30}
                color={SabaColors.sabaDarkGary}
                style={{
                  textShadowColor: SabaColors.sabaDarkGary,
                  textShadowRadius: 9,
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.profileMenuItem}>
            <View style={styles.profileMenuItemRight}>
              <View
                style={{
                  ...styles.profileMenuItemRightIconView,
                  backgroundColor: SabaColors.sabaGreen,
                }}>
                <Entypo color="#fff" name="folder" size={26} />
              </View>
              <Text style={styles.profileMenuItemRightIconText}>
                مشاهده فاکتورها
              </Text>
            </View>
            <View style={styles.profileMenuItemLeft}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={30}
                color={SabaColors.sabaDarkGary}
                style={{
                  textShadowColor: SabaColors.sabaDarkGary,
                  textShadowRadius: 9,
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logout}
            activeOpacity={0.5}
            style={styles.profileMenuItem}>
            <View style={styles.profileMenuItemRight}>
              <View
                style={{
                  ...styles.profileMenuItemRightIconView,
                  backgroundColor: SabaColors.sabaRed,
                }}>
                <MaterialIcons name="logout" color="#fff" size={28} />
              </View>
              <Text style={styles.profileMenuItemRightIconText}>خروج</Text>
            </View>
            <View style={styles.profileMenuItemLeft}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={30}
                color={SabaColors.sabaDarkGary}
                style={{
                  textShadowColor: SabaColors.sabaDarkGary,
                  textShadowRadius: 9,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.profileImageView}>
          <Image
            style={styles.profileImage}
            source={require('../assets/img/profile/profileImage.png')}
          />
        </View>
      </>
    );
  } catch (err: any) {
    return <_ErrorLayout pageError="Profile" errorDes={err.message} />;
  }
};
const styles = StyleSheet.create({
  profileMenuView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileMenuItem: {
    height: 70,
    flexDirection: 'row-reverse',
    borderBottomColor: SabaColors.sabaGray,
    borderBottomWidth: 0.7,
  },
  profileImageView: {
    backgroundColor: '#fff',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  profileImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  profileMenuItemRight: {
    paddingLeft: 6,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  profileMenuItemLeft: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
  },
  profileMenuItemRightIconView: {
    width: 50,
    height: 50,
    backgroundColor: SabaColors.sabaIndigo,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileMenuItemRightIconText: {
    fontFamily: 'shabnamMed',
    fontSize: 14,
    marginRight: 8,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 8,
    color: SabaColors.sabaBlack,
  },
});

export default Profile;
