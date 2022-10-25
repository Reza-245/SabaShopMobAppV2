import React from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import {MaterialIndicator} from 'react-native-indicators';
import _ErrorLayout from '../layouts/ErrorLayout';
import {useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import axios from 'axios';
import {ActionFPList} from '../realm/ActionFPList';
import {TProductServer} from '../utils/types';

const Favorite = () => {
  try {
    const navigate = useNavigation();
    const [favorites, setFavorites] = React.useState<number[]>([]);
    const [favProducts, setFavProducts] = React.useState<TProductServer[]>();
    const [loading, setLoading] = React.useState<boolean>(true);
    useFocusEffect(
      React.useCallback(() => {
        ActionFPList('sync', 0, setFavorites);
      }, []),
    );
    React.useEffect(() => {
      (async () =>
        await axios
          .post(endpoints.getFavorites, JSON.stringify({favs: favorites}))
          .then(({data}) => setFavProducts(data))
          .finally(() => setLoading(false)))();
    }, [favorites]);

    async function handleDeleteFavorite(id: number) {
      ActionFPList('delete', id);
      ActionFPList('sync', 0, setFavorites);
    }

    return (
      <View style={styles.favoriteView}>
        <View style={styles.favoriteTitleView}>
          <Text style={styles.favoriteTitle}>نشان شده ها</Text>
          <View style={styles.favoriteIconView}>
            <AntDesign size={19} name="heart" color="#fff" />
          </View>
        </View>
        <View style={styles.favoriteContentLoadingView}>
          {loading ? (
            <MaterialIndicator
              color={SabaColors.sabaGreen}
              animationDuration={2900}
              size={48}
            />
          ) : isEmpty(favProducts) ? (
            <View style={styles.favoriteContentNoContentImageView}>
              <Image
                source={require('../assets/img/favorite/nofavorite.png')}
                style={styles.favoriteContentNoContentImage}
              />
            </View>
          ) : (
            <ScrollView style={styles.favoriteContentView}>
              {favProducts?.map((Fav, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigate.navigate('PRODUCT_SELF', {
                      product: Fav,
                    })
                  }
                  key={index}
                  activeOpacity={0.8}
                  style={styles.favoriteContentItemView}>
                  <View style={styles.favoriteContentItemNavView}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => handleDeleteFavorite(Fav.id)}
                      style={styles.favoriteContentItemNavStatusView}>
                      <Ionicons
                        name="close"
                        color={SabaColors.sabaRed}
                        size={17}
                      />
                    </TouchableOpacity>
                    <View style={styles.favoriteContentItemNavIconView}>
                      <Text style={styles.favoriteContentItemNavIconText}>
                        موجود
                      </Text>
                    </View>
                  </View>
                  <View style={styles.favoriteContentItemArticleView}>
                    <View style={styles.favoriteContentItemInfoView}>
                      <Text style={styles.favoriteContentItemInfoTitle}>
                        {Fav.nam}
                      </Text>
                      <Text style={styles.favoriteContentItemInfoPrice}>
                        قیمت نقدی {Fav.price} تومان
                      </Text>
                      <Text style={styles.favoriteContentItemInfoPrice}>
                        قیمت چکی {Fav.price1} تومان
                      </Text>
                    </View>
                    <View style={styles.favoriteContentItemImageView}>
                      {!isEmpty(Fav.pic_path) ? (
                        <Image
                          style={styles.favoriteContentItemImage}
                          source={{uri: endpoints.URL + Fav.pic_path}}
                        />
                      ) : (
                        <Image
                          style={{
                            ...styles.favoriteContentItemImage,
                            opacity: 0.6,
                          }}
                          source={require('../assets/img/noneimage.png')}
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    );
  } catch (err: any) {
    return <_ErrorLayout pageError="Favorite" errorDes={err.message} />;
  }
};
const MainScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  favoriteView: {
    height: MainScreen.height - 109,
    width: MainScreen.width,
    backgroundColor: SabaColors.sabaWhite,
  },
  favoriteTitleView: {
    height: 46,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 8,
  },
  favoriteTitle: {
    fontFamily: 'shabnamMed',
    fontSize: 13,
    marginRight: 4,
    color: SabaColors.sabaBlack,
    textShadowRadius: 9,
    textShadowColor: SabaColors.sabaDarkGary,
  },
  favoriteIconView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 25,
    paddingTop: 2,
  },
  favoriteContentView: {
    paddingHorizontal: 10,
  },
  favoriteContentLoadingView: {
    flex: 1,
  },
  favoriteContentNoContentImageView: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  favoriteContentNoContentImage: {
    resizeMode: 'contain',
    width: '100%',
  },
  favoriteContentItemView: {
    borderRadius: 14,
    height: 120,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 8,
    elevation: 2,
    marginBottom: 5,
  },
  favoriteContentItemNavView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  favoriteContentItemNavStatusView: {},
  favoriteContentItemNavIconView: {
    height: 20,
    width: 38,
    backgroundColor: SabaColors.sabaLightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteContentItemNavIconText: {
    fontSize: 9,
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaGreen,
  },
  favoriteContentItemArticleView: {
    height: 86,
    flexDirection: 'row-reverse',
  },
  favoriteContentItemInfoView: {
    flex: 2,
  },
  favoriteContentItemImageView: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  favoriteContentItemImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  favoriteContentItemInfoTitle: {
    fontFamily: 'shabnamMed',
    fontSize: 12,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    marginVertical: 2,
    color: SabaColors.sabaBlack,
  },
  favoriteContentItemInfoPrice: {
    fontFamily: 'shabnam',
    fontSize: 11,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    marginTop: 1,
    color: SabaColors.sabaDarkGary,
  },
});

export default Favorite;
