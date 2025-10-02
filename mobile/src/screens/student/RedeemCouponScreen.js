import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  redeemCoupon,
  clearError,
  clearLastRedeemed,
} from "../../store/slices/couponsSlice";
import { useLocalization } from "../../context/LocalizationContext";
import CurvedCard from "../../components/CurvedCard";
import CurvedButton from "../../components/CurvedButton";
import CurvedInput from "../../components/CurvedInput";

const RedeemCouponScreen = ({ navigation }) => {
  const [couponCode, setCouponCode] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error, lastRedeemed } = useSelector(
    (state) => state.coupons
  );
  const { t, isRTL } = useLocalization();

  useEffect(() => {
    dispatch(clearError());

    return () => {
      dispatch(clearLastRedeemed());
    };
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("Redemption Failed", error);
    }
  }, [error]);

  useEffect(() => {
    if (lastRedeemed) {
      Alert.alert(
        t("coupon.success"),
        t("coupon.couponRedeemedSuccess") +
          "\n\n" +
          t("coupon.unlockedCourses", {
            count: lastRedeemed.unlockedCourses?.length || 0,
          }),
        [
          {
            text: t("coupon.startLearning"),
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  }, [lastRedeemed]);

  const handleRedeemCoupon = async () => {
    if (!couponCode.trim()) {
      Alert.alert(t("common.error"), "Please enter a coupon code");
      return;
    }

    try {
      await dispatch(redeemCoupon(couponCode.trim().toUpperCase())).unwrap();
    } catch (err) {
      // Error is handled by useEffect
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F9FF" />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#F0F9FF" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              paddingHorizontal: 24,
              paddingVertical: 32,
            }}
          >
            {/* Header Section */}
            <View style={{ alignItems: "center", marginBottom: 48 }}>
              {/* Gift Container */}
              <View
                style={{
                  width: 128,
                  height: 128,
                  borderRadius: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 32,
                  backgroundColor: "#A855F7",
                  shadowColor: "#A855F7",
                  shadowOffset: { width: 0, height: 16 },
                  shadowOpacity: 0.4,
                  shadowRadius: 24,
                  elevation: 20,
                  transform: [{ rotate: "8deg" }],
                }}
              >
                <Ionicons name="gift" size={48} color="white" />
              </View>

              <Text
                style={{
                  fontSize: 36,
                  fontWeight: "bold",
                  color: "#1F2937",
                  marginBottom: 16,
                  textAlign: isRTL ? "right" : "center",
                }}
              >
                {t("coupon.redeemCoupon")}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "#6B7280",
                  textAlign: isRTL ? "right" : "center",
                  lineHeight: 28,
                  paddingHorizontal: 16,
                }}
              >
                {t("coupon.enterCouponCode")}
              </Text>
            </View>

            {/* Main Coupon Card */}
            <CurvedCard
              containerStyle={{
                borderRadius: 36,
                padding: 40,
                marginHorizontal: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 24 },
                shadowOpacity: 0.15,
                shadowRadius: 48,
                elevation: 24,
              }}
            >
              {/* Input Section */}
              <View style={{ marginBottom: 40 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#374151",
                    marginBottom: 24,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t("coupon.couponCode")}
                </Text>

                <CurvedInput
                  placeholder={t("coupon.enterCodeHere")}
                  value={couponCode}
                  onChangeText={(text) => setCouponCode(text.toUpperCase())}
                  autoCapitalize="characters"
                  maxLength={25}
                  autoFocus
                  containerStyle={{
                    borderRadius: 28,
                    borderWidth: 3,
                    backgroundColor: "#FAFAFA",
                    borderColor: couponCode ? "#A855F7" : "#E5E7EB",
                    paddingHorizontal: 24,
                    paddingVertical: 20,
                  }}
                  inputStyle={{
                    fontSize: 20,
                    fontFamily: "monospace",
                    letterSpacing: 4,
                    textAlign: "center",
                  }}
                />

                {couponCode && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#6B7280",
                      marginTop: 12,
                      textAlign: isRTL ? "right" : "center",
                    }}
                  >
                    {couponCode.length}/25 {t("coupon.characterCount")}
                  </Text>
                )}
              </View>

              {/* Redeem Button */}
              <CurvedButton
                title={
                  isLoading
                    ? t("coupon.redeeming")
                    : t("coupon.redeemCouponButton")
                }
                onPress={handleRedeemCoupon}
                disabled={isLoading || !couponCode.trim()}
                loading={isLoading}
                variant="secondary"
                size="large"
                fullWidth
                style={{
                  borderRadius: 32,
                  shadowColor: "#A855F7",
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.4,
                  shadowRadius: 20,
                  elevation: 16,
                }}
              />

              {/* Help Section */}
              <View
                style={{
                  marginTop: 40,
                  padding: 24,
                  borderRadius: 24,
                  backgroundColor: "#F0F9FF",
                }}
              >
                <View
                  style={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 16,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                      backgroundColor: "#0EA5E9",
                    }}
                  >
                    <Ionicons name="bulb" size={20} color="white" />
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#1e40af",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {t("coupon.quickTips")}
                  </Text>
                </View>
                <View style={{ gap: 8 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#1d4ed8",
                      lineHeight: 24,
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    • {t("coupon.couponCaseInsensitive")}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#1d4ed8",
                      lineHeight: 24,
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    • {t("coupon.canContainLetters")}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#1d4ed8",
                      lineHeight: 24,
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    • {t("coupon.stableInternetConnection")}
                  </Text>
                </View>
              </View>
            </CurvedCard>

            {/* Footer */}
            <View style={{ alignItems: "center", marginTop: 48 }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  flexDirection: isRTL ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name={isRTL ? "arrow-forward" : "arrow-back"}
                  size={20}
                  color="#6B7280"
                />
                <Text
                  style={{
                    color: "#6B7280",
                    marginLeft: 12,
                    fontSize: 18,
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t("coupon.backToHome")}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Decorative Elements */}
            <View
              style={{
                position: "absolute",
                top: 128,
                right: 48,
                opacity: 0.2,
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: "#22C55E",
                }}
              />
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 160,
                left: 48,
                opacity: 0.2,
              }}
            >
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: "#F59E0B",
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RedeemCouponScreen;
