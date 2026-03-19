import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";

export default function HomeScreen() {
  const [subscriptions, setSubscriptions] = useState([
    { name: "Netflix", price: 20, category: "fun", cycle: "monthly", active: true, renewDate: "2026-03-22" },
    { name: "Spotify", price: 10, category: "music", cycle: "yearly", active: true, renewDate: "2026-06-15" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCycle, setNewCycle] = useState('');

  function addSubscription() {
    setSubscriptions([
      ...subscriptions,
      { name: newName, price: parseFloat(newPrice), category: "", cycle: newCycle, active: true, renewDate: newRenewDate },
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

  function daysUntil(dateStr) {
    const diff = new Date(dateStr) - new Date()
    return Math.ceil(diff / (1000* 60 * 60 * 24))
  }

  const total = subscriptions
  .filter((item) => item.active)
  .reduce((total, item) => total + item.price, 0)
  
  const [newRenewDate, setNewRenewDate] = useState('')

  return (
    <ScrollView style={styles.container}
    contentContainerStyle={{alignItems:'center', padding:60}}>
      <View style={styles.headerContainer}> 
        <Text style={styles.title}>Subscore</Text>
        <Text style={styles.header}>Track your subscriptions</Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Monthly Total</Text>
        <Text style={styles.totalAmount}>${total}</Text>
        <Text style={styles.totalLabel}>{subscriptions.filter(item => item.active).length} active subscriptions</Text>
      </View>
      {subscriptions.map((item) => (
        <View key={item.name} style={[styles.card, {opacity: item.active ? 1 : 0.4}]}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDetail}>${item.price}</Text>
          </View>

          <Text style={styles.cardDetail}>{item.category} {item.cycle}</Text>
          <Text style={{color: daysUntil(item.renewDate) <= 7 ? 'red' : '#888', fontSize: 10, marginTop: 4}}>
            Renews: {item.renewDate} ({daysUntil(item.renewDate)} days)
          </Text>
          <View style={{flexDirection:'row', gap:8, marginTop:8}}>
              <TouchableOpacity onPress={ () => toggleSubscription(item.name)}>
               <Text style={{color:'yellow'}}>{item.active ? 'Pause' : 'Activate'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ () => deleteSubscription(item.name)}>
               <Text style={{color:'red'}}>Delete</Text>
              </TouchableOpacity>
          </View>
        </View>
      ))}
      {showForm && (
        <View style={styles.formCard}>
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
          <TextInput
            placeholder='Renew date (YYYY-MM-DD)'
            placeholderTextColor='#888'
            style={{color:'white'}}
            onChangeText={(text) => setNewRenewDate(text)}
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
          <TouchableOpacity onPress={() => addSubscription()}
            style={{backgroundColor:'#7b2ff7', borderRadius:12, padding:12, alignItems:'center'}}>
            <Text style={{color:'white', fontWeight:'bold'}}>Save</Text>
            </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={() => setShowForm(true)}
        style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Subscription</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  headerContainer: {
    width:'100%',
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  totalCard: {
    backgroundColor: '#1e1b46',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    marginBottom: 20,
  },

  totalLabel: {
    color: '#a5b4fc',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 8,
  },

  totalAmount: {
    color: 'white',
    fontSize: 40,
    fontWeight: '900',
  },

  cardAmount: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  addButton: {
    backgroundColor: '#7b2ff7',
    borderRadius: 16,
    padding: 16,
    width: '90%',
    marginTop: 8,
  },
  
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  formCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    marginBottom: 16,
    gap: 12,
  }
});
