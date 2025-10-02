import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity, // Added missing import
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F9FF" />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#F0F9FF' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 32 }}>
            {/* Header Section */}
            <View style={{ alignItems: 'center', marginBottom: 32 }}>
              {/* Logo Container */}
              <View 
                style={{
                  width: 112,
                  height: 112,
                  borderRadius: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
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
                style={{
                  fontSize: 40,
                  fontWeight: 'bold',
                  color: '#1F2937',
                  marginBottom: 12,
                  textAlign: isRTL ? 'right' : 'center'
                }}
              >
                {t('auth.joinESchool')}
              </Text>
              <Text 
                style={{
                  fontSize: 20,
                  color: '#6B7280',
                  lineHeight: 28,
                  textAlign: isRTL ? 'right' : 'center',
                  paddingHorizontal: 16
                }}
              >
                {t('auth.createAccountContinue')}
              </Text>
            </View>

            {/* Main Register Card */}
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
              <View style={{ marginBottom: 24 }}>
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
                  secureTextEntry
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
                  secureTextEntry
                  leftIcon="lock-closed-outline"
                  containerStyle={{
                    borderRadius: 24,
                    borderWidth: 2,
                    backgroundColor: '#FAFAFA',
                  }}
                />

                {/* Role Selection */}
                <View>
                  <Text 
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#374151',
                      marginBottom: 16,
                      textAlign: isRTL ? 'right' : 'left'
                    }}
                  >
                    {t('auth.accountType')}
                  </Text>
                  <View 
                    style={{ 
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                      gap: 12
                    }}
                  >
                    {[
                      { value: 'student', label: t('auth.student'), icon: 'book-outline' },
                      { value: 'teacher', label: t('auth.teacher'), icon: 'school-outline' },
                    ].map((role) => (
                      <TouchableOpacity
                        key={role.value}
                        style={{
                          flex: 1,
                          flexDirection: isRTL ? 'row-reverse' : 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingVertical: 16,
                          borderRadius: 24,
                          borderWidth: 2,
                          borderColor: formData.role === role.value ? '#A855F7' : '#E5E7EB',
                          backgroundColor: formData.role === role.value ? '#F3E8FF' : '#F9FAFB',
                        }}
                        onPress={() => handleInputChange('role', role.value)}
                      >
                        <Ionicons
                          name={role.icon}
                          size={20}
                          color={formData.role === role.value ? '#A855F7' : '#6B7280'}
                        />
                        <Text
                          style={{
                            fontWeight: 'bold',
                            marginLeft: 8,
                            color: formData.role === role.value ? '#7C3AED' : '#6B7280'
                          }}
                        >
                          {role.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {/* Register Button */}
              <CurvedButton
                title={isLoading ? t('auth.creatingAccount') : t('auth.createAccount')}
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
                style={{
                  fontSize: 12,
                  color: '#6B7280',
                  textAlign: isRTL ? 'right' : 'center',
                  marginTop: 24,
                  lineHeight: 20
                }}
              >
                {t('auth.byCreatingAccount')}{' '}
                <Text style={{ fontWeight: 'bold', color: '#7C3AED' }}>{t('auth.termsOfService')}</Text>
                {' '}{t('auth.and')}{' '}
                <Text style={{ fontWeight: 'bold', color: '#7C3AED' }}>{t('auth.privacyPolicy')}</Text>
              </Text>

              {/* Footer */}
              <View 
                style={{
                  alignItems: 'center',
                  marginTop: 32,
                  paddingTop: 24,
                  borderTopWidth: 1,
                  borderTopColor: '#F3F4F6',
                }}
              >
                <TouchableOpacity 
                  onPress={() => navigation.navigate('Login')}
                  style={{
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ fontSize: 18, color: '#6B7280' }}>
                    {t('auth.alreadyHaveAccount')}{' '}
                  </Text>
                  <Text 
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#7C3AED',
                      textDecorationLine: 'underline'
                    }}
                  >
                    {t('auth.signIn')}
                  </Text>
                </TouchableOpacity>
              </View>
            </CurvedCard>

            {/* Decorative Elements */}
            <View style={{ position: 'absolute', top: 80, left: 32, opacity: 0.2 }}>
              <View 
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: '#22C55E'
                }}
              />
            </View>
            <View style={{ position: 'absolute', bottom: 128, right: 32, opacity: 0.2 }}>
              <View 
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#F59E0B'
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
