import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image  } from "react-native";
import { useRouter } from "expo-router";
import { useMeals } from "../../context/MealContext";

export default function HomeScreen() {
  const { meals, todayMeal, selectedMeal, selectMeal } = useMeals();
  const router = useRouter();

  const renderItem = ({ item }: any) => {
    const isToday = item.id === todayMeal?.id;
    const isSelected = item.id === selectedMeal?.meal.id;

    return (
      <TouchableOpacity
        style={[styles.card, isToday && styles.todayCard]}
        onPress={() => {
          selectMeal(item.id);
        }}
      >
        <Text style={styles.date}>
          {isToday ? "📅 Aujourd’hui" : item.date}
        </Text>

        {/* ACTION BUTTONS POUR AUJOURD’HUI */}
        {isToday && (
          <View style={{ flexDirection: "row", marginTop: 10, gap: 12 }}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                selectMeal(item.id);
                router.push("/search");
              }}
            >
              <Text style={{ color: "white" }}>+ Rechercher</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                selectMeal(item.id);
                router.push("/scanner");
              }}
            >
              <Text style={{ color: "white" }}>+ Scanner</Text>
            </TouchableOpacity>
          </View>
        )}

        {isSelected && selectedMeal?.foods.length > 0 && (
          <View style={{ marginTop: 12 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
              Total : {selectedMeal.totals.calories} kcal
            </Text>

            {selectedMeal.foods.map((food, index) => (
  <View
    key={index}
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
      gap: 10,
    }}
  >
    {food.image_url ? (
      <Image
        source={{ uri: food.image_url }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 8,
          backgroundColor: "#eee",
        }}
        resizeMode="cover"
      />
    ) : (
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 8,
          backgroundColor: "#ddd",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>🍽️</Text>
      </View>
    )}

    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: "500" }}>
        {food.product_name}
      </Text>
      <Text style={{ fontSize: 13, color: "#666" }}>
        {food.quantity}g
      </Text>
    </View>
  </View>
))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes journées</Text>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
  },
  todayCard: {
    backgroundColor: "#d0f0c0",
  },
  date: {
    fontSize: 16,
  },
  actionButton: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#007bff",
  },
});
