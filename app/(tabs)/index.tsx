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
    { name: "Netflix", price: 20, category: "fun", cycle: "monthly", active: true },
    { name: "Spotify", price: 10, category: "music", cycle: "yearly", active: true },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCycle, setNewCycle] = useState('');

  function addSubscription() {
    setSubscriptions([
      ...subscriptions,
      { name: newName, price: parseFloat(newPrice), category: "", cycle: newCycle, active: true },
    ]);
    setShowForm(false);
    setNewName("");
  }

  function deleteSubscription(name) {
    setSubscriptions(subscriptions.filter((item) => item.name != name))

  }

  function toggleSubscription(name) {
    setSubscriptions(subscriptions.map((item) =>
    item.name === name ? {...item, active: !item.active} : item))
  }

  const total = subscriptions
  .filter((item) => item.active)
  .reduce((total, item) => total + item.price, 0)
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscore</Text>
      <Text style={styles.header}>Track your subscriptions</Text>
      <Text style={{color:'white', fontSize:24, fontWeight:'bold'}}>${total}</Text>
      {subscriptions.map((item) => (
        <View key={item.name} style={styles.card}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDetail}>${item.price}</Text>
          <Text style={styles.cardDetail}>{item.category}</Text>
          <Text style={styles.cardDetail}>{item.cycle}</Text>
          <TouchableOpacity onPress={ () => deleteSubscription(item.name)}>
            <Text style={{color:'red'}}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => toggleSubscription(item.name)}>
            <Text style={{color:'yellow'}}>{item.active ? 'Pause' : 'Activate'}</Text>
          </TouchableOpacity>
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
            <Text style={{backgroundColor: newCycle === 'monthly' ? '#7b2ff7' : '#333',
              padding: 8, borderRadius: 8
            }}>Monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNewCycle('yearly')}>
            <Text style={{backgroundColor: newCycle === 'yearly' ? '#7b2ff7' : '#333',
              padding: 8, borderRadius: 8
            }}>Yearly</Text>
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
