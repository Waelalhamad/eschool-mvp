import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReviewUploadsScreen = () => {
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewModal, setReviewModal] = useState({ visible: false, upload: null, action: null });
  const [reviewNotes, setReviewNotes] = useState('');

  useEffect(() => {
    fetchPendingUploads();
  }, []);

  const fetchPendingUploads = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUploads([
        {
          id: '1',
          title: 'Advanced React Hooks',
          description: 'Deep dive into React hooks and custom hooks',
          teacherName: 'Jane Smith',
          createdAt: '2024-01-15T10:30:00Z',
          youtubeId: 'dQw4w9WgXcQ',
          type: 'video',
        },
        {
          id: '2',
          title: 'Database Optimization Techniques',
          description: 'Learn how to optimize database queries for better performance',
          teacherName: 'Mike Johnson',
          createdAt: '2024-01-14T15:45:00Z',
          youtubeId: 'dQw4w9WgXcQ',
          type: 'video',
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleReview = (upload, action) => {
    setReviewModal({ visible: true, upload, action });
    setReviewNotes('');
  };

  const submitReview = async () => {
    const { upload, action } = reviewModal;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove the upload from the list
      setUploads(prev => prev.filter(u => u.id !== upload.id));
      
      Alert.alert(
        'Success',
        `Content ${action === 'approve' ? 'approved' : 'rejected'} successfully!`
      );
      
      setReviewModal({ visible: false, upload: null, action: null });
    } catch (error) {
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    }
  };

  const UploadCard = ({ upload }) => (
    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
      {/* Header */}
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-1 pr-4">
          <Text className="text-lg font-bold text-gray-800 mb-1">
            {upload.title}
          </Text>
          <Text className="text-sm text-gray-600 mb-2">
            by {upload.teacherName}
          </Text>
          <Text className="text-xs text-gray-500">
            Submitted {new Date(upload.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View className="bg-yellow-100 px-3 py-1 rounded-full">
          <Text className="text-yellow-800 text-xs font-medium">PENDING</Text>
        </View>
      </View>

      {/* Description */}
      <Text className="text-gray-700 mb-4 leading-5">
        {upload.description}
      </Text>

      {/* Video Preview */}
      <View className="bg-gray-100 rounded-xl p-4 mb-4">
        <View className="flex-row items-center">
          <Ionicons name="play-circle" size={24} color="#EF4444" />
          <Text className="ml-2 font-medium text-gray-700">YouTube Video</Text>
        </View>
        <Text className="text-sm text-gray-500 mt-1">
          ID: {upload.youtubeId}
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row">
        <TouchableOpacity
          className="bg-green-500 flex-1 py-3 rounded-xl mr-2"
          onPress={() => handleReview(upload, 'approve')}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="checkmark" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Approve</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-500 flex-1 py-3 rounded-xl ml-2"
          onPress={() => handleReview(upload, 'reject')}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="close" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Reject</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <ScrollView
        className="flex-1 bg-gray-50"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchPendingUploads} />
        }
      >
        <View className="p-6">
          <Text className="text-2xl font-bold text-gray-800 mb-6">
            Review Uploads
          </Text>

          {uploads.length === 0 ? (
            <View className="bg-white rounded-2xl p-8 items-center shadow-sm">
              <Ionicons name="checkmark-circle-outline" size={64} color="#10B981" />
              <Text className="text-xl font-semibold text-gray-600 mt-4 mb-2">
                All caught up!
              </Text>
              <Text className="text-base text-gray-500 text-center">
                No pending uploads to review at the moment
              </Text>
            </View>
          ) : (
            uploads.map((upload) => (
              <UploadCard key={upload.id} upload={upload} />
            ))
          )}
        </View>
      </ScrollView>

      {/* Review Modal */}
      <Modal
        visible={reviewModal.visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setReviewModal({ visible: false, upload: null, action: null })}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-xl font-bold text-gray-800">
                {reviewModal.action === 'approve' ? 'Approve' : 'Reject'} Content
              </Text>
              <TouchableOpacity
                onPress={() => setReviewModal({ visible: false, upload: null, action: null })}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text className="text-base text-gray-600 mb-4">
              {reviewModal.action === 'approve' 
                ? 'Add any notes for the teacher (optional):'
                : 'Please provide feedback for rejection:'
              }
            </Text>

            <TextInput
              className="border border-gray-200 px-4 py-3 rounded-xl mb-6 bg-gray-50"
              placeholder={reviewModal.action === 'approve' 
                ? 'Great content! Well done.' 
                : 'Please improve video quality and add more examples.'
              }
              value={reviewNotes}
              onChangeText={setReviewNotes}
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity
              className={`py-4 rounded-xl ${
                reviewModal.action === 'approve' ? 'bg-green-500' : 'bg-red-500'
              }`}
              onPress={submitReview}
            >
              <Text className="text-white text-lg font-bold text-center">
                Confirm {reviewModal.action === 'approve' ? 'Approval' : 'Rejection'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
