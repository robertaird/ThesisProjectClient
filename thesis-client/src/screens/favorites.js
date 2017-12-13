import React, { Component } from 'react';
import { View, ScrollView, Platform, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Expo from 'expo';
import { getActiveTrip } from '../actions/activeTrip-action';
import getUserLocation from '../actions/getUserLocation-action';
import { getUserFavorites } from '../actions/getUserInfo-action';
import { removeFavorite } from '../actions/favorite-action';
import icon from '../assets/icons/bikeIcon.png';
import { STATUS_BAR_HEIGHT } from '../constants';
import Favorite from '../components/favorites';

const cacheImages = images => images.map(image => {
    if (typeof image === 'string') { return Image.prefetch(image); }
    return Expo.Asset.fromModule(image).downloadAsync();
});

class FavoriteScreen extends Component {
  static navigationOptions = () => ({
    header: null
  });

  static propTypes = {
    //eslint-disable-next-line
    user: PropTypes.object.isRequired,
    getUserFavorites: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    favorites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    showTripLocation: PropTypes.func.isRequired,
    deleteFavorite: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getUserFavorites(this.props.user.id);
  }

  render() {
    const {
   navigation: { navigate }, showTripLocation, favorites, userLocation, deleteFavorite, user,
  } = this.props;
    return (
        <View style={styles.homeScreenView}>
          <Text style={styles.title}>
              Favorited
          </Text>
          <ScrollView>
            <Favorite
              user={user}
              deleteFavorite={deleteFavorite}
              navigate={navigate}
              favorites={favorites}
              showTripLocation={showTripLocation}
            />
          </ScrollView>
        </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userLocation: state.userLocation,
    user: state.user,
    favorites: state.favorites.favorites,
  };
}

const mapDispatchToProps = dispatch => ({
  showTripLocation: (trip, cb) => {
    dispatch(getActiveTrip(trip, cb));
  },
  getUserLocation: () => {
    dispatch(getUserLocation());
  },
  getUserFavorites: (userId) => {
    dispatch(getUserFavorites(userId));
  },
  deleteFavorite: (userId, routeId) => {
    dispatch(removeFavorite(userId, routeId));
  },
});

const styles = {
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: 'lightblue',
    borderWidth: 2,
  },
  imageStyle: {
    marginLeft: 10,
    width: 40,
    height: 40,
  },
  imageStyle2: {
    marginRight: 10,
    width: 40,
    height: 40,
  },
  homeScreenView: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen);
