import { MealProvider } from "../../context/MealContext";
import { Tabs } from "expo-router";

export default function MainLayout() {
  return (
    <MealProvider>
      <Tabs>
        <Tabs.Screen name="home" />
        <Tabs.Screen name="scanner" />
        <Tabs.Screen name="search" />
      </Tabs>
    </MealProvider>
  );
}
