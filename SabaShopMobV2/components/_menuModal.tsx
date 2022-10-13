/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import SabaColors from '../utils/SabaColors.json';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import Modal from 'react-native-modal';

const _menuModal = ({supportModal, setSupportModal}: any) => {
  return (
    <Modal
      animationIn="fadeInRight"
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
              style={{
                ...styles.modalMenuNavbarItem,
                backgroundColor: SabaColors.sabaIndigo,
              }}>
              <FontAwesome5 color="#fff" name="question" size={26} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.modalMenuNavbarItem,
                backgroundColor: SabaColors.sabaGreen,
              }}>
              <FontAwesome color="#fff" name="whatsapp" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.modalMenuNavbarItem,
                backgroundColor: SabaColors.sabaBlack,
              }}>
              <Entypo color="#fff" name="folder" size={28} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.modalMenuNavbarItem,
                backgroundColor: SabaColors.sabaGold,
              }}>
              <FontAwesome5 color="#fff" name="phone" size={26} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalMenuNavbarItem}>
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
};
const MainScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  // * ------------------------------------------------ Modal
  modalContainer: {
    backgroundColor: '#fff',
    height: '100%',
    width: '70%',
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
