import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../utils/theme';

// Screens
import HomeScreen from '../screens/HomeScreen';
import TaskListScreen from '../screens/TaskListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InProgressTasksScreen from '../screens/InProgressTasksScreen';
import CompletedTasksScreen from '../screens/CompletedTasksScreen';
import CategoryTasksScreen from '../screens/CategoryTasksScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const isDarkMode = useSelector((state: RootState) => (state.ui as any).isDarkMode);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Tasks':
              iconName = 'assignment';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Interview Prep',
        }}
      />
      <Tab.Screen 
        name="Tasks" 
        component={TaskListScreen}
        options={{
          title: 'All Tasks',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.card },
          headerTintColor: theme.colors.textPrimary,
          headerTitleStyle: { fontWeight: 'bold' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InProgressTasks"
          component={InProgressTasksScreen}
          options={{ title: 'In Progress' }}
        />
                       <Stack.Screen
                 name="CompletedTasks"
                 component={CompletedTasksScreen}
                 options={{ title: 'Completed' }}
               />
               <Stack.Screen
                 name="CategoryTasks"
                 component={CategoryTasksScreen}
                 options={({ route }: any) => ({ title: (route.params as any)?.category || 'Category' })}
               />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 