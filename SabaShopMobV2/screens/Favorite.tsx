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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useFocusEffect} from '@react-navigation/native';
import {favoriteAction} from '../realm/RealmFPList';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import axios from 'axios';
const Favorite = () => {
  const navigate = useNavigation();
  const [supportModal, setSupportModal] = React.useState<boolean>(false);
  const [favorites, setFavorites] = React.useState([]);
  const [favoritesPorduct, setFavoritesProduct] = React.useState([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const favProducts = await favoriteAction(
          'sync',
          setFavorites,
          0,
          setLoading,
        );
        (async () =>
          await axios
            .post(endpoints.getFavorites, JSON.stringify({favs: favProducts}))
            .then(({data, status}) => {
              setFavoritesProduct(data);
            }))();
      })();
    }, []),
  );
  async function handleDeleteFavorite(id: number) {
    favoriteAction('delete', setFavorites, id);
    const updated_favproducts = favoritesPorduct?.filter(pro => pro.id != id);
    setFavoritesProduct(updated_favproducts);
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
        ) : isEmpty(favorites) ? (
          <View style={styles.favoriteContentNoContentImageView}>
            <Image
              source={require('../assets/img/favorite/nofavorite.png')}
              style={styles.favoriteContentNoContentImage}
            />
          </View>
        ) : (
          <ScrollView style={styles.favoriteContentView}>
            {favoritesPorduct?.map((F, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate('PRODUCT_SELF', {
                    product: F,
                  })
                }
                key={index}
                activeOpacity={0.8}
                style={styles.favoriteContentItemView}>
                <View style={styles.favoriteContentItemNavView}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => handleDeleteFavorite(F.id)}
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
                      {F.nam}
                    </Text>
                    <Text style={styles.favoriteContentItemInfoPrice}>
                      قیمت نقدی {F.price} تومان
                    </Text>
                    <Text style={styles.favoriteContentItemInfoPrice}>
                      قیمت چکی {F.pric} تومان
                    </Text>
                  </View>
                  <View style={styles.favoriteContentItemImageView}>
                    <Image
                      style={styles.favoriteContentItemImage}
                      source={{uri: endpoints.URL + F.pic_path}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
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
