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
  useColorScheme,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import MenuModal from '../components/_menuModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Profile = () => {
  const [supportModal, setSupportModal] = React.useState<boolean>(false);

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
        <TouchableOpacity activeOpacity={0.5} style={styles.profileMenuItem}>
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
};
const MainScreen = Dimensions.get('window');
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
