import SabaColors from '../utils/SabaColors.json';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ToastCustom from '../utils/toastCustom';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {Linking} from 'react-native';
import _ErrorLayout from '../layouts/ErrorLayout';
import ResCalculator from '../utils/responsiv/Responsiv';
const _menuModal = ({supportModal, setSupportModal, showMenu = true}: any) => {
  try {
    const navigate = useNavigation<any>();
    const toast = useToast();
    const supportNumber = '09059147588';
    const ManagerNumber = '09171081139';
    const whatsAppNumber = '09059147588';
    async function logout() {
      await AsyncStorage.removeItem('saba2token');
      navigate.replace('LOGIN');
      toast.show('با موفقیت خارج شدید', ToastCustom.info);
    }
    return (
      <Modal
        animationIn="fadeInRightBig"
        animationOut="fadeOutRightBig"
        animationInTiming={550}
        animationOutTiming={550}
        hideModalContentWhileAnimating={true}
        isVisible={supportModal}
        backdropOpacity={0}
        style={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          margin: 0,
        }}
        onBackdropPress={() => setSupportModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setSupportModal(false)}
              activeOpacity={0.5}
              style={styles.modalBack}>
              <AntDesign
                color={SabaColors.sabaWhite}
                size={26}
                name="arrowright"
              />
            </TouchableOpacity>
            <View style={styles.modalImageView}>
              <Image
                style={styles.modalImageLogo}
                source={require('../assets/img/AryanaLogo512.png')}
              />
              <Text style={styles.modalImageText}>بازرگانی آریانا</Text>
            </View>
            <View style={styles.modalMenuNavbar}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${supportNumber}`)}
                style={{
                  ...styles.modalMenuNavbarItem,
                  backgroundColor: SabaColors.sabaIndigo,
                }}>
                <FontAwesome5 color="#fff" name="question" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`whatsapp://send?phone=${whatsAppNumber}`)
                }
                style={{
                  ...styles.modalMenuNavbarItem,
                  backgroundColor: SabaColors.sabaGreen,
                }}>
                <FontAwesome color="#fff" name="whatsapp" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${ManagerNumber}`)}
                style={{
                  ...styles.modalMenuNavbarItem,
                  backgroundColor: SabaColors.sabaBlack,
                }}>
                <FontAwesome5 color="#fff" name="phone" size={23} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={logout}
                style={styles.modalMenuNavbarItem}>
                <AntDesign color="#fff" name="instagram" size={30} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 0.3,
                backgroundColor: SabaColors.sabaWhite,
                elevation: 3,
              }}></View>
          </View>

          {showMenu && (
            <View style={styles.profileMenuView}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setSupportModal(false);
                  setTimeout(() => {
                    navigate.navigate('SHOP');
                  }, 300);
                }}
                style={styles.profileMenuItem}>
                <View style={styles.profileMenuItemRight}>
                  <View style={styles.profileMenuItemRightIconView}>
                    <FontAwesome5 color="#fff" name="shopping-cart" size={20} />
                  </View>
                  <Text style={styles.profileMenuItemRightIconText}>
                    سبد خرید
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSupportModal(false);
                  setTimeout(() => {
                    navigate.navigate('PROFILE');
                  }, 300);
                }}
                activeOpacity={0.5}
                style={styles.profileMenuItem}>
                <View style={styles.profileMenuItemRight}>
                  <View style={styles.profileMenuItemRightIconView}>
                    <FontAwesome5 name="user-alt" color="#fff" size={20} />
                  </View>
                  <Text style={styles.profileMenuItemRightIconText}>
                    مشاهده حساب کاربری
                  </Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                activeOpacity={0.5}
                style={styles.profileMenuItem}>
                <View style={styles.profileMenuItemRight}>
                  <View style={styles.profileMenuItemRightIconView}>
                    <FontAwesome5 name="lock" color="#fff" size={25} />
                  </View>
                  <Text style={styles.profileMenuItemRightIconText}>
                    تغییر گذرواژه
                  </Text>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setSupportModal(false);
                  setTimeout(() => {
                    navigate.navigate('FACTOR');
                  }, 300);
                }}
                style={styles.profileMenuItem}>
                <View style={styles.profileMenuItemRight}>
                  <View style={styles.profileMenuItemRightIconView}>
                    <Entypo color="#fff" name="folder" size={20} />
                  </View>
                  <Text style={styles.profileMenuItemRightIconText}>
                    مشاهده فاکتورها
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={logout}
                activeOpacity={0.5}
                style={styles.profileMenuItem}>
                <View style={styles.profileMenuItemRight}>
                  <View style={styles.profileMenuItemRightIconView}>
                    <MaterialIcons name="logout" color="#fff" size={21} />
                  </View>
                  <Text style={styles.profileMenuItemRightIconText}>خروج</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    );
  } catch (err: any) {
    return <_ErrorLayout pageError="Mainlayout" errorDes={err.message} />;
  }
};
const styles = StyleSheet.create({
  // * ------------------------------------------------ Modal
  modalContainer: {
    backgroundColor: SabaColors.sabaSlate,
    height: '100%',
    width: '68%',
    minWidth: 220,
    margin: 0,
    justifyContent: 'space-between',
    elevation: 15,
  },
  modalView: {},
  modalBack: {
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  modalImageView: {
    height: ResCalculator(610, 200, 250),
    width: '100%',
    alignItems: 'center',
  },
  modalImageLogo: {
    resizeMode: 'contain',
    height: ResCalculator(610, 150, 200),
    width: ResCalculator(610, 150, 200),
  },
  modalImageText: {
    marginTop: 6,
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaWhite,
    fontSize: ResCalculator(610, 12, 16),
  },
  modalMenuNavbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row-reverse',
  },
  modalMenuNavbarItem: {
    height: 46,
    width: 46,
    backgroundColor: SabaColors.sabaRed,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBottomImageView: {
    height: 300,
  },
  modalBottomImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    marginBottom: 10,
  },
  profileMenuView: {
    backgroundColor: SabaColors.sabaSlate,
    paddingHorizontal: 10,
  },
  profileMenuItem: {
    height: ResCalculator(610, 46, 60),
    flexDirection: 'row-reverse',
    borderBottomColor: SabaColors.sabaSlate,
    borderBottomWidth: 0.7,
  },
  profileMenuItemRight: {
    paddingLeft: 6,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  profileMenuItemRightIconView: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileMenuItemRightIconText: {
    fontFamily: 'shabnam',
    fontSize: ResCalculator(610, 11, 14),
    marginRight: 8,
    color: SabaColors.sabaWhite,
  },
});

export default _menuModal;
