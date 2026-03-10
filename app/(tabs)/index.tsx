import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [subscriptions, setSubscriptions] = useState([
    { name: "Netflix", price: 20, category: "fun", cycle: "monthly" },
    { name: "Spotify", price: 10, category: "music", cycle: "yearly" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCycle, setNewCycle] = useState('');

  function addSubscription() {
    setSubscriptions([
      ...subscriptions,
      { name: newName, price: parseFloat(newPrice), category: "", cycle: newCycle },
    ]);
    setShowForm(false);
    setNewName("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscore</Text>
      <Text style={styles.header}>Track your subscriptions</Text>

      {subscriptions.map((item) => (
        <View key={item.name} style={styles.card}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDetail}>${item.price}</Text>
          <Text style={styles.cardDetail}>{item.category}</Text>
          <Text style={styles.cardDetail}>{item.cycle}</Text>
        </View>
      ))}
      {showForm && (
        <View style={styles.card}>
          <TextInput
            placeholder='Subscription name'
            placeholderTextColor= '#888'
            style={{ color: 'white' }}
            onChangeText={(text) => setNewName(text)}
          />
          <TextInput
          placeholder='Subscription price'
          placeholderTextColor='#888'
          style={{ color: 'white'}}
          onChangeText={(text) => setNewPrice(text)}
          />
          <View style={{flexDirection:'row', gap:8}}>
            <TouchableOpacity onPress={() => setNewCycle('monthly')}>
            <Text style={{color:'white'}}>Monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNewCycle('yearly')}>
            <Text style={{color:'white'}}>Yearly</Text>
            </TouchableOpacity>
            </View>
          <TouchableOpacity onPress={() => addSubscription()}>
            <Text style={{color:'white'}}>Save</Text>
            </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={() => setShowForm(true)}>
        <Text style={{ color: 'white' }}>+Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F0F1A",
  },

  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },

  header: {
    color: "#888888",
    fontSize: 12,
    marginTop: 8,
  },

  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    width: "80%",
    marginBottom: 12,
  },

  cardTitle: {
    color: "white",
    fontSize: 16,
  },

  cardDetail: {
    color: "#888888",
    fontSize: 10,
  },
});
