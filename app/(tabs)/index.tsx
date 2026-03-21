import { useState, useEffect, useRef, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";

export default function HomeScreen() {
  const [subscriptions, setSubscriptions] = useState([
    {
      name: "Netflix",
      price: 20,
      category: "entertainment",
      cycle: "monthly",
      active: true,
      renewDate: "2026-03-22",
      emoji: "🎬",
    },
    {
      name: "Spotify",
      price: 10,
      category: "music",
      cycle: "yearly",
      active: true,
      renewDate: "2026-06-15",
      emoji: "🎵",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const bottomSheetRef = useRef(null);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCycle, setNewCycle] = useState("");
  const [newRenewDate, setNewRenewDate] = useState("");
  const [newCategory, setNewCategory] = useState("Other");

  function addSubscription() {
    if (!newName || !newPrice || !newCycle) {
      alert("Please fill in all fields!");
      return;
    }
    const newSub = {
      name: newName,
      price: parseFloat(newPrice),
      category: newCategory,
      cycle: newCycle,
      active: true,
      renewDate: newRenewDate,
      emoji: categoryEmojis[newCategory],
    };
    const updated = [...subscriptions, newSub];
    setSubscriptions(updated);
    saveData(updated);
    bottomSheetRef.current?.close();
    setNewName("");
  }

  function deleteSubscription(name) {
    const updated = subscriptions.filter((item) => item.name != name);
    setSubscriptions(updated);
    saveData(updated);
  }

  async function saveData(data) {
    await AsyncStorage.setItem("subscriptions", JSON.stringify(data));
  }

  async function loadData() {
    const data = await AsyncStorage.getItem("subscriptions");
    if (data) setSubscriptions(JSON.parse(data));
  }

  function toggleSubscription(name) {
    const updated = subscriptions.map((item) =>
      item.name === name ? { ...item, active: !item.active } : item,
    );
    setSubscriptions(updated);
    saveData(updated);
  }

  function daysUntil(dateStr) {
    const diff = new Date(dateStr) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  const total = subscriptions
    .filter((item) => item.active)
    .reduce((total, item) => total + item.price, 0);

  const categoryEmojis = {
    Entertainment: "🎬",
    Music: "🎵",
    Software: "💻",
    Sports: "💪🏻",
    News: "📰",
    Other: "📦",
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0F0F1A" }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ alignItems: "center", padding: 10 }}
        >
          <View style={styles.headerContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={styles.header}>SUBSCRIPTIONS</Text>
                <MaskedView
                  maskElement={<Text style={styles.title}>Subscore</Text>}
                >
                  <LinearGradient
                    colors={["#00d2ff", "#4f46e5"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={[styles.title, { opacity: 0 }]}>Subscore</Text>
                  </LinearGradient>
                </MaskedView>
              </View>

              <TouchableOpacity
                onPress={() => bottomSheetRef.current?.expand()}
              >
                <LinearGradient
                  colors={["#00d2ff", "#7b1ff7"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 3,
                  }}
                >
                  <View
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 23,
                      backgroundColor: "#0F0F1A",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 24,
                        fontWeight: "500",
                      }}
                    >
                      +
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <LinearGradient
            colors={["#1e1b4b", "#312e81"]}
            style={styles.totalCard}
          >
            <Text style={styles.totalLabel}>Monthly Total</Text>
            <Text style={styles.totalAmount}>${total}</Text>
            <Text style={styles.totalLabel}>
              {subscriptions.filter((item) => item.active).length} active
              subscriptions
            </Text>
          </LinearGradient>

          {subscriptions.map((item) => (
            <View
              key={item.name}
              style={[styles.card, { opacity: item.active ? 1 : 0.4 }]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.cardTitle}>
                  {item.emoji} {item.name}
                </Text>
                <Text style={styles.cardAmount}>${item.price}</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 6, marginTop: 6 }}>
                <Text
                  style={{
                    backgroundColor: "rgba(123,47,247,0.2)",
                    color: "#c4b5fd",
                    fontSize: 10,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 20,
                  }}
                >
                  {item.category}
                </Text>
                <Text
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "#888",
                    fontSize: 10,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 20,
                  }}
                >
                  {item.cycle}
                </Text>
              </View>
              <Text
                style={{
                  color: daysUntil(item.renewDate) <= 7 ? "red" : "#888",
                  fontSize: 10,
                  marginTop: 4,
                }}
              >
                Renews: {item.renewDate} ({daysUntil(item.renewDate)} days)
              </Text>

              <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
                <TouchableOpacity onPress={() => toggleSubscription(item.name)}>
                  <Text
                    style={{
                      borderWidth: 1,
                      borderColor: item.active ? "#f59e0b" : "#10b981",
                      borderRadius: 8,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      color: item.active ? "#f59e0b" : "#10b981",
                      fontSize: 12,
                    }}
                  >
                    {item.active ? "Pause" : "Activate"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteSubscription(item.name)}>
                  <Text
                    style={{
                      borderWidth: 1,
                      borderColor: "#ef4444",
                      borderRadius: 8,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      color: "#ef4444",
                      fontSize: 12,
                    }}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={["60%"]}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: "#1a1a2e" }}
        >
          <BottomSheetView style={{ padding: 24, gap: 16 }}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "800",
                marginBottom: 8,
              }}
            >
              New Subscription
            </Text>
            <TextInput
              placeholder="Subscription name"
              placeholderTextColor="#888"
              style={{ color: "white" }}
              onChangeText={(text) => setNewName(text)}
            />
            <TextInput
              placeholder="Subscription price"
              placeholderTextColor="#888"
              style={{ color: "white" }}
              onChangeText={(text) => setNewPrice(text)}
            />
            <TextInput
              placeholder="Renew date (YYYY-MM-DD)"
              placeholderTextColor="#888"
              style={{ color: "white" }}
              onChangeText={(text) => setNewRenewDate(text)}
            />
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {Object.keys(categoryEmojis).map((cat) => (
                <TouchableOpacity key={cat} onPress={() => setNewCategory(cat)}>
                  <Text
                    style={{
                      backgroundColor: newCategory === cat ? "#7b2ff7" : "#333",
                      padding: 8,
                      borderRadius: 8,
                      color: "white",
                    }}
                  >
                    {categoryEmojis[cat]} {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity onPress={() => setNewCycle("monthly")}>
                <Text
                  style={{
                    backgroundColor:
                      newCycle === "monthly" ? "#7b2ff7" : "#333",
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  MonthlyF
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setNewCycle("yearly")}>
                <Text
                  style={{
                    backgroundColor: newCycle === "yearly" ? "#7b2ff7" : "#333",
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  Yearly
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => addSubscription()}
              style={{
                backgroundColor: "#7b2ff7",
                borderRadius: 12,
                padding: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F1A",
  },

  title: {
    fontSize: 36,
    fontWeight: "900",
  },

  header: {
    color: "#888888",
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    width: "90%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  cardTitle: {
    color: "white",
    fontSize: 16,
    marginTop: 4,
  },

  cardDetail: {
    color: "#888888",
    fontSize: 11,
    marginTop: 4,
  },

  cardAmount: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },

  headerContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  totalCard: {
    backgroundColor: "#1e1b46",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    marginBottom: 20,
  },

  totalLabel: {
    color: "#a5b4fc",
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 8,
  },

  totalAmount: {
    color: "white",
    fontSize: 44,
    fontWeight: "900",
    marginBottom: 8,
  },

  addButton: {
    backgroundColor: "#7b2ff7",
    borderRadius: 16,
    padding: 18,
    width: "90%",
    marginTop: 8,
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  formCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    marginBottom: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0,1)",
  },
});
