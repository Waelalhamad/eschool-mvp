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

const CoursesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  const handleRefresh = () => {
    dispatch(fetchCourses());
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-primary-500';
  };

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
          My Courses
        </Text>
        <Text className="text-base text-gray-600">
          Continue your learning journey
        </Text>
      </View>

      {/* Course List */}
      <View className="px-6">
        {courses.length === 0 ? (
          <View className="bg-white rounded-2xl p-8 items-center shadow-sm">
            <Ionicons name="library" size={64} color="#D1D5DB" />
            <Text className="text-xl font-semibold text-gray-600 mt-4 mb-2">
              No courses available
            </Text>
            <Text className="text-base text-gray-500 text-center mb-6 leading-6">
              Redeem a coupon to unlock courses and start learning new skills!
            </Text>
            <TouchableOpacity
              className="bg-primary-600 px-6 py-3 rounded-xl"
              onPress={() => navigation.navigate('RedeemCoupon')}
            >
              <Text className="text-white font-semibold">
                Redeem Coupon
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="space-y-4">
            {courses.map((course) => (
              <TouchableOpacity
                key={course.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                onPress={() => navigation.navigate('Lessons', { course })}
              >
                {/* Course Header */}
                <View className="flex-row items-start justify-between mb-4">
                  <View className="flex-1 pr-4">
                    <Text className="text-xl font-bold text-gray-800 mb-2">
                      {course.title}
                    </Text>
                    <Text className="text-base text-gray-600 leading-5">
                      {course.description}
                    </Text>
                  </View>
                  <View className="bg-primary-50 w-12 h-12 rounded-xl items-center justify-center">
                    <Ionicons name="play" size={24} color="#3B82F6" />
                  </View>
                </View>

                {/* Progress Bar */}
                <View className="mb-4">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm font-medium text-gray-700">
                      Progress
                    </Text>
                    <Text className="text-sm text-gray-500">
                      {course.completedLessons || 0}/{course.lessons?.length || 0} lessons
                    </Text>
                  </View>
                  <View className="bg-gray-200 h-2 rounded-full">
                    <View 
                      className={`h-2 rounded-full ${getProgressColor(course.progress || 0)}`}
                      style={{ width: `${course.progress || 0}%` }}
                    />
                  </View>
                </View>

                {/* Footer */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Ionicons name="time" size={16} color="#6B7280" />
                    <Text className="text-sm text-gray-500 ml-1">
                      {course.estimatedDuration || 'Self-paced'}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-sm text-primary-600 font-medium mr-2">
                      Continue
                    </Text>
                    <Ionicons name="arrow-forward" size={16} color="#3B82F6" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};