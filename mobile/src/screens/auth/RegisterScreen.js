import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { register, clearError } from '../../store/slices/authSlice';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Registration Failed', error);
    }
  }, [error]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await dispatch(register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role,
      })).unwrap();
      
      Alert.alert(
        '🎉 Welcome to e-School!',
        'Your account has been created successfully. You can now start learning!',
        [{ text: 'Get Started', onPress: () => navigation.navigate('Login') }]
      );
    } catch (err) {
      // Error is handled by useEffect
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gradient-to-br from-indigo-50 to-purple-100"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-6 py-8">
          {/* Header */}
          <View className="items-center mb-8">
            <View 
              className="w-20 h-20 rounded-2xl items-center justify-center mb-4 shadow-lg"
              style={{
                backgroundColor: '#6366F1',
                shadowColor: '#6366F1',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Ionicons name="school" size={36} color="white" />
            </View>
            <Text className="text-4xl font-bold text-gray-800 mb-2 text-center">
              Join e-School
            </Text>
            <Text className="text-lg text-gray-600 text-center leading-6 px-4">
              Create your account and start your learning journey today
            </Text>
          </View>

          {/* Main Card */}
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
            {/* Form Fields */}
            <View className="space-y-6">
              {/* Name Field */}
              <View>
                <Text className="text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </Text>
                <View className="flex-row items-center border-2 border-gray-200 rounded-xl px-4 py-4 bg-gray-50">
                  <Ionicons name="person-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-lg text-gray-800"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

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
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
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
                    placeholder="Create a password"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#9CA3AF"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="ml-2"
                  >
                    <Ionicons 
                      name={showPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color="#6B7280" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password Field */}
              <View>
                <Text className="text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </Text>
                <View className="flex-row items-center border-2 border-gray-200 rounded-xl px-4 py-4 bg-gray-50">
                  <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-lg text-gray-800"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    secureTextEntry={!showConfirmPassword}
                    placeholderTextColor="#9CA3AF"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="ml-2"
                  >
                    <Ionicons 
                      name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color="#6B7280" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Role Selection */}
              <View>
                <Text className="text-sm font-semibold text-gray-700 mb-3">
                  Account Type
                </Text>
                <View className="flex-row space-x-3">
                  {[
                    { value: 'student', label: 'Student', icon: 'book-outline' },
                    { value: 'teacher', label: 'Teacher', icon: 'school-outline' },
                  ].map((role) => (
                    <TouchableOpacity
                      key={role.value}
                      className={`flex-1 flex-row items-center justify-center py-4 rounded-xl border-2 ${
                        formData.role === role.value
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                      onPress={() => handleInputChange('role', role.value)}
                    >
                      <Ionicons
                        name={role.icon}
                        size={20}
                        color={formData.role === role.value ? '#6366F1' : '#6B7280'}
                      />
                      <Text
                        className={`ml-2 font-medium ${
                          formData.role === role.value ? 'text-indigo-700' : 'text-gray-600'
                        }`}
                      >
                        {role.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              className={`py-5 rounded-2xl mt-8 ${
                isLoading ? 'bg-gray-300' : 'bg-gradient-to-r from-indigo-600 to-purple-600'
              } shadow-lg`}
              onPress={handleRegister}
              disabled={isLoading}
              style={{
                shadowColor: '#6366F1',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Text className="text-white text-xl font-bold text-center">
                {isLoading ? '⏳ Creating Account...' : '🚀 Create Account'}
              </Text>
            </TouchableOpacity>

            {/* Terms and Privacy */}
            <Text className="text-xs text-gray-500 text-center mt-6 leading-5">
              By creating an account, you agree to our{' '}
              <Text className="text-indigo-600 font-medium">Terms of Service</Text>
              {' '}and{' '}
              <Text className="text-indigo-600 font-medium">Privacy Policy</Text>
            </Text>
          </View>

          {/* Footer */}
          <View className="items-center mt-8">
            <TouchableOpacity 
              onPress={() => navigation.navigate('Login')}
              className="flex-row items-center"
            >
              <Text className="text-gray-600 font-medium">
                Already have an account?{' '}
              </Text>
              <Text className="text-indigo-600 font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;