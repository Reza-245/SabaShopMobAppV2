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
import {useFocusEffect} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import axios from 'axios';
import endpoints from '../utils/endpoints.json';
import {SkypeIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import {toastCustom} from '../utils/toastCustom';
import {favDeleter} from '../utils/favoriteDeleter';
import {favoriteChacker} from '../utils/favoriteChecker';
import {MConverter} from '../utils/moneyConverter';
import {FPListSchema, ProductCoverSchema} from '../realm/Models';
import {ActionShop} from '../realm/ActionShop';
import {TProductCover, TProductServer} from '../utils/types';
const Shop = ({ordersNumber, setOrdersNumber}: any) => {
  try {
    const [products, setProducts] = useState<TProductServerMixed[]>([]);
    const [favorites, setFavorites] = useState<number[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [ordering, setOrdering] = useState<boolean>(false);
    const toast = useToast();
    type TProductServerMixed = TProductServer & {
      proNumbers: number;
    };

    function handleEditPorduct(type: string, id: number) {
      const realm = new Realm({
        path: 'SabaShopV2DB',
        schema: [ProductCoverSchema, FPListSchema],
      });
      realm.write(() => {
        let productCover: TProductCover | any =
          realm.objectForPrimaryKey<TProductCover>('ProductCoverSchema', id);
        let productsFromServer: TProductServerMixed[] | null = [...products];
        let productIndex: number = productsFromServer.findIndex(
          pro => pro.id == id,
        );

        const product: TProductServerMixed | undefined = products.find(
          pro => pro.id == id,
        );

        if (product) {
          switch (type) {
            case 'minus':
              if (productCover.orderCounts > 1) {
                productCover.orderCounts--;
                product.proNumbers = productCover.orderCounts;
              }

              break;
            case 'plus':
              if (productCover.orderCounts < product.numb) {
                productCover.orderCounts++;
                product.proNumbers = productCover.orderCounts;
              } else
                toast.show(
                  'نمیتوان بیشتر از موجودی سفارش داد',
                  toastCustom().info,
                );

              break;
          }
          productsFromServer[productIndex] = product;
          setProducts(productsFromServer);
          productCover = null;
          productsFromServer = null;
        }
      });
      realm.close();
    }

    useFocusEffect(
      useCallback(() => {
        let source = axios.CancelToken.source();
        let AxiosConfigCancel = {cancelToken: source.token};

        // ** favoritte
        const realm = new Realm({
          path: 'SabaShopV2DB',
          schema: [ProductCoverSchema, FPListSchema],
        });

        const ProductsMobile: TProductCover[] | any =
          realm.objects<TProductCover[]>('ProductCoverSchema');
        const ProsMobile_ConvertedNumberList: number[] = [];
        for (let pro of ProductsMobile)
          ProsMobile_ConvertedNumberList.push(pro.productId);

        async function getData() {
          await axios
            .post(
              endpoints.getShopProducts,
              JSON.stringify({favs: ProsMobile_ConvertedNumberList}),
              AxiosConfigCancel,
            )
            .then(({data, status}) => {
              // ** Mixing DataFromMobile with DataFromServer
              let _Products = [];
              if (ProductsMobile)
                for (let pro of data) {
                  let the_id = ProductsMobile.find(p => p.productId == pro.id);
                  pro.proNumbers = the_id?.orderCounts;
                  _Products.push(pro);
                }
              setProducts(_Products);
            })
            .catch(() => {})
            .finally(() => {
              setLoading(false);
              // realm.close()
            });
        }

        getData();
        return () => {
          setLoading(false);
          source.cancel();
        };
      }, []),
    );

    function wholePriceChecker() {
      let prices: number = 0;
      for (let pro of products) prices = pro.price * pro.proNumbers + prices;
      return prices;
    }

    function handleDeleteProduct(id: number) {
      ActionShop('delete', id);
      const old_products: TProductServerMixed[] = [...products];
      const updated_products = old_products.filter(pro => pro.id != id);
      setProducts(updated_products);
      setOrdersNumber(updated_products.length);
    }

    function handleDeleteBasket() {
      ActionShop('delete', 0, 0, null, null, null, true);
      setProducts([]);
      setOrdersNumber(0);
      toast.show('سبد حذف شد', toastCustom().info);
    }

    async function handleOrder() {
      setOrdering(!ordering);
      const customer = await AsyncStorage.getItem('saba2token');
      let orderObject: object[] = [];
      for (let ordered of products) {
        let order = {
          cod: ordered.id,
          numb: ordered.proNumbers,
          idcast: customer?.split('|')[1],
          iduser: '-1',
        };
        orderObject.push(order);
      }
      await axios
        .post(endpoints.finalSubmit, JSON.stringify(orderObject))
        .then(() => {
          ActionShop('delete', 0, 0, null, null, null, true);
          setOrdersNumber(0);
          setOrdering(false);
          setProducts([]);
          toast.show('سبد با موفقیت ثبت شد', toastCustom().success);
        })
        .catch(() => {});
    }
    return (
      <View style={styles.shopView}>
        {isEmpty(products) ? (
          <View style={styles.shopBasketNotImageView}>
            <Image
              style={styles.shopBasketNotImage}
              source={require('../assets/img/shop/shopbasketnotfound.png')}
            />
          </View>
        ) : (
          <>
            {loading ? (
              <SkypeIndicator size={60} color={SabaColors.sabaIndigo} />
            ) : (
              <>
                <View style={styles.shopBasketView}>
                  <View style={styles.shopBasketTitleView}>
                    <View style={styles.shopBasketTitleRightView}>
                      <Text style={styles.shopBasketTitleRightText}>
                        سبد کالا
                      </Text>
                      <View style={styles.shopBasketTitleRightIconView}>
                        <FontAwesome5
                          color="#fff"
                          name="shopping-cart"
                          size={15}
                        />
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
                          {MConverter(wholePriceChecker())} تومان
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
                      products.map((pro, index) => (
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
                              onPress={() =>
                                favDeleter(favorites, setFavorites, pro.id)
                              }
                              activeOpacity={0.5}>
                              <AntDesign
                                color={SabaColors.sabaRed}
                                size={16}
                                name={favoriteChacker(favorites, pro.id)}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={styles.shopBasketContentView}>
                            <View style={styles.shopBasketContentDetailsView}>
                              <View
                                style={styles.shopBasketContentDetailsTopView}>
                                <Text
                                  style={styles.shopBasketContentDetailsTitle}>
                                  {pro.nam}
                                </Text>
                                <Text
                                  style={styles.shopBasketContentDetailsPrice}>
                                  قیمت نقدی {MConverter(pro.price)} تومان
                                </Text>
                                <Text
                                  style={styles.shopBasketContentDetailsPrice}>
                                  قیمت چکی {MConverter(pro.price1)} تومان
                                </Text>
                              </View>
                            </View>
                            <View style={styles.shopBasketContentImageView}>
                              {!isEmpty(pro.pic_path) ? (
                                <Image
                                  style={styles.shopBasketContentImage}
                                  source={{uri: endpoints.URL + pro.pic_path}}
                                />
                              ) : (
                                <Image
                                  style={{
                                    ...styles.shopBasketContentImage,
                                    opacity: 0.6,
                                  }}
                                  source={require('../assets/img/noneimage.png')}
                                />
                              )}
                            </View>
                          </View>
                          <View style={styles.shopBasketContentWholePriceView}>
                            <View
                              style={
                                styles.shopBasketContentWholePriceItemViewRight
                              }>
                              <View
                                style={
                                  styles.shopBasketContentDetailsBottomView
                                }>
                                <TouchableOpacity
                                  onPress={() =>
                                    handleEditPorduct('plus', pro.id)
                                  }
                                  activeOpacity={0.5}
                                  style={
                                    styles.shopBasketContentDetailsBottomPlusView
                                  }>
                                  <FontAwesome5
                                    name="plus"
                                    color={SabaColors.sabaWhite}
                                    size={18}
                                  />
                                </TouchableOpacity>
                                <View
                                  style={
                                    styles.shopBasketContentDetailsInputView
                                  }>
                                  <TextInput
                                    value={String(pro.proNumbers)}
                                    style={styles.shopBasketContentDetailsInput}
                                  />
                                </View>
                                <TouchableOpacity
                                  onPress={() =>
                                    handleEditPorduct('minus', pro.id)
                                  }
                                  activeOpacity={0.5}
                                  style={
                                    styles.shopBasketContentDetailsBottomMinusView
                                  }>
                                  <FontAwesome5
                                    color={SabaColors.sabaWhite}
                                    name="minus"
                                    size={18}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View
                              style={
                                styles.shopBasketContentWholePriceItemViewLeft
                              }>
                              <View
                                style={
                                  styles.shopBasketContentWholePriceItemViewLeftView
                                }>
                                <Text
                                  style={
                                    styles.shopBasketContentWholePriceItemText
                                  }>
                                  جمع کل:{' '}
                                  {MConverter(pro.proNumbers * pro.price)}
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
          </>
        )}
      </View>
    );
  } catch (err: any) {
    return <_ErrorLayout pageError="Shop" errorDes={err.message} />;
  }
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
    fontSize: 13,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaBlack,
  },
  shopBasketContentDetailsPrice: {
    fontFamily: 'shabnam',
    fontSize: 12,
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
    elevation: 2,
    borderRadius: 25,
  },
  shopBasketContentDetailsInputView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    height: 28,
    borderRadius: 25,
    marginHorizontal: 3,
    elevation: 2,
    backgroundColor: SabaColors.sabaIndigo,
  },
  shopBasketContentDetailsInput: {
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
    width: '100%',
    backgroundColor: SabaColors.sabaDarkGary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: '90%',
  },
  shopBasketContentWholePriceItemText: {
    fontFamily: 'shabnamMed',
    fontSize: 12,
    color: SabaColors.sabaWhite,
  },
});

export default Shop;
