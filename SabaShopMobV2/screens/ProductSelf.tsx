import {useCallback, useEffect, useState} from 'react';
import SabaColors from '../utils/SabaColors.json';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import endpoints from '../utils/endpoints.json';
import {ImageSlider} from 'react-native-image-slider-banner';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ErrorLayout from '../layouts/ErrorLayout';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {isEmpty} from 'lodash';
import {toastCustom} from '../utils/toastCustom';
import {useToast} from 'react-native-toast-notifications';
import {favDeleter} from '../utils/favoriteDeleter';
import {favoriteChacker} from '../utils/favoriteChecker';
import {ActionFPList} from '../realm/ActionFPList';
import {MConverter} from '../utils/moneyConverter';
import {ActionShop} from '../realm/ActionShop';
import {substringMaker} from '../utils/substringMaker';
import {TProductCover} from '../utils/types';
const ProductSelf = ({route}: any) => {
  try {
    const toast = useToast();
    const {product} = route.params;
    const [favorites, setFavorites] = useState<number[]>();
    const [similarProducts, setSimilarProducts] = useState();
    const [order, setOrder] = useState<boolean>(false);
    const [ordered, setOrdered] = useState<boolean>(false);
    const [orderCount, setOrderCount] = useState<string>('0');
    const navigate = useNavigation<any>();
    function handleOrderCount() {
      if (isEmpty(orderCount) || orderCount === '0') handleDiscardOrder();
      else {
        if (orderCount > product.numb) {
          ActionShop('create_update', product.id, parseInt(product.numb));
          toast.show('کالا به اندازه موجودی ثبت شد', toastCustom().success);
          setOrderCount(String(product.numb));
        } else {
          toast.show('کالا ثبت شد', toastCustom().success);
          ActionShop('create_update', product.id, parseInt(orderCount));
        }
        setOrdered(true);
        setOrder(true);
      }
    }
    function hasOrdered(ordereds: TProductCover[] | undefined) {
      if (ordereds && !isEmpty(ordereds)) {
        const isExit = ordereds.find(pro => pro.productId == product.id);
        if (isExit) {
          const proCoverIndex: number = ordereds.findIndex(
            pro => pro.productId == product.id,
          );
          setOrdered(true);
          setOrder(true);
          setOrderCount(String(ordereds[proCoverIndex].orderCounts));
        }
      }
    }
    function handleOrder() {
      setOrder(true);
      setOrderCount('1');
    }
    useEffect(() => {}, []);
    async function handleDiscardOrder() {
      ActionShop('delete', product.id);
      setOrdered(false);
      setOrder(false);
      setOrderCount('0');
      toast.show('سفارش لغو شد', toastCustom().info);
    }
    useFocusEffect(
      useCallback(() => {
        ActionFPList('sync', 0, setFavorites);
        ActionShop('sync', 0, 0, null, hasOrdered);
        (async () =>
          await axios
            .get(
              `${endpoints.getSimilarProducts}${product.id}?similar=${
                product.nam.split(' ')[0]
              }`,
            )
            .then(({data}) => {
              setSimilarProducts(data);
            }))();
      }, []),
    );
    return (
      <SafeAreaView>
        <ImageSlider
          data={[
            {
              img: isEmpty(product.pic_path)
                ? require('../assets/img/noneimage.png')
                : `${endpoints.URL + product.pic_path}`,
            },
          ]}
          localImg={isEmpty(product.pic_path)}
          autoPlay={true}
          timer={2200}
          closeIconColor={SabaColors.sabaDarkGary}
          showHeader
          headerLeftComponent={
            <TouchableOpacity
              onPress={() => navigate.goBack()}
              activeOpacity={0.5}>
              <AntDesign name="arrowleft" color="#fff" size={26} />
            </TouchableOpacity>
          }
          headerRightComponent={
            <TouchableOpacity
              onPress={() => favDeleter(favorites, setFavorites, product.id)}
              activeOpacity={0.5}>
              <AntDesign
                name={favoriteChacker(favorites, product.id)}
                color={SabaColors.sabaRed}
                size={26}
              />
            </TouchableOpacity>
          }
          activeIndicatorStyle={{
            backgroundColor: SabaColors.sabaGreen,
          }}
          inActiveIndicatorStyle={{
            backgroundColor: SabaColors.sabaGray,
          }}
          indicatorContainerStyle={{
            bottom: 0,
          }}
          headerStyle={{
            padding: 10,
            position: 'absolute',
            backgroundColor: 'rgba(90,90,90,0.3)',
            zIndex: 3,
          }}
          caroselImageStyle={{
            resizeMode: 'cover',
            height: MainScreen.height - 490,
          }}
          caroselImageContainerStyle={{
            opacity: 1,
          }}
        />
        <View style={styles.productSelfView}>
          <View style={styles.productInfoView}>
            <View style={styles.productInfoImageView}>
              <Image
                style={styles.productInfoImage}
                source={require('../assets/img/selfProduct/goshop.png')}
              />
            </View>
            <View style={styles.productInfoContentView}>
              <Text style={styles.productInfoContentTitle}>{product.nam}</Text>
              <Text style={styles.productInfoContentPrice}>
                قیمت نقدی {MConverter(product.price)} تومان
              </Text>
              <Text style={styles.productInfoContentPrice}>
                قیمت چکی {MConverter(product.price1)} تومان
              </Text>
              {/* <Text style={styles.productInfoContentExist}>
                موجودی:{product.numb} عدد
              </Text> */}
              {order ? (
                <View style={styles.productInfoContentCounterView}>
                  <TouchableOpacity
                    onPress={
                      ordered ? () => setOrdered(false) : handleOrderCount
                    }
                    activeOpacity={0.5}
                    style={{
                      ...styles.productInfoContentCounterRightView,
                      backgroundColor: ordered
                        ? SabaColors.sabaOrange
                        : SabaColors.sabaGreen,
                    }}>
                    <FontAwesome5
                      name={ordered ? 'pen' : 'check'}
                      color="#fff"
                      size={16}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      ...styles.productInfoContentCounterMiddleView,
                      backgroundColor: ordered
                        ? SabaColors.sabaGreen
                        : SabaColors.sabaWhite,
                    }}>
                    <TextInput
                      value={orderCount}
                      editable={!ordered}
                      style={{
                        ...styles.productInfoContentCounterMiddleInput,
                        color: ordered ? '#fff' : SabaColors.sabaDarkGary,
                      }}
                      onChangeText={value => setOrderCount(value)}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handleDiscardOrder}
                    style={styles.productInfoContentCounterLeftView}>
                    <FontAwesome5 name="trash" color="#fff" size={16} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.productInfoContentCounterOrderButtonView}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handleOrder}
                    style={styles.productInfoContentCounterOrderButton}>
                    <FontAwesome
                      name="shopping-basket"
                      color="#fff"
                      size={16}
                    />
                    <Text
                      style={styles.productInfoContentCounterOrderButtonText}>
                      سفارش
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View style={styles.similarProductView}>
            <View style={styles.similarProductTitleView}>
              <TouchableOpacity
                onPress={() => navigate.navigate('PRODUCTS')}
                activeOpacity={0.5}
                style={styles.similarProductTitleLeftView}>
                <MaterialIcons
                  name="keyboard-arrow-left"
                  color={SabaColors.sabaDarkGary}
                  size={28}
                />
                <Text style={styles.similarProductTitleLeftText}>
                  نمایش همه
                </Text>
              </TouchableOpacity>
              <View style={styles.similarProductTitleRightView}>
                <Text style={styles.similarProductTitleRightText}>
                  محصولات مشابه
                </Text>
              </View>
            </View>
            <View style={styles.similarProductItemsView}>
              <ScrollView horizontal={true}>
                {similarProducts?.map(sim => (
                  <TouchableOpacity
                    onPress={() =>
                      navigate.replace('PRODUCT_SELF', {product: sim})
                    }
                    activeOpacity={0.5}
                    key={sim.id}
                    style={styles.similarProductItemView}>
                    <View style={styles.similarProductItemNavbar}>
                      <TouchableOpacity
                        onPress={() =>
                          favDeleter(favorites, setFavorites, sim.id)
                        }>
                        <AntDesign
                          name={
                            favorites?.includes(sim.id) ? 'heart' : 'hearto'
                          }
                          color={
                            favorites?.includes(sim.id)
                              ? SabaColors.sabaRed
                              : SabaColors.sabaGray
                          }
                          size={16}
                        />
                      </TouchableOpacity>

                      <View style={styles.similarProductItemNavbarExistView}>
                        <Text style={styles.similarProductItemNavbarExistText}>
                          موجود
                        </Text>
                      </View>
                    </View>
                    <View style={styles.similarProductItemImageView}>
                      {!isEmpty(sim.pic_path) ? (
                        <Image
                          style={styles.similarProductItemImage}
                          source={{uri: endpoints.URL + sim.pic_path}}
                        />
                      ) : (
                        <Image
                          style={{
                            ...styles.similarProductItemImage,
                            opacity: 0.6,
                          }}
                          source={require('../assets/img/noneimage.png')}
                        />
                      )}
                    </View>
                    <View style={styles.similarProductItemInfoView}>
                      <Text style={styles.similarProductItemInfoTitle}>
                        {substringMaker(sim.nam, 12)}
                      </Text>
                      <Text style={styles.similarProductItemInfoPrice}>
                        قیمت نقدی {MConverter(sim.price)} تومان
                      </Text>
                      <Text style={styles.similarProductItemInfoPrice}>
                        قیمت چکی {MConverter(sim.price1)} تومان
                      </Text>
                      {/* <Text style={styles.similarProductItemInfoExist}>
                        موجودی:{sim.numb} عدد
                      </Text> */}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  } catch (err: any) {
    return <_ErrorLayout pageError="ProductSelf" errorDes={err.message} />;
  }
};
const MainScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  selfProductSelf: {},
  productSelfView: {},
  productInfoView: {
    height: 204,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
  },
  productInfoImageView: {
    height: '100%',
    width: '50%',
    position: 'absolute',
    left: 0,
  },
  productInfoImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  productInfoContentView: {
    width: '100%',
    height: '100%',
    padding: 12,
  },
  productInfoContentTitle: {
    fontFamily: 'shabnamMed',
    fontSize: 14,
    marginBottom: 6,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaBlack,
  },
  productInfoContentPrice: {
    marginTop: 2,
    fontFamily: 'shabnam',
    fontSize: 14,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaDarkGary,
  },
  productInfoContentExist: {
    marginTop: 4,
    fontFamily: 'shabnam',
    fontSize: 14,
    color: SabaColors.sabaGreen,
    textShadowColor: SabaColors.sabaGreen,
    textShadowRadius: 5,
  },
  productInfoContentCounterView: {
    height: 80,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row-reverse',
  },
  productInfoContentCounterOrderButtonView: {
    height: 80,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  productInfoContentCounterOrderButton: {
    backgroundColor: SabaColors.sabaIndigo,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 3,
  },
  productInfoContentCounterOrderButtonText: {
    fontFamily: 'shabnamMed',
    fontSize: 12,
    color: '#fff',
    marginRight: 6,
  },
  productInfoContentCounterRightView: {
    backgroundColor: SabaColors.sabaGreen,
    height: 30,
    width: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  productInfoContentCounterLeftView: {
    backgroundColor: SabaColors.sabaRed,
    height: 30,
    width: 30,
    borderRadius: 25,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfoContentCounterMiddleView: {
    backgroundColor: SabaColors.sabaWhite,
    height: 30,
    width: 80,
    borderRadius: 25,
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  productInfoContentCounterMiddleInput: {
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 5,
    fontFamily: 'shabnam',
    color: SabaColors.sabaDarkGary,
    padding: 0,
    textAlign: 'center',
    width: '100%',
  },
  // * ---------------------------- Similar -------------------------
  similarProductView: {
    height: 300,
    backgroundColor: SabaColors.sabaWhite,
  },
  similarProductTitleView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
  },
  similarProductTitleRightView: {
    width: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 20,
  },
  similarProductTitleLeftView: {
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 12,
  },

  similarProductTitleLeftText: {
    fontFamily: 'shabnam',
    marginLeft: 3,
    fontSize: 12,
    textShadowRadius: 9,
    shadowColor: SabaColors.sabaDarkGary,
    color: SabaColors.sabaDarkGary,
  },
  similarProductTitleRightText: {
    fontSize: 14,
    fontFamily: 'shabnamMed',
    textShadowRadius: 9,
    shadowColor: SabaColors.sabaDarkGary,
    color: SabaColors.sabaDarkGary,
  },
  similarProductItemsView: {
    height: 230,
  },
  similarProductItemView: {
    backgroundColor: '#fff',
    padding: 6,
    height: 220,
    width: 150,
    borderRadius: 9,
    elevation: 2,
    marginHorizontal: 6,
  },
  similarProductItemNavbar: {
    height: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    paddingHorizontal: 6,
  },
  similarProductItemNavbarExistView: {
    height: '100%',
    width: 40,
    backgroundColor: SabaColors.sabaLightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  similarProductItemNavbarExistText: {
    fontFamily: 'shabnamMed',
    fontSize: 10,
    color: SabaColors.sabaGreen,
  },
  similarProductItemImageView: {
    width: '100%',
    height: 110,
  },
  similarProductItemImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  similarProductItemInfoView: {
    height: 90,
  },
  similarProductItemInfoTitle: {
    fontFamily: 'shabnamMed',
    fontSize: 11,
    marginTop: 2,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaDarkGary,
  },
  similarProductItemInfoPrice: {
    fontFamily: 'shabnam',
    fontSize: 10,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaDarkGary,
  },
  similarProductItemInfoExist: {
    fontFamily: 'shabnam',
    fontSize: 11,
    marginTop: 2,
    color: SabaColors.sabaGreen,
    textShadowColor: SabaColors.sabaGreen,
    textShadowRadius: 2,
  },
});

export default ProductSelf;
