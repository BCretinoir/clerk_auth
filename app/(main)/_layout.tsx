import { MealProvider } from '../../context/MealContext';
import { Tabs } from 'expo-router';

export default function MainLayout() {
  return (
    <MealProvider>
        <Tabs/>
    </MealProvider>
  );
}
