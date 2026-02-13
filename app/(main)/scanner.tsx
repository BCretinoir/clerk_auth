import React, { useState } from "react";
import { StyleSheet, Alert, Platform, View as RNView } from "react-native";
import { useRouter } from "expo-router";
import { getFoodByBarcode } from "../../services/openFoodFactsService";
import { useMeals } from "../../context/MealContext";
import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, Button, ScanFrame } from "../../design-system";

export default function ScannerScreen() {
  const router = useRouter();
  const { addFoodToMeal, selectedMeal } = useMeals();

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) return <RNView style={styles.container} />;

  if (!permission.granted) {
    return (
      <RNView style={styles.container}>
        <View center flex={1}>
          <Text color="textInverse" align="center" style={{ marginBottom: 10 }}>
            Nous avons besoin de la permission caméra
          </Text>
          <Button onPress={requestPermission}>Donner la permission</Button>
        </View>
      </RNView>
    );
  }

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    if (!selectedMeal) {
      Alert.alert("Erreur", "Aucun repas sélectionné");
      setScanned(false);
      return;
    }

    const product = await getFoodByBarcode(data);

    if (!product) {
      Alert.alert(
        "Produit non trouvé",
        "Ce code-barres n'existe pas dans Open Food Facts.",
        [{ text: "OK", onPress: () => setScanned(false) }],
      );
      return;
    }

    if (Platform.OS === "ios") {
      Alert.prompt(
        "Quantité (g)",
        `Combien de grammes de ${product.product_name} ?`,
        [
          {
            text: "Annuler",
            style: "cancel",
            onPress: () => setScanned(false),
          },
          {
            text: "Ajouter",
            onPress: (quantityStr) => {
              const quantity = Number(quantityStr);
              if (isNaN(quantity) || quantity <= 0) {
                Alert.alert("Erreur", "Quantité invalide");
                setScanned(false);
                return;
              }

              addFoodToMeal(selectedMeal.meal.id, product, quantity);
              router.back();
            },
          },
        ],
        "plain-text",
        "100",
      );
    } else {
      Alert.alert("Ajout rapide", `Ajouter 100g de ${product.product_name} ?`, [
        { text: "Annuler", onPress: () => setScanned(false) },
        {
          text: "Oui",
          onPress: () => {
            addFoodToMeal(selectedMeal.meal.id, product, 100);
            router.back();
          },
        },
      ]);
    }
  };

  return (
    <RNView style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      <ScanFrame />

      {scanned && (
        <View style={styles.overlay} centerHorizontal>
          <Text color="textInverse" style={{ marginBottom: 20 }}>
            Produit détecté...
          </Text>
          <Button onPress={() => setScanned(false)}>Scanner à nouveau</Button>
        </View>
      )}
    </RNView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  overlay: {
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
});
