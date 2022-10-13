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
import MenuModal from '../components/_menuModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Shop = () => {
  const [supportModal, setSupportModal] = React.useState<boolean>(false);

  return (
    <View style={styles.shopView}>
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
              <Text style={styles.shopBasketInfoDetailTextLeft}>5 عدد</Text>
            </View>
            <View style={styles.shopBasketInfoDetail}>
              <Text style={styles.shopBasketInfoDetailTextRight}>
                قیمت کل اجناس
              </Text>
              <Text style={styles.shopBasketInfoDetailTextLeft}>
                453,700 تومان
              </Text>
            </View>
          </View>
          <View style={styles.shopBasketButtonContentView}>
            <View style={styles.shopBasketButtonView}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.shopBasketButtonTouchView}>
                <Text style={styles.shopBasketButtonText}>ثبت درخواست</Text>
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
          <View style={styles.shopBasketItemView}>
            <View style={styles.shopBasketTopButtonView}>
              <TouchableOpacity
                style={styles.shopBasketRemoveButton}
                activeOpacity={0.5}>
                <FontAwesome5
                  color={SabaColors.sabaRed}
                  size={16}
                  name="trash-alt"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.shopBasketRemoveButton}
                activeOpacity={0.5}>
                <AntDesign
                  color={SabaColors.sabaDarkGary}
                  size={16}
                  name="hearto"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.shopBasketContentView}>
              <View style={styles.shopBasketContentDetailsView}>
                <View style={styles.shopBasketContentDetailsTopView}>
                  <Text style={styles.shopBasketContentDetailsTitle}>
                    عطر 2 عددی - 160 گرمی
                  </Text>
                  <Text style={styles.shopBasketContentDetailsPrice}>
                    قیمت نقدی 7.300 تومان
                  </Text>
                  <Text style={styles.shopBasketContentDetailsPrice}>
                    قیمت چکی 12.700 تومان
                  </Text>
                </View>
                <View style={styles.shopBasketContentDetailsBottomView}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.shopBasketContentDetailsBottomPlusView}>
                    <FontAwesome5
                      name="plus"
                      color={SabaColors.sabaWhite}
                      size={18}
                    />
                  </TouchableOpacity>
                  <View style={styles.shopBasketContentDetailsInputView}>
                    <TextInput
                      value="22"
                      style={styles.shopBasketContentDetailsInput}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.shopBasketContentDetailsBottomMinusView}>
                    <FontAwesome5
                      color={SabaColors.sabaWhite}
                      name="minus"
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.shopBasketContentImageView}>
                <Image
                  style={styles.shopBasketContentImage}
                  source={require('../assets/test1.jpg')}
                />
              </View>
            </View>
            <View style={styles.shopBasketContentWholePriceView}>
              <View
                style={styles.shopBasketContentWholePriceItemViewRight}></View>
              <View style={styles.shopBasketContentWholePriceItemViewLeft}>
                <View
                  style={styles.shopBasketContentWholePriceItemViewLeftView}>
                  <Text style={styles.shopBasketContentWholePriceItemText}>
                    جمع کل: 21.900
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.shopBasketItemView}>
            <View style={styles.shopBasketTopButtonView}>
              <TouchableOpacity
                style={styles.shopBasketRemoveButton}
                activeOpacity={0.5}>
                <FontAwesome5
                  color={SabaColors.sabaRed}
                  size={16}
                  name="trash-alt"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.shopBasketRemoveButton}
                activeOpacity={0.5}>
                <AntDesign
                  color={SabaColors.sabaDarkGary}
                  size={16}
                  name="hearto"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.shopBasketContentView}>
              <View style={styles.shopBasketContentDetailsView}>
                <View style={styles.shopBasketContentDetailsTopView}>
                  <Text style={styles.shopBasketContentDetailsTitle}>
                    عطر 2 عددی - 160 گرمی
                  </Text>
                  <Text style={styles.shopBasketContentDetailsPrice}>
                    قیمت نقدی 7.300 تومان
                  </Text>
                  <Text style={styles.shopBasketContentDetailsPrice}>
                    قیمت چکی 12.700 تومان
                  </Text>
                </View>
                <View style={styles.shopBasketContentDetailsBottomView}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.shopBasketContentDetailsBottomPlusView}>
                    <FontAwesome5
                      name="plus"
                      color={SabaColors.sabaWhite}
                      size={18}
                    />
                  </TouchableOpacity>
                  <View style={styles.shopBasketContentDetailsInputView}>
                    <TextInput
                      value="22"
                      style={styles.shopBasketContentDetailsInput}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.shopBasketContentDetailsBottomMinusView}>
                    <FontAwesome5
                      color={SabaColors.sabaWhite}
                      name="minus"
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.shopBasketContentImageView}>
                <Image
                  style={styles.shopBasketContentImage}
                  source={require('../assets/test1.jpg')}
                />
              </View>
            </View>
            <View style={styles.shopBasketContentWholePriceView}>
              <View
                style={styles.shopBasketContentWholePriceItemViewRight}></View>
              <View style={styles.shopBasketContentWholePriceItemViewLeft}>
                <View
                  style={styles.shopBasketContentWholePriceItemViewLeftView}>
                  <Text style={styles.shopBasketContentWholePriceItemText}>
                    جمع کل: 21.900
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.shopBasketItemView}>
            <View style={styles.shopBasketTopButtonView}>
              <TouchableOpacity
                style={styles.shopBasketRemoveButton}
                activeOpacity={0.5}>
                <FontAwesome5
                  color={SabaColors.sabaRed}
                  size={16}
                  name="trash-alt"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.shopBasketRemoveButton}
                activeOpacity={0.5}>
                <AntDesign
                  color={SabaColors.sabaDarkGary}
                  size={16}
                  name="hearto"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.shopBasketContentView}>
              <View style={styles.shopBasketContentDetailsView}>
                <View style={styles.shopBasketContentDetailsTopView}>
                  <Text style={styles.shopBasketContentDetailsTitle}>
                    عطر 2 عددی - 160 گرمی
                  </Text>
                  <Text style={styles.shopBasketContentDetailsPrice}>
                    قیمت نقدی 7.300 تومان
                  </Text>
                  <Text style={styles.shopBasketContentDetailsPrice}>
                    قیمت چکی 12.700 تومان
                  </Text>
                </View>
                <View style={styles.shopBasketContentDetailsBottomView}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.shopBasketContentDetailsBottomPlusView}>
                    <FontAwesome5
                      name="plus"
                      color={SabaColors.sabaWhite}
                      size={18}
                    />
                  </TouchableOpacity>
                  <View style={styles.shopBasketContentDetailsInputView}>
                    <TextInput
                      value="22"
                      style={styles.shopBasketContentDetailsInput}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.shopBasketContentDetailsBottomMinusView}>
                    <FontAwesome5
                      color={SabaColors.sabaWhite}
                      name="minus"
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.shopBasketContentImageView}>
                <Image
                  style={styles.shopBasketContentImage}
                  source={require('../assets/test1.jpg')}
                />
              </View>
            </View>
            <View style={styles.shopBasketContentWholePriceView}>
              <View
                style={styles.shopBasketContentWholePriceItemViewRight}></View>
              <View style={styles.shopBasketContentWholePriceItemViewLeft}>
                <View
                  style={styles.shopBasketContentWholePriceItemViewLeftView}>
                  <Text style={styles.shopBasketContentWholePriceItemText}>
                    جمع کل: 21.900
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.shopBasketItemView}>
            <View style={styles.shopBasketTopButtonView}>
              <TouchableOpacity
                style={styles.shopBasketRemoveButton}
                activeOpacity={0.5}>
                <FontAwesome5
                  color={SabaColors.sabaRed}
                  size={16}
                  name="trash-alt"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.shopBasketRemoveButton}
                activeOpacity={0.5}>
                <AntDesign
                  color={SabaColors.sabaDarkGary}
                  size={16}
                  name="hearto"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.shopBasketContentView}>
              <View style={styles.shopBasketContentDetailsView}>
                <View style={styles.shopBasketContentDetailsTopView}>
                  <Text style={styles.shopBasketContentDetailsTitle}>
                    عطر 2 عددی - 160 گرمی
                  </Text>
                  <Text style={styles.shopBasketContentDetailsPrice}>
                    قیمت نقدی 7.300 تومان
                  </Text>
                  <Text style={styles.shopBasketContentDetailsPrice}>
                    قیمت چکی 12.700 تومان
                  </Text>
                </View>
                <View style={styles.shopBasketContentDetailsBottomView}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.shopBasketContentDetailsBottomPlusView}>
                    <FontAwesome5
                      name="plus"
                      color={SabaColors.sabaWhite}
                      size={18}
                    />
                  </TouchableOpacity>
                  <View style={styles.shopBasketContentDetailsInputView}>
                    <TextInput
                      value="22"
                      style={styles.shopBasketContentDetailsInput}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.shopBasketContentDetailsBottomMinusView}>
                    <FontAwesome5
                      color={SabaColors.sabaWhite}
                      name="minus"
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.shopBasketContentImageView}>
                <Image
                  style={styles.shopBasketContentImage}
                  source={require('../assets/test1.jpg')}
                />
              </View>
            </View>
            <View style={styles.shopBasketContentWholePriceView}>
              <View
                style={styles.shopBasketContentWholePriceItemViewRight}></View>
              <View style={styles.shopBasketContentWholePriceItemViewLeft}>
                <View
                  style={styles.shopBasketContentWholePriceItemViewLeftView}>
                  <Text style={styles.shopBasketContentWholePriceItemText}>
                    جمع کل: 21.900
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.shopBasketItemView}>
            <View style={styles.shopBasketTopButtonView}>
              <TouchableOpacity
                style={styles.shopBasketRemoveButton}
                activeOpacity={0.5}>
                <FontAwesome5
                  color={SabaColors.sabaRed}
                  size={16}
                  name="trash-alt"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.shopBasketRemoveButton}
                activeOpacity={0.5}>
                <AntDesign
                  color={SabaColors.sabaDarkGary}
                  size={16}
                  name="hearto"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.shopBasketContentView}>
              <View style={styles.shopBasketContentDetailsView}>
                <View style={styles.shopBasketContentDetailsTopView}>
                  <Text style={styles.shopBasketContentDetailsTitle}>
                    عطر 2 عددی - 160 گرمی
                  </Text>
                  <Text style={styles.shopBasketContentDetailsPrice}>
                    قیمت نقدی 7.300 تومان
                  </Text>
                  <Text style={styles.shopBasketContentDetailsPrice}>
                    قیمت چکی 12.700 تومان
                  </Text>
                </View>
                <View style={styles.shopBasketContentDetailsBottomView}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.shopBasketContentDetailsBottomPlusView}>
                    <FontAwesome5
                      name="plus"
                      color={SabaColors.sabaWhite}
                      size={18}
                    />
                  </TouchableOpacity>
                  <View style={styles.shopBasketContentDetailsInputView}>
                    <TextInput
                      value="22"
                      style={styles.shopBasketContentDetailsInput}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.shopBasketContentDetailsBottomMinusView}>
                    <FontAwesome5
                      color={SabaColors.sabaWhite}
                      name="minus"
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.shopBasketContentImageView}>
                <Image
                  style={styles.shopBasketContentImage}
                  source={require('../assets/test1.jpg')}
                />
              </View>
            </View>
            <View style={styles.shopBasketContentWholePriceView}>
              <View
                style={styles.shopBasketContentWholePriceItemViewRight}></View>
              <View style={styles.shopBasketContentWholePriceItemViewLeft}>
                <View
                  style={styles.shopBasketContentWholePriceItemViewLeftView}>
                  <Text style={styles.shopBasketContentWholePriceItemText}>
                    جمع کل: 21.900
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const MainScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  shopView: {
    backgroundColor: SabaColors.sabaWhite,
    height: '100%',
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
    fontSize: 11,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaBlack,
  },
  shopBasketInfoDetailTextLeft: {
    fontFamily: 'shabnam',
    fontSize: 11,
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
    fontSize: 11,
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
    fontSize: 11,
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
    backgroundColor: SabaColors.sabaWhite,
    borderRadius: 25,
    marginHorizontal: 3,
    elevation: 4,
  },
  shopBasketContentDetailsInput: {
    backgroundColor: SabaColors.sabaWhite,
    borderRadius: 25,
    padding: 0,
    textAlign: 'center',
    fontFamily: 'shabnamMed',
    fontSize: 13,
    color: SabaColors.sabaDarkGary,
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
    width: '80%',
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
