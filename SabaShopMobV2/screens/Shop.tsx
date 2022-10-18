/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useContext} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import {FPList, ProductCover, Shop as ShopSchema} from '../realm/Models';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useFocusEffect} from '@react-navigation/native';
import {shopAction} from '../realm/RealmShop';
import {isEmpty} from 'lodash';
import axios from 'axios';
import endpoints from '../utils/endpoints.json';
import Products from './Products';
import {favoriteAction} from '../realm/RealmFPList';
import {SkypeIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import {toastCustom} from '../utils/toastCustom';
type TShop = {
  _id: number;
  orderedProducts: TProductCover[];
};
type TProductCover = {
  _id: number;
  productId: number;
  orderCounts: number;
};
const controller = new AbortController();
const Shop = ({ordersNumber, setOrdersNumber}: any) => {
  const [supportModal, setSupportModal] = React.useState<boolean>(false);
  const [shopBasket, setShopBasket] = React.useState<TShop[] | null>([]);
  const [products, setProducts] = React.useState([]);
  const [favorites, setFavorites] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [ordering, setOrdering] = React.useState<boolean>(false);
  const toast = useToast();
  const [shopPorductsIds, setShopPorductsIds] = React.useState([]);
  async function handleFavorite(id: any) {
    if (favorites.includes(id)) favoriteAction('delete', setFavorites, id);
    else favoriteAction('create', setFavorites, id);
  }
  type TFavorite = {
    _id: number;
    pid: number;
  };
  useFocusEffect(
    useCallback(() => {
      // ** gettingPorductShopIds
      const realmdb = new Realm({
        path: 'SabaShopV2DB',
        schema: [ShopSchema, ProductCover, FPList],
      });
      const shopRealm: TShop = realmdb.objectForPrimaryKey<TShop>('Shop', 1);
      setShopBasket(shopRealm);

      // ** favoritte
      let favorites_: any = realmdb.objects<TFavorite>('FPList');
      let favoriteIds: number[] = [];
      for (let fav of favorites_) favoriteIds.push(fav.pid);
      setFavorites(favoriteIds);
      // ** --------

      let proIds: number[] = [];
      if (shopRealm)
        for (let pro of shopRealm?.orderedProducts) {
          proIds.push(pro.productId);
        }

      async function getData() {
        await axios
          .post(endpoints.getShopProducts, JSON.stringify({favs: proIds}), {
            signal: controller.signal,
          })
          .then(({data, status}) => {
            let _Products = [];
            for (let pro of data) {
              let the_id = shopRealm?.orderedProducts.find(
                p => p.productId == pro.id,
              );
              pro.proNumbers = the_id?.orderCounts;
              _Products.push(pro);
            }
            setProducts(data);

            realmdb.close();
          });
      }
      getData();

      return () => controller.abort();
    }, []),
  );

  function wholePriceChecker() {
    let prices: number = 0;

    for (let pro of products) prices = pro.price * pro.proNumbers + prices;

    // return String(prices);
    return String(prices);
  }

  function handleDeleteProduct(id: number) {
    const realm = new Realm({
      path: 'SabaShopV2DB',
      schema: [ShopSchema, ProductCover, FPList],
    });
    realm.write(async () => {
      const shop: TShop = realm.objectForPrimaryKey<TShop>('Shop', 1);
      const proCovers: TProductCover[] = shop.orderedProducts;
      const updated_pros = proCovers.filter(pro => pro.productId != id);
      if (!updated_pros.length) {
        realm.deleteAll();
        setProducts([]);
        setOrdersNumber(0);
        setShopBasket(null);
      } else {
        shop.orderedProducts = updated_pros;
        setProducts(prev => prev.filter(pro => pro.id != id));
        setOrdersNumber(ordersNumber - 1);
      }
    });
  }

  async function handleDeleteBasket() {
    let realmDB = new Realm({
      schema: [ShopSchema, ProductCover, FPList],
      path: 'SabaShopV2DB',
    });
    await realmDB.write(() => {
      realmDB.deleteAll();
      setShopBasket(null);
      setOrdersNumber(0);
    });
    await realmDB.close();
  }

  async function handleOrder() {
    setOrdering(!ordering);
    const customer = await AsyncStorage.getItem('saba2token');
    let orderObject: object[] = [];
    for (let ordered of products) {
      let order = {
        cod: ordered.id,
        numb: ordered.numb,
        idcast: customer.split('|')[1],
        iduser: '-1',
      };

      orderObject.push(order);
    }

    await axios
      .post(endpoints.finalSubmit, JSON.stringify(orderObject), {
        signal: controller.signal,
      })
      .then(() => {
        setOrdering(false);
        setShopBasket(null);
        const realm = new Realm({
          path: 'SabaShopV2DB',
          schema: [FPList, ShopSchema, ProductCover],
        });
        realm.write(() => {
          realm.deleteAll();
          setOrdersNumber(0);
        });
        toast.show('سبد با موفقیت ثبت شد', toastCustom().success);
      });
  }
  return (
    <View style={styles.shopView}>
      {!shopBasket ? (
        <View style={styles.shopBasketNotImageView}>
          <Image
            style={styles.shopBasketNotImage}
            source={require('../assets/img/shop/shopbasketnotfound.png')}
          />
        </View>
      ) : (
        <>
          <View style={styles.shopBasketView}>
            <View style={styles.shopBasketTitleView}>
              <View style={styles.shopBasketTitleRightView}>
                <Text style={styles.shopBasketTitleRightText}>سبد کالا</Text>
                <View style={styles.shopBasketTitleRightIconView}>
                  <FontAwesome5 color="#fff" name="shopping-cart" size={15} />
                </View>
              </View>
              <View style={styles.shopBasketTitleLeftView}>
                <TouchableOpacity
                  onPress={handleDeleteBasket}
                  activeOpacity={0.5}
                  style={styles.shopBasketTitleLeftButtonView}>
                  <Text style={styles.shopBasketTitleLeft}>لغو سبد</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.shopBasketInfoView}>
              <View style={styles.shopBasketInfoDetailView}>
                <View style={styles.shopBasketInfoDetail}>
                  <Text style={styles.shopBasketInfoDetailTextRight}>
                    تعداد اجناس
                  </Text>
                  <Text style={styles.shopBasketInfoDetailTextLeft}>
                    {ordersNumber} عدد
                  </Text>
                </View>
                <View style={styles.shopBasketInfoDetail}>
                  <Text style={styles.shopBasketInfoDetailTextRight}>
                    قیمت کل اجناس
                  </Text>
                  <Text style={styles.shopBasketInfoDetailTextLeft}>
                    {wholePriceChecker().replace(
                      /(\d)(?=(\d{3})+(?!\d))/g,
                      '$1,',
                    )}{' '}
                    تومان
                  </Text>
                </View>
              </View>
              <View style={styles.shopBasketButtonContentView}>
                <View style={styles.shopBasketButtonView}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handleOrder}
                    style={styles.shopBasketButtonTouchView}>
                    {ordering ? (
                      <SkypeIndicator size={28} color="#fff" />
                    ) : (
                      <Text style={styles.shopBasketButtonText}>
                        ثبت درخواست
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.shopBasketButtonImageView}>
                  <Image
                    style={styles.shopBasketButtonImage}
                    source={require('../assets/img/shop/Cart.png')}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.shopBasketItemsView}>
            <ScrollView>
              {products &&
                products.map(pro => (
                  <View key={pro.id} style={styles.shopBasketItemView}>
                    <View style={styles.shopBasketTopButtonView}>
                      <TouchableOpacity
                        style={styles.shopBasketRemoveButton}
                        onPress={() => handleDeleteProduct(pro.id)}
                        activeOpacity={0.5}>
                        <FontAwesome5
                          color={SabaColors.sabaRed}
                          size={16}
                          name="trash-alt"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.shopBasketRemoveButton}
                        onPress={() => handleFavorite(pro.id)}
                        activeOpacity={0.5}>
                        <AntDesign
                          color={
                            favorites?.includes(pro.id)
                              ? SabaColors.sabaRed
                              : SabaColors.sabaDarkGary
                          }
                          size={16}
                          name={
                            favorites?.includes(pro.id) ? 'heart' : 'hearto'
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.shopBasketContentView}>
                      <View style={styles.shopBasketContentDetailsView}>
                        <View style={styles.shopBasketContentDetailsTopView}>
                          <Text style={styles.shopBasketContentDetailsTitle}>
                            {pro.nam}
                          </Text>
                          <Text style={styles.shopBasketContentDetailsPrice}>
                            قیمت نقدی{' '}
                            {String(pro.price).replace(
                              /(\d)(?=(\d{3})+(?!\d))/g,
                              '$1,',
                            )}{' '}
                            تومان
                          </Text>
                          <Text style={styles.shopBasketContentDetailsPrice}>
                            قیمت چکی{' '}
                            {String(pro.pric).replace(
                              /(\d)(?=(\d{3})+(?!\d))/g,
                              '$1,',
                            )}{' '}
                            تومان
                          </Text>
                        </View>
                        <View style={styles.shopBasketContentDetailsBottomView}>
                          {/* <TouchableOpacity
                            activeOpacity={0.5}
                            style={
                              styles.shopBasketContentDetailsBottomPlusView
                            }>
                            <FontAwesome5
                              name="plus"
                              color={SabaColors.sabaWhite}
                              size={18}
                            />
                          </TouchableOpacity> */}
                          <View
                            style={styles.shopBasketContentDetailsInputView}>
                            <TextInput
                              value={String(pro.proNumbers)}
                              style={styles.shopBasketContentDetailsInput}
                            />
                          </View>
                          {/* <TouchableOpacity
                            activeOpacity={0.5}
                            style={
                              styles.shopBasketContentDetailsBottomMinusView
                            }>
                            <FontAwesome5
                              color={SabaColors.sabaWhite}
                              name="minus"
                              size={18}
                            />
                          </TouchableOpacity> */}
                        </View>
                      </View>
                      <View style={styles.shopBasketContentImageView}>
                        <Image
                          style={styles.shopBasketContentImage}
                          source={{uri: endpoints.URL + pro.pic_path}}
                        />
                      </View>
                    </View>
                    <View style={styles.shopBasketContentWholePriceView}>
                      <View
                        style={
                          styles.shopBasketContentWholePriceItemViewRight
                        }></View>
                      <View
                        style={styles.shopBasketContentWholePriceItemViewLeft}>
                        <View
                          style={
                            styles.shopBasketContentWholePriceItemViewLeftView
                          }>
                          <Text
                            style={styles.shopBasketContentWholePriceItemText}>
                            جمع کل:{' '}
                            {String(pro.proNumbers * pro.price).replace(
                              /(\d)(?=(\d{3})+(?!\d))/g,
                              '$1,',
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};
const MainScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  shopView: {
    backgroundColor: SabaColors.sabaWhite,
    height: '100%',
  },
  shopBasketNotImageView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  shopBasketNotImage: {
    resizeMode: 'contain',
    width: '100%',
  },
  shopBasketView: {
    backgroundColor: '#fff',
    height: 225,
    paddingHorizontal: 10,
    paddingVertical: 6,
    elevation: 2,
    borderBottomColor: SabaColors.sabaGray,
    borderBottomWidth: 1,
  },
  shopBasketTitleView: {
    height: 45,
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    paddingTop: 3,
  },
  shopBasketTitleRightView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  shopBasketTitleRightText: {
    fontFamily: 'shabnamMed',
    fontSize: 14,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaBlack,
    marginRight: 5,
  },
  shopBasketTitleRightIconView: {
    borderRadius: 25,
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SabaColors.sabaIndigo,
  },
  shopBasketTitleLeftView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  shopBasketTitleLeftButtonView: {
    height: 28,
    width: 68,
    backgroundColor: SabaColors.sabaLightRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopBasketTitleLeft: {
    fontFamily: 'shabnamMed',
    fontSize: 11,
    color: SabaColors.sabaRed,
  },
  shopBasketInfoView: {
    height: 165,
  },
  shopBasketInfoDetailView: {},
  shopBasketInfoDetail: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  shopBasketInfoDetailTextRight: {
    fontFamily: 'shabnamMed',
    fontSize: 12,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaBlack,
  },
  shopBasketInfoDetailTextLeft: {
    fontFamily: 'shabnam',
    fontSize: 12,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaBlack,
  },
  shopBasketButtonContentView: {
    flexDirection: 'row-reverse',
    height: 120,
  },
  shopBasketButtonView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  shopBasketButtonTouchView: {
    backgroundColor: SabaColors.sabaIndigo,
    width: 100,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    elevation: 3,
  },
  shopBasketButtonText: {
    fontFamily: 'shabnamMed',
    fontSize: 12,
    color: SabaColors.sabaWhite,
  },
  shopBasketButtonImageView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  shopBasketButtonImage: {
    height: '100%',
    width: 150,
    resizeMode: 'contain',
  },
  // * ------------------------------------- Items ---------------------------------
  shopBasketItemsView: {
    height: MainScreen.height - 334,
    paddingHorizontal: 10,
  },
  shopBasketItemView: {
    backgroundColor: '#fff',
    height: 190,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 6,
    marginVertical: 8,
    elevation: 3,
  },
  shopBasketTopButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shopBasketRemoveButton: {},
  shopBasketContentView: {
    height: 120,
    flexDirection: 'row-reverse',
  },
  shopBasketContentDetailsView: {
    flex: 2,
    paddingTop: 6,
  },
  shopBasketContentImageView: {
    flex: 1,
  },
  shopBasketContentImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  shopBasketContentDetailsTitle: {
    fontFamily: 'shabnamMed',
    fontSize: 16,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaBlack,
  },
  shopBasketContentDetailsPrice: {
    fontFamily: 'shabnam',
    fontSize: 13,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaDarkGary,
  },
  shopBasketContentDetailsTopView: {
    flex: 1,
  },
  shopBasketContentDetailsBottomView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  shopBasketContentDetailsBottomPlusView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 26,
    width: 26,
    backgroundColor: SabaColors.sabaGreen,
    elevation: 4,
    borderRadius: 25,
  },
  shopBasketContentDetailsInputView: {
    width: 52,
    height: 26,
    borderRadius: 25,
    marginHorizontal: 3,
    elevation: 4,
  },
  shopBasketContentDetailsInput: {
    backgroundColor: SabaColors.sabaIndigo,

    borderRadius: 25,
    padding: 0,
    textAlign: 'center',
    fontFamily: 'shabnamMed',
    fontSize: 14,
    color: '#fff',
  },

  shopBasketContentDetailsBottomMinusView: {
    height: 26,
    width: 26,
    backgroundColor: SabaColors.sabaRed,
    borderRadius: 25,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopBasketContentWholePriceView: {
    height: 27,
    flexDirection: 'row-reverse',
  },
  shopBasketContentWholePriceItemViewRight: {
    flex: 2,
  },

  shopBasketContentWholePriceItemViewLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  shopBasketContentWholePriceItemViewLeftView: {
    width: '90%',
    backgroundColor: SabaColors.sabaDarkGary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  shopBasketContentWholePriceItemText: {
    fontFamily: 'shabnamMed',
    fontSize: 12,
    color: SabaColors.sabaWhite,
  },
});

export default Shop;
