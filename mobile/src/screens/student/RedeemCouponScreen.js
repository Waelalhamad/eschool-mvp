import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { redeemCoupon, clearError, clearLastRedeemed } from '../../store/slices/couponsSlice';
import { useLocalization } from '../../context/LocalizationContext';
import CurvedCard from '../../components/CurvedCard';
import CurvedButton from '../../components/CurvedButton';
import CurvedInput from '../../components/CurvedInput';

const RedeemCouponScreen = ({ navigation }) => {
  const [couponCode, setCouponCode] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error, lastRedeemed } = useSelector((state) => state.coupons);
  const { t, isRTL } = useLocalization();

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
    
    // Clear last redeemed when component unmounts
    return () => {
      dispatch(clearLastRedeemed());
    };
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Redemption Failed', error);
    }
  }, [error]);

  useEffect(() => {
    if (lastRedeemed) {
      Alert.alert(
        t('coupon.success'),
        t('coupon.couponRedeemedSuccess') + '\n\n' + t('coupon.unlockedCourses', { count: lastRedeemed.unlockedCourses?.length || 0 }),
        [
          { 
            text: t('coupon.startLearning'), 
            onPress: () => navigation.goBack() 
          }
        ]
      );
    }
  }, [lastRedeemed]);

  const handleRedeemCoupon = async () => {
    if (!couponCode.trim()) {
      Alert.alert(t('common.error'), t('coupon.couponCode') + ' ' + t('auth.emailRequired'));
      return;
    }

    try {
      await dispatch(redeemCoupon(couponCode.trim().toUpperCase())).unwrap();
    } catch (err) {
      // Error is handled by useEffect
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="#F0F9FF" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ 
          backgroundColor: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
          backgroundImage: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)'
        }}
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center px-6 py-8">
            {/* Header Section with Curved Design */}
            <View className="items-center mb-12">
              {/* Modern Curved Gift Container */}
              <View 
                className="w-32 h-32 rounded-5xl items-center justify-center mb-8 shadow-2xl"
                style={{
                  backgroundColor: '#A855F7',
                  shadowColor: '#A855F7',
                  shadowOffset: { width: 0, height: 16 },
                  shadowOpacity: 0.4,
                  shadowRadius: 24,
                  elevation: 20,
                  transform: [{ rotate: '8deg' }]
                }}
              >
                <Ionicons name="gift" size={48} color="white" />
              </View>
              
              <Text 
                className="font-tajawal-bold text-5xl text-gray-800 mb-4 text-center"
                style={{ textAlign: isRTL ? 'right' : 'center' }}
              >
                {t('coupon.redeemCoupon')}
              </Text>
              <Text 
                className="font-tajawal text-xl text-gray-600 text-center leading-7 px-4"
                style={{ textAlign: isRTL ? 'right' : 'center' }}
              >
                {t('coupon.enterCouponCode')}
              </Text>
            </View>

            {/* Main Coupon Card with Super Curved Design */}
            <CurvedCard 
              containerStyle={{
                borderRadius: 36,
                padding: 40,
                marginHorizontal: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 24 },
                shadowOpacity: 0.15,
                shadowRadius: 48,
                elevation: 24,
              }}
            >
              {/* Input Section */}
              <View className="mb-10">
                <Text 
                  className="font-tajawal-bold text-lg text-gray-700 mb-6 uppercase tracking-wider"
                  style={{ textAlign: isRTL ? 'right' : 'left' }}
                >
                  {t('coupon.couponCode')}
                </Text>
                
                <CurvedInput
                  placeholder={t('coupon.enterCodeHere')}
                  value={couponCode}
                  onChangeText={(text) => setCouponCode(text.toUpperCase())}
                  autoCapitalize="characters"
                  maxLength={25}
                  autoFocus
                  containerStyle={{
                    borderRadius: 28,
                    borderWidth: 3,
                    backgroundColor: '#FAFAFA',
                    borderColor: couponCode ? '#A855F7' : '#E5E7EB',
                    paddingHorizontal: 24,
                    paddingVertical: 20,
                  }}
                  inputStyle={{
                    fontSize: 20,
                    fontFamily: 'monospace',
                    letterSpacing: 4,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}
                />
                
                {couponCode && (
                  <Text 
                    className="font-tajawal text-sm text-gray-500 mt-3 text-center"
                    style={{ textAlign: isRTL ? 'right' : 'center' }}
                  >
                    {couponCode.length}/25 {t('coupon.characterCount')}
                  </Text>
                )}
              </View>

              {/* Redeem Button with Gradient Effect */}
              <CurvedButton
                title={isLoading ? t('coupon.redeeming') : `🎁 ${t('coupon.redeemCouponButton')}`}
                onPress={handleRedeemCoupon}
                disabled={isLoading || !couponCode.trim()}
                loading={isLoading}
                variant="secondary"
                size="large"
                fullWidth
                style={{
                  borderRadius: 32,
                  shadowColor: '#A855F7',
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.4,
                  shadowRadius: 20,
                  elevation: 16,
                }}
              />

              {/* Help Section with Curved Design */}
              <View 
                className="mt-10 p-6 rounded-3xl"
                style={{ backgroundColor: '#F0F9FF' }}
              >
                <View 
                  className="flex-row items-center mb-4"
                  style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                >
                  <View 
                    className="w-10 h-10 rounded-2xl items-center justify-center mr-3"
                    style={{ backgroundColor: '#0EA5E9' }}
                  >
                    <Ionicons name="bulb" size={20} color="white" />
                  </View>
                  <Text 
                    className="font-tajawal-bold text-blue-800 text-lg"
                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {t('coupon.quickTips')}
                  </Text>
                </View>
                <View className="space-y-2">
                  <Text 
                    className="font-tajawal text-blue-700 text-base leading-6"
                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {t('coupon.couponCaseInsensitive')}
                  </Text>
                  <Text 
                    className="font-tajawal text-blue-700 text-base leading-6"
                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {t('coupon.canContainLetters')}
                  </Text>
                  <Text 
                    className="font-tajawal text-blue-700 text-base leading-6"
                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {t('coupon.stableInternetConnection')}
                  </Text>
                </View>
              </View>
            </CurvedCard>

            {/* Footer with Curved Design */}
            <View className="items-center mt-12">
              <TouchableOpacity 
                onPress={() => navigation.goBack()}
                className="flex-row items-center"
                style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
              >
                <Ionicons 
                  name={isRTL ? "arrow-forward" : "arrow-back"} 
                  size={20} 
                  color="#6B7280" 
                />
                <Text 
                  className="font-tajawal text-gray-600 ml-3 text-lg"
                  style={{ textAlign: isRTL ? 'right' : 'left' }}
                >
                  {t('coupon.backToHome')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Decorative Elements */}
            <View className="absolute top-32 right-12 opacity-20">
              <View 
                className="w-20 h-20 rounded-full"
                style={{ backgroundColor: '#22C55E' }}
              />
            </View>
            <View className="absolute bottom-40 left-12 opacity-20">
              <View 
                className="w-16 h-16 rounded-full"
                style={{ backgroundColor: '#F59E0B' }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
