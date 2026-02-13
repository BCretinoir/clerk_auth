import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "../ui/View";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { FoodCard, FoodItem } from "./FoodCard";

interface MealCardProps {
  date: string;
  isToday?: boolean;
  isSelected?: boolean;
  foods?: FoodItem[];
  totalCalories?: number;
  onPress?: () => void;
  onSearch?: () => void;
  onScan?: () => void;
}

export function MealCard({
  date,
  isToday = false,
  isSelected = false,
  foods = [],
  totalCalories = 0,
  onPress,
  onSearch,
  onScan,
}: MealCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card variant={isToday ? "highlighted" : "default"}>
        <Text variant="h3">{isToday ? "📅 Aujourd'hui" : date}</Text>

        {isToday && (
          <View row gap="md" marginVertical="md">
            <Button size="sm" onPress={onSearch} style={{ flex: 1 }}>
              + Rechercher
            </Button>

            <Button size="sm" onPress={onScan} style={{ flex: 1 }}>
              + Scanner
            </Button>
          </View>
        )}

        {isSelected && foods.length > 0 && (
          <View marginVertical="md" gap="md">
            <Text weight="bold">Total : {totalCalories} kcal</Text>
            {foods.map((food, index) => (
              <FoodCard key={index} food={food} showQuantity />
            ))}
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
}
