import { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [subscriptions, setSubscriptions] = useState([
    {name: 'Netflix', price: 20, category: 'fun', cycle: 'monthly'},
    {name: 'Spotify', price: 10, category: 'music', cycle: 'yearly'}
  ])

  return (
    <View
      style={styles.container}>
      <Text style={styles.title}>
        Subscore
      </Text>
      <Text style={styles.header}>Track your subscriptions</Text>
      
      {subscriptions.map((item) => (
    <View key={item.name} style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDetail}>${item.price}</Text>
      <Text style={styles.cardDetail}>{item.category}</Text>
      <Text style={styles.cardDetail}>{item.cycle}</Text>
    </View>
      ))}
      <TouchableOpacity onPress={() => alert('Hello!')}>
        <Text style={{color:'white'}}>+Add</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#0F0F1A",
  },

  title: {
    color: 'white', 
    fontSize: 32, 
    fontWeight: 'bold' 
  },

  header: {
    color:'#888888', 
    fontSize:12, 
    marginTop:8
  },

  card: {
    backgroundColor: '#1a1a2e',
    borderRadius:16,
    padding:16,
    width: '80%',
    marginBottom:12
  },

  cardTitle: {
    color: 'white',
    fontSize: 16,
  },

  cardDetail: {
    color: '#888888',
    fontSize:10
  }
});

