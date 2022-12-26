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
import _productCard from '../components/_productCard';
import {isEmpty} from 'lodash';
const Home = () => {
  try {
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigation();
    const [imageSliders, setImageSliders] = useState<any[]>([]);
    const [lastProducts, setLastProducts] = useState();
    const [categories, setCategories] = useState<any>();
    const [favorites, setFavorites] = useState<number[]>();

    useFocusEffect(
      useCallback(() => {
        let source = axios.CancelToken.source();
        let AxiosConfigCancel = {cancelToken: source.token};
        ActionFPList('sync', 0, setFavorites);
        (async () => {
          await axios
            .get(endpoints.getNewestProducts, AxiosConfigCancel)
            .then(async ({data}: any) => {
              setLastProducts(data);
              await axios
                .get(endpoints.getCategory1, AxiosConfigCancel)
                .then(async ({data}: any) => {
                  setCategories(data);
                  await axios
                    .get(endpoints.getImageSlider, AxiosConfigCancel)
                    .then(({data}: any) => {
                      let images: any[] = [];
                      data.map(img =>
                        images.push({img: endpoints.URL + img.sliderImage}),
                      );
                      console.log(images);
                      setImageSliders(images);
                    })
                    .catch(() => {});
                })
                .catch(() => {});
            })
            .catch(() => {})
            .finally(() => {
              setLoading(false);
            });
        })();

        return () => source.cancel();
      }, []),
    );

    return (
      <View style={styles.HomeView}>
        <ScrollView>
          <View style={styles.HomeSliderView}>
            {loading ? (
              <MaterialIndicator
                color={SabaColors.sabaGreen}
                animationDuration={2900}
                size={28}
              />
            ) : (
              <ImageSlider
                data={imageSliders}
                autoPlay={true}
                timer={2000}
                closeIconColor={SabaColors.sabaDarkGary}
                activeIndicatorStyle={{
                  backgroundColor: SabaColors.sabaGreen,
                }}
                inActiveIndicatorStyle={{
                  backgroundColor: SabaColors.sabaGray,
                }}
                indicatorContainerStyle={{
                  bottom: 0,
                }}
                caroselImageStyle={{
                  resizeMode: 'stretch',
                  height: '100%',
                }}
                caroselImageContainerStyle={{
                  opacity: 1,
                }}
              />
            )}
          </View>
          <View style={styles.HomeContentConatiner}>
            <_productCard
              loading={loading}
              products={lastProducts}
              title={'جدیدترین ها'}
            />
          </View>
          <View style={styles.HomeMenuView}>
            {loading ? (
              <MaterialIndicator
                color={SabaColors.sabaGreen}
                animationDuration={2900}
                size={28}
              />
            ) : (
              <ScrollView style={styles.HomeMenuScrollView} horizontal={true}>
                {categories?.map(cat => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() =>
                      navigate.navigate('PRODUCTS', {cat1: cat.id})
                    }
                    activeOpacity={0.5}
                    style={styles.HomeMenuItemView}>
                    <View style={styles.HomeMenuItemImageView}>
                      <Image
                        style={styles.HomeMenuItemImage}
                        source={{uri: endpoints.URL + cat.pic_path}}
                      />
                    </View>
                    <View style={styles.HomeMenuItemImageTitleView}>
                      <Text style={styles.HomeMenuItemImageTitle}>
                        {substringMaker(cat.nam, 20)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </ScrollView>
      </View>
    );
  } catch (err: any) {
    return <_ErrorLayout pageError="Home" errorDes={err.message} />;
  }
};
const MainScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  HomeView: {
    backgroundColor: SabaColors.sabaWhite,
    height: '100%',
  },
  HomeSliderView: {
    height: 180,
    width: '100%',
  },
  HomeMenuView: {
    height: 144,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
  },
  HomeMenuScrollView: {},
  HomeMenuItemView: {
    height: 120,
    width: 120,
    marginHorizontal: 4,
    borderRadius: 8,
    position: 'relative',
  },
  HomeMenuItemImageView: {
    backgroundColor: SabaColors.sabaLightGreen,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  HomeMenuItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  HomeMenuItemImageTitleView: {
    position: 'absolute',
    backgroundColor: 'rgba(35,35,35,0.4)',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
  },
  HomeMenuItemImageTitle: {
    fontFamily: 'shabnamMed',
    color: '#fff',
    textShadowRadius: 6,
    textShadowColor: SabaColors.sabaGray,
    fontSize: 12,
    textAlign: 'center',
  },
  // --------------------------- Products --------------------------------
  HomeContentConatiner: {},
});

export default Home;
