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

  const getStatusColors = (status) => {
    switch (status) {
      case "approved":
        return { bg: '#DCFCE7', text: '#059669', border: '#BBF7D0' };
      case "pending":
        return { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A' };
      case "rejected":
        return { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA' };
      default:
        return { bg: '#F3F4F6', text: '#6B7280', border: '#E5E7EB' };
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

  const UploadCard = ({ upload }) => {
    const colors = getStatusColors(upload.status);
    
    return (
      <View style={{ 
        backgroundColor: 'white', 
        borderRadius: 16, 
        padding: 24, 
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#F3F4F6'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937', flex: 1, paddingRight: 16 }}>
            {upload.title}
          </Text>
          <View style={{ 
            paddingHorizontal: 12, 
            paddingVertical: 6, 
            borderRadius: 20,
            backgroundColor: colors.bg,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                name={getStatusIcon(upload.status)}
                size={16}
                color={colors.text}
                style={{ marginRight: 4 }}
              />
              <Text style={{ fontSize: 14, fontWeight: '500', color: colors.text, textTransform: 'capitalize' }}>
                {upload.status}
              </Text>
            </View>
          </View>
        </View>

        <Text style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 12 }}>
          Uploaded on {new Date(upload.createdAt).toLocaleDateString()}
        </Text>

        {upload.adminNotes && (
          <View style={{ backgroundColor: '#F9FAFB', borderRadius: 12, padding: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 4 }}>
              Admin Notes:
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>{upload.adminNotes}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F9FAFB' }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchUploads} />
      }
    >
      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 24 }}>
          My Uploads
        </Text>

        {uploads.length === 0 ? (
          <View style={{ 
            backgroundColor: 'white', 
            borderRadius: 16, 
            padding: 32, 
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4
          }}>
            <Ionicons name="cloud-upload-outline" size={64} color="#D1D5DB" />
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#6B7280', marginTop: 16, marginBottom: 8 }}>
              No uploads yet
            </Text>
            <Text style={{ fontSize: 16, color: '#9CA3AF', textAlign: 'center' }}>
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

export default MyUploadsScreen;