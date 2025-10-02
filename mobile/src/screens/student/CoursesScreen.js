import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StyleSheet, // Import StyleSheet
  StatusBar, // Import StatusBar
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { fetchCourses } from '../../store/slices/coursesSlice';

const CoursesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { courses, isLoading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]); // Added dispatch to dependency array as a best practice

  const handleRefresh = () => {
    dispatch(fetchCourses());
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#22C55E'; // Green for high progress
    if (progress >= 50) return '#F59E0B'; // Amber for medium progress
    return '#3B82F6'; // Blue for low progress
  };

  // Show a loading spinner on initial load
  if (isLoading && courses.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </SafeAreaView>
    );
  }

  // Optional: Show an error message if the fetch fails
  if (error && courses.length === 0) {
      return (
          <SafeAreaView style={styles.centered}>
              <Ionicons name="cloud-offline-outline" size={64} color="#EF4444" />
              <Text style={styles.errorText}>Failed to load courses.</Text>
              <Text style={styles.errorSubText}>Please check your connection and try again.</Text>
          </SafeAreaView>
      );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>My Courses</Text>
          <Text style={styles.headerSubtitle}>
            Continue your learning journey
          </Text>
        </View>

        {/* Course List */}
        <View style={styles.contentContainer}>
          {courses.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <Ionicons name="library-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyStateTitle}>
                No courses available
              </Text>
              <Text style={styles.emptyStateSubtitle}>
                Redeem a coupon to unlock courses and start learning new skills!
              </Text>
              <TouchableOpacity
                style={styles.redeemButton}
                onPress={() => navigation.navigate('RedeemCoupon')}
              >
                <Text style={styles.redeemButtonText}>
                  Redeem Coupon
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.listContainer}>
              {courses.map((course) => (
                <TouchableOpacity
                  key={course.id}
                  style={styles.card}
                  onPress={() => navigation.navigate('Lessons', { course })}
                >
                  {/* Course Header */}
                  <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderTextContainer}>
                      <Text style={styles.cardTitle}>{course.title}</Text>
                      <Text style={styles.cardDescription}>{course.description}</Text>
                    </View>
                    <View style={styles.playIconContainer}>
                      <Ionicons name="play-circle-outline" size={32} color="#3B82F6" />
                    </View>
                  </View>

                  {/* Progress Bar */}
                  <View style={styles.progressSection}>
                    <View style={styles.progressInfo}>
                      <Text style={styles.progressLabel}>Progress</Text>
                      <Text style={styles.progressRatio}>
                        {course.completedLessons || 0}/{course.lessons?.length || 0} lessons
                      </Text>
                    </View>
                    <View style={styles.progressBarBackground}>
                      <View 
                        style={[
                          styles.progressBarFill,
                          { 
                            backgroundColor: getProgressColor(course.progress || 0),
                            width: `${course.progress || 0}%`
                          }
                        ]}
                      />
                    </View>
                  </View>

                  {/* Footer */}
                  <View style={styles.cardFooter}>
                    <View style={styles.footerInfo}>
                      <Ionicons name="time-outline" size={16} color="#6B7280" />
                      <Text style={styles.footerText}>
                        {course.estimatedDuration || 'Self-paced'}
                      </Text>
                    </View>
                    <View style={styles.footerInfo}>
                      <Text style={styles.continueText}>Continue</Text>
                      <Ionicons name="arrow-forward-outline" size={16} color="#3B82F6" />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Use StyleSheet.create for performance and organization
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 24,
  },
  errorText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
  },
  errorSubText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  contentContainer: {
    padding: 24,
  },
  emptyStateContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4B5563',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  redeemButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  redeemButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  listContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardHeaderTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  playIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  progressRatio: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  progressBarBackground: {
    backgroundColor: '#E5E7EB',
    height: 8,
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: '#F3F4F6'
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  continueText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginRight: 6,
  },
});

export default CoursesScreen;