import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { fetchCourses } from '../../store/slices/coursesSlice';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { courses, isLoading } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  const handleRefresh = () => {
    dispatch(fetchCourses());
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
    >
      {/* Header */}
      <View className="bg-white px-6 py-8 mb-4">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Hello, {user?.name}! 👋
        </Text>
        <Text className="text-lg text-gray-600">
          Ready to learn something new today?
        </Text>
      </View>

      {/* Redeem Coupon Button */}
      <TouchableOpacity
        className="bg-gradient-to-r from-pink-500 to-rose-500 mx-6 mb-6 p-4 rounded-2xl flex-row items-center justify-center shadow-lg"
        onPress={() => navigation.navigate('RedeemCoupon')}
        style={{
          shadowColor: '#F43F5E',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Ionicons name="gift" size={24} color="white" />
        <Text className="text-white text-lg font-bold ml-3">
          Redeem Coupon
        </Text>
      </TouchableOpacity>

      {/* Courses Section */}
      <View className="px-6">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Your Courses
        </Text>
        
        {courses.length === 0 ? (
          <View className="bg-white rounded-2xl p-8 items-center shadow-sm">
            <Ionicons name="school" size={64} color="#D1D5DB" />
            <Text className="text-xl font-semibold text-gray-600 mt-4 mb-2">
              No courses yet
            </Text>
            <Text className="text-base text-gray-500 text-center leading-6">
              Redeem a coupon to unlock amazing courses and start your learning journey!
            </Text>
          </View>
        ) : (
          <View className="space-y-4">
            {courses.map((course, index) => (
              <TouchableOpacity
                key={course.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                onPress={() => navigation.navigate('Lessons', { course })}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1 pr-4">
                    <Text className="text-xl font-bold text-gray-800 mb-2">
                      {course.title}
                    </Text>
                    <Text className="text-base text-gray-600 leading-5">
                      {course.description}
                    </Text>
                  </View>
                  <Ionicons name="arrow-forward" size={24} color="#3B82F6" />
                </View>
                
                <View className="flex-row items-center justify-between">
                  <View className="bg-primary-50 px-3 py-1 rounded-full">
                    <Text className="text-primary-600 text-sm font-medium">
                      {course.lessons?.length || 0} lessons
                    </Text>
                  </View>
                  <Text className="text-sm text-gray-500">
                    Tap to continue
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
