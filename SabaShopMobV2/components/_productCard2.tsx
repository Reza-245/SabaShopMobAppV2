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
import {MConverter} from '../utils/moneyConverter';
import {substringMaker} from '../utils/substringMaker';
import {isEmpty} from 'lodash';
import {TProductServer} from '../utils/types';
import ResCalculator from '../utils/responsiv/Responsiv';
const widthScreen = Dimensions.get('window').width;
interface IProduct {
  product: TProductServer;
  index: number;
}
function _productCard2({product, index}: IProduct) {
  const navigate = useNavigation<any>();
  const [categories, setCategories] = useState<any>();
  return (
    <View
      style={{
        ...styles.HomeContentView,
        paddingRight: index % 2 === 1 ? 6 : 0,
      }}>
      <TouchableOpacity
        key={product.id}
        activeOpacity={0.9}
        onPress={() => navigate.push('PRODUCT_SELF', {product: product})}
        style={styles.HomeContentNewItemView}>
        <View style={styles.HomeContentNewItemImageContainerView}>
          {!isEmpty(product.pic_path) ? (
            <Image
              style={styles.HomeContentNewItemImage}
              source={{uri: endpoints.URL + product.pic_path}}
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
          {product.numb <= 0 && (
            <View style={styles.HomeContentItemExistView}>
              <Text style={styles.HomeContentItemExistText}>اتمام موجودی</Text>
            </View>
          )}
        </View>
        <View style={styles.HomeContentNewItemInfoView}>
          <Text style={styles.HomeContentNewItemInfoTitle}>
            {substringMaker(product.nam, 46)}
          </Text>
          <Text style={styles.HomeContentNewItemInfoPrice}>
            نقدی {MConverter(product.price)} ریال
          </Text>
          <Text style={styles.HomeContentNewItemInfoPrice}>
            چکی {MConverter(product.price1)} ریال
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  HomeContentView: {
    width: '50%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
    paddingLeft: 6,
  },
  HomeContentNewItemView: {
    height: '100%',
    width: '100%',
    backgroundColor: SabaColors.sabaSlate,
    borderRadius: 12,
    elevation: 4,
    // marginHorizontal: 8,
    overflow: 'hidden',
    // marginTop: 18,
  },
  HomeContentNewItemImageContainerView: {
    height: '65%',
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  HomeContentNewItemImage: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  HomeContentNewItemInfoView: {
    height: '35%',
    paddingHorizontal: 3,
    paddingTop: 3,
  },
  HomeContentItemExistView: {
    position: 'absolute',
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: SabaColors.sabaRed,
    borderRadius: 2,
    top: 8,
    left: 6,
  },
  HomeContentItemExistText: {
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 10.6, 12),
    color: '#fff',
  },
  HomeContentNewItemInfoTitle: {
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 10.5, 13.5),
    color: SabaColors.sabaWhite,
    textAlign: 'center',
    height: 44,
  },
  HomeContentNewItemInfoPrice: {
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 10, 13),
    color: SabaColors.sabaGold2,
    textAlign: 'center',
    height: 21.5,
  },
});
export default _productCard2;
