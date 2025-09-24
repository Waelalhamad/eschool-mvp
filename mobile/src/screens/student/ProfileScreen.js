import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { logout, updateProfile } from '../../store/slices/authSlice';

const ProfileScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateProfile(editData)).unwrap();
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user.name || '',
      phone: user.phone || '',
    });
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      setShowLogoutModal(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return '#DC2626';
      case 'teacher':
        return '#059669';
      case 'student':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return 'shield';
      case 'teacher':
        return 'school';
      case 'student':
        return 'book';
      default:
        return 'person';
    }
  };

  if (!user) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500 text-lg">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 pt-12 pb-8">
          <View className="items-center">
            {/* Avatar */}
            <View 
              className="w-24 h-24 rounded-full items-center justify-center mb-4 shadow-lg"
              style={{ backgroundColor: '#F3F4F6' }}
            >
              {user.avatar ? (
                <Ionicons name="person" size={48} color="#6B7280" />
              ) : (
                <Ionicons name="person" size={48} color="#6B7280" />
              )}
            </View>

            {/* User Info */}
            <Text className="text-2xl font-bold text-white mb-1">
              {user.name}
            </Text>
            <Text className="text-blue-100 mb-3">
              {user.email}
            </Text>

            {/* Role Badge */}
            <View 
              className="flex-row items-center px-4 py-2 rounded-full"
              style={{ backgroundColor: getRoleColor(user.role) }}
            >
              <Ionicons name={getRoleIcon(user.role)} size={16} color="white" />
              <Text className="text-white font-semibold ml-2 capitalize">
                {user.role}
              </Text>
            </View>
          </View>
        </View>

        {/* Profile Details */}
        <View className="px-6 -mt-4">
          <View 
            className="bg-white rounded-2xl p-6 shadow-lg"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            {/* Edit Button */}
            {!isEditing && (
              <TouchableOpacity
                className="absolute top-4 right-4 z-10"
                onPress={handleEdit}
              >
                <View className="bg-blue-50 p-2 rounded-full">
                  <Ionicons name="pencil" size={20} color="#3B82F6" />
                </View>
              </TouchableOpacity>
            )}

            <Text className="text-xl font-bold text-gray-800 mb-6">
              Profile Information
            </Text>

            {/* Name Field */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </Text>
              {isEditing ? (
                <TextInput
                  className="border-2 border-gray-200 px-4 py-3 rounded-xl text-lg bg-gray-50"
                  value={editData.name}
                  onChangeText={(text) => setEditData(prev => ({ ...prev, name: text }))}
                  placeholder="Enter your name"
                />
              ) : (
                <Text className="text-lg text-gray-800 py-3">
                  {user.name}
                </Text>
              )}
            </View>

            {/* Email Field (Read-only) */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </Text>
              <Text className="text-lg text-gray-600 py-3">
                {user.email}
              </Text>
              <Text className="text-xs text-gray-500">
                Email cannot be changed
              </Text>
            </View>

            {/* Phone Field */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </Text>
              {isEditing ? (
                <TextInput
                  className="border-2 border-gray-200 px-4 py-3 rounded-xl text-lg bg-gray-50"
                  value={editData.phone}
                  onChangeText={(text) => setEditData(prev => ({ ...prev, phone: text }))}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text className="text-lg text-gray-800 py-3">
                  {user.phone || 'Not provided'}
                </Text>
              )}
            </View>

            {/* Account Info */}
            <View className="border-t border-gray-200 pt-6">
              <Text className="text-sm font-semibold text-gray-700 mb-3">
                Account Information
              </Text>
              <View className="space-y-3">
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Member since</Text>
                  <Text className="text-gray-800 font-medium">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Account Type</Text>
                  <Text className="text-gray-800 font-medium capitalize">
                    {user.role}
                  </Text>
                </View>
              </View>
            </View>

            {/* Edit Actions */}
            {isEditing && (
              <View className="flex-row space-x-3 mt-6">
                <TouchableOpacity
                  className="flex-1 py-3 bg-gray-200 rounded-xl"
                  onPress={handleCancel}
                >
                  <Text className="text-gray-700 font-semibold text-center">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 py-3 bg-blue-600 rounded-xl"
                  onPress={handleSave}
                  disabled={isLoading}
                >
                  <Text className="text-white font-semibold text-center">
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-6 mt-6 pb-8">
          <View className="space-y-4">
            {/* Settings Button */}
            <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center shadow-sm">
              <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4">
                <Ionicons name="settings-outline" size={20} color="#6B7280" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">
                  Settings
                </Text>
                <Text className="text-gray-500">
                  App preferences and notifications
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Help Button */}
            <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center shadow-sm">
              <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-4">
                <Ionicons name="help-circle-outline" size={20} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">
                  Help & Support
                </Text>
                <Text className="text-gray-500">
                  Get help and contact support
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity 
              className="bg-white rounded-2xl p-4 flex-row items-center shadow-sm border border-red-100"
              onPress={() => setShowLogoutModal(true)}
            >
              <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mr-4">
                <Ionicons name="log-out-outline" size={20} color="#DC2626" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-red-600">
                  Sign Out
                </Text>
                <Text className="text-red-400">
                  Sign out of your account
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#DC2626" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View className="flex-1 bg-black/50 items-center justify-center px-6">
          <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              Sign Out
            </Text>
            <Text className="text-gray-600 mb-6">
              Are you sure you want to sign out of your account?
            </Text>
            <View className="flex-row space-x-3">
              <TouchableOpacity
                className="flex-1 py-3 bg-gray-200 rounded-xl"
                onPress={() => setShowLogoutModal(false)}
              >
                <Text className="text-gray-700 font-semibold text-center">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-3 bg-red-600 rounded-xl"
                onPress={handleLogout}
                disabled={isLoading}
              >
                <Text className="text-white font-semibold text-center">
                  {isLoading ? 'Signing out...' : 'Sign Out'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;