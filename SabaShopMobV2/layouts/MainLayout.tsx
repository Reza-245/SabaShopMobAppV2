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
import {ImageSlider} from 'react-native-image-slider-banner';
import MenuModal from '../components/_menuModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Profile from '../screens/Profile';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Login from '../screens/Login';
import _menuModal from '../components/_menuModal';
import PorductSelf from '../screens/PorductSelf';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Favorite from '../screens/Favorite';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Shop from '../screens/Shop';
import Home from '../screens/Home';
const _MainLayout = () => {
  const Tab = createMaterialTopTabNavigator();
  const [supportModal, setSupportModal] = React.useState<boolean>(false);

  return (
    <>
      <_menuModal
        supportModal={supportModal}
        setSupportModal={setSupportModal}
      />
      <View style={styles.MenuNavigatorView}>
        <View style={styles.MenuNavigatorRightView}>
          <TouchableOpacity
            onPress={() => setSupportModal(true)}
            activeOpacity={0.5}
            style={styles.MenuNavigatorRightMenuView}>
            <Ionicons size={30} color="#fff" name="ios-menu" />
          </TouchableOpacity>
          <View style={styles.MenuNavigatorRightTitleView}>
            <Text style={styles.MenuNavigatorRightTitleText}>فروشگاه صبا</Text>
            <Text style={styles.MenuNavigatorRightTitleCustomerText}>
              صفایی
            </Text>
          </View>
        </View>
        <View style={styles.MenuNavigatorLeftView}>
          <Feather
            style={{marginLeft: 8}}
            color="#fff"
            size={22}
            name="search"
          />
          <FontAwesome5
            style={{marginLeft: 6}}
            color="#fff"
            size={22}
            name="bell"
          />
        </View>
      </View>
      <View style={styles.childrenContainer}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color}) => {
              let icon;
              if (route.name === 'PROFILE') {
                icon = focused ? (
                  <FontAwesome5 name="user-alt" size={23} color="#fff" />
                ) : (
                  <FontAwesome5
                    style={{opacity: 0.6}}
                    name="user-alt"
                    size={23}
                    color="#fff"
                  />
                );
              } else if (route.name === 'FAVORITE') {
                icon = focused ? (
                  <AntDesign name="heart" size={23} color="#fff" />
                ) : (
                  <AntDesign
                    name="heart"
                    size={23}
                    style={{opacity: 0.6}}
                    color="#fff"
                  />
                );
              } else if (route.name === 'SHOP') {
                icon = focused ? (
                  <Fontisto name="shopping-basket" size={23} color="#fff" />
                ) : (
                  <Fontisto
                    name="shopping-basket"
                    size={23}
                    style={{opacity: 0.6}}
                    color="#fff"
                  />
                );
              } else if (route.name === 'HOMENAV') {
                icon = focused ? (
                  <Entypo name="shop" size={26} color="#fff" />
                ) : (
                  <Entypo
                    name="shop"
                    size={26}
                    style={{opacity: 0.6}}
                    color="#fff"
                  />
                );
              }
              return icon;
            },
            tabBarShowLabel: false,
            tabBarIndicatorStyle: {backgroundColor: '#fff'},
            tabBarStyle: {
              backgroundColor: SabaColors.sabaGreen,
            },
          })}>
          <Tab.Screen name="PROFILE" component={Profile} />
          <Tab.Screen name="FAVORITE" component={Favorite} />
          <Tab.Screen name="SHOP" component={Shop} />
          <Tab.Screen name="HOMENAV" component={Home} />
        </Tab.Navigator>
      </View>
    </>
  );
};
const MainScreen = Dimensions.get('screen');
const styles = StyleSheet.create({
  MenuNavigatorView: {
    backgroundColor: SabaColors.sabaGreen,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
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
    fontSize: 13,
    fontFamily: 'shabnamMed',
    color: '#fff',
    textShadowRadius: 4,
    textShadowColor: SabaColors.sabaGray,
  },
  MenuNavigatorRightTitleCustomerText: {
    fontSize: 10,
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
    height: MainScreen.height - 84,
    width: MainScreen.width,
    backgroundColor: 'red',
  },
});

export default _MainLayout;
