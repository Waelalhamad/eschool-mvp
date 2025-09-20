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

const AdminHomeScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    pendingReviews: 0,
    activeCoupons: 0,
    totalStudents: 0,
    totalTeachers: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalUsers: 156,
        totalCourses: 24,
        pendingReviews: 7,
        activeCoupons: 12,
        totalStudents: 134,
        totalTeachers: 22,
      });
      setIsLoading(false);
    }, 1000);
  };

  const StatCard = ({ icon, title, value, color = 'bg-blue-500', onPress }) => (
    <TouchableOpacity
      className={`${color} rounded-2xl p-4 flex-1 mr-4`}
      onPress={onPress}
      disabled={!onPress}
    >
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-white text-2xl font-bold">{value}</Text>
          <Text className="text-white text-sm opacity-90">{title}</Text>
        </View>
        <Ionicons name={icon} size={32} color="white" />
      </View>
    </TouchableOpacity>
  );

  const QuickActionCard = ({ icon, title, subtitle, color, onPress }) => (
    <TouchableOpacity
      className={`${color} rounded-2xl p-6 flex-1 mr-3`}
      onPress={onPress}
    >
      <Ionicons name={icon} size={32} color="white" />
      <Text className="text-white text-lg font-bold mt-3">{title}</Text>
      <Text className="text-white text-sm opacity-90">{subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchStats} />
      }
    >
      {/* Header */}
      <View className="bg-white px-6 py-8 mb-6">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Admin Dashboard 👑
        </Text>
        <Text className="text-lg text-gray-600">
          Welcome back, {user?.name}
        </Text>
      </View>

      {/* Quick Actions */}
      <View className="px-6 mb-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">Quick Actions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            <QuickActionCard
              icon="checkmark-circle"
              title="Review Uploads"
              subtitle={`${stats.pendingReviews} pending`}
              color="bg-gradient-to-r from-orange-500 to-red-500"
              onPress={() => navigation.navigate('Reviews')}
            />
            <QuickActionCard
              icon="gift"
              title="Manage Coupons"
              subtitle={`${stats.activeCoupons} active`}
              color="bg-gradient-to-r from-purple-500 to-pink-500"
              onPress={() => navigation.navigate('Coupons')}
            />
            <QuickActionCard
              icon="people"
              title="User Management"
              subtitle={`${stats.totalUsers} users`}
              color="bg-gradient-to-r from-blue-500 to-indigo-500"
              onPress={() => navigation.navigate('Users')}
            />
          </View>
        </ScrollView>
      </View>

      {/* Statistics Overview */}
      <View className="px-6 mb-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">Platform Overview</Text>
        
        {/* First Row */}
        <View className="flex-row mb-4">
          <StatCard
            icon="people"
            title="Total Users"
            value={stats.totalUsers}
            color="bg-blue-500"
          />
          <StatCard
            icon="library"
            title="Total Courses"
            value={stats.totalCourses}
            color="bg-green-500"
          />
        </View>

        {/* Second Row */}
        <View className="flex-row mb-4">
          <StatCard
            icon="school"
            title="Students"
            value={stats.totalStudents}
            color="bg-indigo-500"
          />
          <StatCard
            icon="person"
            title="Teachers"
            value={stats.totalTeachers}
            color="bg-purple-500"
          />
        </View>

        {/* Third Row */}
        <View className="flex-row">
          <StatCard
            icon="time"
            title="Pending Reviews"
            value={stats.pendingReviews}
            color="bg-yellow-500"
            onPress={() => navigation.navigate('Reviews')}
          />
          <StatCard
            icon="pricetag"
            title="Active Coupons"
            value={stats.activeCoupons}
            color="bg-pink-500"
            onPress={() => navigation.navigate('Coupons')}
          />
        </View>
      </View>

      {/* Recent Activity */}
      <View className="px-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">Recent Activity</Text>
        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <View className="flex-row items-center mb-4">
            <View className="bg-green-100 w-10 h-10 rounded-full items-center justify-center mr-3">
              <Ionicons name="checkmark" size={20} color="#059669" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">
                Approved "React Native Basics" lesson
              </Text>
              <Text className="text-sm text-gray-500">2 hours ago</Text>
            </View>
          </View>

          <View className="flex-row items-center mb-4">
            <View className="bg-blue-100 w-10 h-10 rounded-full items-center justify-center mr-3">
              <Ionicons name="gift" size={20} color="#3B82F6" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">
                Created new coupon "WINTER2024"
              </Text>
              <Text className="text-sm text-gray-500">4 hours ago</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="bg-purple-100 w-10 h-10 rounded-full items-center justify-center mr-3">
              <Ionicons name="person-add" size={20} color="#8B5CF6" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">
                New teacher registered: John Doe
              </Text>
              <Text className="text-sm text-gray-500">6 hours ago</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};