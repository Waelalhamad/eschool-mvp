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
import { logout } from '../../store/slices/authSlice';

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
      // Mock save - replace with actual API call
      // await dispatch(updateProfile(editData)).unwrap();
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
      <View style={{ flex: 1, backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#9CA3AF', fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{
          backgroundColor: '#3B82F6',
          paddingHorizontal: 24,
          paddingTop: 48,
          paddingBottom: 32,
          background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)'
        }}>
          <View style={{ alignItems: 'center' }}>
            {/* Avatar */}
            <View 
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                backgroundColor: '#F3F4F6',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8
              }}
            >
              <Ionicons name="person" size={48} color="#6B7280" />
            </View>

            {/* User Info */}
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>
              {user.name}
            </Text>
            <Text style={{ color: '#BFDBFE', marginBottom: 12 }}>
              {user.email}
            </Text>

            {/* Role Badge */}
            <View 
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: getRoleColor(user.role)
              }}
            >
              <Ionicons name={getRoleIcon(user.role)} size={16} color="white" />
              <Text style={{ color: 'white', fontWeight: '600', marginLeft: 8, textTransform: 'capitalize' }}>
                {user.role}
              </Text>
            </View>
          </View>
        </View>

        {/* Profile Details */}
        <View style={{ paddingHorizontal: 24, marginTop: -16 }}>
          <View 
            style={{
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 24,
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
                style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
                onPress={handleEdit}
              >
                <View style={{ backgroundColor: '#EFF6FF', padding: 8, borderRadius: 20 }}>
                  <Ionicons name="pencil" size={20} color="#3B82F6" />
                </View>
              </TouchableOpacity>
            )}

            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 24 }}>
              Profile Information
            </Text>

            {/* Name Field */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
                Full Name
              </Text>
              {isEditing ? (
                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#E5E7EB',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 12,
                    fontSize: 16,
                    backgroundColor: '#F9FAFB'
                  }}
                  value={editData.name}
                  onChangeText={(text) => setEditData(prev => ({ ...prev, name: text }))}
                  placeholder="Enter your name"
                />
              ) : (
                <Text style={{ fontSize: 16, color: '#1F2937', paddingVertical: 12 }}>
                  {user.name}
                </Text>
              )}
            </View>

            {/* Email Field (Read-only) */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
                Email Address
              </Text>
              <Text style={{ fontSize: 16, color: '#6B7280', paddingVertical: 12 }}>
                {user.email}
              </Text>
              <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                Email cannot be changed
              </Text>
            </View>

            {/* Phone Field */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
                Phone Number
              </Text>
              {isEditing ? (
                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#E5E7EB',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 12,
                    fontSize: 16,
                    backgroundColor: '#F9FAFB'
                  }}
                  value={editData.phone}
                  onChangeText={(text) => setEditData(prev => ({ ...prev, phone: text }))}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={{ fontSize: 16, color: '#1F2937', paddingVertical: 12 }}>
                  {user.phone || 'Not provided'}
                </Text>
              )}
            </View>

            {/* Account Info */}
            <View style={{ borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 12 }}>
                Account Information
              </Text>
              <View style={{ gap: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#6B7280' }}>Member since</Text>
                  <Text style={{ color: '#1F2937', fontWeight: '500' }}>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#6B7280' }}>Account Type</Text>
                  <Text style={{ color: '#1F2937', fontWeight: '500', textTransform: 'capitalize' }}>
                    {user.role}
                  </Text>
                </View>
              </View>
            </View>

            {/* Edit Actions */}
            {isEditing && (
              <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
                <TouchableOpacity
                  style={{ flex: 1, paddingVertical: 12, backgroundColor: '#E5E7EB', borderRadius: 12 }}
                  onPress={handleCancel}
                >
                  <Text style={{ color: '#374151', fontWeight: '600', textAlign: 'center' }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 1, paddingVertical: 12, backgroundColor: '#3B82F6', borderRadius: 12 }}
                  onPress={handleSave}
                  disabled={isLoading}
                >
                  <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ paddingHorizontal: 24, marginTop: 24, paddingBottom: 32 }}>
          <View style={{ gap: 16 }}>
            {/* Settings Button */}
            <TouchableOpacity style={{
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4
            }}>
              <View style={{
                width: 40,
                height: 40,
                backgroundColor: '#F3F4F6',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16
              }}>
                <Ionicons name="settings-outline" size={20} color="#6B7280" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937' }}>
                  Settings
                </Text>
                <Text style={{ color: '#9CA3AF' }}>
                  App preferences and notifications
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Help Button */}
            <TouchableOpacity style={{
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4
            }}>
              <View style={{
                width: 40,
                height: 40,
                backgroundColor: '#DCFCE7',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16
              }}>
                <Ionicons name="help-circle-outline" size={20} color="#059669" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937' }}>
                  Help & Support
                </Text>
                <Text style={{ color: '#9CA3AF' }}>
                  Get help and contact support
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity 
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
                borderWidth: 1,
                borderColor: '#FECACA'
              }}
              onPress={() => setShowLogoutModal(true)}
            >
              <View style={{
                width: 40,
                height: 40,
                backgroundColor: '#FECACA',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16
              }}>
                <Ionicons name="log-out-outline" size={20} color="#DC2626" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#DC2626' }}>
                  Sign Out
                </Text>
                <Text style={{ color: '#F87171' }}>
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
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24
        }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 24,
            width: '100%',
            maxWidth: 400
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 }}>
              Sign Out
            </Text>
            <Text style={{ color: '#6B7280', marginBottom: 24 }}>
              Are you sure you want to sign out of your account?
            </Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                style={{ flex: 1, paddingVertical: 12, backgroundColor: '#E5E7EB', borderRadius: 12 }}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={{ color: '#374151', fontWeight: '600', textAlign: 'center' }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1, paddingVertical: 12, backgroundColor: '#DC2626', borderRadius: 12 }}
                onPress={handleLogout}
                disabled={isLoading}
              >
                <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>
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