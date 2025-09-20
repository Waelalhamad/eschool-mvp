// mobile/src/screens/teacher/UploadContentScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UploadContentScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    pdfUrl: '',
    courseId: '',
    order: '1',
    quiz: {
      questions: [
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
        }
      ]
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const extractYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.youtubeUrl) {
      Alert.alert('Error', 'Please fill in required fields');
      return;
    }

    const youtubeId = extractYouTubeId(formData.youtubeUrl);
    if (!youtubeId) {
      Alert.alert('Error', 'Please enter a valid YouTube URL');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success!',
        'Your content has been submitted for admin approval.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit content. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateQuestion = (questionIndex, field, value) => {
    const updatedQuiz = { ...formData.quiz };
    updatedQuiz.questions[questionIndex][field] = value;
    setFormData({ ...formData, quiz: updatedQuiz });
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuiz = { ...formData.quiz };
    updatedQuiz.questions[questionIndex].options[optionIndex] = value;
    setFormData({ ...formData, quiz: updatedQuiz });
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          Upload New Content
        </Text>

        {/* Basic Information */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Basic Information
          </Text>

          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Lesson Title *
          </Text>
          <TextInput
            className="border border-gray-200 px-4 py-3 rounded-xl mb-4 bg-gray-50"
            placeholder="Enter lesson title"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />

          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Description
          </Text>
          <TextInput
            className="border border-gray-200 px-4 py-3 rounded-xl mb-4 bg-gray-50"
            placeholder="Enter lesson description"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
            numberOfLines={3}
          />

          <Text className="text-sm font-semibold text-gray-700 mb-2">
            YouTube URL *
          </Text>
          <TextInput
            className="border border-gray-200 px-4 py-3 rounded-xl mb-4 bg-gray-50"
            placeholder="https://www.youtube.com/watch?v=..."
            value={formData.youtubeUrl}
            onChangeText={(text) => setFormData({ ...formData, youtubeUrl: text })}
            keyboardType="url"
          />

          <Text className="text-sm font-semibold text-gray-700 mb-2">
            PDF Resource URL (Optional)
          </Text>
          <TextInput
            className="border border-gray-200 px-4 py-3 rounded-xl bg-gray-50"
            placeholder="https://example.com/resource.pdf"
            value={formData.pdfUrl}
            onChangeText={(text) => setFormData({ ...formData, pdfUrl: text })}
            keyboardType="url"
          />
        </View>

        {/* Quiz Section */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Quiz Questions
          </Text>

          {formData.quiz.questions.map((question, qIndex) => (
            <View key={qIndex} className="mb-6">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Question {qIndex + 1}
              </Text>
              <TextInput
                className="border border-gray-200 px-4 py-3 rounded-xl mb-3 bg-gray-50"
                placeholder="Enter your question"
                value={question.question}
                onChangeText={(text) => updateQuestion(qIndex, 'question', text)}
                multiline
              />

              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Answer Options
              </Text>
              {question.options.map((option, oIndex) => (
                <View key={oIndex} className="flex-row items-center mb-2">
                  <TouchableOpacity
                    className={`w-6 h-6 rounded-full border-2 mr-3 ${
                      question.correctAnswer === oIndex
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300'
                    }`}
                    onPress={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                  >
                    {question.correctAnswer === oIndex && (
                      <View className="flex-1 items-center justify-center">
                        <Ionicons name="checkmark" size={16} color="white" />
                      </View>
                    )}
                  </TouchableOpacity>
                  <TextInput
                    className="flex-1 border border-gray-200 px-3 py-2 rounded-lg bg-gray-50"
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChangeText={(text) => updateOption(qIndex, oIndex, text)}
                  />
                </View>
              ))}
              <Text className="text-xs text-gray-500 mt-1">
                Tap the circle to mark the correct answer
              </Text>
            </View>
          ))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className={`py-4 rounded-xl ${
            isSubmitting ? 'bg-blue-300' : 'bg-blue-600'
          }`}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text className="text-white text-lg font-bold text-center">
            {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
