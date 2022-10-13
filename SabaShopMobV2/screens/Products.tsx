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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import _menuModal from '../components/_menuModal';
import Modal from 'react-native-modal';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
const Products = () => {
  const [supportModal, setSupportModal] = React.useState<boolean>(false);
  const navigate = useNavigation();
  return (
    <View style={styles.productsView}>
      <_menuModal
        supportModal={supportModal}
        setSupportModal={setSupportModal}
      />
      <View style={styles.productsSearchContainer}>
        <TouchableOpacity
          onPress={() => setSupportModal(true)}
          activeOpacity={0.5}
          style={styles.productsIconMenuView}>
          <Ionicons size={32} name="ios-menu" color={SabaColors.sabaWhite} />
        </TouchableOpacity>
        <View style={styles.productsSearchView}>
          <View style={styles.productsSearchInView}>
            <TextInput style={styles.productsInputSearchView} />
          </View>
          <View style={styles.productsSearchIconView}>
            <Feather size={27} name="search" color={SabaColors.sabaWhite} />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigate.goBack()}
          activeOpacity={0.5}
          style={styles.productsIconBackView}>
          <MaterialIcons
            size={32}
            name="arrow-back"
            color={SabaColors.sabaWhite}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.productsContentView}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.productsContentItemView}>
          <View style={styles.productsContentItemNavView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.productsContentItemNavStatusView}>
              <AntDesign name="heart" color={SabaColors.sabaRed} size={17} />
            </TouchableOpacity>
            <View style={styles.productsContentItemNavIconView}>
              <Text style={styles.productsContentItemNavIconText}>موجود</Text>
            </View>
          </View>
          <View style={styles.productsContentItemArticleView}>
            <View style={styles.productsContentItemInfoView}>
              <Text style={styles.productsContentItemInfoTitle}>
                عطر دو عددی - 160 گرمی
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت نقدی 7,300 تومان
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت چکی 12,500 تومان
              </Text>
            </View>
            <View style={styles.productsContentItemImageView}>
              <Image
                style={styles.productsContentItemImage}
                source={require('../assets/test1.jpg')}
              />
            </View>
          </View>
          <View style={styles.productsContentItemArticleExistView}>
            <Text style={styles.productsContentItemInfoExist}>
              موجودی: 5470 عدد
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.productsContentItemView}>
          <View style={styles.productsContentItemNavView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.productsContentItemNavStatusView}>
              <AntDesign name="heart" color={SabaColors.sabaRed} size={17} />
            </TouchableOpacity>
            <View style={styles.productsContentItemNavIconView}>
              <Text style={styles.productsContentItemNavIconText}>موجود</Text>
            </View>
          </View>
          <View style={styles.productsContentItemArticleView}>
            <View style={styles.productsContentItemInfoView}>
              <Text style={styles.productsContentItemInfoTitle}>
                عطر دو عددی - 160 گرمی
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت نقدی 7,300 تومان
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت چکی 12,500 تومان
              </Text>
            </View>
            <View style={styles.productsContentItemImageView}>
              <Image
                style={styles.productsContentItemImage}
                source={require('../assets/test1.jpg')}
              />
            </View>
          </View>
          <View style={styles.productsContentItemArticleExistView}>
            <Text style={styles.productsContentItemInfoExist}>
              موجودی: 5470 عدد
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.productsContentItemView}>
          <View style={styles.productsContentItemNavView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.productsContentItemNavStatusView}>
              <AntDesign name="heart" color={SabaColors.sabaRed} size={17} />
            </TouchableOpacity>
            <View style={styles.productsContentItemNavIconView}>
              <Text style={styles.productsContentItemNavIconText}>موجود</Text>
            </View>
          </View>
          <View style={styles.productsContentItemArticleView}>
            <View style={styles.productsContentItemInfoView}>
              <Text style={styles.productsContentItemInfoTitle}>
                عطر دو عددی - 160 گرمی
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت نقدی 7,300 تومان
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت چکی 12,500 تومان
              </Text>
            </View>
            <View style={styles.productsContentItemImageView}>
              <Image
                style={styles.productsContentItemImage}
                source={require('../assets/test1.jpg')}
              />
            </View>
          </View>
          <View style={styles.productsContentItemArticleExistView}>
            <Text style={styles.productsContentItemInfoExist}>
              موجودی: 5470 عدد
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.productsContentItemView}>
          <View style={styles.productsContentItemNavView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.productsContentItemNavStatusView}>
              <AntDesign name="heart" color={SabaColors.sabaRed} size={17} />
            </TouchableOpacity>
            <View style={styles.productsContentItemNavIconView}>
              <Text style={styles.productsContentItemNavIconText}>موجود</Text>
            </View>
          </View>
          <View style={styles.productsContentItemArticleView}>
            <View style={styles.productsContentItemInfoView}>
              <Text style={styles.productsContentItemInfoTitle}>
                عطر دو عددی - 160 گرمی
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت نقدی 7,300 تومان
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت چکی 12,500 تومان
              </Text>
            </View>
            <View style={styles.productsContentItemImageView}>
              <Image
                style={styles.productsContentItemImage}
                source={require('../assets/test1.jpg')}
              />
            </View>
          </View>
          <View style={styles.productsContentItemArticleExistView}>
            <Text style={styles.productsContentItemInfoExist}>
              موجودی: 5470 عدد
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.productsContentItemView}>
          <View style={styles.productsContentItemNavView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.productsContentItemNavStatusView}>
              <AntDesign name="heart" color={SabaColors.sabaRed} size={17} />
            </TouchableOpacity>
            <View style={styles.productsContentItemNavIconView}>
              <Text style={styles.productsContentItemNavIconText}>موجود</Text>
            </View>
          </View>
          <View style={styles.productsContentItemArticleView}>
            <View style={styles.productsContentItemInfoView}>
              <Text style={styles.productsContentItemInfoTitle}>
                عطر دو عددی - 160 گرمی
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت نقدی 7,300 تومان
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت چکی 12,500 تومان
              </Text>
            </View>
            <View style={styles.productsContentItemImageView}>
              <Image
                style={styles.productsContentItemImage}
                source={require('../assets/test1.jpg')}
              />
            </View>
          </View>
          <View style={styles.productsContentItemArticleExistView}>
            <Text style={styles.productsContentItemInfoExist}>
              موجودی: 5470 عدد
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.productsContentItemView}>
          <View style={styles.productsContentItemNavView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.productsContentItemNavStatusView}>
              <AntDesign name="heart" color={SabaColors.sabaRed} size={17} />
            </TouchableOpacity>
            <View style={styles.productsContentItemNavIconView}>
              <Text style={styles.productsContentItemNavIconText}>موجود</Text>
            </View>
          </View>
          <View style={styles.productsContentItemArticleView}>
            <View style={styles.productsContentItemInfoView}>
              <Text style={styles.productsContentItemInfoTitle}>
                عطر دو عددی - 160 گرمی
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت نقدی 7,300 تومان
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت چکی 12,500 تومان
              </Text>
            </View>
            <View style={styles.productsContentItemImageView}>
              <Image
                style={styles.productsContentItemImage}
                source={require('../assets/test1.jpg')}
              />
            </View>
          </View>
          <View style={styles.productsContentItemArticleExistView}>
            <Text style={styles.productsContentItemInfoExist}>
              موجودی: 5470 عدد
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.productsContentItemView}>
          <View style={styles.productsContentItemNavView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.productsContentItemNavStatusView}>
              <AntDesign name="heart" color={SabaColors.sabaRed} size={17} />
            </TouchableOpacity>
            <View style={styles.productsContentItemNavIconView}>
              <Text style={styles.productsContentItemNavIconText}>موجود</Text>
            </View>
          </View>
          <View style={styles.productsContentItemArticleView}>
            <View style={styles.productsContentItemInfoView}>
              <Text style={styles.productsContentItemInfoTitle}>
                عطر دو عددی - 160 گرمی
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت نقدی 7,300 تومان
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت چکی 12,500 تومان
              </Text>
            </View>
            <View style={styles.productsContentItemImageView}>
              <Image
                style={styles.productsContentItemImage}
                source={require('../assets/test1.jpg')}
              />
            </View>
          </View>
          <View style={styles.productsContentItemArticleExistView}>
            <Text style={styles.productsContentItemInfoExist}>
              موجودی: 5470 عدد
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.productsContentItemView}>
          <View style={styles.productsContentItemNavView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.productsContentItemNavStatusView}>
              <AntDesign name="heart" color={SabaColors.sabaRed} size={17} />
            </TouchableOpacity>
            <View style={styles.productsContentItemNavIconView}>
              <Text style={styles.productsContentItemNavIconText}>موجود</Text>
            </View>
          </View>
          <View style={styles.productsContentItemArticleView}>
            <View style={styles.productsContentItemInfoView}>
              <Text style={styles.productsContentItemInfoTitle}>
                عطر دو عددی - 160 گرمی
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت نقدی 7,300 تومان
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت چکی 12,500 تومان
              </Text>
            </View>
            <View style={styles.productsContentItemImageView}>
              <Image
                style={styles.productsContentItemImage}
                source={require('../assets/test1.jpg')}
              />
            </View>
          </View>
          <View style={styles.productsContentItemArticleExistView}>
            <Text style={styles.productsContentItemInfoExist}>
              موجودی: 5470 عدد
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.productsContentItemView}>
          <View style={styles.productsContentItemNavView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.productsContentItemNavStatusView}>
              <AntDesign name="heart" color={SabaColors.sabaRed} size={17} />
            </TouchableOpacity>
            <View style={styles.productsContentItemNavIconView}>
              <Text style={styles.productsContentItemNavIconText}>موجود</Text>
            </View>
          </View>
          <View style={styles.productsContentItemArticleView}>
            <View style={styles.productsContentItemInfoView}>
              <Text style={styles.productsContentItemInfoTitle}>
                عطر دو عددی - 160 گرمی
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت نقدی 7,300 تومان
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت چکی 12,500 تومان
              </Text>
            </View>
            <View style={styles.productsContentItemImageView}>
              <Image
                style={styles.productsContentItemImage}
                source={require('../assets/test1.jpg')}
              />
            </View>
          </View>
          <View style={styles.productsContentItemArticleExistView}>
            <Text style={styles.productsContentItemInfoExist}>
              موجودی: 5470 عدد
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.productsContentItemView}>
          <View style={styles.productsContentItemNavView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.productsContentItemNavStatusView}>
              <AntDesign name="heart" color={SabaColors.sabaRed} size={17} />
            </TouchableOpacity>
            <View style={styles.productsContentItemNavIconView}>
              <Text style={styles.productsContentItemNavIconText}>موجود</Text>
            </View>
          </View>
          <View style={styles.productsContentItemArticleView}>
            <View style={styles.productsContentItemInfoView}>
              <Text style={styles.productsContentItemInfoTitle}>
                عطر دو عددی - 160 گرمی
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت نقدی 7,300 تومان
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت چکی 12,500 تومان
              </Text>
            </View>
            <View style={styles.productsContentItemImageView}>
              <Image
                style={styles.productsContentItemImage}
                source={require('../assets/test1.jpg')}
              />
            </View>
          </View>
          <View style={styles.productsContentItemArticleExistView}>
            <Text style={styles.productsContentItemInfoExist}>
              موجودی: 5470 عدد
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.productsContentItemView}>
          <View style={styles.productsContentItemNavView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.productsContentItemNavStatusView}>
              <AntDesign name="heart" color={SabaColors.sabaRed} size={17} />
            </TouchableOpacity>
            <View style={styles.productsContentItemNavIconView}>
              <Text style={styles.productsContentItemNavIconText}>موجود</Text>
            </View>
          </View>
          <View style={styles.productsContentItemArticleView}>
            <View style={styles.productsContentItemInfoView}>
              <Text style={styles.productsContentItemInfoTitle}>
                عطر دو عددی - 160 گرمی
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت نقدی 7,300 تومان
              </Text>
              <Text style={styles.productsContentItemInfoPrice}>
                قیمت چکی 12,500 تومان
              </Text>
            </View>
            <View style={styles.productsContentItemImageView}>
              <Image
                style={styles.productsContentItemImage}
                source={require('../assets/test1.jpg')}
              />
            </View>
          </View>
          <View style={styles.productsContentItemArticleExistView}>
            <Text style={styles.productsContentItemInfoExist}>
              موجودی: 5470 عدد
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const MainScreen = Dimensions.get('screen');
const styles = StyleSheet.create({
  productsView: {
    height: MainScreen.height - 35,
    width: MainScreen.width,
    backgroundColor: SabaColors.sabaWhite,
  },
  productsSearchContainer: {
    backgroundColor: SabaColors.sabaGreen,
    height: 46,
    flexDirection: 'row-reverse',
  },
  productsIconMenuView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsSearchInView: {
    flex: 7,
  },
  productsSearchView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 8,
    flexDirection: 'row-reverse',
  },
  productsInputSearchView: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingVertical: 0,
    paddingHorizontal: 4,
    textAlign: 'right',
  },
  productsSearchIconView: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsIconBackView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsContentView: {
    paddingHorizontal: 10,
  },
  productsContentItemView: {
    borderRadius: 8,
    height: 160,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 8,
    elevation: 2,
    marginBottom: 9,
  },
  productsContentItemNavView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  productsContentItemNavStatusView: {},
  productsContentItemNavIconView: {
    height: 20,
    width: 38,
    backgroundColor: SabaColors.sabaLightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsContentItemNavIconText: {
    fontSize: 9,
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaGreen,
  },
  productsContentItemArticleView: {
    height: 106,
    flexDirection: 'row-reverse',
  },
  productsContentItemInfoView: {
    flex: 2,
  },
  productsContentItemImageView: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  productsContentItemImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  productsContentItemInfoTitle: {
    marginTop: 8,
    fontFamily: 'shabnamMed',
    fontSize: 12,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    marginVertical: 2,
    color: SabaColors.sabaBlack,
  },
  productsContentItemInfoPrice: {
    fontFamily: 'shabnam',
    fontSize: 11,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    marginTop: 1,
    color: SabaColors.sabaDarkGary,
  },
  productsContentItemArticleExistView: {},
  productsContentItemInfoExist: {
    fontFamily: 'shabnamMed',
    fontSize: 13,
    textShadowColor: SabaColors.sabaGreen,
    textShadowRadius: 9,
    color: SabaColors.sabaGreen,
  },
});

export default Products;
