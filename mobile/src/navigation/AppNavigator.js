import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

// Auth Screens
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

// Student Screens
import HomeScreen from "../screens/student/HomeScreen";
import CoursesScreen from "../screens/student/CoursesScreen";
import LessonsScreen from "../screens/student/LessonsScreen";
import LessonDetailScreen from "../screens/student/LessonDetailScreen";
import ProfileScreen from "../screens/student/ProfileScreen";
import RedeemCouponScreen from "../screens/student/RedeemCouponScreen";

// Teacher Screens
import TeacherHomeScreen from "../screens/teacher/TeacherHomeScreen";
import UploadContentScreen from "../screens/teacher/UploadContentScreen";
import MyUploadsScreen from "../screens/teacher/MyUploadsScreen";

// Admin Screens
import AdminHomeScreen from "../screens/admin/AdminHomeScreen";
import ReviewUploadsScreen from "../screens/admin/ReviewUploadsScreen";
import ManageCouponsScreen from "../screens/admin/ManageCouponsScreen";
import UsersManagementScreen from "../screens/admin/UsersManagementScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const StudentTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Courses") {
          iconName = focused ? "book" : "book-outline";
        } else if (route.name === "Profile") {
          iconName = focused ? "person" : "person-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#3B82F6",
      tabBarInactiveTintColor: "#6B7280",
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Courses" component={CoursesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const TeacherTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Dashboard") {
          iconName = focused ? "analytics" : "analytics-outline";
        } else if (route.name === "Upload") {
          iconName = focused ? "cloud-upload" : "cloud-upload-outline";
        } else if (route.name === "MyUploads") {
          iconName = focused ? "folder" : "folder-outline";
        } else if (route.name === "Profile") {
          iconName = focused ? "person" : "person-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#059669",
      tabBarInactiveTintColor: "#6B7280",
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={TeacherHomeScreen} />
    <Tab.Screen name="Upload" component={UploadContentScreen} />
    <Tab.Screen name="MyUploads" component={MyUploadsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AdminTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Dashboard") {
          iconName = focused ? "speedometer" : "speedometer-outline";
        } else if (route.name === "Reviews") {
          iconName = focused ? "checkmark-circle" : "checkmark-circle-outline";
        } else if (route.name === "Coupons") {
          iconName = focused ? "gift" : "gift-outline";
        } else if (route.name === "Users") {
          iconName = focused ? "people" : "people-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#DC2626",
      tabBarInactiveTintColor: "#6B7280",
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={AdminHomeScreen} />
    <Tab.Screen name="Reviews" component={ReviewUploadsScreen} />
    <Tab.Screen name="Coupons" component={ManageCouponsScreen} />
    <Tab.Screen name="Users" component={UsersManagementScreen} />
  </Tab.Navigator>
);

const StudentStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="StudentTabs"
      component={StudentTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Lessons"
      component={LessonsScreen}
      options={{ title: "Course Lessons" }}
    />
    <Stack.Screen
      name="LessonDetail"
      component={LessonDetailScreen}
      options={{ title: "Lesson" }}
    />
    <Stack.Screen
      name="RedeemCoupon"
      component={RedeemCouponScreen}
      options={{ title: "Redeem Coupon" }}
    />
  </Stack.Navigator>
);

const TeacherStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="TeacherTabs"
      component={TeacherTabs}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const AdminStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AdminTabs"
      component={AdminTabs}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <AuthStack />;
  }

  switch (user?.role) {
    case "student":
      return <StudentStack />;
    case "teacher":
      return <TeacherStack />;
    case "admin":
      return <AdminStack />;
    default:
      return <AuthStack />;
  }
};

export default AppNavigator;
