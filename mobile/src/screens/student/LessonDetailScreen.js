import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { quizzesAPI } from "../../services/api";

const LessonDetailScreen = ({ route, navigation }) => {
  const { lesson } = route.params;
  const { user } = useSelector((state) => state.auth);

  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null); // { score: number, passed: boolean }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const webViewRef = useRef(null);

  // This function is called when the YouTube video ends
  const handleVideoEnd = () => {
    if (lesson.quiz && !lesson.quizPassed) {
      setShowQuiz(true);
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    // Prevent changing answers after submission
    if (quizResult) return;

    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    });
  };

  const resetQuiz = () => {
    setQuizResult(null);
    setSelectedAnswers({});
    setIsSubmitting(false);
  };

  const submitQuiz = async () => {
    const answers = lesson.quiz.questions.map(
      (_, index) => selectedAnswers[index]
    );

    // Check if all questions have been answered
    if (answers.some((answer) => answer === undefined)) {
      alert("Please answer all questions before submitting."); // A simple alert is acceptable for validation
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await quizzesAPI.submitQuiz(lesson.id, answers);
      setQuizResult(result); // Store the entire result object
    } catch (error) {
      console.error("Quiz submission error:", error);
      alert("Error submitting quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadPDF = () => {
    if (lesson.pdfUrl) {
      Linking.openURL(lesson.pdfUrl).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    }
  };

  // Robust HTML for the WebView with postMessage communication
  const getWebViewContent = () => {
    const watermarkText = user?.name || "Student";
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <style>
          body, html { margin: 0; padding: 0; width: 100%; height: 100%; background-color: #000; overflow: hidden; }
          .video-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
          .watermark { 
            position: absolute; top: 10px; right: 10px; color: white; background: rgba(0,0,0,0.6); 
            padding: 4px 8px; border-radius: 4px; font-size: 12px; z-index: 10; font-family: sans-serif;
          }
        </style>
      </head>
      <body>
        <div class="video-container" id="player"></div>
        <div class="watermark">${watermarkText}</div>
        <script>
          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          var player;
          function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
              height: '100%',
              width: '100%',
              videoId: '${lesson.youtubeId}',
              playerVars: { 'playsinline': 1, 'controls': 1, 'rel': 0, 'modestbranding': 1, 'fs': 0 },
              events: { 'onStateChange': onPlayerStateChange }
            });
          }

          function onPlayerStateChange(event) {
            // When the video finishes (state 0 is 'ENDED')
            if (event.data == YT.PlayerState.ENDED) {
              window.ReactNativeWebView.postMessage('videoEnded');
            }
          }
        </script>
      </body>
      </html>
    `;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.lessonTag}>
              <Text style={styles.lessonTagText}>
                Lesson {lesson.order || 1}
              </Text>
            </View>
          </View>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          {lesson.description && (
            <Text style={styles.lessonDescription}>{lesson.description}</Text>
          )}
        </View>

        {/* YouTube Video */}
        <View style={styles.videoContainer}>
          <WebView
            ref={webViewRef}
            style={{ flex: 1, backgroundColor: "#000" }}
            source={{ html: getWebViewContent() }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true}
            onMessage={(event) => {
              if (event.nativeEvent.data === "videoEnded") {
                handleVideoEnd();
              }
            }}
          />
        </View>

        {/* PDF Download */}
        {lesson.pdfUrl && (
          <TouchableOpacity style={styles.pdfCard} onPress={downloadPDF}>
            <View style={styles.pdfIconContainer}>
              <Ionicons
                name="document-text-outline"
                size={24}
                color="#DC2626"
              />
            </View>
            <View style={styles.pdfTextContainer}>
              <Text style={styles.pdfTitle}>Course Material</Text>
              <Text style={styles.pdfSubtitle}>Download PDF resources</Text>
            </View>
            <Ionicons name="download-outline" size={22} color="#6B7280" />
          </TouchableOpacity>
        )}

        {/* Quiz Section */}
        {showQuiz && lesson.quiz && (
          <View style={styles.quizContainer}>
            <View style={styles.quizHeader}>
              <Ionicons name="help-circle-outline" size={28} color="#3B82F6" />
              <Text style={styles.quizTitle}>Quiz Time!</Text>
            </View>

            {lesson.quiz.questions.map((question, qIndex) => (
              <View key={qIndex} style={styles.questionContainer}>
                <Text style={styles.questionText}>{`${qIndex + 1}. ${
                  question.question
                }`}</Text>
                <View style={styles.optionsContainer}>
                  {question.options.map((option, oIndex) => {
                    const isSelected = selectedAnswers[qIndex] === oIndex;
                    return (
                      <TouchableOpacity
                        key={oIndex}
                        style={[
                          styles.option,
                          isSelected && styles.optionSelected,
                        ]}
                        onPress={() => handleAnswerSelect(qIndex, oIndex)}
                        disabled={!!quizResult}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            isSelected && styles.optionTextSelected,
                          ]}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}

            {/* Action Buttons */}
            {!quizResult && (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={submitQuiz}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit Quiz</Text>
                )}
              </TouchableOpacity>
            )}

            {/* Result Display */}
            {quizResult && (
              <View
                style={[
                  styles.resultBox,
                  quizResult.passed
                    ? styles.resultBoxSuccess
                    : styles.resultBoxFail,
                ]}
              >
                <Text
                  style={[
                    styles.resultTitle,
                    quizResult.passed
                      ? styles.resultTitleSuccess
                      : styles.resultTitleFail,
                  ]}
                >
                  Your Score: {quizResult.score}%
                </Text>
                <Text
                  style={[
                    styles.resultMessage,
                    quizResult.passed
                      ? styles.resultMessageSuccess
                      : styles.resultMessageFail,
                  ]}
                >
                  {quizResult.passed
                    ? "🎉 Great job! You passed!"
                    : "📚 Keep studying and try again!"}
                </Text>
                {quizResult.passed ? (
                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.continueButtonText}>
                      Continue to Next Lesson
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.tryAgainButton}
                    onPress={resetQuiz}
                  >
                    <Text style={styles.tryAgainButtonText}>Try Again</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        )}

        {/* Lesson Completed Message */}
        {lesson.quizPassed && !showQuiz && (
          <View style={styles.completedContainer}>
            <View style={styles.completedHeader}>
              <Ionicons name="checkmark-circle" size={32} color="#059669" />
              <Text style={styles.completedTitle}>Lesson Completed!</Text>
            </View>
            <Text style={styles.completedMessage}>
              You've already passed this lesson's quiz.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// All styles are now in a StyleSheet object for performance and organization
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9FAFB" },
  container: { flex: 1 },
  header: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonTag: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  lessonTagText: { color: "white", fontSize: 14, fontWeight: "500" },
  lessonTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  lessonDescription: { fontSize: 16, color: "#DBEAFE", lineHeight: 24 },
  videoContainer: {
    height: 220,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  pdfCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  pdfIconContainer: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#FEF2F2",
    marginRight: 16,
  },
  pdfTextContainer: { flex: 1 },
  pdfTitle: { fontSize: 16, fontWeight: "600", color: "#1F2937" },
  pdfSubtitle: { fontSize: 14, color: "#6B7280", marginTop: 2 },
  quizContainer: {
    backgroundColor: "white",
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  quizHeader: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  quizTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F2937",
    marginLeft: 12,
  },
  questionContainer: { marginBottom: 20 },
  questionText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
    lineHeight: 24,
  },
  optionsContainer: { gap: 10 },
  option: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  optionSelected: { borderColor: "#3B82F6", backgroundColor: "#EFF6FF" },
  optionText: { fontSize: 16, color: "#374151" },
  optionTextSelected: { color: "#1E40AF", fontWeight: "600" },
  submitButton: {
    backgroundColor: "#22C55E",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    alignItems: "center",
  },
  submitButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  resultBox: { marginTop: 20, padding: 16, borderRadius: 12, borderWidth: 1 },
  resultBoxSuccess: { backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" },
  resultBoxFail: { backgroundColor: "#FFFBEB", borderColor: "#FDE68A" },
  resultTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  resultTitleSuccess: { color: "#166534" },
  resultTitleFail: { color: "#B45309" },
  resultMessage: { textAlign: "center", marginTop: 8, fontSize: 16 },
  resultMessageSuccess: { color: "#15803D" },
  resultMessageFail: { color: "#92400E" },
  continueButton: {
    backgroundColor: "#16A34A",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 16,
    alignItems: "center",
  },
  continueButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
  tryAgainButton: {
    backgroundColor: "#F59E0B",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 16,
    alignItems: "center",
  },
  tryAgainButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
  completedContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#F0FDF4",
    borderColor: "#BBF7D0",
    borderWidth: 1,
  },
  completedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  completedTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#065F46",
  },
  completedMessage: {
    textAlign: "center",
    marginTop: 8,
    color: "#047857",
    fontSize: 16,
  },
});

export default LessonDetailScreen;
