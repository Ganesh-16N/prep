import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { firebaseAuth, firebaseFirestore } from '../config/firebase';
import { runComprehensiveFirebaseTest, addTestDocument } from '../testFirebase';

const FirebaseConnectionTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Checking...');
  const [testResults, setTestResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setIsLoading(true);
    try {
      const results = await runComprehensiveFirebaseTest();
      setTestResults(results);
      
      if (results.config && results.firestore && results.auth) {
        setConnectionStatus('✅ Connected');
      } else {
        setConnectionStatus('❌ Connection Issues');
      }
    } catch (error) {
      setConnectionStatus('❌ Connection Failed');
      console.error('Connection test error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testWriteOperation = async () => {
    setIsLoading(true);
    try {
      const success = await addTestDocument();
      if (success) {
        Alert.alert('Success', 'Test document written successfully!');
      } else {
        Alert.alert('Error', 'Failed to write test document');
      }
    } catch (error) {
      Alert.alert('Error', `Write test failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testReadOperation = async () => {
    setIsLoading(true);
    try {
      const doc = await firebaseFirestore
        .collection('test')
        .doc('connection-test')
        .get();
      
      if (doc.exists) {
        Alert.alert('Success', `Document found: ${JSON.stringify(doc.data())}`);
      } else {
        Alert.alert('Info', 'Test document does not exist yet');
      }
    } catch (error) {
      Alert.alert('Error', `Read test failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Connection Test</Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text style={[
          styles.statusText,
          connectionStatus.includes('✅') ? styles.success : styles.error
        ]}>
          {connectionStatus}
        </Text>
      </View>

      {testResults && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Test Results:</Text>
          <Text style={styles.resultItem}>
            Configuration: {testResults.config ? '✅' : '❌'}
          </Text>
          <Text style={styles.resultItem}>
            Firestore: {testResults.firestore ? '✅' : '❌'}
          </Text>
          <Text style={styles.resultItem}>
            Authentication: {testResults.auth ? '✅' : '❌'}
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={checkConnection}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Testing...' : 'Test Connection'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={testWriteOperation}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Test Write</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={testReadOperation}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Test Read</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Firebase Configuration:</Text>
        <Text style={styles.infoText}>Project ID: prep-app-007</Text>
        <Text style={styles.infoText}>Auth Domain: prep-app-007.firebaseapp.com</Text>
        <Text style={styles.infoText}>Storage Bucket: prep-app-007.firebasestorage.app</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
    color: '#333',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  success: {
    color: '#4CAF50',
  },
  error: {
    color: '#F44336',
  },
  resultsContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  resultItem: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#2196F3',
  },
  secondaryButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
});

export default FirebaseConnectionTest;
