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
import {ImageSlider} from 'react-native-image-slider-banner';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const PorductSelf = () => {
  const [supportModal, setSupportModal] = React.useState<boolean>(false);
  const navigate = useNavigation();
  const images = [
    require('../assets/test1.jpg'),
    require('../assets/test2.jpg'),
  ];
  return (
    <SafeAreaView>
      <ImageSlider
        data={[
          {
            img: require('../assets/test1.jpg'),
          },
          {
            img: require('../assets/test2.jpg'),
          },
          {
            img: require('../assets/test3.png'),
          },
        ]}
        localImg
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
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="heart" color={SabaColors.sabaRed} size={26} />
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
            <Text style={styles.productInfoContentTitle}>
              عطر دو عددی - 160 گرمی
            </Text>
            <Text style={styles.productInfoContentPrice}>
              قیمت نقدی 7.300 تومان
            </Text>
            <Text style={styles.productInfoContentPrice}>
              قیمت چکی 12.700 تومان
            </Text>
            <Text style={styles.productInfoContentExist}>موجودی:5200 عدد</Text>
            <View style={styles.productInfoContentCounterView}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.productInfoContentCounterRightView}>
                <FontAwesome5 name="plus" color="#fff" size={16} />
              </TouchableOpacity>
              <View style={styles.productInfoContentCounterMiddleView}>
                <Text style={styles.productInfoContentCounterMiddleText}>
                  24
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.productInfoContentCounterLeftView}>
                <FontAwesome5 name="minus" color="#fff" size={16} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.similarProductView}>
          <View style={styles.similarProductTitleView}>
            <View style={styles.similarProductTitleLeftView}>
              <MaterialIcons
                name="keyboard-arrow-left"
                color={SabaColors.sabaDarkGary}
                size={28}
              />
              <Text style={styles.similarProductTitleLeftText}>نمایش همه</Text>
            </View>
            <View style={styles.similarProductTitleRightView}>
              <Text style={styles.similarProductTitleRightText}>
                محصولات مشابه
              </Text>
            </View>
          </View>
          <View style={styles.similarProductItemsView}>
            <ScrollView horizontal={true}>
              <View style={styles.similarProductItemView}>
                <View style={styles.similarProductItemNavbar}>
                  <AntDesign
                    name="hearto"
                    color={SabaColors.sabaGray}
                    size={16}
                  />
                  <View style={styles.similarProductItemNavbarExistView}>
                    <Text style={styles.similarProductItemNavbarExistText}>
                      موجود
                    </Text>
                  </View>
                </View>
                <View style={styles.similarProductItemImageView}>
                  <Image
                    style={styles.similarProductItemImage}
                    source={require('../assets/test1.jpg')}
                  />
                </View>
                <View style={styles.similarProductItemInfoView}>
                  <Text style={styles.similarProductItemInfoTitle}>
                    عطر 2 عددی - 160 گرمی
                  </Text>
                  <Text style={styles.similarProductItemInfoPrice}>
                    قیمت نقدی 7.300 تومان
                  </Text>
                  <Text style={styles.similarProductItemInfoPrice}>
                    قیمت نقدی 7.300 تومان
                  </Text>
                  <Text style={styles.similarProductItemInfoExist}>
                    موجودی:5200 عدد
                  </Text>
                </View>
              </View>
              <View style={styles.similarProductItemView}>
                <View style={styles.similarProductItemNavbar}>
                  <AntDesign
                    name="hearto"
                    color={SabaColors.sabaGray}
                    size={16}
                  />
                  <View style={styles.similarProductItemNavbarExistView}>
                    <Text style={styles.similarProductItemNavbarExistText}>
                      موجود
                    </Text>
                  </View>
                </View>
                <View style={styles.similarProductItemImageView}>
                  <Image
                    style={styles.similarProductItemImage}
                    source={require('../assets/test1.jpg')}
                  />
                </View>
                <View style={styles.similarProductItemInfoView}>
                  <Text style={styles.similarProductItemInfoTitle}>
                    عطر 2 عددی - 160 گرمی
                  </Text>
                  <Text style={styles.similarProductItemInfoPrice}>
                    قیمت نقدی 7.300 تومان
                  </Text>
                  <Text style={styles.similarProductItemInfoPrice}>
                    قیمت نقدی 7.300 تومان
                  </Text>
                  <Text style={styles.similarProductItemInfoExist}>
                    موجودی:5200 عدد
                  </Text>
                </View>
              </View>
              <View style={styles.similarProductItemView}>
                <View style={styles.similarProductItemNavbar}>
                  <AntDesign
                    name="hearto"
                    color={SabaColors.sabaGray}
                    size={16}
                  />
                  <View style={styles.similarProductItemNavbarExistView}>
                    <Text style={styles.similarProductItemNavbarExistText}>
                      موجود
                    </Text>
                  </View>
                </View>
                <View style={styles.similarProductItemImageView}>
                  <Image
                    style={styles.similarProductItemImage}
                    source={require('../assets/test1.jpg')}
                  />
                </View>
                <View style={styles.similarProductItemInfoView}>
                  <Text style={styles.similarProductItemInfoTitle}>
                    عطر 2 عددی - 160 گرمی
                  </Text>
                  <Text style={styles.similarProductItemInfoPrice}>
                    قیمت نقدی 7.300 تومان
                  </Text>
                  <Text style={styles.similarProductItemInfoPrice}>
                    قیمت نقدی 7.300 تومان
                  </Text>
                  <Text style={styles.similarProductItemInfoExist}>
                    موجودی:5200 عدد
                  </Text>
                </View>
              </View>
              <View style={styles.similarProductItemView}>
                <View style={styles.similarProductItemNavbar}>
                  <AntDesign
                    name="hearto"
                    color={SabaColors.sabaGray}
                    size={16}
                  />
                  <View style={styles.similarProductItemNavbarExistView}>
                    <Text style={styles.similarProductItemNavbarExistText}>
                      موجود
                    </Text>
                  </View>
                </View>
                <View style={styles.similarProductItemImageView}>
                  <Image
                    style={styles.similarProductItemImage}
                    source={require('../assets/test1.jpg')}
                  />
                </View>
                <View style={styles.similarProductItemInfoView}>
                  <Text style={styles.similarProductItemInfoTitle}>
                    عطر 2 عددی - 160 گرمی
                  </Text>
                  <Text style={styles.similarProductItemInfoPrice}>
                    قیمت نقدی 7.300 تومان
                  </Text>
                  <Text style={styles.similarProductItemInfoPrice}>
                    قیمت نقدی 7.300 تومان
                  </Text>
                  <Text style={styles.similarProductItemInfoExist}>
                    موجودی:5200 عدد
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const MainScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  selfPorductContainer: {},
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
  },
  productInfoImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  productInfoContentView: {
    width: '50%',
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
  productInfoContentCounterMiddleText: {
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 5,
    fontFamily: 'shabnam',
    color: SabaColors.sabaDarkGary,
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

export default PorductSelf;
