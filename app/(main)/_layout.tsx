import { Tabs } from "expo-router";
import { MealProvider } from "../../context/MealContext";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

export default function MainLayout() {
  return (
    <MealProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#007bff",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            height: 100,
            paddingBottom: Platform.OS === "android" ? 20 : 10, 
            paddingTop: 10,
            backgroundColor: "#fff",
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginBottom: 4,
          },
          tabBarIconStyle: {
            marginBottom: -2,
          },
          tabBarItemStyle: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Accueil",
            tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Recherche",
            tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
          }}
        />

        <Tabs.Screen
          name="scanner"
          options={{
            title: "Scanner",
            tabBarIcon: ({ color }) => <Ionicons name="barcode" size={24} color={color} />,
          }}
        />
      </Tabs>
    </MealProvider>
  );
}
