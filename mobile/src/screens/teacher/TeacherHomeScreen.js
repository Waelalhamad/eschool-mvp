import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const TeacherHomeScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalUploads: 0,
    pendingApproval: 0,
    approved: 0,
    rejected: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    // Fetch teacher statistics
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const StatCard = ({ icon, title, value, color = 'bg-blue-500' }) => (
    <View className={`${color} rounded-2xl p-4 flex-1 mr-4`}>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-white text-2xl font-bold">{value}</Text>
          <Text className="text-white text-sm opacity-90">{title}</Text>
        </View>
        <Ionicons name={icon} size={32} color="white" />
      </View>
    </View>
  );

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
    >
      {/* Header */}
      <View className="bg-white px-6 py-8 mb-6">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.name}! 👨‍🏫
        </Text>
        <Text className="text-lg text-gray-600">
          Ready to create amazing content today?
        </Text>
      </View>

      {/* Quick Actions */}
      <View className="px-6 mb-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">Quick Actions</Text>
        <View className="flex-row">
          <TouchableOpacity
            className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 flex-1 mr-3"
            onPress={() => navigation.navigate('Upload')}
          >
            <Ionicons name="cloud-upload" size={32} color="white" />
            <Text className="text-white text-lg font-bold mt-2">
              Upload Content
            </Text>
            <Text className="text-white text-sm opacity-90">
              Add new lessons
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 flex-1"
            onPress={() => navigation.navigate('MyUploads')}
          >
            <Ionicons name="folder-open" size={32} color="white" />
            <Text className="text-white text-lg font-bold mt-2">
              My Uploads
            </Text>
            <Text className="text-white text-sm opacity-90">
              View submissions
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Statistics */}
      <View className="px-6 mb-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">Statistics</Text>
        <View className="flex-row mb-4">
          <StatCard
            icon="documents"
            title="Total Uploads"
            value={stats.totalUploads}
            color="bg-blue-500"
          />
          <StatCard
            icon="time"
            title="Pending"
            value={stats.pendingApproval}
            color="bg-yellow-500"
          />
        </View>
        <View className="flex-row">
          <StatCard
            icon="checkmark-circle"
            title="Approved"
            value={stats.approved}
            color="bg-green-500"
          />
          <StatCard
            icon="close-circle"
            title="Rejected"
            value={stats.rejected}
            color="bg-red-500"
          />
        </View>
      </View>

      {/* Recent Activity */}
      <View className="px-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">Recent Activity</Text>
        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <View className="items-center py-8">
            <Ionicons name="document-text-outline" size={48} color="#D1D5DB" />
            <Text className="text-lg font-semibold text-gray-600 mt-4">
              No recent activity
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              Your upload activity will appear here
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TeacherHomeScreen;