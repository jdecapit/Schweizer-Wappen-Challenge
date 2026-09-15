import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { LearnScreen } from '../screens/LearnScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="Learn" component={LearnScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
