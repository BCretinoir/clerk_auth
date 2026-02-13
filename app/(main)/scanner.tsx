import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { getFoodByBarcode } from "../../services/openFoodFactsService";
import { useMeals } from "../../context/MealContext";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function ScannerScreen() {
  const router = useRouter();
  const { addFoodToMeal, selectedMeal } = useMeals();

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) return <View style={styles.container} />;

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

    if (!selectedMeal) {
      Alert.alert("Erreur", "Aucun repas sélectionné");
      setScanned(false);
      return;
    }

    const product = await getFoodByBarcode(data);

    if (!product) {
      Alert.alert(
        "Produit non trouvé",
        "Ce code-barres n’existe pas dans Open Food Facts.",
        [{ text: "OK", onPress: () => setScanned(false) }]
      );
      return;
    }

    if (Platform.OS === "ios") {
      Alert.prompt(
        "Quantité (g)",
        `Combien de grammes de ${product.product_name} ?`,
        [
          { text: "Annuler", style: "cancel", onPress: () => setScanned(false) },
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
        "100"
      );
    } else {
      Alert.alert(
        "Ajout rapide",
        `Ajouter 100g de ${product.product_name} ?`,
        [
          { text: "Annuler", onPress: () => setScanned(false) },
          {
            text: "Oui",
            onPress: () => {
              addFoodToMeal(selectedMeal.meal.id, product, 100);
              router.back();
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      <View style={styles.frameContainer}>
        <View style={styles.scanFrame} />
      </View>

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
  container: { flex: 1, backgroundColor: "black" },
  text: { textAlign: "center", marginBottom: 10 },
  button: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#007bff",
  },
  overlay: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
  frameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 12,
  },
});
