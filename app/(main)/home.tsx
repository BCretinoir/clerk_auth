import React from "react";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useMeals } from "../../context/MealContext";
import { Container, View, Text, MealCard } from "../../design-system";

export default function HomeScreen() {
  const { meals, todayMeal, selectedMeal, selectMeal } = useMeals();
  const router = useRouter();

  const renderItem = ({ item }: any) => {
    const isToday = item.id === todayMeal?.id;
    const isSelected = item.id === selectedMeal?.meal.id;

    return (
      <MealCard
        date={item.date}
        isToday={isToday}
        isSelected={isSelected}
        foods={isSelected ? selectedMeal?.foods : []}
        totalCalories={isSelected ? selectedMeal?.totals.calories : 0}
        onPress={() => selectMeal(item.id)}
        onSearch={() => {
          selectMeal(item.id);
          router.push("/search");
        }}
        onScan={() => {
          selectMeal(item.id);
          router.push("/scanner");
        }}
      />
    );
  };

  return (
    <Container>
      <View padding="xl">
        <Text variant="h2" style={{ marginBottom: 20 }}>
          Mes journées
        </Text>

        <FlatList
          data={meals}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12 }}
        />
      </View>
    </Container>
  );
}
