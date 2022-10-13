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
import Modal from 'react-native-modal';
const axios = require('axios').default;
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {FlatList} from 'react-native-gesture-handler';

const Home = () => {
  const [supportModal, setSupportModal] = React.useState<boolean>(false);
  const navigate = useNavigation();
  const [prooducts, setProducts] = React.useState();
  useFocusEffect(
    React.useCallback(() => {
      (async function test() {
        await axios.get(endpoints.getProducts).then(({data, status}: any) => {
          setProducts(data);
        });
      })();
    }, []),
  );
  return (
    <View style={styles.HomeView}>
      <View style={styles.HomeMenuView}>
        <View style={styles.HomeMenuTextView}>
          <Text style={styles.HomeMenuText}>دسته بندی ها</Text>
        </View>
        <View style={styles.HomeMenuItemsView}>
          <ScrollView horizontal={true}>
            <TouchableOpacity
              onPress={() => navigate.navigate('PRODUCTS')}
              activeOpacity={0.5}
              style={styles.HomeMenuItemView}>
              <View style={styles.HomeMenuItemImageView}>
                <Image
                  style={styles.HomeMenuItemImage}
                  source={require('../assets/img/home/suit.png')}
                />
              </View>
              <View style={styles.HomeMenuItemImageTitleView}>
                <Text style={styles.HomeMenuItemImageTitle}>لباس</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.HomeMenuItemView}>
              <View style={styles.HomeMenuItemImageView}>
                <Image
                  style={styles.HomeMenuItemImage}
                  source={require('../assets/img/home/shoe.png')}
                />
              </View>
              <View style={styles.HomeMenuItemImageTitleView}>
                <Text style={styles.HomeMenuItemImageTitle}>کفش</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.HomeMenuItemView}>
              <View style={styles.HomeMenuItemImageView}>
                <Image
                  style={styles.HomeMenuItemImage}
                  source={require('../assets/img/home/cup.png')}
                />
              </View>
              <View style={styles.HomeMenuItemImageTitleView}>
                <Text style={styles.HomeMenuItemImageTitle}>لیوان</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.HomeMenuItemView}>
              <View style={styles.HomeMenuItemImageView}>
                <Image
                  style={styles.HomeMenuItemImage}
                  source={require('../assets/img/home/food.png')}
                />
              </View>
              <View style={styles.HomeMenuItemImageTitleView}>
                <Text style={styles.HomeMenuItemImageTitle}>غذا</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.HomeMenuItemView}>
              <View style={styles.HomeMenuItemImageView}>
                <Image
                  style={styles.HomeMenuItemImage}
                  source={require('../assets/img/home/suit.png')}
                />
              </View>
              <View style={styles.HomeMenuItemImageTitleView}>
                <Text style={styles.HomeMenuItemImageTitle}>لباس</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.HomeMenuItemView}>
              <View style={styles.HomeMenuItemImageView}>
                <Image
                  style={styles.HomeMenuItemImage}
                  source={require('../assets/img/home/shoe.png')}
                />
              </View>
              <View style={styles.HomeMenuItemImageTitleView}>
                <Text style={styles.HomeMenuItemImageTitle}>کفش</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.HomeMenuItemView}>
              <View style={styles.HomeMenuItemImageView}>
                <Image
                  style={styles.HomeMenuItemImage}
                  source={require('../assets/img/home/cup.png')}
                />
              </View>
              <View style={styles.HomeMenuItemImageTitleView}>
                <Text style={styles.HomeMenuItemImageTitle}>لیوان</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.HomeMenuItemView}>
              <View style={styles.HomeMenuItemImageView}>
                <Image
                  style={styles.HomeMenuItemImage}
                  source={require('../assets/img/home/food.png')}
                />
              </View>
              <View style={styles.HomeMenuItemImageTitleView}>
                <Text style={styles.HomeMenuItemImageTitle}>غذا</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
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
              style={styles.HomeContentNewTitleLeftView}>
              <Text style={styles.HomeContentNewTitleLeftText}>مشاهده همه</Text>
              <MaterialIcons
                name="arrow-back-ios"
                color={SabaColors.sabaDarkGary}
                size={18}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.HomeContentNewItemsView}>
            <FlatList
              data={prooducts}
              keyExtractor={item => item.id}
              horizontal={true}
              renderItem={({item, index, separators}) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigate.navigate('PRODUCT_SELF')}
                  style={styles.HomeContentNewItemView}>
                  <View style={styles.HomeContentNewItemNavbarView}>
                    <View style={styles.HomeContentNewItemNavbarRightView}>
                      <AntDesign
                        name="hearto"
                        size={20}
                        color={SabaColors.sabaGray}
                      />
                    </View>
                    <View style={styles.HomeContentNewItemNavbarLeftView}>
                      <View
                        style={styles.HomeContentNewItemNavbarLeftExistView}>
                        <Text
                          style={styles.HomeContentNewItemNavbarLeftExistText}>
                          موجود
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.HomeContentNewItemImageView}>
                    <Image
                      style={styles.HomeContentNewItemImage}
                      source={{uri: endpoints.URL + item.pic_path}}
                    />
                  </View>
                  <View style={styles.HomeContentNewItemInfoView}>
                    <Text style={styles.HomeContentNewItemInfoTitle}>
                      عطر 2 عددی - 160 گرمی
                    </Text>
                    <Text style={styles.HomeContentNewItemInfoPrice}>
                      قیمت نقدی 7.300 تومان
                    </Text>
                    <Text style={styles.HomeContentNewItemInfoPrice}>
                      قیمت چکی 12.700 تومان
                    </Text>
                    <Text style={styles.HomeContentNewItemInfoExist}>
                      موجودی:4300 عدد
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
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
              style={styles.HomeContentNewTitleLeftView}>
              <Text style={styles.HomeContentNewTitleLeftText}>مشاهده همه</Text>
              <MaterialIcons
                name="arrow-back-ios"
                color={SabaColors.sabaDarkGary}
                size={18}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={prooducts}
            keyExtractor={item => item.id}
            horizontal={true}
            renderItem={({item, index, separators}) => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigate.navigate('PRODUCT_SELF')}
                style={styles.HomeContentNewItemView}>
                <View style={styles.HomeContentNewItemNavbarView}>
                  <View style={styles.HomeContentNewItemNavbarRightView}>
                    <AntDesign
                      name="hearto"
                      size={20}
                      color={SabaColors.sabaGray}
                    />
                  </View>
                  <View style={styles.HomeContentNewItemNavbarLeftView}>
                    <View style={styles.HomeContentNewItemNavbarLeftExistView}>
                      <Text
                        style={styles.HomeContentNewItemNavbarLeftExistText}>
                        موجود
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.HomeContentNewItemImageView}>
                  <Image
                    style={styles.HomeContentNewItemImage}
                    source={{uri: endpoints.URL + item.pic_path}}
                  />
                </View>
                <View style={styles.HomeContentNewItemInfoView}>
                  <Text style={styles.HomeContentNewItemInfoTitle}>
                    عطر 2 عددی - 160 گرمی
                  </Text>
                  <Text style={styles.HomeContentNewItemInfoPrice}>
                    قیمت نقدی 7.300 تومان
                  </Text>
                  <Text style={styles.HomeContentNewItemInfoPrice}>
                    قیمت چکی 12.700 تومان
                  </Text>
                  <Text style={styles.HomeContentNewItemInfoExist}>
                    موجودی:4300 عدد
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
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
    paddingVertical: 10,
    height: '100%',
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
    backgroundColor: SabaColors.sabaWhite,
    flex: 1,
  },
  HomeContentNewTitleView: {
    height: 35,
    flexDirection: 'row-reverse',
    paddingHorizontal: 7,
    justifyContent: 'space-between',
  },
  HomeContentNewTitleRightView: {
    justifyContent: 'center',
  },
  HomeContentNewTitleRightText: {
    fontFamily: 'shabnamMed',
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaBlack,
  },
  HomeContentNewTitleLeftView: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  HomeContentNewTitleLeftText: {
    fontFamily: 'shabnam',
    fontSize: 13,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaDarkGary,
  },
  HomeContentNewItemsView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  HomeContentNewItemView: {
    height: 224,
    width: 190,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 6,
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
    height: '80%',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HomeContentNewItemNavbarLeftExistText: {
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaGreen,
    fontSize: 11,
  },
  HomeContentNewItemImageView: {
    height: 100,
    width: '100%',
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
  },
  HomeContentNewItemInfoPrice: {
    fontFamily: 'shabnam',
    fontSize: 12,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaDarkGary,
  },
  HomeContentNewItemInfoExist: {
    marginTop: 4,
    fontFamily: 'shabnamMed',
    fontSize: 13,
    textShadowColor: SabaColors.sabaGreen,
    textShadowRadius: 4,
    color: SabaColors.sabaGreen,
  },
  // --------------------------- AllProducts --------------------------------
  HomeContentAllView: {
    backgroundColor: SabaColors.sabaWhite,
    flex: 1,
  },
  HomeContentAllTitleView: {
    height: 65,
    flexDirection: 'row-reverse',
    paddingHorizontal: 7,
    justifyContent: 'space-between',
  },
  HomeContentAllTitleRightView: {
    justifyContent: 'flex-end',
  },
  HomeContentAllTitleRightText: {
    fontFamily: 'shabnamMed',
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaBlack,
  },
  HomeContentAllTitleLeftView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
  },
  HomeContentAllTitleLeftText: {
    fontFamily: 'shabnam',
    fontSize: 13,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaDarkGary,
  },
  HomeContentAllItemsView: {
    height: 322,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  HomeContentAllItemView: {
    height: 254,
    width: 190,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 6,
    elevation: 4,

    marginHorizontal: 8,
  },
  HomeContentAllItemNavbarView: {height: 26, flexDirection: 'row-reverse'},
  HomeContentAllItemNavbarRightView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  HomeContentAllItemNavbarLeftView: {flex: 1, justifyContent: 'center'},
  HomeContentAllItemNavbarLeftExistView: {
    backgroundColor: SabaColors.sabaLightGreen,
    height: '100%',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HomeContentAllItemNavbarLeftExistText: {
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaGreen,
    fontSize: 12,
  },
  HomeContentAllItemImageView: {height: 120, width: '100%'},
  HomeContentAllItemImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  HomeContentAllItemInfoView: {height: 100},
  HomeContentAllItemInfoTitle: {
    fontFamily: 'shabnamMed',
    fontSize: 14,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaBlack,
  },
  HomeContentAllItemInfoPrice: {
    fontFamily: 'shabnam',
    fontSize: 12,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaDarkGary,
  },
  HomeContentAllItemInfoExist: {
    marginTop: 4,
    fontFamily: 'shabnamMed',
    fontSize: 12,
    textShadowColor: SabaColors.sabaGreen,
    textShadowRadius: 9,
    color: SabaColors.sabaGreen,
  },
});

export default Home;
