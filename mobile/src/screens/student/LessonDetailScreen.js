import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { quizzesAPI } from '../../services/api';

const LessonDetailScreen = ({ route, navigation }) => {
  const { lesson } = route.params;
  const { user } = useSelector((state) => state.auth);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const handleVideoEnd = () => {
    if (lesson.quiz && !lesson.quizPassed) {
      setShowQuiz(true);
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    });
  };

  const submitQuiz = async () => {
    const answers = lesson.quiz.questions.map((_, index) => selectedAnswers[index]);
    
    if (answers.some(answer => answer === undefined)) {
      Alert.alert('Incomplete', 'Please answer all questions');
      return;
    }

    try {
      const result = await quizzesAPI.submitQuiz(lesson.id, answers);
      setScore(result.score);
      setQuizSubmitted(true);

      if (result.passed) {
        Alert.alert(
          '🎉 Congratulations!',
          `You scored ${result.score}% and passed the quiz!\n\nYou can now proceed to the next lesson.`,
          [{ text: 'Continue', onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert(
          '📚 Keep Learning!',
          `You scored ${result.score}%. You need 70% or higher to proceed to the next lesson.`,
          [{ 
            text: 'Try Again', 
            onPress: () => {
              setQuizSubmitted(false);
              setSelectedAnswers({});
              setScore(null);
            }
          }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit quiz. Please try again.');
    }
  };

  const downloadPDF = () => {
    if (lesson.pdfUrl) {
      Linking.openURL(lesson.pdfUrl);
    }
  };

  const renderQuiz = () => {
    if (!lesson.quiz || lesson.quizPassed) return null;

    return (
      <View className="bg-white mx-4 mb-6 p-6 rounded-2xl shadow-sm">
        <View className="flex-row items-center mb-6">
          <Ionicons name="help-circle" size={28} color="#3B82F6" />
          <Text className="text-2xl font-bold text-gray-800 ml-3">Quiz Time!</Text>
        </View>
        
        {lesson.quiz.questions.map((question, qIndex) => (
          <View key={qIndex} className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              {qIndex + 1}. {question.question}
            </Text>
            
            <View className="space-y-3">
              {question.options.map((option, oIndex) => (
                <TouchableOpacity
                  key={oIndex}
                  className={`p-4 rounded-xl border-2 ${
                    selectedAnswers[qIndex] === oIndex
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                  onPress={() => handleAnswerSelect(qIndex, oIndex)}
                  disabled={quizSubmitted}
                >
                  <Text
                    className={`text-base ${
                      selectedAnswers[qIndex] === oIndex
                        ? 'text-primary-700 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        
        {!quizSubmitted && (
          <TouchableOpacity 
            className="bg-success-500 py-4 rounded-xl mt-4"
            onPress={submitQuiz}
          >
            <Text className="text-white text-lg font-bold text-center">
              Submit Quiz
            </Text>
          </TouchableOpacity>
        )}

        {score !== null && (
          <View className={`mt-6 p-4 rounded-xl ${
            score >= 70 ? 'bg-success-50 border border-success-200' : 'bg-orange-50 border border-orange-200'
          }`}>
            <Text className={`text-xl font-bold text-center ${
              score >= 70 ? 'text-success-600' : 'text-orange-600'
            }`}>
              Your Score: {score}%
            </Text>
            <Text className={`text-center mt-2 ${
              score >= 70 ? 'text-success-700' : 'text-orange-700'
            }`}>
              {score >= 70 ? '🎉 Great job! You passed!' : '📚 Keep studying and try again!'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-6 mb-4">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          {lesson.title}
        </Text>
        {lesson.description && (
          <Text className="text-base text-gray-600 leading-6">
            {lesson.description}
          </Text>
        )}
      </View>

      {/* YouTube Video with Watermark */}
      <View className="mx-4 mb-6 rounded-2xl overflow-hidden shadow-lg" style={{ height: 220 }}>
        <WebView
          source={{
            html: `
              <html>
                <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <style>
                    body { 
                      margin: 0; 
                      padding: 0; 
                      background: black; 
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
                    }
                    .video-container { 
                      position: relative; 
                      width: 100%; 
                      height: 220px; 
                    }
                    .watermark { 
                      position: absolute; 
                      top: 12px; 
                      right: 12px; 
                      color: white; 
                      background: rgba(0,0,0,0.8);
                      padding: 8px 12px;
                      border-radius: 8px;
                      font-size: 14px;
                      font-weight: 600;
                      z-index: 1000;
                      backdrop-filter: blur(4px);
                    }
                    .overlay {
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      bottom: 0;
                      pointer-events: none;
                      z-index: 999;
                    }
                    iframe { 
                      width: 100%; 
                      height: 100%; 
                      border: none;
                    }
                  </style>
                </head>
                <body>
                  <div class="video-container">
                    <div class="overlay"></div>
                    <div class="watermark">👤 ${user?.name || 'Student'}</div>
                    <iframe 
                      src="https://www.youtube.com/embed/${lesson.youtubeId}?rel=0&modestbranding=1&fs=0&disablekb=1"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </body>
              </html>
            `,
          }}
          style={{ flex: 1 }}
          onNavigationStateChange={(navState) => {
            if (navState.url.includes('end=1')) {
              handleVideoEnd();
            }
          }}
        />
      </View>

      {/* PDF Download */}
      {lesson.pdfUrl && (
        <TouchableOpacity 
          className="bg-white mx-4 mb-4 p-4 rounded-2xl shadow-sm flex-row items-center"
          onPress={downloadPDF}
        >
          <View className="bg-red-100 p-3 rounded-xl mr-4">
            <Ionicons name="document-text" size={24} color="#DC2626" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-800">
              Course Material
            </Text>
            <Text className="text-sm text-gray-600">
              Download PDF resources
            </Text>
          </View>
          <Ionicons name="download" size={20} color="#6B7280" />
        </TouchableOpacity>
      )}

      {/* Quiz Section */}
      {showQuiz && renderQuiz()}
      
      {lesson.quizPassed && (
        <View className="bg-success-50 mx-4 mb-6 p-6 rounded-2xl border border-success-200">
          <View className="flex-row items-center justify-center">
            <Ionicons name="checkmark-circle" size={32} color="#059669" />
            <Text className="text-xl font-bold text-success-700 ml-3">
              Lesson Completed!
            </Text>
          </View>
          <Text className="text-center text-success-600 mt-2">
            You've successfully completed this lesson and can proceed to the next one.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
