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
  StatusBar,
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
import ToastCustom from '../utils/toastCustom';
import {useToast} from 'react-native-toast-notifications';
import {MConverter} from '../utils/moneyConverter';
import {ActionShop} from '../realm/ActionShop';
import {substringMaker} from '../utils/substringMaker';
import _productCardView from '../components/_productCardView';
import {TProductCover, TProductServer} from '../utils/types';
import mainHeight from '../utils/responsiv/MainScreen';
import ResCalculator from '../utils/responsiv/Responsiv';
const ProductSelf = ({route}: any) => {
  try {
    const toast = useToast();
    const {product} = route.params;
    const [similarProducts, setSimilarProducts] = useState<TProductServer[]>(
      [],
    );
    const [order, setOrder] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [ordered, setOrdered] = useState<boolean>(false);
    const [orderCount, setOrderCount] = useState<string>('0');
    const navigate = useNavigation<any>();
    function handleOrderCount() {
      if (isEmpty(orderCount) || orderCount === '0')
        toast.show('مقدار صفر پذیرفته نیست', ToastCustom.danger);
      else {
        // * notAllowMoreThanExist
        if (orderCount > product.numb) {
          toast.show('خارج از موجودی', ToastCustom.danger);
        } else {
          toast.show('کالا ثبت شد', ToastCustom.success);
          ActionShop('create_update', product.id, parseInt(orderCount));
          setOrdered(true);
          setOrder(true);
        }
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
      toast.show('سفارش لغو شد', ToastCustom.info);
    }
    useFocusEffect(
      useCallback(() => {
        setLoading(true);
        ActionShop('sync', 0, 0, null, hasOrdered);
        axios
          .get(
            `${endpoints.getSimilarProducts}${product.id}/${
              product.groupid
            }?similar=${product.nam.split(' ')[0]}`,
          )
          .then(({data}) => {
            setLoading(false);
            setSimilarProducts(data);
          });
      }, []),
    );
    return (
      <SafeAreaView
        style={{backgroundColor: SabaColors.sabaSlate2, height: '100%'}}>
        <View style={styles.productInfImageView}>
          <ImageSlider
            data={[
              {
                img: isEmpty(product.pic_path)
                  ? require('../assets/img/noneimage.png')
                  : `${endpoints.ImageURL + product.pic_path}`,
              },
            ]}
            localImg={isEmpty(product.pic_path)}
            autoPlay={true}
            timer={2200}
            closeIconColor={SabaColors.sabaGold2}
            showHeader
            headerLeftComponent={
              <TouchableOpacity
                onPress={() => navigate.goBack()}
                activeOpacity={0.5}>
                <AntDesign name="arrowleft" color="#fff" size={26} />
              </TouchableOpacity>
            }
            activeIndicatorStyle={{
              backgroundColor: SabaColors.sabaGold2,
            }}
            inActiveIndicatorStyle={{
              backgroundColor: SabaColors.sabaGold2,
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
              height: '100%',
            }}
            caroselImageContainerStyle={{
              opacity: 1,
            }}
          />
        </View>

        <View style={styles.productSelfView}>
          <View style={styles.productInfoView}>
            <View style={styles.productInfoContentView}>
              <Text style={styles.productInfoContentTitle}>{product.nam}</Text>
              <Text style={styles.productInfoContentBox}>
                {`هر ${product.unit} شامل ${product.box} ${product.unit2} است`}
              </Text>
              <Text style={styles.productInfoContentPrice}>
                قیمت نقدی {MConverter(product.price)} ریال
              </Text>
              <Text style={styles.productInfoContentPrice}>
                قیمت چکی {MConverter(product.price1)} ریال
              </Text>
              <Text style={styles.productInfoContentExstField}>
                موجودی {product.numb} عدد
              </Text>

              {product.numb <= 0 ? (
                <View style={styles.productInfoContentExistView}>
                  <Text style={styles.productInfoContentExist}>
                    اتمام موجودی
                  </Text>
                </View>
              ) : (
                <>
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
                          keyboardType={'number-pad'}
                          style={{
                            ...styles.productInfoContentCounterMiddleInput,
                            color: ordered ? '#fff' : SabaColors.sabaSlate,
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
                      <Text style={styles.productInfoContentCounterCaution}>
                        ( لطفا تعداد را به جزء وارد کنید )
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={styles.productInfoContentCounterOrderButtonView}>
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
                          style={
                            styles.productInfoContentCounterOrderButtonText
                          }>
                          سفارش
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </View>
          </View>
          <_productCardView
            loading={loading}
            products={similarProducts}
            title={'محصولات مشابه'}
            stackType="navigate"
            screenName="SIMILAR_PRODUCTS"
            similarData={`${product.id}/${product.groupid}?similar=${
              product.nam.split(' ')[0]
            }`}
          />
        </View>
      </SafeAreaView>
    );
  } catch (err: any) {
    return <_ErrorLayout pageError="ProductSelf" errorDes={err.message} />;
  }
};
const styles = StyleSheet.create({
  productSelfView: {},
  productInfImageView: {
    height: mainHeight - 430,
    maxHeight: 300,
  },
  productInfoView: {
    backgroundColor: SabaColors.sabaSlate,
    alignItems: 'center',
    flexDirection: 'row',
  },
  productInfoImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  productInfoContentView: {
    width: '100%',
    height: '100%',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  productInfoContentTitle: {
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 11, 14),
    marginBottom: 6,
    color: SabaColors.sabaWhite,
    textAlign: 'right',
    height: 30,
  },
  productInfoContentBox: {
    marginTop: 4,
    fontFamily: 'shabnam',
    fontSize: ResCalculator(610, 11, 14),
    color: SabaColors.sabaGold2,
  },
  productInfoContentPrice: {
    marginTop: 4,
    fontFamily: 'shabnam',
    fontSize: ResCalculator(610, 11, 14),
    color: SabaColors.sabaWhite,
  },
  productInfoContentExstField: {
    marginTop: 4,
    fontFamily: 'shabnam',
    fontSize: ResCalculator(610, 11, 14),
    color: SabaColors.sabaGreen,
  },
  productInfoContentExistView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SabaColors.sabaRed,
    height: 38,
    marginTop: 16,
    marginBottom: 6,
  },
  productInfoContentExist: {
    fontFamily: 'shabnam',
    fontSize: ResCalculator(610, 12, 14),
    color: SabaColors.sabaWhite,
  },
  productInfoContentCounterView: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row-reverse',
    paddingVertical: 10,
    marginTop: 2,
  },
  productInfoContentCounterOrderButtonView: {
    marginTop: 2,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    flexDirection: 'row-reverse',
  },
  productInfoContentCounterOrderButton: {
    backgroundColor: SabaColors.sabaIndigo,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    paddingHorizontal: 12,
    elevation: 3,
    paddingVertical: 10,
    width: '100%',
  },
  productInfoContentCounterOrderButtonText: {
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 10, 12),
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
  productInfoContentCounterCaution: {
    fontFamily: 'shabnam',
    color: SabaColors.sabaGold2,
    marginRight: 12,
    fontSize: ResCalculator(610, 10, 12),
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
    fontFamily: 'shabnam',
    color: SabaColors.sabaWhite,
    padding: 0,
    textAlign: 'center',
    width: '100%',
  },
});

export default ProductSelf;
