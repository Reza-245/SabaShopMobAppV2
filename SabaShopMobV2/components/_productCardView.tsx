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
import MainScreen from '../utils/responsiv/MainScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BarIndicator, MaterialIndicator} from 'react-native-indicators';
const axios = require('axios').default;
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import _ErrorLayout from '../layouts/ErrorLayout';
import {MConverter} from '../utils/moneyConverter';
import {substringMaker} from '../utils/substringMaker';
import {isEmpty} from 'lodash';
import {TProductServer} from '../utils/types';
import _productCard from './_productCard';
import ResCalculator from '../utils/responsiv/Responsiv';
interface IProductCard {
  loading: boolean;
  title: string;
  similarData?: string;
  products: TProductServer[];
  stackType?: string;
  screenName?: string;
}
function _productCardView({
  products,
  loading,
  title,
  similarData,
  stackType = 'navigate',
  screenName = 'PRODUCTS',
}: IProductCard) {
  const navigate = useNavigation<any>();
  return (
    <View style={styles.HomeContentNewView}>
      <View style={styles.HomeContentNewTitleView}>
        <View style={styles.HomeContentNewTitleRightView}>
          <Text style={styles.HomeContentNewTitleRightText}>{title}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigate.push(screenName, {similarData})}
          style={styles.HomeContentNewTitleLeftView}>
          <Text style={styles.HomeContentNewTitleLeftText}>مشاهده همه</Text>
          <MaterialIcons
            name="arrow-back-ios"
            color={SabaColors.sabaWhite}
            size={11}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.HomeContentNewItemsContainerView}>
        {loading ? (
          <View style={styles.HomeContentNewItemsIndicatorView}>
            <BarIndicator
              animationDuration={700}
              size={40}
              color={SabaColors.sabaGold2}
              count={5}
            />
          </View>
        ) : (
          <View style={styles.HomeContentNewItemsView}>
            <ScrollView horizontal={true}>
              {products?.map((item, index) => (
                <_productCard
                  stackType={stackType}
                  product={item}
                  key={item.id}
                  index={index}
                  length={products.length}
                />
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
    height: 260,
    justifyContent: 'center',
    backgroundColor: SabaColors.sabaSlate2,
  },
  HomeContentNewTitleView: {
    height: 25,
    flexDirection: 'row-reverse',
    paddingHorizontal: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4.4,
  },
  HomeContentNewTitleRightView: {
    justifyContent: 'center',
  },
  HomeContentNewTitleRightText: {
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaWhite,
    fontSize: ResCalculator(610, 11, 13),
  },
  HomeContentNewTitleLeftView: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  HomeContentNewTitleLeftText: {
    fontFamily: 'shabnam',
    fontSize: ResCalculator(610, 11, 13),
    color: SabaColors.sabaWhite,
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
    height: '100%',
    width: 140,
    backgroundColor: SabaColors.sabaSlate,
    borderRadius: 12,
    elevation: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  HomeContentNewItemImageContainerView: {
    height: 100,
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

  HomeContentNewItemImage: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  HomeContentNewItemInfoView: {
    height: 100,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  HomeContentNewItemInfoTitle: {
    fontFamily: 'shabnamMed',
    fontSize: 13,
    color: SabaColors.sabaWhite,
    textAlign: 'center',
    height: 42,
  },
  HomeContentNewItemInfoPrice: {
    fontFamily: 'shabnamMed',
    fontSize: 13,
    color: SabaColors.sabaWhite,
    textAlign: 'center',
    height: 39,
  },
});
export default _productCardView;
