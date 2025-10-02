import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { fetchCourses } from '../../store/slices/coursesSlice';
import { useLocalization } from '../../context/LocalizationContext';
import CurvedCard from '../../components/CurvedCard';

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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F9FF" />
      <ScrollView
        style={{ flex: 1, backgroundColor: '#F0F9FF' }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 32,
            paddingBottom: 48,
            backgroundColor: '#0EA5E9',
            borderBottomLeftRadius: isRTL ? 0 : 32,
            borderBottomRightRadius: isRTL ? 32 : 0,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  marginBottom: 8,
                  textAlign: isRTL ? 'right' : 'left'
                }}
              >
                {t('home.hello')}, {user?.name}! 👋
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#BFDBFE',
                  lineHeight: 24,
                  textAlign: isRTL ? 'right' : 'left'
                }}
              >
                {t('home.readyToLearn')}
              </Text>
            </View>
            
            {/* Profile Avatar */}
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
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
        <View style={{ paddingHorizontal: 24, marginTop: -24, marginBottom: 32 }}>
          <CurvedCard
            containerStyle={{
              borderRadius: 28,
              padding: 24,
              backgroundColor: '#A855F7',
              shadowColor: '#A855F7',
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.4,
              shadowRadius: 24,
              elevation: 15,
            }}
            onPress={() => navigation.navigate('RedeemCoupon')}
          >
            <View
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    marginBottom: 8,
                    textAlign: isRTL ? 'right' : 'left'
                  }}
                >
                  🎁 {t('home.redeemCoupon')}
                </Text>
                <Text
                  style={{
                    color: '#E9D5FF',
                    lineHeight: 20,
                    textAlign: isRTL ? 'right' : 'left'
                  }}
                >
                  {t('home.getNewCoursesWithCoupon')}
                </Text>
              </View>
              
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <Ionicons name="gift" size={28} color="white" />
              </View>
            </View>
          </CurvedCard>
        </View>

        {/* Courses Section */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 32 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#1F2937',
              marginBottom: 24,
              textAlign: isRTL ? 'right' : 'left'
            }}
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
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F3F4F6',
                  marginBottom: 24
                }}
              >
                <Ionicons name="school" size={40} color="#9CA3AF" />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: 12,
                  textAlign: 'center'
                }}
              >
                {t('home.noCoursesYet')}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#6B7280',
                  textAlign: 'center',
                  lineHeight: 28
                }}
              >
                {t('home.redeemCouponToUnlock')}
              </Text>
            </CurvedCard>
          ) : (
            <View style={{ gap: 24 }}>
              {courses.map((course) => (
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
                    style={{
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: 16
                    }}
                  >
                    <View style={{
                      flex: 1,
                      marginRight: isRTL ? 0 : 16,
                      marginLeft: isRTL ? 16 : 0,
                    }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#1F2937',
                          marginBottom: 12,
                          textAlign: isRTL ? 'right' : 'left'
                        }}
                      >
                        {course.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#6B7280',
                          lineHeight: 24,
                          textAlign: isRTL ? 'right' : 'left'
                        }}
                      >
                        {course.description}
                      </Text>
                    </View>
                    
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F0F9FF'
                      }}
                    >
                      <Ionicons
                        name={isRTL ? "arrow-back" : "arrow-forward"}
                        size={24}
                        color="#0EA5E9"
                      />
                    </View>
                  </View>
                  
                  {/* Progress Bar */}
                  <View>
                    <Text style={{ color: '#6B7280', marginBottom: 8, textAlign: isRTL ? 'right' : 'left' }}>
                      {t('home.progress')} - {Math.round(course.progress * 100)}%
                    </Text>
                    <View style={{ height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
                      <View style={{ height: '100%', width: `${course.progress * 100}%`, backgroundColor: '#3B82F6', borderRadius: 4 }} />
                    </View>
                  </View>

                </CurvedCard>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;