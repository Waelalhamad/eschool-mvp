import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity, // Added this import
  
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
            <View style={{ alignItems: 'center', marginBottom: 48 }}>
              {/* Logo Container */}
              <View 
                style={{
                  width: 112,
                  height: 112,
                  borderRadius: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
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
                style={{
                  fontSize: 40,
                  fontWeight: 'bold',
                  color: '#1F2937',
                  marginBottom: 12,
                  textAlign: isRTL ? 'right' : 'center'
                }}
              >
                {t('auth.welcomeBack')}
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
                {t('auth.signInToContinue')}
              </Text>
            </View>

            {/* Main Login Card */}
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

              {/* Sign In Button */}
              <CurvedButton
                title={isLoading ? t('auth.signingIn') : t('auth.signIn')}
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

              {/* Footer */}
              <View 
                style={{
                  alignItems: 'center',
                  marginTop: 32,
                  paddingTop: 24,
                  borderTopWidth: 1,
                  borderTopColor: '#F3F4F6',
                  borderTopLeftRadius: isRTL ? 0 : 20,
                  borderTopRightRadius: isRTL ? 20 : 0,
                }}
              >
                <TouchableOpacity 
                  onPress={() => navigation.navigate('Register')}
                  style={{
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ fontSize: 18, color: '#6B7280' }}>
                    {t('auth.dontHaveAccount')}{' '}
                  </Text>
                  <Text 
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#2563EB',
                      textDecorationLine: 'underline'
                    }}
                  >
                    {t('auth.signUp')}
                  </Text>
                </TouchableOpacity>
              </View>
            </CurvedCard>

            {/* Decorative Elements */}
            <View style={{ position: 'absolute', top: 80, right: 32, opacity: 0.2 }}>
              <View 
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: '#A855F7'
                }}
              />
            </View>
            <View style={{ position: 'absolute', bottom: 128, left: 32, opacity: 0.2 }}>
              <View 
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#22C55E'
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;