import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useMeals } from "../../context/MealContext";
import { searchFoods } from "../../services/openFoodFactsService";
import { Food } from "../../models/food";

export default function SearchScreen() {
  const { addFoodToMeal, selectedMeal } = useMeals();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const foods = await searchFoods(query);
    setResults(foods);
    setLoading(false);
  };

  const handleAddFood = (food: Food) => {
    if (!selectedMeal) {
      Alert.alert("Erreur", "Aucun repas sélectionné");
      return;
    }

    if (Platform.OS === "ios") {
      Alert.prompt(
        "Quantité (g)",
        `Combien de grammes de ${food.product_name} ?`,
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Ajouter",
            onPress: (quantityStr) => {
              const quantity = Number(quantityStr);
              if (isNaN(quantity) || quantity <= 0) {
                Alert.alert("Erreur", "Quantité invalide");
                return;
              }

              addFoodToMeal(selectedMeal.meal.id, food, quantity);
              Alert.alert("Ajouté !", `${food.product_name} ajouté au repas.`);
            },
          },
        ],
        "plain-text",
        "100"
      );
    } else {
      Alert.alert(
        "Ajout rapide",
        `Ajouter 100g de ${food.product_name} ?`,
        [
          { text: "Annuler" },
          {
            text: "Oui",
            onPress: () => {
              addFoodToMeal(selectedMeal.meal.id, food, 100);
              Alert.alert("Ajouté !");
            },
          },
        ]
      );
    }
  };

  const renderItem = ({ item }: { item: Food }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.foodName}>{item.product_name}</Text>
        <Text>{item.brands}</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddFood(item)}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>+ Ajouter</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un aliment"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />

      {loading && <Text>Recherche en cours...</Text>}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 12, marginTop: 12 }}
        ListEmptyComponent={
          !loading && (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Aucun résultat
            </Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  foodName: { fontWeight: "bold", marginBottom: 4 },
  addButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#007bff",
    marginLeft: 12,
  },
});
