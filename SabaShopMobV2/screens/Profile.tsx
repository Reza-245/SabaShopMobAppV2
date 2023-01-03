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
const Profile = () => {
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
        async function getprofile() {
          const profileData = await asyncStorage.getItem('profileData');
          setFullname(profileData?.split('|')[0]);
          setPhoneNumber(profileData?.split('|')[1]);
        }
        getprofile();
      }, []),
    );

    return (
      <View style={styles.profileView}>
        <View style={styles.profileNavback}>
          <TouchableOpacity
            onPress={() => navigate.goBack()}
            activeOpacity={0.5}>
            <AntDesign
              color={SabaColors.sabaWhite}
              size={26}
              name="arrowleft"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSelfView}>
          <View style={styles.profileSelfItemView}>
            <Text style={styles.profileSelfItemRightTextView}>
              نام و نام خانوادگی
            </Text>
            <Text style={styles.profileSelfItemLeftTextView}>{fullname}</Text>
          </View>
          <View style={styles.profileSelfItemView}>
            <Text style={styles.profileSelfItemRightTextView}>شماره همراه</Text>
            <Text style={styles.profileSelfItemLeftTextView}>
              {phoneNumber}
            </Text>
          </View>
        </View>
      </View>
    );
  } catch (err: any) {
    return <_ErrorLayout pageError="Shop" errorDes={err.message} />;
  }
};
const styles = StyleSheet.create({
  profileNavback: {
    paddingHorizontal: 10,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: SabaColors.sabaSlate,
  },
  profileView: {
    height: '100%',
    backgroundColor: SabaColors.sabaSlate2,
  },
  profileSelfView: {
    backgroundColor: SabaColors.sabaSlate2,
    height: mainHeight,
  },
  profileSelfItemView: {
    backgroundColor: SabaColors.sabaSlate,
    height: 54,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    paddingHorizontal: 12,
    marginTop: 3,
  },
  profileSelfItemRightTextView: {
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 12, 15),
    color: SabaColors.sabaGold2,
  },
  profileSelfItemLeftTextView: {
    fontFamily: 'shabnam',
    fontSize: ResCalculator(610, 12, 15),
    color: SabaColors.sabaGold2,
  },
});

export default Profile;
