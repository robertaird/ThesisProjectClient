import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import HomeStack from './home-stack';
import MapStack from './map-stack';

const RootNavigator = TabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    },
    Map: {
      screen: MapStack,
      navigationOptions: {
        tabBarLabel: 'Map',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-map' : 'ios-map-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: '#2242CC',
      activeBackgroundColor: '#fff',
      inactiveTintColor: '#000',
      inactiveBackgroundColor: '#fff',
      labelStyle: {
        fontSize: 13
      },
      style: {
        // Currently there is no great way to center two tab icons, so we do
        // it manually here by assuming that each tab icon is about 125 points wide
        paddingHorizontal: (Dimensions.get('window').width - 225) / 2,
        backgroundColor: '#fff',
        height: 55
      }
    }
  }
);

export default RootNavigator;