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

interface productCard {
  product: TProductServer;
  stackType: string;
}
function _productCard({product, stackType}: productCard) {
  const navigate = useNavigation<any>();
  const [categories, setCategories] = useState<any>();
  return (
    <TouchableOpacity
      key={product.id}
      activeOpacity={0.9}
      onPress={() =>
        stackType === 'navigate'
          ? navigate.navigate('PRODUCT_SELF', {product: product})
          : navigate.replace('PRODUCT_SELF', {product: product})
      }
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
      </View>
      <View style={styles.HomeContentNewItemInfoView}>
        <Text style={styles.HomeContentNewItemInfoTitle}>
          {substringMaker(product.nam, 40)}
        </Text>
        <Text style={styles.HomeContentNewItemInfoPrice}>
          {MConverter(product.price)} تومان
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  HomeContentNewItemView: {
    height: 220,
    width: 140,
    backgroundColor: SabaColors.sabaSlate,
    borderRadius: 12,
    elevation: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  HomeContentNewItemImageContainerView: {
    height: 140,
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
    height: 80,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  HomeContentNewItemInfoTitle: {
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 9.5, 12.2),
    color: SabaColors.sabaWhite,
    textAlign: 'center',
    height: 52,
  },
  HomeContentNewItemInfoPrice: {
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 11, 14),
    color: SabaColors.sabaGold2,
    textAlign: 'center',
    height: 20,
  },
});
export default _productCard;
