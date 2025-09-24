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
      className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 justify-center px-6">
        <View 
          className="bg-white rounded-3xl p-8 shadow-2xl"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.15,
            shadowRadius: 24,
            elevation: 16,
          }}
        >
          {/* Header */}
          <View className="items-center mb-8">
            <View 
              className="w-20 h-20 rounded-2xl items-center justify-center mb-4 shadow-lg"
              style={{
                backgroundColor: '#3B82F6',
                shadowColor: '#3B82F6',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Ionicons name="school" size={36} color="white" />
            </View>
            <Text className="text-4xl font-bold text-center mb-2 text-gray-800">
              Welcome Back
            </Text>
            <Text className="text-lg text-center text-gray-600 leading-6">
              Sign in to continue your learning journey
            </Text>
          </View>

          {/* Form Fields */}
          <View className="space-y-6">
            {/* Email Field */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </Text>
              <View className="flex-row items-center border-2 border-gray-200 rounded-xl px-4 py-4 bg-gray-50">
                <Ionicons name="mail-outline" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-lg text-gray-800"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Password Field */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Password
              </Text>
              <View className="flex-row items-center border-2 border-gray-200 rounded-xl px-4 py-4 bg-gray-50">
                <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-lg text-gray-800"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            className={`py-5 rounded-2xl mt-8 ${
              isLoading ? 'bg-gray-300' : 'bg-gradient-to-r from-blue-600 to-indigo-600'
            } shadow-lg`}
            onPress={handleLogin}
            disabled={isLoading}
            style={{
              shadowColor: '#3B82F6',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Text className="text-white text-xl font-bold text-center">
              {isLoading ? '⏳ Signing in...' : '🚀 Sign In'}
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <View className="items-center mt-8">
            <TouchableOpacity 
              onPress={() => navigation.navigate('Register')}
              className="flex-row items-center"
            >
              <Text className="text-gray-600 font-medium">
                Don't have an account?{' '}
              </Text>
              <Text className="text-blue-600 font-bold">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
