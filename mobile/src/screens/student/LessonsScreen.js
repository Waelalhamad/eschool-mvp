import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  RefreshControl,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
// import { lessonsAPI } from '../../services/api'; // You'll need to create this

const LessonsScreen = ({ route, navigation }) => {
  const { course } = route.params || {};
  const { user } = useSelector((state) => state.auth);
  const [lessons, setLessons] = useState([
    // Mock data for testing
    {
      id: 1,
      title: 'Introduction to the Course',
      description: 'Learn the basics and get started',
      duration: '15',
      order: 1,
      completed: false,
      hasQuiz: true
    },
    {
      id: 2,
      title: 'Advanced Concepts',
      description: 'Dive deeper into advanced topics',
      duration: '25',
      order: 2,
      completed: false,
      hasQuiz: false
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLessons, setFilteredLessons] = useState([]);

  useEffect(() => {
    loadLessons();
  }, []);

  useEffect(() => {
    filterLessons();
  }, [searchQuery, lessons]);

  const loadLessons = async () => {
    try {
      setLoading(true);
      // Mock loading - replace with actual API call
      // const response = await lessonsAPI.getLessons(course?.id);
      // setLessons(response.data || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to load lessons. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLessons();
    setRefreshing(false);
  };

  const filterLessons = () => {
    if (!searchQuery.trim()) {
      setFilteredLessons(lessons);
    } else {
      const filtered = lessons.filter(lesson =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLessons(filtered);
    }
  };

  const navigateToLesson = (lesson) => {
    const currentIndex = lessons.findIndex(l => l.id === lesson.id);
    const previousLessons = lessons.slice(0, currentIndex);
    const allPreviousCompleted = previousLessons.every(l => l.completed || l.quizPassed);

    if (currentIndex > 0 && !allPreviousCompleted) {
      Alert.alert(
        'Lesson Locked',
        'Please complete the previous lessons before accessing this one.',
        [{ text: 'OK' }]
      );
      return;
    }

    navigation.navigate('LessonDetail', { lesson });
  };

  const getLessonIcon = (lesson, index) => {
    if (lesson.completed || lesson.quizPassed) {
      return { name: 'checkmark-circle', color: '#059669' };
    } else if (index === 0 || lessons.slice(0, index).every(l => l.completed || l.quizPassed)) {
      return { name: 'play-circle', color: '#3B82F6' };
    } else {
      return { name: 'lock-closed', color: '#9CA3AF' };
    }
  };

  const getLessonStatus = (lesson, index) => {
    if (lesson.completed || lesson.quizPassed) {
      return { text: 'Completed', color: '#059669', bgColor: '#F0FDF4' };
    } else if (index === 0 || lessons.slice(0, index).every(l => l.completed || l.quizPassed)) {
      return { text: 'Available', color: '#3B82F6', bgColor: '#EFF6FF' };
    } else {
      return { text: 'Locked', color: '#9CA3AF', bgColor: '#F9FAFB' };
    }
  };

  const getProgressPercentage = () => {
    if (lessons.length === 0) return 0;
    const completedCount = lessons.filter(l => l.completed || l.quizPassed).length;
    return Math.round((completedCount / lessons.length) * 100);
  };

  const renderLessonCard = (lesson, index) => {
    const icon = getLessonIcon(lesson, index);
    const status = getLessonStatus(lesson, index);
    const isAccessible = index === 0 || lessons.slice(0, index).every(l => l.completed || l.quizPassed);

    return (
      <TouchableOpacity
        key={lesson.id}
        style={{
          backgroundColor: '#FFFFFF',
          marginHorizontal: 16,
          marginBottom: 16,
          padding: 20,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          borderWidth: 1,
          borderColor: '#F3F4F6',
          opacity: isAccessible ? 1 : 0.7,
        }}
        onPress={() => navigateToLesson(lesson)}
        disabled={!isAccessible}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <View style={{ marginRight: 16, marginTop: 4 }}>
            <Ionicons name={icon.name} size={28} color={icon.color} />
          </View>
          
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937', flex: 1, paddingRight: 8 }}>
                {lesson.title}
              </Text>
              <View 
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 12,
                  backgroundColor: status.bgColor
                }}
              >
                <Text 
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: status.color
                  }}
                >
                  {status.text}
                </Text>
              </View>
            </View>
            
            {lesson.description && (
              <Text style={{ color: '#6B7280', marginBottom: 12, lineHeight: 20 }}>
                {lesson.description}
              </Text>
            )}
            
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="time-outline" size={16} color="#6B7280" />
                <Text style={{ fontSize: 14, color: '#9CA3AF', marginLeft: 4 }}>
                  {lesson.duration || '15'} min
                </Text>
                {lesson.hasQuiz && (
                  <>
                    <View style={{ width: 4, height: 4, backgroundColor: '#9CA3AF', borderRadius: 2, marginHorizontal: 8 }} />
                    <Ionicons name="help-circle-outline" size={16} color="#6B7280" />
                    <Text style={{ fontSize: 14, color: '#9CA3AF', marginLeft: 4 }}>Quiz</Text>
                  </>
                )}
              </View>
              
              <View style={{ backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 }}>
                <Text style={{ fontSize: 12, fontWeight: '500', color: '#374151' }}>
                  Lesson {lesson.order || index + 1}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={{ color: '#6B7280', marginTop: 16 }}>Loading lessons...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View style={{
        backgroundColor: '#3B82F6',
        paddingHorizontal: 24,
        paddingVertical: 32,
        marginBottom: 16,
        background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>
              {lessons.length} Lessons
            </Text>
          </View>
        </View>
        
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 8 }}>
          {course?.title || 'Course Lessons'}
        </Text>
        <Text style={{ color: '#BFDBFE', lineHeight: 24 }}>
          {course?.description || 'Complete all lessons to master this course'}
        </Text>
        
        {/* Progress Bar */}
        <View style={{ marginTop: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ color: '#BFDBFE', fontSize: 14, fontWeight: '500' }}>
              Progress
            </Text>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
              {getProgressPercentage()}%
            </Text>
          </View>
          <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 4, height: 8 }}>
            <View 
              style={{
                backgroundColor: 'white',
                borderRadius: 4,
                height: 8,
                width: `${getProgressPercentage()}%`
              }}
            />
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          borderWidth: 1,
          borderColor: '#F3F4F6'
        }}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={{ flex: 1, marginLeft: 12, color: '#1F2937', fontSize: 16 }}
            placeholder="Search lessons..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Lessons List */}
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3B82F6']}
            tintColor="#3B82F6"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {filteredLessons.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 80 }}>
            <Ionicons name="library-outline" size={64} color="#D1D5DB" />
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#9CA3AF', marginTop: 16 }}>
              {searchQuery ? 'No lessons found' : 'No lessons available'}
            </Text>
            <Text style={{ color: '#9CA3AF', marginTop: 8, textAlign: 'center', paddingHorizontal: 32 }}>
              {searchQuery 
                ? 'Try adjusting your search terms' 
                : 'Lessons will appear here when added to this course'
              }
            </Text>
          </View>
        ) : (
          <>
            {filteredLessons.map((lesson, index) => renderLessonCard(lesson, index))}
            <View style={{ height: 24 }} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LessonsScreen;