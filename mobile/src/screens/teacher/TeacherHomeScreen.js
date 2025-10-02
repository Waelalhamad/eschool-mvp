import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const TeacherHomeScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalUploads: 12,
    pendingApproval: 3,
    approved: 8,
    rejected: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const StatCard = ({ icon, title, value, color }) => (
    <View style={{ 
      backgroundColor: color, 
      borderRadius: 16, 
      padding: 16, 
      flex: 1, 
      marginRight: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{value}</Text>
          <Text style={{ color: 'white', fontSize: 14, opacity: 0.9, marginTop: 4 }}>{title}</Text>
        </View>
        <Ionicons name={icon} size={32} color="white" />
      </View>
    </View>
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F9FAFB' }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
    >
      {/* Header */}
      <View style={{ backgroundColor: 'white', paddingHorizontal: 24, paddingVertical: 32, marginBottom: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 }}>
          Welcome back, {user?.name}!
        </Text>
        <Text style={{ fontSize: 18, color: '#6B7280' }}>
          Ready to create amazing content today?
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>Quick Actions</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#3B82F6',
              borderRadius: 16,
              padding: 24,
              flex: 1,
              marginRight: 12,
              shadowColor: '#3B82F6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6
            }}
            onPress={() => navigation.navigate('Upload')}
          >
            <Ionicons name="cloud-upload" size={32} color="white" />
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>
              Upload Content
            </Text>
            <Text style={{ color: 'white', fontSize: 14, opacity: 0.9, marginTop: 4 }}>
              Add new lessons
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#059669',
              borderRadius: 16,
              padding: 24,
              flex: 1,
              shadowColor: '#059669',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6
            }}
            onPress={() => navigation.navigate('MyUploads')}
          >
            <Ionicons name="folder-open" size={32} color="white" />
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>
              My Uploads
            </Text>
            <Text style={{ color: 'white', fontSize: 14, opacity: 0.9, marginTop: 4 }}>
              View submissions
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Statistics */}
      <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>Statistics</Text>
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          <StatCard
            icon="documents"
            title="Total Uploads"
            value={stats.totalUploads}
            color="#3B82F6"
          />
          <StatCard
            icon="time"
            title="Pending"
            value={stats.pendingApproval}
            color="#F59E0B"
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <StatCard
            icon="checkmark-circle"
            title="Approved"
            value={stats.approved}
            color="#059669"
          />
          <StatCard
            icon="close-circle"
            title="Rejected"
            value={stats.rejected}
            color="#DC2626"
          />
        </View>
      </View>

      {/* Recent Activity */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 32 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>Recent Activity</Text>
        <View style={{ 
          backgroundColor: 'white', 
          borderRadius: 16, 
          padding: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4
        }}>
          <View style={{ alignItems: 'center', paddingVertical: 32 }}>
            <Ionicons name="document-text-outline" size={48} color="#D1D5DB" />
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#6B7280', marginTop: 16 }}>
              No recent activity
            </Text>
            <Text style={{ color: '#9CA3AF', textAlign: 'center', marginTop: 8 }}>
              Your upload activity will appear here
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TeacherHomeScreen;