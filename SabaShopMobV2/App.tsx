/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import SabaColors from './utils/SabaColors.json';
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
import MenuModal from './components/_menuModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import './utils/axiosDefaults';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Login from './screens/Login';
import PorductSelf from './screens/PorductSelf';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import _MainLayout from './layouts/MainLayout';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Products from './screens/Products';
import Home from './screens/Home';
import {ToastProvider} from 'react-native-toast-notifications';
const App = () => {
  const Tab = createMaterialTopTabNavigator();
  const [supportModal, setSupportModal] = React.useState<boolean>(false);
  const images = [require('./assets/test1.jpg'), require('./assets/test2.jpg')];
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <ToastProvider>
        <SafeAreaView style={{height: MainScreen.height}}>
          <Stack.Navigator
            initialRouteName="LOGIN"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="MAIN" component={_MainLayout} />
            <Stack.Screen name="PRODUCT_SELF" component={PorductSelf} />
            <Stack.Screen name="PRODUCTS" component={Products} />
            <Stack.Screen name="LOGIN" component={Login} />
          </Stack.Navigator>
        </SafeAreaView>
      </ToastProvider>
    </NavigationContainer>
  );
};
const MainScreen = Dimensions.get('window');
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
});

export default App;
