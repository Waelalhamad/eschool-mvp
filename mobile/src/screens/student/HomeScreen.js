import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { fetchCourses } from '../../store/slices/coursesSlice';
import { useLocalization } from '../../context/LocalizationContext';
import CurvedCard from '../../components/CurvedCard';
import CurvedButton from '../../components/CurvedButton';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { courses, isLoading } = useSelector((state) => state.courses);
  const { t, isRTL } = useLocalization();

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  const handleRefresh = () => {
    dispatch(fetchCourses());
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="#F0F9FF" />
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: '#F0F9FF' }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Modern Curved Header */}
        <View 
          className="px-6 pt-8 pb-12"
          style={{
            backgroundColor: '#0EA5E9',
            borderBottomLeftRadius: isRTL ? 0 : 32,
            borderBottomRightRadius: isRTL ? 32 : 0,
          }}
        >
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-1">
              <Text 
                className="font-tajawal-bold text-4xl text-white mb-2"
                style={{ textAlign: isRTL ? 'right' : 'left' }}
              >
                {t('home.hello')}, {user?.name}! 👋
              </Text>
              <Text 
                className="font-tajawal text-xl text-blue-100 leading-6"
                style={{ textAlign: isRTL ? 'right' : 'left' }}
              >
                {t('home.readyToLearn')}
              </Text>
            </View>
            
            {/* Profile Avatar */}
            <View 
              className="w-16 h-16 rounded-3xl items-center justify-center shadow-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Ionicons name="person" size={28} color="white" />
            </View>
          </View>
        </View>

        {/* Redeem Coupon Card */}
        <View className="px-6 -mt-6 mb-8">
          <CurvedCard
            containerStyle={{
              borderRadius: 28,
              padding: 24,
              backgroundColor: 'linear-gradient(135deg, #A855F7 0%, #C084FC 100%)',
              backgroundImage: 'linear-gradient(135deg, #A855F7 0%, #C084FC 100%)',
              shadowColor: '#A855F7',
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.4,
              shadowRadius: 24,
              elevation: 15,
            }}
            onPress={() => navigation.navigate('RedeemCoupon')}
          >
            <View 
              className="flex-row items-center justify-between"
              style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
            >
              <View className="flex-1">
                <Text 
                  className="font-tajawal-bold text-2xl text-white mb-2"
                  style={{ textAlign: isRTL ? 'right' : 'left' }}
                >
                  🎁 {t('home.redeemCoupon')}
                </Text>
                <Text 
                  className="font-tajawal text-purple-100 leading-5"
                  style={{ textAlign: isRTL ? 'right' : 'left' }}
                >
                  احصل على دورات جديدة باستخدام كوبون
                </Text>
              </View>
              
              <View 
                className="w-16 h-16 rounded-3xl items-center justify-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Ionicons name="gift" size={28} color="white" />
              </View>
            </View>
          </CurvedCard>
        </View>

        {/* Courses Section */}
        <View className="px-6">
          <Text 
            className="font-tajawal-bold text-3xl text-gray-800 mb-6"
            style={{ textAlign: isRTL ? 'right' : 'left' }}
          >
            {t('home.yourCourses')}
          </Text>
          
          {courses.length === 0 ? (
            <CurvedCard
              containerStyle={{
                borderRadius: 28,
                padding: 32,
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.1,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <View 
                className="w-24 h-24 rounded-4xl items-center justify-center mb-6"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <Ionicons name="school" size={40} color="#9CA3AF" />
              </View>
              <Text 
                className="font-tajawal-bold text-2xl text-gray-700 mb-3"
                style={{ textAlign: isRTL ? 'right' : 'center' }}
              >
                {t('home.noCoursesYet')}
              </Text>
              <Text 
                className="font-tajawal text-lg text-gray-500 text-center leading-7"
                style={{ textAlign: isRTL ? 'right' : 'center' }}
              >
                {t('home.redeemCouponToUnlock')}
              </Text>
            </CurvedCard>
          ) : (
            <View className="space-y-6">
              {courses.map((course, index) => (
                <CurvedCard
                  key={course.id}
                  containerStyle={{
                    borderRadius: 28,
                    padding: 24,
                    backgroundColor: '#FFFFFF',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.1,
                    shadowRadius: 16,
                    elevation: 8,
                  }}
                  onPress={() => navigation.navigate('Lessons', { course })}
                >
                  <View 
                    className="flex-row items-start justify-between mb-4"
                    style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                  >
                    <View className="flex-1" style={{ paddingHorizontal: isRTL ? 16 : 0, paddingLeft: isRTL ? 16 : 0, paddingRight: isRTL ? 0 : 16 }}>
                      <Text 
                        className="font-tajawal-bold text-2xl text-gray-800 mb-3"
                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                      >
                        {course.title}
                      </Text>
                      <Text 
                        className="font-tajawal text-lg text-gray-600 leading-6"
                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                      >
                        {course.description}
                      </Text>
                    </View>
                    
                    <View 
                      className="w-12 h-12 rounded-2xl items-center justify-center"
                      style={{ backgroundColor: '#F0F9FF' }}
                    >
                      <Ionicons 
                        name={isRTL ? "arrow-back" : "arrow-forward"} 
                        size={24} 
                        color="#0EA5E9" 
                      />
                    </View>
                  </View>
                  
                  <View 
                    className="flex-row items-center justify-between"
                    style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                  >
                    <View 
                      className="px-4 py-2 rounded-2xl"
                      style={{ backgroundColor: '#F0F9FF' }}
                    >
                      <Text className="font-tajawal-bold text-blue-600 text-sm">
                        {course.lessons?.length || 0} {t('home.lessonsCount')}
                      </Text>
                    </View>
                    <Text 
                      className="font-tajawal text-gray-500 text-sm"
                      style={{ textAlign: isRTL ? 'left' : 'right' }}
                    >
                      {t('home.tapToContinue')}
                    </Text>
                  </View>
                </CurvedCard>
              ))}
            </View>
          )}
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};
