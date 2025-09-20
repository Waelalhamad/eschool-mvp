import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ManageCouponsScreen = () => {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    usageLimit: '',
    expiresAt: '',
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCoupons([
        {
          id: '1',
          code: 'WELCOME2024',
          usageLimit: 100,
          usedCount: 45,
          expiresAt: '2024-12-31',
          isActive: true,
          courses: ['React Native Basics', 'Advanced JavaScript'],
        },
        {
          id: '2',
          code: 'STUDENT50',
          usageLimit: 50,
          usedCount: 50,
          expiresAt: '2024-06-30',
          isActive: false,
          courses: ['Database Design', 'Web Development'],
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const createCoupon = async () => {
    if (!newCoupon.code) {
      Alert.alert('Error', 'Please enter a coupon code');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert('Success', 'Coupon created successfully!');
      setCreateModal(false);
      setNewCoupon({ code: '', usageLimit: '', expiresAt: '' });
      fetchCoupons();
    } catch (error) {
      Alert.alert('Error', 'Failed to create coupon');
    }
  };

  const toggleCouponStatus = async (couponId, currentStatus) => {
    try {
      setCoupons(prev => prev.map(coupon => 
        coupon.id === couponId 
          ? { ...coupon, isActive: !currentStatus }
          : coupon
      ));
      
      Alert.alert(
        'Success', 
        `Coupon ${!currentStatus ? 'activated' : 'deactivated'} successfully!`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update coupon status');
    }
  };

  const CouponCard = ({ coupon }) => {
    const usagePercentage = (coupon.usedCount / coupon.usageLimit) * 100;
    const isExpired = new Date(coupon.expiresAt) < new Date();
    
    return (
      <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
        {/* Header */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-800 mb-1">
              {coupon.code}
            </Text>
            <View className="flex-row items-center">
              <View className={`px-2 py-1 rounded-full ${
                coupon.isActive && !isExpired
                  ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <Text className={`text-xs font-medium ${
                  coupon.isActive && !isExpired
                    ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isExpired ? 'EXPIRED' : coupon.isActive ? 'ACTIVE' : 'INACTIVE'}
                </Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity
            className={`px-4 py-2 rounded-lg ${
              coupon.isActive ? 'bg-red-100' : 'bg-green-100'
            }`}
            onPress={() => toggleCouponStatus(coupon.id, coupon.isActive)}
          >
            <Text className={`text-sm font-medium ${
              coupon.isActive ? 'text-red-700' : 'text-green-700'
            }`}>
              {coupon.isActive ? 'Deactivate' : 'Activate'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Usage Stats */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm font-medium text-gray-700">Usage</Text>
            <Text className="text-sm text-gray-500">
              {coupon.usedCount}/{coupon.usageLimit}
            </Text>
          </View>
          <View className="bg-gray-200 h-2 rounded-full">
            <View 
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </View>
        </View>

        {/* Details */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
          </Text>
          <Text className="text-sm text-gray-600">
            Courses: {coupon.courses.join(', ')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <ScrollView
        className="flex-1 bg-gray-50"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchCoupons} />
        }
      >
        <View className="p-6">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-2xl font-bold text-gray-800">
              Manage Coupons
            </Text>
            <TouchableOpacity
              className="bg-blue-500 px-4 py-2 rounded-xl"
              onPress={() => setCreateModal(true)}
            >
              <View className="flex-row items-center">
                <Ionicons name="add" size={20} color="white" />
                <Text className="text-white font-semibold ml-1">Create</Text>
              </View>
            </TouchableOpacity>
          </View>

          {coupons.length === 0 ? (
            <View className="bg-white rounded-2xl p-8 items-center shadow-sm">
              <Ionicons name="pricetag-outline" size={64} color="#D1D5DB" />
              <Text className="text-xl font-semibold text-gray-600 mt-4 mb-2">
                No coupons yet
              </Text>
              <Text className="text-base text-gray-500 text-center">
                Create your first coupon to get started
              </Text>
            </View>
          ) : (
            coupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))
          )}
        </View>
      </ScrollView>

      {/* Create Coupon Modal */}
      <Modal
        visible={createModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCreateModal(false)}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-xl font-bold text-gray-800">
                Create New Coupon
              </Text>
              <TouchableOpacity onPress={() => setCreateModal(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Coupon Code *
            </Text>
            <TextInput
              className="border border-gray-200 px-4 py-3 rounded-xl mb-4 bg-gray-50"
              placeholder="WELCOME2024"
              value={newCoupon.code}
              onChangeText={(text) => setNewCoupon({ ...newCoupon, code: text.toUpperCase() })}
              autoCapitalize="characters"
            />

            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Usage Limit
            </Text>
            <TextInput
              className="border border-gray-200 px-4 py-3 rounded-xl mb-4 bg-gray-50"
              placeholder="100"
              value={newCoupon.usageLimit}
              onChangeText={(text) => setNewCoupon({ ...newCoupon, usageLimit: text })}
              keyboardType="numeric"
            />

            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Expiry Date
            </Text>
            <TextInput
              className="border border-gray-200 px-4 py-3 rounded-xl mb-6 bg-gray-50"
              placeholder="YYYY-MM-DD"
              value={newCoupon.expiresAt}
              onChangeText={(text) => setNewCoupon({ ...newCoupon, expiresAt: text })}
            />

            <TouchableOpacity
              className="bg-blue-500 py-4 rounded-xl"
              onPress={createCoupon}
            >
              <Text className="text-white text-lg font-bold text-center">
                Create Coupon
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};