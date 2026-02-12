import { Tabs } from 'expo-router';
import { MealProvider } from '../../context/MealContext';

export default function MainLayout() {
  return (
    <MealProvider>
      <Tabs>
        <Tabs.Screen name="home" />
        <Tabs.Screen name="search" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </MealProvider>
  );
}

