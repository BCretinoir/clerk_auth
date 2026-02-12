import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { searchFoods } from '../../../services/openFoodFactsService';
import { useMeals } from '../../../context/MealContext';
import { Food } from '../../../models/food';

export default function SearchScreen() {
  const { mealId } = useLocalSearchParams<{ mealId: string }>();
  const { addFoodToMeal } = useMeals();
  const router = useRouter();

  const [query, setQuery] = useState('');
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
    Alert.prompt(
      'Quantité (en grammes)',
      `Combien de grammes de ${food.product_name} ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Ajouter',
          onPress: (quantityStr) => {
            const quantity = Number(quantityStr);
            if (isNaN(quantity) || quantity <= 0) {
              Alert.alert('Erreur', 'Quantité invalide');
              return;
            }
            if (!mealId) return;
            addFoodToMeal(mealId, food, quantity);
            router.back(); // retourne au meal detail
          },
        },
      ],
      'plain-text',
      '100'
    );
  };

  const renderItem = ({ item }: { item: Food }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleAddFood(item)}>
      <Text style={styles.foodName}>{item.product_name}</Text>
      <Text>{item.brands}</Text>
    </TouchableOpacity>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
  },
  card: {
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  foodName: { fontWeight: 'bold', marginBottom: 4 },
});
