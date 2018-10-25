import {
    createBottomTabNavigator,
    createStackNavigator,
} from 'react-navigation'
import Colors from "../theme/Colors"
import HomeScreen from '../views/screens/HomeScreen/HomeScreen'
import SettingsScreen from '../views/screens/SettingsScreen/SettingsScreen'
import ServiceTestScreen from '../views/screens/ServiceTestScreen/ServiceTestScreen'
import DetailsScreen from '../views/screens/DetailsScreen/DetailsScreen'
import ModalScreen from '../views/screens/ModalScreen/ModalScreen'
import NewItem from '../views/screens/NewItem/NewItem'
/**********************************************************************************************************************/

const HomeStack = createStackNavigator(
    {
        Main: {
            screen: createStackNavigator(
                {
                    HomeScreen: HomeScreen,
                    DetailsScreen: DetailsScreen
                },
                {
                    initialRouteName: 'HomeScreen',
                    navigationOptions: {
                        headerStyle: {
                            backgroundColor: Colors.headerColor1
                        },
                        headerTintColor: Colors.headerTintColor1,
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }
                })
        },
        NewItem: NewItem
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

const SettingsStack = createStackNavigator(
    {
        Main: {
            screen: createStackNavigator(
                {
                    SettingsScreen: SettingsScreen,
                    DetailsScreen: DetailsScreen,
                },
                {
                    initialRouteName: 'SettingsScreen',
                    navigationOptions: {
                        headerStyle: {
                            backgroundColor: Colors.headerColor2
                        },
                        headerTintColor: Colors.headerTintColor2,
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }
                })
        },
        ModalScreen: ModalScreen
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

const ServiceTestStack = createStackNavigator(
    {
        Main: {
            screen: createStackNavigator(
                {
                    ServiceTestScreen: ServiceTestScreen,
                },
                {
                    initialRouteName: 'ServiceTestScreen',
                    navigationOptions: {
                        headerStyle: {
                            backgroundColor: Colors.headerColor3
                        },
                        headerTintColor: Colors.headerTintColor3,
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }
                })
        },
        ModalScreen: ModalScreen
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

const RootNavigator = createBottomTabNavigator(
    {
        HomeScreen: HomeStack,
        SettingsScreen: SettingsStack,
        ServiceTestScreen: ServiceTestStack
    },
    {
        initialRouteName: 'HomeScreen',
        tabBarOptions: {
            activeTintColor: Colors.red,
            inactiveTintColor: Colors.gray,
        },
        navigationOptions: ({navigation}) => ({
            tabBarVisible: navigation.state.index === 0
        })
    }
);

export default RootNavigator;
