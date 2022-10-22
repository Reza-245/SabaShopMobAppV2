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
import endpoints from '../utils/endpoints.json';
import MenuModal from '../components/_menuModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

import Modal from 'react-native-modal';
const axios = require('axios').default;
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {FlatList} from 'react-native-gesture-handler';
import {ActionFPList} from '../realm/ActionFPList';
import {favoriteChacker} from '../utils/favoriteChecker';
import {favDeleter} from '../utils/favoriteDeleter';
import {MConverter} from '../utils/moneyConverter';

const Home = () => {
  const [supportModal, setSupportModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const navigate = useNavigation();
  const [products, setProducts] = React.useState();
  const [lastProducts, setLastProducts] = React.useState();
  const [categories, setCategories] = React.useState<any>();
  const [favorites, setFavorites] = React.useState<number[]>();

  useFocusEffect(
    React.useCallback(() => {
      let source = axios.CancelToken.source();
      let AxiosConfigCancel = {cancelToken: source.token};
      ActionFPList('sync', 0, setFavorites);
      (async () => {
        await axios
          .get(endpoints.getNewestProducts, AxiosConfigCancel)
          .then(async ({data, status}: any) => {
            setLastProducts(data);
            await axios
              .get(endpoints.getFirstProducts, AxiosConfigCancel)
              .then(async ({data, status}: any) => {
                setProducts(data);
                // favoriteAction('sync', setFavorites, 0, setLoading);
                await axios
                  .get(endpoints.getCategory1, AxiosConfigCancel)
                  .then(({data}) => {
                    setCategories(data);
                  })
                  .catch(() => {});
              })
              .catch(() => {});
          })
          .catch(() => {})
          .finally(() => {
            setLoading(false);
          });
      })();

      return () => source.cancel();
    }, []),
  );

  return (
    <View style={styles.HomeView}>
      <View style={styles.HomeMenuView}>
        <View style={styles.HomeMenuTextView}>
          <Text style={styles.HomeMenuText}>دسته بندی ها</Text>
        </View>

        <View style={styles.HomeMenuItemsView}>
          {loading ? (
            <MaterialIndicator
              color={SabaColors.sabaGreen}
              animationDuration={2900}
              size={28}
            />
          ) : (
            <ScrollView horizontal={true}>
              {categories?.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => navigate.navigate('PRODUCTS', {cat1: cat.id})}
                  activeOpacity={0.5}
                  style={styles.HomeMenuItemView}>
                  <View style={styles.HomeMenuItemImageView}>
                    <Image
                      style={styles.HomeMenuItemImage}
                      source={require('../assets/img/home/suit.png')}
                    />
                  </View>
                  <View style={styles.HomeMenuItemImageTitleView}>
                    <Text style={styles.HomeMenuItemImageTitle}>{cat.nam}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
      <View style={styles.HomeContentConatiner}>
        <View style={styles.HomeContentNewView}>
          <View style={styles.HomeContentNewTitleView}>
            <View style={styles.HomeContentNewTitleRightView}>
              <Text style={styles.HomeContentNewTitleRightText}>
                جدید ترین ها
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigate.navigate('PRODUCTS')}
              style={styles.HomeContentNewTitleLeftView}>
              <Text style={styles.HomeContentNewTitleLeftText}>مشاهده همه</Text>
              <MaterialIcons
                name="arrow-back-ios"
                color={SabaColors.sabaDarkGary}
                size={13}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.HomeContentNewItemsContainerView}>
            {loading ? (
              <View style={styles.HomeContentNewItemsIndicatorView}>
                <BarIndicator
                  animationDuration={700}
                  size={40}
                  color={SabaColors.sabaGreen}
                  count={5}
                />
              </View>
            ) : (
              <View style={styles.HomeContentNewItemsView}>
                <ScrollView horizontal={true}>
                  {lastProducts?.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.9}
                      onPress={() =>
                        navigate.navigate('PRODUCT_SELF', {product: item})
                      }
                      style={styles.HomeContentNewItemView}>
                      <View style={styles.HomeContentNewItemNavbarView}>
                        <TouchableOpacity
                          onPress={() =>
                            favDeleter(favorites, setFavorites, item.id)
                          }
                          style={styles.HomeContentNewItemNavbarRightView}>
                          <AntDesign
                            name={favoriteChacker(favorites, item.id)}
                            size={20}
                            color={SabaColors.sabaRed}
                          />
                        </TouchableOpacity>
                        <View style={styles.HomeContentNewItemNavbarLeftView}>
                          <View
                            style={
                              styles.HomeContentNewItemNavbarLeftExistView
                            }>
                            <Text
                              style={
                                styles.HomeContentNewItemNavbarLeftExistText
                              }>
                              موجود
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.HomeContentNewItemImageContainerView}>
                        <View style={styles.HomeContentNewItemImageView}>
                          <Image
                            style={styles.HomeContentNewItemImage}
                            source={{uri: endpoints.URL + item.pic_path}}
                          />
                        </View>
                      </View>
                      <View style={styles.HomeContentNewItemInfoView}>
                        <Text style={styles.HomeContentNewItemInfoTitle}>
                          {item.nam}
                        </Text>
                        <Text style={styles.HomeContentNewItemInfoPrice}>
                          قیمت نقدی {MConverter(item.price)} تومان
                        </Text>
                        <Text style={styles.HomeContentNewItemInfoPrice}>
                          قیمت چکی {MConverter(item.price1)} تومان
                        </Text>
                        <Text style={styles.HomeContentNewItemInfoExist}>
                          موجودی: {item.numb}عدد
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
        <View style={styles.HomeContentNewView}>
          <View style={styles.HomeContentNewTitleView}>
            <View style={styles.HomeContentNewTitleRightView}>
              <Text style={styles.HomeContentNewTitleRightText}>
                همه محصولات
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigate.navigate('PRODUCTS')}
              style={styles.HomeContentNewTitleLeftView}>
              <Text style={styles.HomeContentNewTitleLeftText}>مشاهده همه</Text>
              <MaterialIcons
                name="arrow-back-ios"
                color={SabaColors.sabaDarkGary}
                size={13}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.HomeContentNewItemsContainerView}>
            {loading ? (
              <View style={styles.HomeContentNewItemsIndicatorView}>
                <BarIndicator
                  animationDuration={700}
                  size={40}
                  color={SabaColors.sabaGreen}
                  count={5}
                />
              </View>
            ) : (
              <View style={styles.HomeContentNewItemsView}>
                <ScrollView horizontal={true}>
                  {products?.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.9}
                      onPress={() =>
                        navigate.navigate('PRODUCT_SELF', {product: item})
                      }
                      style={styles.HomeContentNewItemView}>
                      <View style={styles.HomeContentNewItemNavbarView}>
                        <TouchableOpacity
                          onPress={() =>
                            favDeleter(favorites, setFavorites, item.id)
                          }
                          style={styles.HomeContentNewItemNavbarRightView}>
                          <AntDesign
                            name={favoriteChacker(favorites, item.id)}
                            size={20}
                            color={SabaColors.sabaRed}
                          />
                        </TouchableOpacity>
                        <View style={styles.HomeContentNewItemNavbarLeftView}>
                          <View
                            style={
                              styles.HomeContentNewItemNavbarLeftExistView
                            }>
                            <Text
                              style={
                                styles.HomeContentNewItemNavbarLeftExistText
                              }>
                              موجود
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.HomeContentNewItemImageContainerView}>
                        <View style={styles.HomeContentNewItemImageView}>
                          <Image
                            style={styles.HomeContentNewItemImage}
                            source={{uri: endpoints.URL + item.pic_path}}
                          />
                        </View>
                      </View>
                      <View style={styles.HomeContentNewItemInfoView}>
                        <Text style={styles.HomeContentNewItemInfoTitle}>
                          {item.nam}
                        </Text>
                        <Text style={styles.HomeContentNewItemInfoPrice}>
                          قیمت نقدی {MConverter(item.price)} تومان
                        </Text>
                        <Text style={styles.HomeContentNewItemInfoPrice}>
                          قیمت چکی {MConverter(item.price1)} تومان
                        </Text>
                        <Text style={styles.HomeContentNewItemInfoExist}>
                          موجودی: {item.numb}عدد
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
const MainScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  HomeView: {
    backgroundColor: SabaColors.sabaWhite,
    height: '100%',
  },
  HomeMenuView: {
    height: 124,
    backgroundColor: '#fff',
    elevation: 1,
  },
  HomeMenuTextView: {},
  HomeMenuText: {
    fontFamily: 'shabnamMed',
    fontSize: 14,
    color: SabaColors.sabaBlack,
    textShadowRadius: 9,
    textShadowColor: SabaColors.sabaDarkGary,
    paddingRight: 6,
    paddingTop: 6,
  },
  HomeMenuItemsView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  HomeMenuItemView: {
    height: 60,
    width: 60,
    marginHorizontal: 10,
  },
  HomeMenuItemImageView: {
    backgroundColor: SabaColors.sabaLightGreen,
    height: '100%',
    width: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  HomeMenuItemImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  HomeMenuItemImageTitleView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  HomeMenuItemImageTitle: {
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    textShadowColor: SabaColors.sabaGray,
    fontSize: 12,
  },
  // --------------------------- Products --------------------------------
  HomeContentConatiner: {
    height: MainScreen.height - 232,
  },

  HomeContentNewView: {
    height: '50%',
    elevation: 6,
    justifyContent: 'center',
  },
  HomeContentNewTitleView: {
    height: 25,
    flexDirection: 'row-reverse',
    paddingHorizontal: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HomeContentNewTitleRightView: {
    justifyContent: 'center',
  },
  HomeContentNewTitleRightText: {
    fontFamily: 'shabnamMed',
    textShadowRadius: 9,
    color: SabaColors.sabaBlack,
    fontSize: 13,
  },
  HomeContentNewTitleLeftView: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  HomeContentNewTitleLeftText: {
    fontFamily: 'shabnam',
    fontSize: 12,
    textShadowRadius: 9,
    color: SabaColors.sabaDarkGary,
  },
  HomeContentNewItemsContainerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    flex: 1,
  },
  HomeContentNewItemsIndicatorView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  HomeContentNewItemsView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },

  HomeContentNewItemView: {
    height: '96%',
    width: 190,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    elevation: 4,
    marginHorizontal: 8,
  },
  HomeContentNewItemNavbarView: {
    height: 26,
    flexDirection: 'row-reverse',
  },
  HomeContentNewItemNavbarRightView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  HomeContentNewItemNavbarLeftView: {
    flex: 1,
    justifyContent: 'center',
  },
  HomeContentNewItemNavbarLeftExistView: {
    backgroundColor: SabaColors.sabaLightGreen,
    height: 18,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HomeContentNewItemNavbarLeftExistText: {
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaGreen,
    fontSize: 10,
  },
  HomeContentNewItemImageContainerView: {
    height: 100,
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HomeContentNewItemImageView: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '60%',
  },
  HomeContentNewItemImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  HomeContentNewItemInfoView: {
    height: 100,
  },
  HomeContentNewItemInfoTitle: {
    fontFamily: 'shabnamMed',
    fontSize: 14,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaBlack,
    textAlign: 'right',
  },
  HomeContentNewItemInfoPrice: {
    fontFamily: 'shabnam',
    fontSize: 12,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaDarkGary,
    textAlign: 'right',
  },
  HomeContentNewItemInfoExist: {
    marginTop: 8,
    fontFamily: 'shabnamMed',
    fontSize: 12,
    textShadowColor: SabaColors.sabaGreen,
    textShadowRadius: 2,
    color: SabaColors.sabaGreen,
  },
});

export default Home;
