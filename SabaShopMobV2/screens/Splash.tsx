import {useCallback, useState} from 'react';
import SabaColors from '../utils/SabaColors.json';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import _ErrorLayout from '../layouts/ErrorLayout';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import axios from 'axios';
import endpoints from '../utils/endpoints.json';
import {SkypeIndicator} from 'react-native-indicators';
import asyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import ToastCustom from '../utils/toastCustom';
import {MConverter} from '../utils/moneyConverter';
import {ProductCoverSchema} from '../realm/Models';
import {ActionShop} from '../realm/ActionShop';
import {TProductCover, TProductServer} from '../utils/types';
import ResCalculator from '../utils/responsiv/Responsiv';
import mainHeight from '../utils/responsiv/MainScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = () => {
  try {
    const navigate = useNavigation<any>();
    const [fullname, setFullname] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();

    const toast = useToast();
    type TProductServerMixed = TProductServer & {
      proNumbers: number;
    };

    useFocusEffect(
      useCallback(() => {
        setTimeout(() => {
          (async () => {
            const sabaShopV2Token = await AsyncStorage.getItem('saba2token');
            if (sabaShopV2Token) navigate.replace('MAIN');
            else navigate.replace('LOGIN');
          })();
        }, 4000);
      }, []),
    );

    return (
      <View style={styles.splashScreen}>
        <View style={styles.splashScreenLogoView}>
          <Image
            style={styles.splashScreenLogo}
            source={require('../assets/img/AryanaLogo512.png')}
          />
        </View>
        <Text style={styles.splashTitle}>بازرگانی امیری (آریانا)</Text>
        <Text style={styles.splashVersion}>نسخه 3.2.0</Text>
      </View>
    );
  } catch (err: any) {
    return <_ErrorLayout pageError="Shop" errorDes={err.message} />;
  }
};
const styles = StyleSheet.create({
  splashScreen: {
    height: '100%',
    backgroundColor: SabaColors.sabaSlate,
  },

  splashScreenLogoView: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  splashScreenLogo: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  splashTitle: {
    fontFamily: 'shabnam',
    fontSize: 20,
    textAlign: 'center',
  },
  splashVersion: {
    position: 'absolute',
    bottom: 2,
    left: 16,
    fontFamily: 'shabnam',
    opacity: 0.5,
  },
});

export default Splash;
