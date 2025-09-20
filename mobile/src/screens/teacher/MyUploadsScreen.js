import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MyUploadsScreen = () => {
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUploads([
        {
          id: "1",
          title: "Introduction to React Native",
          status: "approved",
          createdAt: "2024-01-15",
          adminNotes: "Great content! Approved.",
        },
        {
          id: "2",
          title: "Advanced JavaScript Concepts",
          status: "pending",
          createdAt: "2024-01-14",
          adminNotes: null,
        },
        {
          id: "3",
          title: "Database Design Principles",
          status: "rejected",
          createdAt: "2024-01-13",
          adminNotes: "Please improve video quality and add more examples.",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return "checkmark-circle";
      case "pending":
        return "time";
      case "rejected":
        return "close-circle";
      default:
        return "help-circle";
    }
  };

  const UploadCard = ({ upload }) => (
    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row items-start justify-between mb-3">
        <Text className="text-lg font-bold text-gray-800 flex-1 pr-4">
          {upload.title}
        </Text>
        <View
          className={`px-3 py-1 rounded-full border ${getStatusColor(
            upload.status
          )}`}
        >
          <View className="flex-row items-center">
            <Ionicons
              name={getStatusIcon(upload.status)}
              size={16}
              color={
                upload.status === "approved"
                  ? "#059669"
                  : upload.status === "pending"
                  ? "#D97706"
                  : "#DC2626"
              }
              style={{ marginRight: 4 }}
            />

            <Text
              className={`text-sm font-medium capitalize ${
                upload.status === "approved"
                  ? "text-green-800"
                  : upload.status === "pending"
                  ? "text-yellow-800"
                  : "text-red-800"
              }`}
            >
              {upload.status}
            </Text>
          </View>
        </View>
      </View>

      <Text className="text-sm text-gray-500 mb-3">
        Uploaded on {new Date(upload.createdAt).toLocaleDateString()}
      </Text>

      {upload.adminNotes && (
        <View className="bg-gray-50 rounded-xl p-3">
          <Text className="text-sm font-medium text-gray-700 mb-1">
            Admin Notes:
          </Text>
          <Text className="text-sm text-gray-600">{upload.adminNotes}</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchUploads} />
      }
    >
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          My Uploads
        </Text>

        {uploads.length === 0 ? (
          <View className="bg-white rounded-2xl p-8 items-center shadow-sm">
            <Ionicons name="cloud-upload-outline" size={64} color="#D1D5DB" />
            <Text className="text-xl font-semibold text-gray-600 mt-4 mb-2">
              No uploads yet
            </Text>
            <Text className="text-base text-gray-500 text-center">
              Start creating content by uploading your first lesson
            </Text>
          </View>
        ) : (
          uploads.map((upload) => (
            <UploadCard key={upload.id} upload={upload} />
          ))
        )}
      </View>
    </ScrollView>
  );
};
