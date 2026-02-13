import React, { useState } from "react";
import { FlatList, Alert, Platform } from "react-native";
import { useMeals } from "../../context/MealContext";
import { searchFoods } from "../../services/openFoodFactsService";
import { Food } from "../../models/food";
import {
  Container,
  View,
  Text,
  Input,
  FoodCard,
} from "../../design-system";

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
    <FoodCard
      food={{
        product_name: item.product_name,
        brands: item.brands,
      }}
      onAdd={() => handleAddFood(item)}
    />
  );

  return (
    <Container>
      <View padding="xl">
        <Input
          placeholder="Rechercher un aliment"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />

        {loading && (
          <Text align="center" style={{ marginTop: 20 }}>
            Recherche en cours...
          </Text>
        )}

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12, marginTop: 12 }}
          ListEmptyComponent={
            !loading && (
              <Text align="center" style={{ marginTop: 20 }}>
                Aucun résultat
              </Text>
            )
          }
        />
      </View>
    </Container>
  );
}