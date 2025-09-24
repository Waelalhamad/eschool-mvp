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
import { register, clearError } from '../../store/slices/authSlice';
import { useLocalization } from '../../context/LocalizationContext';
import CurvedCard from '../../components/CurvedCard';
import CurvedButton from '../../components/CurvedButton';
import CurvedInput from '../../components/CurvedInput';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const { t, isRTL } = useLocalization();

  useEffect(() => {
    dispatch(clearError());
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Registration Failed', error);
    }
  }, [error]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert(t('common.error'), t('auth.nameRequired'));
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert(t('common.error'), t('auth.emailRequired'));
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Alert.alert(t('common.error'), t('auth.invalidEmail'));
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert(t('common.error'), t('auth.passwordTooShort'));
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert(t('common.error'), t('auth.passwordsNotMatch'));
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await dispatch(register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role,
      })).unwrap();
      
      Alert.alert(
        t('auth.welcomeToESchool'),
        t('auth.accountCreatedSuccess'),
        [{ text: t('auth.getStarted'), onPress: () => navigation.navigate('Login') }]
      );
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
            <View className="items-center mb-8">
              {/* Modern Curved Logo Container */}
              <View 
                className="w-28 h-28 rounded-4xl items-center justify-center mb-6 shadow-2xl"
                style={{
                  backgroundColor: '#A855F7',
                  shadowColor: '#A855F7',
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.4,
                  shadowRadius: 20,
                  elevation: 15,
                  transform: [{ rotate: '-5deg' }]
                }}
              >
                <Ionicons name="school" size={40} color="white" />
              </View>
              
              <Text 
                className="font-tajawal-bold text-5xl text-gray-800 mb-3 text-center"
                style={{ textAlign: isRTL ? 'right' : 'center' }}
              >
                {t('auth.joinESchool')}
              </Text>
              <Text 
                className="font-tajawal text-xl text-gray-600 leading-7 text-center px-4"
                style={{ textAlign: isRTL ? 'right' : 'center' }}
              >
                {t('auth.createAccountContinue')}
              </Text>
            </View>

            {/* Main Register Card with Super Curved Design */}
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
                {/* Name Field */}
                <CurvedInput
                  label={t('auth.fullName')}
                  placeholder={t('auth.enterFullName')}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  leftIcon="person-outline"
                  containerStyle={{
                    borderRadius: 24,
                    borderWidth: 2,
                    backgroundColor: '#FAFAFA',
                  }}
                />

                {/* Email Field */}
                <CurvedInput
                  label={t('auth.emailAddress')}
                  placeholder={t('auth.enterEmail')}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
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
                  placeholder={t('auth.password')}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry={!showPassword}
                  leftIcon="lock-closed-outline"
                  containerStyle={{
                    borderRadius: 24,
                    borderWidth: 2,
                    backgroundColor: '#FAFAFA',
                  }}
                />

                {/* Confirm Password Field */}
                <CurvedInput
                  label={t('auth.confirmPassword')}
                  placeholder={t('auth.confirmYourPassword')}
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  secureTextEntry={!showConfirmPassword}
                  leftIcon="lock-closed-outline"
                  containerStyle={{
                    borderRadius: 24,
                    borderWidth: 2,
                    backgroundColor: '#FAFAFA',
                  }}
                />

                {/* Role Selection with Curved Design */}
                <View>
                  <Text 
                    className="font-tajawal-bold text-sm text-gray-700 mb-4"
                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {t('auth.accountType')}
                  </Text>
                  <View 
                    className="flex-row space-x-3"
                    style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                  >
                    {[
                      { value: 'student', label: t('auth.student'), icon: 'book-outline' },
                      { value: 'teacher', label: t('auth.teacher'), icon: 'school-outline' },
                    ].map((role) => (
                      <TouchableOpacity
                        key={role.value}
                        className={`flex-1 flex-row items-center justify-center py-4 rounded-3xl border-2 ${
                          formData.role === role.value
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                        onPress={() => handleInputChange('role', role.value)}
                        style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                      >
                        <Ionicons
                          name={role.icon}
                          size={20}
                          color={formData.role === role.value ? '#A855F7' : '#6B7280'}
                        />
                        <Text
                          className={`font-tajawal-bold ml-2 ${
                            formData.role === role.value ? 'text-purple-700' : 'text-gray-600'
                          }`}
                        >
                          {role.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {/* Register Button with Gradient Effect */}
              <CurvedButton
                title={isLoading ? t('auth.creatingAccount') : `🚀 ${t('auth.createAccount')}`}
                onPress={handleRegister}
                disabled={isLoading}
                loading={isLoading}
                variant="secondary"
                size="large"
                fullWidth
                style={{
                  marginTop: 32,
                  borderRadius: 28,
                  shadowColor: '#A855F7',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.4,
                  shadowRadius: 16,
                  elevation: 12,
                }}
              />

              {/* Terms and Privacy */}
              <Text 
                className="font-tajawal text-xs text-gray-500 text-center mt-6 leading-5"
                style={{ textAlign: isRTL ? 'right' : 'center' }}
              >
                {t('auth.byCreatingAccount')}{' '}
                <Text className="font-tajawal-bold text-purple-600">{t('auth.termsOfService')}</Text>
                {' '}{t('auth.and')}{' '}
                <Text className="font-tajawal-bold text-purple-600">{t('auth.privacyPolicy')}</Text>
              </Text>

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
                  onPress={() => navigation.navigate('Login')}
                  className="flex-row items-center"
                  style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                >
                  <Text className="font-tajawal text-gray-600 text-lg">
                    {t('auth.alreadyHaveAccount')}{' '}
                  </Text>
                  <Text 
                    className="font-tajawal-bold text-purple-600 text-lg"
                    style={{ textDecorationLine: 'underline' }}
                  >
                    {t('auth.signIn')}
                  </Text>
                </TouchableOpacity>
              </View>
            </CurvedCard>

            {/* Decorative Elements */}
            <View className="absolute top-20 left-8 opacity-20">
              <View 
                className="w-16 h-16 rounded-full"
                style={{ backgroundColor: '#22C55E' }}
              />
            </View>
            <View className="absolute bottom-32 right-8 opacity-20">
              <View 
                className="w-12 h-12 rounded-full"
                style={{ backgroundColor: '#F59E0B' }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;