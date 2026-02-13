import { Tabs } from "expo-router";
import { MealProvider } from "../../context/MealContext";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { theme } from "../../design-system";

export default function MainLayout() {
  return (
    <MealProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.gray800,
          tabBarStyle: {
            height: theme.tabBarHeight.base,
            paddingBottom:
              Platform.OS === "android"
                ? theme.tabBarHeight.paddingBottomAndroid
                : theme.tabBarHeight.paddingBottomIOS,
            paddingTop: theme.tabBarHeight.paddingTop,
            backgroundColor: theme.colors.white,
          },
          tabBarLabelStyle: {
            fontSize: theme.fontSize.xs,
            fontWeight: theme.fontWeight.semiBold,
            marginBottom: theme.spacing.xs,
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
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={theme.iconSize.md} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Recherche",
            tabBarIcon: ({ color }) => (
              <Ionicons name="search" size={theme.iconSize.md} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="scanner"
          options={{
            title: "Scanner",
            tabBarIcon: ({ color }) => (
              <Ionicons name="barcode" size={theme.iconSize.md} color={color} />
            ),
          }}
        />
      </Tabs>
    </MealProvider>
  );
}
