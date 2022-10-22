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
import ProductSelf from './screens/ProductSelf';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import endpoints from './utils/endpoints.json';
import _MainLayout from './layouts/MainLayout';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Products from './screens/Products';
import {ToastProvider} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const MainWindow = Dimensions.get('window');

const App = () => {
  try {
    const [initRouteName, setInitRouteName] = React.useState<string | null>(
      null,
    );
    const [isConnected, setIsConnected] = React.useState<boolean>(false);
    const images = [
      require('./assets/test1.jpg'),
      require('./assets/test2.jpg'),
    ];
    const Stack = createStackNavigator();

    useEffect(() => {
      setInterval(
        async () =>
          await axios
            .get(endpoints.checkConnection)
            .then(() => setIsConnected(true))
            .catch(() => setIsConnected(false)),
        3000,
      );
      (async () => {
        const sabaShopV2Token = await AsyncStorage.getItem('saba2token');
        if (sabaShopV2Token) setInitRouteName('MAIN');
        else setInitRouteName('LOGIN');
      })();
    }, []);
    if (initRouteName === null) return null;
    return (
      <NavigationContainer>
        <ToastProvider offsetTop={50}>
          <SafeAreaView style={{height: MainWindow.height}}>
            <Stack.Navigator
              initialRouteName={initRouteName}
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="MAIN" component={_MainLayout} />
              <Stack.Screen name="PRODUCT_SELF" component={ProductSelf} />
              <Stack.Screen name="PRODUCTS" component={Products} />
              <Stack.Screen name="LOGIN" component={Login} />
            </Stack.Navigator>
          </SafeAreaView>
        </ToastProvider>
        {!isConnected && (
          <View style={styles.ConnectionErrorView}>
            <Feather
              name="wifi-off"
              color={SabaColors.sabaLightRed}
              size={200}
            />
            <Text style={styles.ConnectionErrorText}>درحال برقراری اتصال</Text>
          </View>
        )}
      </NavigationContainer>
    );
  } catch {}
};
const styles = StyleSheet.create({
  ConnectionErrorView: {
    position: 'absolute',
    backgroundColor: 'rgba(30,30,30,0.4)',
    height: MainWindow.height,
    width: MainWindow.width,
    top: 0,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ConnectionErrorText: {
    fontFamily: 'shabnamMed',
    marginTop: 20,
    color: SabaColors.sabaRed,
    backgroundColor: SabaColors.sabaLightRed,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
});

export default App;
