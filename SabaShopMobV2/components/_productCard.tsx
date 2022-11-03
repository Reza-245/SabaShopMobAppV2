import {useState, useCallback} from 'react';
import SabaColors from '../utils/SabaColors.json';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import endpoints from '../utils/endpoints.json';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ImageSlider} from 'react-native-image-slider-banner';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BarIndicator, MaterialIndicator} from 'react-native-indicators';
const axios = require('axios').default;
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import _ErrorLayout from '../layouts/ErrorLayout';
import {ActionFPList} from '../realm/ActionFPList';
import {favoriteChacker} from '../utils/favoriteChecker';
import {favDeleter} from '../utils/favoriteDeleter';
import {MConverter} from '../utils/moneyConverter';
import {substringMaker} from '../utils/substringMaker';
import {isEmpty} from 'lodash';
function _productCard({products, loading, title}: any) {
  const navigate = useNavigation<any>();

  const [categories, setCategories] = useState<any>();
  const [favorites, setFavorites] = useState<number[]>();

  return (
    <View style={styles.HomeContentNewView}>
      <View style={styles.HomeContentNewTitleView}>
        <View style={styles.HomeContentNewTitleRightView}>
          <Text style={styles.HomeContentNewTitleRightText}>{title}</Text>
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
                        style={styles.HomeContentNewItemNavbarLeftExistView}>
                        <Text
                          style={styles.HomeContentNewItemNavbarLeftExistText}>
                          موجود
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.HomeContentNewItemImageContainerView}>
                    {!isEmpty(item.pic_path) ? (
                      <Image
                        style={styles.HomeContentNewItemImage}
                        source={{uri: endpoints.URL + item.pic_path}}
                      />
                    ) : (
                      <Image
                        style={{
                          ...styles.HomeContentNewItemImage,
                          opacity: 0.6,
                        }}
                        source={require('../assets/img/noneimage.png')}
                      />
                    )}
                  </View>
                  <View style={styles.HomeContentNewItemInfoView}>
                    <Text style={styles.HomeContentNewItemInfoTitle}>
                      {substringMaker(item.nam, 14)}
                    </Text>
                    <Text style={styles.HomeContentNewItemInfoPrice}>
                      قیمت نقدی {MConverter(item.price)} تومان
                    </Text>
                    <Text style={styles.HomeContentNewItemInfoPrice}>
                      قیمت چکی {MConverter(item.price1)} تومان
                    </Text>
                    {/* <Text style={styles.HomeContentNewItemInfoExist}>
                        موجودی: {item.numb}عدد
                      </Text> */}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  HomeContentNewView: {
    height: 240,
    justifyContent: 'center',
    backgroundColor: SabaColors.sabaWhite,
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
    height: 220,
  },

  HomeContentNewItemView: {
    height: 200,
    width: 170,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    elevation: 4,
    marginHorizontal: 8,
    marginVertical: 6,
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

  HomeContentNewItemImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '97%',
  },
  HomeContentNewItemInfoView: {
    height: 100,
  },
  HomeContentNewItemInfoTitle: {
    fontFamily: 'shabnamMed',
    fontSize: 13,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaBlack,
    textAlign: 'right',
  },
  HomeContentNewItemInfoPrice: {
    fontFamily: 'shabnam',
    fontSize: 11,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    color: SabaColors.sabaDarkGary,
    textAlign: 'right',
  },
  HomeContentNewItemInfoExist: {
    marginTop: 8,
    fontFamily: 'shabnamMed',
    fontSize: 11,
    textShadowColor: SabaColors.sabaGreen,
    textShadowRadius: 2,
    color: SabaColors.sabaGreen,
  },
});
export default _productCard;
