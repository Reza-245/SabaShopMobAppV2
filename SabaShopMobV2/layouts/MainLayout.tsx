import {useCallback, useState} from 'react';
import SabaColors from '../utils/SabaColors.json';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Profile from '../screens/Profile';
import _menuModal from '../components/_menuModal';
import Shop from '../screens/Shop';
import Home from '../screens/Home';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActionShop} from '../realm/ActionShop';
import _ErrorLayout from './ErrorLayout';
import ResCalculator from '../utils/responsiv/Responsiv';
const _MainLayout = ({ordersNumber, setOrdersNumber}: any) => {
  try {
    const [supportModal, setSupportModal] = useState<boolean>(false);
    const [customerName, setCustomerName] = useState<string>();

    useFocusEffect(
      useCallback(() => {
        async function getData() {
          const customer: string = await AsyncStorage.getItem('saba2token');
          setCustomerName(customer);
          ActionShop('sync', 0, 0, null, null, setOrdersNumber);
        }
        getData();
      }, []),
    );
    const navigate = useNavigation<any>();
    return (
      <>
        <_menuModal
          supportModal={supportModal}
          setSupportModal={setSupportModal}
        />

        <TouchableOpacity
          onPress={() => navigate.navigate('SHOP')}
          activeOpacity={0.5}
          style={styles.shopBadgeView}>
          <FontAwesome5 color="#fff" size={23} name="shopping-cart" />
          {ordersNumber !== 0 && (
            <View style={styles.shopBadgeItemView}>
              <Text style={styles.shopBadgeText}>{ordersNumber}</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.MenuNavigatorView}>
          <View style={styles.MenuNavigatorRightView}>
            <TouchableOpacity
              onPress={() => setSupportModal(true)}
              activeOpacity={0.5}
              style={styles.MenuNavigatorRightMenuView}>
              <Ionicons size={30} color="#fff" name="ios-menu" />
            </TouchableOpacity>
            <View style={styles.MenuNavigatorRightTitleView}>
              <Text style={styles.MenuNavigatorRightTitleText}>
                بازرگانی شـاهسونی
              </Text>
              <Text style={styles.MenuNavigatorRightTitleCustomerText}>
                {customerName?.split('|')[0]}
              </Text>
            </View>
          </View>
          <View style={styles.MenuNavigatorLeftView}>
            <TouchableOpacity
              onPress={() => navigate.navigate('PRODUCTS')}
              activeOpacity={0.5}>
              <Feather
                style={{marginLeft: 8}}
                color="#fff"
                size={24}
                name="search"
              />
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => navigate.navigate('SHOP')}
              activeOpacity={0.5}
              style={styles.bellBadgeView}>
              <MaterialCommunityIcons color="#fff" size={26} name="bell" />
              {/* {ordersNumber === 0 && (
                <View style={styles.bellBadgeItemView}>
                  <Text style={styles.bellBadgeText}>{ordersNumber}</Text>
                </View>
              )} */}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.childrenContainer}>
          <Home />
        </View>
      </>
    );
  } catch (err: any) {
    return <_ErrorLayout pageError="Mainlayout" errorDes={err.message} />;
  }
};
const MainScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  MenuNavigatorView: {
    backgroundColor: SabaColors.sabaSlate,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  shopBadgeView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 14,
    backgroundColor: SabaColors.sabaSlate,
    zIndex: 10,
    height: 54,
    width: 54,
    borderRadius: 500,
    paddingRight: 2,
  },
  shopBadgeItemView: {
    backgroundColor: SabaColors.sabaIndigo,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    padding: 3,
    width: 22,
    height: 22,
    elevation: 4,
    position: 'absolute',
    top: 0,
    right: 0,
    transform: [{translateY: -5}, {translateX: 5}],
  },
  shopBadgeText: {
    fontSize: 10,
    fontFamily: 'shabnamMed',
    color: '#fff',
  },
  bellBadgeView: {
    justifyContent: 'center',
  },
  bellBadgeItemView: {
    backgroundColor: SabaColors.sabaRed,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    padding: 3,
    width: 22,
    height: 22,
    elevation: 4,
    position: 'absolute',
    top: 0,
    right: 0,
    transform: [{translateY: -10}, {translateX: 10}],
  },
  bellBadgeText: {
    fontSize: 10,
    fontFamily: 'shabnamMed',
    color: '#fff',
  },
  MenuNavigatorRightView: {
    paddingLeft: 10,
    height: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  MenuNavigatorRightMenuView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MenuNavigatorRightTitleView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  MenuNavigatorRightTitleText: {
    fontSize: ResCalculator(610, 11, 13),
    fontFamily: 'shabnamMed',
    color: '#fff',
  },
  MenuNavigatorRightTitleCustomerText: {
    fontSize: ResCalculator(610, 10, 13),
    fontFamily: 'shabnam',
    color: '#fff',
  },
  MenuNavigatorLeftView: {
    paddingHorizontal: 6,
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  childrenContainer: {
    height: MainScreen.height - 60,
    width: MainScreen.width,
  },
});
export default _MainLayout;
