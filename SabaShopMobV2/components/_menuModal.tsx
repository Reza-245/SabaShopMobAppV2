import SabaColors from '../utils/SabaColors.json';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {toastCustom} from '../utils/toastCustom';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {Linking} from 'react-native';
import _ErrorLayout from '../layouts/ErrorLayout';
const _menuModal = ({supportModal, setSupportModal}: any) => {
  try {
    const navigate = useNavigation<any>();
    const toast = useToast();
    const supportNumber = '09059147588';
    const ManagerNumber = '09171081139';
    const whatsAppNumber = '09059147588';
    async function logout() {
      await AsyncStorage.removeItem('saba2token');
      navigate.replace('LOGIN');
      toast.show('با موفقیت خارج شدید', toastCustom().info);
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
                color={SabaColors.sabaGray}
                size={26}
                name="arrowright"
              />
            </TouchableOpacity>
            <View style={styles.modalImageView}>
              <Image
                style={styles.modalImageLogo}
                source={require('../assets/img/sabaLogo.png')}
              />
              <Text style={styles.modalImageText}>گروه نرم افزاری صبا</Text>
            </View>
            <View style={styles.modalMenuNavbar}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${supportNumber}`)}
                style={{
                  ...styles.modalMenuNavbarItem,
                  backgroundColor: SabaColors.sabaIndigo,
                }}>
                <FontAwesome5 color="#fff" name="question" size={26} />
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
                  backgroundColor: SabaColors.sabaGold,
                }}>
                <FontAwesome5 color="#fff" name="phone" size={26} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={logout}
                style={styles.modalMenuNavbarItem}>
                <MaterialIcons color="#fff" name="logout" size={30} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 0.3,
                backgroundColor: SabaColors.sabaGray,
                elevation: 3,
              }}></View>
          </View>
          <View style={styles.modalBottomImageView}>
            <Image
              style={styles.modalBottomImage}
              source={require('../assets/img/modal/ModalImageBottom.png')}
            />
          </View>
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
    backgroundColor: '#fff',
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
    height: 200,
    width: '100%',
    alignItems: 'center',
  },
  modalImageLogo: {
    resizeMode: 'contain',
    height: 160,
    width: 200,
  },
  modalImageText: {
    fontFamily: 'shabnamMed',
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaBlack,
  },
  modalMenuNavbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row-reverse',
  },
  modalMenuNavbarItem: {
    height: 50,
    width: 50,
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
});

export default _menuModal;
