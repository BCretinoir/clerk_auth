import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getFoodByBarcode } from "../../../services/openFoodFactsService";
import { useMeals } from "../../../context/MealContext";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function ScannerScreen() {
  const { mealId } = useLocalSearchParams<{ mealId: string }>();
  const router = useRouter();
  const { addFoodToMeal } = useMeals();

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Nous avons besoin de la permission caméra
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={{ color: "white" }}>Donner la permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    const product = await getFoodByBarcode(data);

    if (!product) {
      Alert.alert(
        "Produit non trouvé",
        "Ce code-barres n’existe pas dans Open Food Facts.",
        [{ text: "OK", onPress: () => setScanned(false) }],
      );
      return;
    }

    if (Platform.OS === "ios") {
      Alert.prompt(
        "Quantité (en grammes)",
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
              if (!mealId) return;
              addFoodToMeal(mealId, product, quantity);
              router.back();
            },
          },
        ],
        "plain-text",
        "100",
      );
    } else {
      Alert.alert(
        "Ajout rapide (Android)",
        `Ajouter 100g de ${product.product_name} ?`,
        [
          { text: "Annuler", onPress: () => setScanned(false) },
          {
            text: "Oui",
            onPress: () => {
              addFoodToMeal(mealId, product, 100);
              router.back();
            },
          },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_e"],
        }}
      />

      {scanned && (
        <View style={styles.overlay}>
          <Text style={{ color: "white", marginBottom: 20 }}>
            Produit détecté...
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <Text style={{ color: "white" }}>Scanner à nouveau</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { textAlign: "center", marginBottom: 10 },
  button: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#007bff",
  },
  overlay: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
});
