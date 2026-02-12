import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useMeals } from "../../../context/MealContext";

export default function HomeScreen() {
  const { meals, todayMeal } = useMeals();
  const router = useRouter();

  const renderItem = ({ item }: any) => {
    const isToday = item.id === todayMeal?.id;

    return (
      <TouchableOpacity
        style={[styles.card, isToday && styles.todayCard]}
        onPress={() =>
          router.push({
            pathname: "/(main)/home/[mealId]",
            params: { mealId: item.id },
          })
        }
      >
        <Text style={styles.date}>
          {isToday ? "📅 Aujourd’hui" : item.date}
        </Text>
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
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
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
});
