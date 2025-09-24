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
import { redeemCoupon, clearError, clearLastRedeemed } from '../../store/slices/couponsSlice';

const RedeemCouponScreen = ({ navigation }) => {
  const [couponCode, setCouponCode] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error, lastRedeemed } = useSelector((state) => state.coupons);

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
    
    // Clear last redeemed when component unmounts
    return () => {
      dispatch(clearLastRedeemed());
    };
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Redemption Failed', error);
    }
  }, [error]);

  useEffect(() => {
    if (lastRedeemed) {
      Alert.alert(
        '🎉 Success!',
        `Coupon redeemed successfully!\n\nYou've unlocked ${lastRedeemed.unlockedCourses?.length || 0} course(s). Happy learning!`,
        [
          { 
            text: 'Start Learning', 
            onPress: () => navigation.goBack() 
          }
        ]
      );
    }
  }, [lastRedeemed]);

  const handleRedeemCoupon = async () => {
    if (!couponCode.trim()) {
      Alert.alert('Error', 'Please enter a coupon code');
      return;
    }

    try {
      await dispatch(redeemCoupon(couponCode.trim().toUpperCase())).unwrap();
    } catch (err) {
      // Error is handled by useEffect
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-6 py-8">
          {/* Header */}
          <View className="items-center mb-8">
            <View 
              className="w-24 h-24 rounded-3xl items-center justify-center mb-6 shadow-xl"
              style={{
                backgroundColor: '#8B5CF6',
                shadowColor: '#8B5CF6',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 12,
              }}
            >
              <Ionicons name="gift" size={40} color="white" />
            </View>
            <Text className="text-4xl font-bold text-gray-800 mb-3 text-center">
              Redeem Coupon
            </Text>
            <Text className="text-lg text-gray-600 text-center leading-6 px-4">
              Enter your coupon code below to unlock exclusive courses and start your learning journey
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
            {/* Input Section */}
            <View className="mb-8">
              <Text className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                Coupon Code
              </Text>
              <View 
                className="border-2 border-gray-200 px-6 py-5 rounded-2xl bg-gray-50"
                style={{ borderColor: couponCode ? '#8B5CF6' : '#E5E7EB' }}
              >
                <TextInput
                  className="text-xl font-mono text-center tracking-widest text-gray-800"
                  placeholder="ENTER-CODE-HERE"
                  value={couponCode}
                  onChangeText={(text) => setCouponCode(text.toUpperCase())}
                  autoCapitalize="characters"
                  placeholderTextColor="#9CA3AF"
                  maxLength={25}
                  autoFocus
                />
              </View>
              {couponCode && (
                <Text className="text-xs text-gray-500 mt-2 text-center">
                  {couponCode.length}/25 characters
                </Text>
              )}
            </View>

            {/* Redeem Button */}
            <TouchableOpacity
              className={`py-5 rounded-2xl ${
                isLoading || !couponCode.trim() 
                  ? 'bg-gray-300' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-600'
              } shadow-lg`}
              onPress={handleRedeemCoupon}
              disabled={isLoading || !couponCode.trim()}
              style={{
                shadowColor: '#8B5CF6',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Text className="text-white text-xl font-bold text-center">
                {isLoading ? '⏳ Redeeming...' : '🎁 Redeem Coupon'}
              </Text>
            </TouchableOpacity>

            {/* Help Section */}
            <View className="mt-8 p-4 bg-blue-50 rounded-2xl">
              <View className="flex-row items-center mb-2">
                <Ionicons name="bulb" size={20} color="#3B82F6" />
                <Text className="text-blue-800 font-semibold ml-2">Quick Tips</Text>
              </View>
              <Text className="text-blue-700 text-sm leading-5">
                • Coupon codes are case-insensitive{'\n'}
                • Can contain letters, numbers, and dashes{'\n'}
                • Make sure you have a stable internet connection
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View className="items-center mt-8">
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              className="flex-row items-center"
            >
              <Ionicons name="arrow-back" size={20} color="#6B7280" />
              <Text className="text-gray-600 ml-2 font-medium">Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
