/**
 * @format
 */
import {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Dimensions, I18nManager} from 'react-native';
import './utils/axiosDefaults';
import Login from './screens/Login';
import ProductSelf from './screens/ProductSelf';
import endpoints from './utils/endpoints.json';
import _MainLayout from './layouts/MainLayout';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import Products from './screens/Products';
import {ToastProvider} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ErrorConnectionLayout from './layouts/ErrorConnectionLayout';
import ErrorLayout from './layouts/ErrorLayout';
import Shop from './screens/Shop';
import Profile from './screens/Profile';
import Factor from './screens/Factor';
import NewProducts from './screens/NewProducts';
import SimilarProducts from './screens/SimilarProducts';
import FreshProducts from './screens/FreshProducts';
import GroupProducts from './screens/GroupProducts';
import Splash from './screens/Splash';
const App = () => {
  try {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    const [initRouteName, setInitRouteName] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(true);
    const [ordersNumber, setOrdersNumber] = useState<number>();
    const Stack = createStackNavigator();
    useEffect(() => {
      StatusBar.setHidden(true);
      setInitRouteName('SPLASH');

      // (async () => {
      //   const sabaShopV2Token = await AsyncStorage.getItem('saba2token');
      //   if (sabaShopV2Token) setInitRouteName('MAIN');
      //   else setInitRouteName('LOGIN');
      // })();
    }, []);
    if (initRouteName === null) return null;

    return (
      <SafeAreaView
        style={{
          height: Dimensions.get('window').height,
          backgroundColor: 'red',
        }}>
        <NavigationContainer theme={DarkTheme}>
          <ToastProvider offsetTop={50}>
            <Stack.Navigator
              initialRouteName={initRouteName}
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="MAIN">
                {() => (
                  <_MainLayout
                    ordersNumber={ordersNumber}
                    setOrdersNumber={setOrdersNumber}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="PRODUCT_SELF" component={ProductSelf} />
              <Stack.Screen name="PRODUCTS" component={Products} />
              <Stack.Screen name="GROUP_PRODUCTS" component={GroupProducts} />
              <Stack.Screen name="NEW_PRODUCTS" component={NewProducts} />
              <Stack.Screen name="FRESH_PRODUCTS" component={FreshProducts} />
              <Stack.Screen name="SPLASH" component={Splash} />
              <Stack.Screen
                name="SIMILAR_PRODUCTS"
                component={SimilarProducts}
              />
              <Stack.Screen name="LOGIN" component={Login} />
              <Stack.Screen name="FACTOR" component={Factor} />
              <Stack.Screen name="SHOP">
                {() => (
                  <Shop
                    ordersNumber={ordersNumber}
                    setOrdersNumber={setOrdersNumber}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="PROFILE" component={Profile} />
            </Stack.Navigator>
          </ToastProvider>
          {/* {!isConnected && <ErrorConnectionLayout />} */}
        </NavigationContainer>
      </SafeAreaView>
    );
  } catch (err: any) {
    return <ErrorLayout pageError="App" errorDes={err.message} />;
  }
};
export default App;
