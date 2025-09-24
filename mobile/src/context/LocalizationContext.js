import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ar from '../locales/ar';
import en from '../locales/en';

const LocalizationContext = createContext();

const LANGUAGES = {
  ar: { name: 'العربية', translations: ar, isRTL: true },
  en: { name: 'English', translations: en, isRTL: false },
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};

export const LocalizationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('ar'); // Default to Arabic
  const [isRTL, setIsRTL] = useState(true);

  useEffect(() => {
    loadLanguage();
  }, []);

  useEffect(() => {
    setIsRTL(LANGUAGES[currentLanguage].isRTL);
  }, [currentLanguage]);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage && LANGUAGES[savedLanguage]) {
        setCurrentLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const changeLanguage = async (languageCode) => {
    try {
      if (LANGUAGES[languageCode]) {
        setCurrentLanguage(languageCode);
        await AsyncStorage.setItem('selectedLanguage', languageCode);
      }
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key, params = {}) => {
    const keys = key.split('.');
    let translation = LANGUAGES[currentLanguage].translations;
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    // Handle parameter replacement
    if (typeof translation === 'string' && params) {
      return translation.replace(/\{(\w+)\}/g, (match, param) => {
        return params[param] || match;
      });
    }

    return translation || key;
  };

  const getCurrentLanguage = () => currentLanguage;
  const getAvailableLanguages = () => Object.keys(LANGUAGES).map(code => ({
    code,
    name: LANGUAGES[code].name,
    isRTL: LANGUAGES[code].isRTL,
  }));

  const value = {
    t,
    currentLanguage,
    isRTL,
    changeLanguage,
    getCurrentLanguage,
    getAvailableLanguages,
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};