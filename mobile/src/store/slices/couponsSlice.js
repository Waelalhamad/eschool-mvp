import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { couponsAPI } from '../../services/api';

export const redeemCoupon = createAsyncThunk(
  'coupons/redeemCoupon',
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await couponsAPI.redeemCoupon(couponCode);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to redeem coupon');
    }
  }
);

export const fetchAvailableCoupons = createAsyncThunk(
  'coupons/fetchAvailableCoupons',
  async (_, { rejectWithValue }) => {
    try {
      const coupons = await couponsAPI.getAvailableCoupons();
      return coupons;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch coupons');
    }
  }
);

const couponsSlice = createSlice({
  name: 'coupons',
  initialState: {
    availableCoupons: [],
    redeemedCoupons: [],
    isLoading: false,
    error: null,
    lastRedeemed: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearLastRedeemed: (state) => {
      state.lastRedeemed = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(redeemCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(redeemCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastRedeemed = action.payload;
        state.redeemedCoupons.push(action.payload);
        state.error = null;
      })
      .addCase(redeemCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAvailableCoupons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAvailableCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.availableCoupons = action.payload;
      })
      .addCase(fetchAvailableCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearLastRedeemed } = couponsSlice.actions;
export default couponsSlice.reducer;