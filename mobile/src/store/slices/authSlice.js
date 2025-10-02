import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock API calls for now - replace with your actual API
const mockLogin = async (credentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful login
  if (credentials.email && credentials.password) {
    return {
      user: {
        id: 1,
        name: 'Test User',
        email: credentials.email,
        role: 'student'
      },
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token'
    };
  }
  
  throw new Error('Invalid credentials');
};

const mockRegister = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful registration
  if (userData.email && userData.password && userData.name) {
    return {
      user: {
        id: 1,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'student'
      },
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token'
    };
  }
  
  throw new Error('Registration failed');
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await mockLogin(credentials);
    
    // Store tokens
    await AsyncStorage.setItem('accessToken', response.accessToken);
    await AsyncStorage.setItem('refreshToken', response.refreshToken);
    await AsyncStorage.setItem('userData', JSON.stringify(response.user));
    
    return response;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData) => {
    const response = await mockRegister(userData);
    
    // Store tokens
    await AsyncStorage.setItem('accessToken', response.accessToken);
    await AsyncStorage.setItem('refreshToken', response.refreshToken);
    await AsyncStorage.setItem('userData', JSON.stringify(response.user));
    
    return response;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    // Clear stored tokens
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userData']);
  }
);

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        return initialState;
      });
  },
});

export const { clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;