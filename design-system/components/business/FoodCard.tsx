import React from "react";
import { Image, StyleSheet } from "react-native";
import { View } from "../ui/View";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { theme } from "../../theme";

export interface FoodItem {
  product_name: string;
  brands?: string;
  quantity?: number;
  image_url?: string;
}

interface FoodCardProps {
  food: FoodItem;
  onAdd?: () => void;
  showQuantity?: boolean;
}

export function FoodCard({
  food,
  onAdd,
  showQuantity = false,
}: FoodCardProps) {
  return (
    <View row style={styles.card}>
      {showQuantity && (
        <>
          {food.image_url ? (
            <Image
              source={{ uri: food.image_url }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder} center>
              <Text variant="h3">🍽️</Text>
            </View>
          )}
        </>
      )}

      <View flex={1} style={{ justifyContent: "center" }}>
        <Text weight="semiBold" numberOfLines={1}>
          {food.product_name}
        </Text>
        
        {food.brands && (
          <Text variant="caption" color="textSecondary" numberOfLines={1}>
            {food.brands}
          </Text>
        )}
        
        {showQuantity && food.quantity && (
          <Text variant="caption" color="textSecondary">
            {food.quantity}g
          </Text>
        )}
      </View>

      {onAdd && (
        <Button size="sm" onPress={onAdd}>
          + Ajouter
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.md,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.gray200,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.gray300,
  },
});