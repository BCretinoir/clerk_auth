import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useMeals } from '../../../context/MealContext';

export default function MealDetailScreen() {
  const { mealId } = useLocalSearchParams<{ mealId: string }>();
  const router = useRouter();
  const { selectedMeal, selectMeal, deleteMeal } = useMeals();

  // Charger le meal au mount
  React.useEffect(() => {
    if (mealId) selectMeal(mealId);
  }, [mealId]);

  if (!selectedMeal) {
    return (
      <View style={styles.container}>
        <Text>Aucun meal trouvé</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Supprimer ce meal',
      'Êtes-vous sûr ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            deleteMeal(selectedMeal.meal.id);
            router.push('/(main)/home/index');
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.foodCard}>
      <Text style={styles.foodName}>{item.product_name}</Text>
      <Text>
        {item.quantity}g — {item.energy} kcal, {item.proteins}g P, {item.fat}g F, {item.carbohydrates}g C
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal du {selectedMeal.meal.date}</Text>

      <FlatList
        data={selectedMeal.foods}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 12 }}
      />

      <View style={styles.totals}>
        <Text style={styles.totalText}>Totaux :</Text>
        <Text>Calories: {selectedMeal.totals.calories.toFixed(0)} kcal</Text>
        <Text>Protéines: {selectedMeal.totals.proteins.toFixed(1)} g</Text>
        <Text>Lipides: {selectedMeal.totals.fat.toFixed(1)} g</Text>
        <Text>Glucides: {selectedMeal.totals.carbohydrates.toFixed(1)} g</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={{ color: 'white' }}>Supprimer ce meal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  foodCard: { padding: 12, borderRadius: 10, backgroundColor: '#f2f2f2' },
  foodName: { fontWeight: 'bold', marginBottom: 4 },
  totals: { marginTop: 20, padding: 12, backgroundColor: '#e0e0e0', borderRadius: 10 },
  totalText: { fontWeight: 'bold', marginBottom: 8 },
  deleteButton: { marginTop: 20, padding: 16, borderRadius: 10, backgroundColor: '#ff4d4d', alignItems: 'center' },
});
