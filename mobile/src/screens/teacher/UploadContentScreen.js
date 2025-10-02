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
    <ScrollView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 24 }}>
          Upload New Content
        </Text>

        {/* Basic Information */}
        <View style={{ 
          backgroundColor: 'white', 
          borderRadius: 16, 
          padding: 24, 
          marginBottom: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>
            Basic Information
          </Text>

          <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
            Lesson Title *
          </Text>
          <TextInput
            style={{ 
              borderWidth: 1, 
              borderColor: '#E5E7EB', 
              paddingHorizontal: 16, 
              paddingVertical: 12, 
              borderRadius: 12, 
              marginBottom: 16, 
              backgroundColor: '#F9FAFB',
              fontSize: 16,
              color: '#1F2937'
            }}
            placeholder="Enter lesson title"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />

          <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
            Description
          </Text>
          <TextInput
            style={{ 
              borderWidth: 1, 
              borderColor: '#E5E7EB', 
              paddingHorizontal: 16, 
              paddingVertical: 12, 
              borderRadius: 12, 
              marginBottom: 16, 
              backgroundColor: '#F9FAFB',
              fontSize: 16,
              color: '#1F2937',
              height: 100,
              textAlignVertical: 'top'
            }}
            placeholder="Enter lesson description"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
            numberOfLines={3}
          />

          <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
            YouTube URL *
          </Text>
          <TextInput
            style={{ 
              borderWidth: 1, 
              borderColor: '#E5E7EB', 
              paddingHorizontal: 16, 
              paddingVertical: 12, 
              borderRadius: 12, 
              marginBottom: 16, 
              backgroundColor: '#F9FAFB',
              fontSize: 16,
              color: '#1F2937'
            }}
            placeholder="https://www.youtube.com/watch?v=..."
            value={formData.youtubeUrl}
            onChangeText={(text) => setFormData({ ...formData, youtubeUrl: text })}
            keyboardType="url"
            autoCapitalize="none"
          />

          <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
            PDF Resource URL (Optional)
          </Text>
          <TextInput
            style={{ 
              borderWidth: 1, 
              borderColor: '#E5E7EB', 
              paddingHorizontal: 16, 
              paddingVertical: 12, 
              borderRadius: 12, 
              backgroundColor: '#F9FAFB',
              fontSize: 16,
              color: '#1F2937'
            }}
            placeholder="https://example.com/resource.pdf"
            value={formData.pdfUrl}
            onChangeText={(text) => setFormData({ ...formData, pdfUrl: text })}
            keyboardType="url"
            autoCapitalize="none"
          />
        </View>

        {/* Quiz Section */}
        <View style={{ 
          backgroundColor: 'white', 
          borderRadius: 16, 
          padding: 24, 
          marginBottom: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>
            Quiz Questions
          </Text>

          {formData.quiz.questions.map((question, qIndex) => (
            <View key={qIndex} style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
                Question {qIndex + 1}
              </Text>
              <TextInput
                style={{ 
                  borderWidth: 1, 
                  borderColor: '#E5E7EB', 
                  paddingHorizontal: 16, 
                  paddingVertical: 12, 
                  borderRadius: 12, 
                  marginBottom: 12, 
                  backgroundColor: '#F9FAFB',
                  fontSize: 16,
                  color: '#1F2937',
                  minHeight: 60,
                  textAlignVertical: 'top'
                }}
                placeholder="Enter your question"
                value={question.question}
                onChangeText={(text) => updateQuestion(qIndex, 'question', text)}
                multiline
              />

              <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
                Answer Options
              </Text>
              {question.options.map((option, oIndex) => (
                <View key={oIndex} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <TouchableOpacity
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: question.correctAnswer === oIndex ? '#059669' : '#D1D5DB',
                      backgroundColor: question.correctAnswer === oIndex ? '#059669' : 'transparent',
                      marginRight: 12,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onPress={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                  >
                    {question.correctAnswer === oIndex && (
                      <Ionicons name="checkmark" size={16} color="white" />
                    )}
                  </TouchableOpacity>
                  <TextInput
                    style={{ 
                      flex: 1, 
                      borderWidth: 1, 
                      borderColor: '#E5E7EB', 
                      paddingHorizontal: 12, 
                      paddingVertical: 8, 
                      borderRadius: 8, 
                      backgroundColor: '#F9FAFB',
                      fontSize: 16,
                      color: '#1F2937'
                    }}
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChangeText={(text) => updateOption(qIndex, oIndex, text)}
                  />
                </View>
              ))}
              <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>
                Tap the circle to mark the correct answer
              </Text>
            </View>
          ))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={{
            paddingVertical: 16,
            borderRadius: 12,
            backgroundColor: isSubmitting ? '#93C5FD' : '#3B82F6',
            shadowColor: '#3B82F6',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6
          }}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
            {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UploadContentScreen;