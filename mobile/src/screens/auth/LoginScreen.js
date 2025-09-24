import React, { useState } from 'react';
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
import { login, clearError } from '../../store/slices/authSlice';
import { useLocalization } from '../../context/LocalizationContext';
import CurvedCard from '../../components/CurvedCard';
import CurvedButton from '../../components/CurvedButton';
import CurvedInput from '../../components/CurvedInput';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const { t, isRTL } = useLocalization();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t('common.error'), t('auth.emailRequired') + ' ' + t('auth.passwordRequired'));
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (err) {
      Alert.alert(t('auth.loginFailed'), err);
    }
  };

  React.useEffect(() => {
    return () => dispatch(clearError());
  }, []);

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
              {/* Modern Curved Logo Container */}
              <View 
                className="w-28 h-28 rounded-4xl items-center justify-center mb-6 shadow-2xl"
                style={{
                  backgroundColor: '#0EA5E9',
                  shadowColor: '#0EA5E9',
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.4,
                  shadowRadius: 20,
                  elevation: 15,
                  transform: [{ rotate: '5deg' }]
                }}
              >
                <Ionicons name="school" size={40} color="white" />
              </View>
              
              <Text 
                className="font-tajawal-bold text-5xl text-gray-800 mb-3 text-center"
                style={{ textAlign: isRTL ? 'right' : 'center' }}
              >
                {t('auth.welcomeBack')}
              </Text>
              <Text 
                className="font-tajawal text-xl text-gray-600 leading-7 text-center px-4"
                style={{ textAlign: isRTL ? 'right' : 'center' }}
              >
                {t('auth.signInToContinue')}
              </Text>
            </View>

            {/* Main Login Card with Super Curved Design */}
            <CurvedCard 
              containerStyle={{
                borderRadius: 32,
                padding: 32,
                marginHorizontal: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.15,
                shadowRadius: 40,
                elevation: 20,
              }}
            >
              {/* Form Fields */}
              <View className="space-y-6">
                {/* Email Field */}
                <CurvedInput
                  label={t('auth.emailAddress')}
                  placeholder={t('auth.enterEmail')}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  leftIcon="mail-outline"
                  containerStyle={{
                    borderRadius: 24,
                    borderWidth: 2,
                    backgroundColor: '#FAFAFA',
                  }}
                />

                {/* Password Field */}
                <CurvedInput
                  label={t('auth.password')}
                  placeholder={t('auth.enterPassword')}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  leftIcon="lock-closed-outline"
                  containerStyle={{
                    borderRadius: 24,
                    borderWidth: 2,
                    backgroundColor: '#FAFAFA',
                  }}
                />
              </View>

              {/* Sign In Button with Gradient Effect */}
              <CurvedButton
                title={isLoading ? t('auth.signingIn') : `🚀 ${t('auth.signIn')}`}
                onPress={handleLogin}
                disabled={isLoading}
                loading={isLoading}
                variant="primary"
                size="large"
                fullWidth
                style={{
                  marginTop: 32,
                  borderRadius: 28,
                  shadowColor: '#0EA5E9',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.4,
                  shadowRadius: 16,
                  elevation: 12,
                }}
              />

              {/* Footer with Curved Design */}
              <View 
                className="items-center mt-8 pt-6"
                style={{ 
                  borderTopWidth: 1, 
                  borderTopColor: '#F3F4F6',
                  borderTopLeftRadius: isRTL ? 0 : 20,
                  borderTopRightRadius: isRTL ? 20 : 0,
                }}
              >
                <TouchableOpacity 
                  onPress={() => navigation.navigate('Register')}
                  className="flex-row items-center"
                  style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                >
                  <Text className="font-tajawal text-gray-600 text-lg">
                    {t('auth.dontHaveAccount')}{' '}
                  </Text>
                  <Text 
                    className="font-tajawal-bold text-blue-600 text-lg"
                    style={{ textDecorationLine: 'underline' }}
                  >
                    {t('auth.signUp')}
                  </Text>
                </TouchableOpacity>
              </View>
            </CurvedCard>

            {/* Decorative Elements */}
            <View className="absolute top-20 right-8 opacity-20">
              <View 
                className="w-16 h-16 rounded-full"
                style={{ backgroundColor: '#A855F7' }}
              />
            </View>
            <View className="absolute bottom-32 left-8 opacity-20">
              <View 
                className="w-12 h-12 rounded-full"
                style={{ backgroundColor: '#22C55E' }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
