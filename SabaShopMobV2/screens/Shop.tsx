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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import _ErrorLayout from '../layouts/ErrorLayout';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import axios from 'axios';
import endpoints from '../utils/endpoints.json';
import {SkypeIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import ToastCustom from '../utils/toastCustom';
import {MConverter} from '../utils/moneyConverter';
import {ProductCoverSchema} from '../realm/Models';
import {ActionShop} from '../realm/ActionShop';
import {TProductCover, TProductServer} from '../utils/types';
import ResCalculator from '../utils/responsiv/Responsiv';
import mainHeight from '../utils/responsiv/MainScreen';
import {substringMaker} from '../utils/substringMaker';
const Shop = ({ordersNumber, setOrdersNumber}: any) => {
  try {
    const navigate = useNavigation<any>();
    const [products, setProducts] = useState<TProductServerMixed[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [orderModal, setOrderModal] = useState<boolean>(false);
    const [ordering, setOrdering] = useState<boolean>(false);
    const toast = useToast();
    type TProductServerMixed = TProductServer & {
      proNumbers: number;
    };

    function handleEditPorduct(type: string, id: number) {
      const realm = new Realm({
        path: 'SabaShopV2DB',
        schema: [ProductCoverSchema],
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
                  'نمیتوان خارج از موجودی سفارش داد',
                  ToastCustom.danger,
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
          schema: [ProductCoverSchema],
        });

        const ProductsMobile: TProductCover[] | any =
          realm.objects<TProductCover[]>('ProductCoverSchema');
        const ProsMobile_ConvertedNumberList: number[] = [];
        for (let pro of ProductsMobile)
          ProsMobile_ConvertedNumberList.push(pro.productId);

        function getData() {
          axios
            .post(
              endpoints.getShopProducts,
              JSON.stringify({pros: ProsMobile_ConvertedNumberList}),
              AxiosConfigCancel,
            )
            .then(({data, status}) => {
              // ** Mixing DataFromMobile with DataFromServer
              let _Products = [];
              if (ProductsMobile)
                for (let pro of data) {
                  let the_id = ProductsMobile.find(
                    (p: any) => p.productId == pro.id,
                  );
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
      toast.show('کالا حذف شد', ToastCustom.info);
    }

    function handleDeleteBasket() {
      ActionShop('delete', 0, 0, null, null, null, true);
      setProducts([]);
      setOrdersNumber(0);
      toast.show('سبد حذف شد', ToastCustom.info);
    }

    async function handleOrder() {
      setOrdering(true);
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
      axios
        .post(endpoints.finalSubmit, JSON.stringify(orderObject))
        .then(() => {
          ActionShop('delete', 0, 0, null, null, null, true);
          setOrdersNumber(0);
          setOrdering(false);
          setProducts([]);
          setOrderModal(true);
        })
        .catch()
        .finally(() => setOrdering(false));
    }
    return (
      <View style={styles.shopView}>
        <View style={styles.shopNavback}>
          <TouchableOpacity
            onPress={() => navigate.goBack()}
            activeOpacity={0.5}
            style={styles.shopNavbackSelf}>
            <AntDesign
              color={SabaColors.sabaWhite}
              size={26}
              name="arrowleft"
            />
          </TouchableOpacity>
        </View>
        <Modal
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          animationInTiming={350}
          animationOutTiming={350}
          hideModalContentWhileAnimating={true}
          isVisible={orderModal}
          backdropOpacity={0}
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-end',
            margin: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <View style={styles.shopBasketOrderModalContainer}>
            <MaterialCommunityIcons
              name="check-decagram"
              size={60}
              color={SabaColors.sabaGreen}
            />
            <Text style={styles.shopBasketOrderModalTextView}>
              سفارش شما ارسال شد، لطفا منتظر تماس مسؤل فروش بمانید
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.shopBasketOrderModalButtonView}
            onPress={() => {
              setOrderModal(false);
              setTimeout(() => {
                navigate.navigate('MAIN');
              }, 500);
            }}>
            <Text style={styles.shopBasketButtonText}>بستن</Text>
          </TouchableOpacity>
        </Modal>
        {loading ? (
          <SkypeIndicator size={60} color={SabaColors.sabaWhite} />
        ) : (
          <>
            {isEmpty(products) ? (
              <View style={styles.shopBasketNotView}>
                <Text style={styles.shopBasketNotText}>سبد خریدی یافت نشد</Text>
              </View>
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
                          {MConverter(wholePriceChecker())} ریال
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
                        <View
                          key={pro.id}
                          style={{
                            ...styles.shopBasketItemView,
                            marginTop: index === 0 ? 10 : 0,
                          }}>
                          <View style={styles.shopBasketContentView}>
                            <View style={styles.shopBasketContentDetailsView}>
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
                              </View>
                              <View
                                style={styles.shopBasketContentDetailsTopView}>
                                <Text
                                  style={styles.shopBasketContentDetailsTitle}>
                                  {substringMaker(pro.nam, 52)}
                                </Text>
                                <Text
                                  style={styles.shopBasketContentDetailsPrice}>
                                  قیمت نقدی {MConverter(pro.price)} ریال
                                </Text>
                                <Text
                                  style={styles.shopBasketContentDetailsPrice}>
                                  قیمت چکی {MConverter(pro.price1)} ریال
                                </Text>
                              </View>
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
                                      size={ResCalculator(610, 12.5, 14)}
                                    />
                                  </TouchableOpacity>
                                  <View
                                    style={
                                      styles.shopBasketContentDetailsInputView
                                    }>
                                    <TextInput
                                      value={String(pro.proNumbers)}
                                      style={
                                        styles.shopBasketContentDetailsInput
                                      }
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
                                      size={ResCalculator(610, 12.5, 14)}
                                    />
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                            <View style={styles.shopBasketContentImageView}>
                              {!isEmpty(pro.pic_path) ? (
                                <Image
                                  style={styles.shopBasketContentImage}
                                  source={{
                                    uri: endpoints.ImageURL + pro.pic_path,
                                  }}
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
                              <View
                                style={styles.shopBasketContentWholePriceView}>
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
const styles = StyleSheet.create({
  shopNavback: {
    paddingHorizontal: 10,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: SabaColors.sabaSlate,
  },
  shopBasketOrderModalContainer: {
    backgroundColor: SabaColors.sabaSlate,
    elevation: 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  shopBasketOrderModalTextView: {
    fontFamily: 'shabnamMed',
    color: '#fff',
    marginTop: 18,
    paddingHorizontal: 6,
    height: 40,
    width: '100%',
    textAlign: 'center',
  },
  shopBasketOrderModalButtonView: {
    backgroundColor: SabaColors.sabaIndigo,
    width: '100%',
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopBasketOrderModalButtonText: {
    fontFamily: 'shabnamMed',
    color: '#fff',
  },

  shopNavbackSelf: {},
  shopView: {
    height: '100%',
    backgroundColor: SabaColors.sabaSlate2,
  },
  shopBasketNotView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: mainHeight - 40,
  },
  shopBasketNotText: {
    color: SabaColors.sabaWhite,
    fontFamily: 'shabnam',
    fontSize: ResCalculator(610, 12.5, 16),
  },
  shopBasketView: {
    backgroundColor: SabaColors.sabaSlate,
    height: 225,
    paddingHorizontal: 10,
    paddingVertical: 6,
    elevation: 1,
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
    fontSize: ResCalculator(610, 11, 14),
    color: SabaColors.sabaWhite,
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
    backgroundColor: 'rgba(155,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopBasketTitleLeft: {
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 10, 11),
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
    fontSize: ResCalculator(610, 10, 12),
    color: SabaColors.sabaWhite,
  },
  shopBasketInfoDetailTextLeft: {
    fontFamily: 'shabnam',
    fontSize: ResCalculator(610, 10, 12),
    color: SabaColors.sabaWhite,
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
    fontSize: ResCalculator(610, 10, 12),
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
    height: mainHeight - 235,
    paddingHorizontal: 10,
  },
  shopBasketItemView: {
    backgroundColor: SabaColors.sabaSlate,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  shopBasketTopButtonView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 3,
  },
  shopBasketRemoveButton: {},
  shopBasketContentView: {
    height: '100%',
    flexDirection: 'row-reverse',
  },
  shopBasketContentDetailsView: {
    flex: 1,
    padding: 10,
  },
  shopBasketContentImageView: {
    width: 150,
    height: '100%',
    position: 'relative',
  },
  shopBasketContentImage: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  shopBasketContentDetailsTitle: {
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 11, 13),
    color: SabaColors.sabaWhite,
    textAlign: 'right',
    height: 38,
  },
  shopBasketContentDetailsPrice: {
    fontFamily: 'shabnam',
    fontSize: ResCalculator(610, 10, 12),
    color: SabaColors.sabaWhite,
  },
  shopBasketContentDetailsTopView: {
    height: 84,
  },
  shopBasketContentDetailsBottomView: {
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
    fontSize: ResCalculator(610, 10, 14),
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
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(33,33,33,0.5)',
    color: '#fff',
    position: 'absolute',
    width: '100%',
  },
  shopBasketContentWholePriceItemViewRight: {},

  shopBasketContentWholePriceItemViewLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  shopBasketContentWholePriceItemViewLeftView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: '90%',
  },
  shopBasketContentWholePriceItemText: {
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 10, 12),
    color: SabaColors.sabaWhite,
  },
});

export default Shop;
