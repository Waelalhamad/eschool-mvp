import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../store/slices/authSlice';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (err) {
      Alert.alert('Login Failed', err);
    }
  };

  React.useEffect(() => {
    return () => dispatch(clearError());
  }, []);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 justify-center px-6">
        <View className="bg-white rounded-2xl p-8 shadow-lg">
          <Text className="text-4xl font-bold text-center mb-2 text-primary-600">
            e-School
          </Text>
          <Text className="text-lg text-center text-gray-600 mb-8">
            Sign in to continue learning
          </Text>

          <TextInput
            className="border border-gray-200 px-4 py-4 rounded-xl mb-4 text-lg bg-gray-50"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />

          <TextInput
            className="border border-gray-200 px-4 py-4 rounded-xl mb-6 text-lg bg-gray-50"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#9CA3AF"
          />

          <TouchableOpacity
            className={`py-4 rounded-xl ${
              isLoading ? 'bg-primary-300' : 'bg-primary-600'
            }`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text className="text-white text-lg font-semibold text-center">
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-6"
            onPress={() => navigation.navigate('Register')}
          >
            <Text className="text-primary-600 text-center text-base">
              Don't have an account? <Text className="font-semibold">Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
