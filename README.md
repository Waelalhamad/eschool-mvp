# e-School Platform

A comprehensive e-learning platform built with **NestJS** (Backend) and **React Native** (Mobile App) featuring role-based access control, course management, quizzes, and coupon system.

## 🚀 Recent Improvements

### Backend Enhancements
- ✅ **Enhanced Authentication System**
  - Improved validation with better error messages
  - Added profile management endpoints
  - Enhanced JWT token handling with refresh tokens
  - Better security with input sanitization

- ✅ **Global Error Handling**
  - Custom exception filter for consistent error responses
  - Detailed error logging for debugging
  - Proper HTTP status codes and error messages

- ✅ **API Documentation**
  - Comprehensive Swagger documentation
  - Detailed endpoint descriptions and examples
  - Authentication documentation with Bearer tokens

### Mobile App Improvements
- ✅ **Modern UI/UX Design**
  - Beautiful gradient backgrounds and modern card designs
  - Improved navigation with better visual hierarchy
  - Enhanced form inputs with icons and better validation
  - Consistent color scheme and typography

- ✅ **Enhanced Authentication Flow**
  - Redux-based state management for auth
  - Proper token storage with AsyncStorage
  - Automatic token refresh handling
  - Better error handling and user feedback

- ✅ **Improved Screens**
  - **Login/Register**: Modern design with form validation
  - **Profile Screen**: Complete user profile management
  - **Lesson Detail**: Enhanced video player with watermarking
  - **Coupon Redemption**: Beautiful UI with better UX

- ✅ **API Service Layer**
  - Centralized API management with axios
  - Automatic token injection
  - Request/response interceptors
  - Proper error handling

## 🏗️ Architecture

### Backend (NestJS)
```
backend/
├── src/
│   ├── auth/           # Authentication module
│   ├── users/          # User management
│   ├── courses/        # Course management
│   ├── lessons/        # Lesson management
│   ├── quizzes/        # Quiz system
│   ├── coupons/        # Coupon system
│   ├── uploads/        # File upload handling
│   ├── entities/       # Database entities
│   ├── common/         # Shared utilities
│   └── config/         # Configuration
```

### Mobile App (React Native + Expo)
```
mobile/
├── src/
│   ├── screens/        # App screens
│   │   ├── auth/       # Authentication screens
│   │   ├── student/    # Student-specific screens
│   │   ├── teacher/    # Teacher-specific screens
│   │   └── admin/      # Admin screens
│   ├── navigation/     # Navigation configuration
│   ├── store/          # Redux store and slices
│   ├── services/       # API services
│   └── context/        # React context providers
```

## 🎯 Key Features

### User Roles
- **Students**: Access courses, take quizzes, redeem coupons
- **Teachers**: Upload content, manage courses, track progress
- **Admins**: Review uploads, manage users, create coupons

### Core Functionality
- **Course Management**: Create, organize, and manage educational content
- **Quiz System**: Interactive quizzes with scoring and progress tracking
- **Coupon System**: Redeem codes to unlock courses
- **File Uploads**: Secure file handling for course materials
- **Progress Tracking**: Monitor learning progress and completion

## 🛠️ Technology Stack

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **Validation**: Class-validator
- **Documentation**: Swagger/OpenAPI
- **Security**: bcryptjs for password hashing

### Mobile App
- **Framework**: React Native with Expo
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **Styling**: NativeWind (Tailwind CSS)
- **HTTP Client**: Axios
- **Storage**: AsyncStorage

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- Expo CLI (for mobile development)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your database and JWT secret in .env
npm run start:dev
```

### Mobile App Setup
```bash
cd mobile
npm install
npx expo start
```

## 📱 Mobile App Features

### Authentication
- Modern login/register screens with form validation
- Secure token storage and automatic refresh
- Role-based navigation and access control

### Student Experience
- Beautiful home screen with course overview
- Interactive lesson player with video watermarking
- Quiz system with immediate feedback
- Coupon redemption with modern UI
- Profile management with editable fields

### Teacher Features
- Content upload and management
- Course creation and organization
- Student progress monitoring

### Admin Panel
- User management
- Content review and approval
- Coupon creation and management

## 🔒 Security Features

- JWT-based authentication with refresh tokens
- Password hashing with bcryptjs
- Input validation and sanitization
- Role-based access control
- CORS configuration for mobile app
- Secure file upload handling

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Trust and reliability
- **Secondary**: Purple (#8B5CF6) - Creativity and innovation
- **Success**: Green (#059669) - Achievement and progress
- **Warning**: Orange (#F59E0B) - Attention and alerts
- **Error**: Red (#DC2626) - Errors and warnings

### Typography
- **Headers**: Bold, large sizes for hierarchy
- **Body**: Medium weight, readable sizes
- **Captions**: Light weight, smaller sizes

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with proper states
- **Inputs**: Icons, borders, and validation states
- **Navigation**: Tab-based with role-specific icons

## 📊 Performance Optimizations

### Backend
- Database indexing for faster queries
- Efficient relationship loading
- Proper error handling and logging
- Request validation and sanitization

### Mobile App
- Redux state management for efficient updates
- Lazy loading of screens and components
- Optimized image and video handling
- Proper memory management

## 🔮 Future Enhancements

- [ ] Push notifications for course updates
- [ ] Offline content support
- [ ] Advanced analytics and reporting
- [ ] Social features (discussions, peer learning)
- [ ] Mobile app testing setup
- [ ] CI/CD pipeline configuration
- [ ] Performance monitoring
- [ ] Advanced security features (rate limiting, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for modern e-learning**

## Project Structure

```
eschool-mvp # 
├── backend # 
│   ├── src # 
│   │   ├── auth # 
│   │   │   ├── decorators # 
│   │   │   │   └── roles.decorator.ts # 
│   │   │   ├── dto # 
│   │   │   │   └── auth.dto.ts # 
│   │   │   ├── guards # 
│   │   │   │   ├── jwt-auth.guard.ts # 
│   │   │   │   └── roles.guard.ts # 
│   │   │   ├── auth.controller.ts # 
│   │   │   ├── auth.module.ts # 
│   │   │   ├── auth.service.ts # 
│   │   │   ├── jwt-auth.guard.ts # 
│   │   │   └── jwt.strategy.ts # 
│   │   ├── common # 
│   │   │   ├── dto # 
│   │   │   │   └── pagination.dto.ts # 
│   │   │   ├── filters # 
│   │   │   │   └── http-exception.filter.ts # 
│   │   │   └── interceptors # 
│   │   │       └── logging.interceptor.ts # 
│   │   ├── config # 
│   │   │   └── database.ts # 
│   │   ├── coupons # 
│   │   │   ├── dto # 
│   │   │   │   └── coupon.dto.ts # 
│   │   │   ├── coupons.controller.ts # 
│   │   │   ├── coupons.module.ts # 
│   │   │   └── coupons.service.ts # 
│   │   ├── courses # 
│   │   │   ├── courses.controller.ts # 
│   │   │   ├── courses.module.ts # 
│   │   │   └── courses.service.ts # 
│   │   ├── entities # 
│   │   │   ├── coupon.entity.ts # 
│   │   │   ├── course.entity.ts # 
│   │   │   ├── lesson.entity.ts # 
│   │   │   ├── quiz-submission.entity.ts # 
│   │   │   ├── quiz.entity.ts # 
│   │   │   ├── upload-request.entity.ts # 
│   │   │   └── user.entity.ts # 
│   │   ├── health # 
│   │   │   ├── health.controller.ts # 
│   │   │   └── health.module.ts # 
│   │   ├── lessons # 
│   │   │   ├── dto # 
│   │   │   │   ├── create-lesson.dto.ts # 
│   │   │   │   └── update-lesson.dto.ts # 
│   │   │   ├── lessons.controller.ts # 
│   │   │   ├── lessons.module.ts # 
│   │   │   └── lessons.service.ts # 
│   │   ├── migrations # 
│   │   │   ├── 001-initial-schema.ts # 
│   │   │   └── 002-add-indexes.ts # 
│   │   ├── quizzes # 
│   │   │   ├── dto # 
│   │   │   │   └── quiz.dto.ts # 
│   │   │   ├── quizzes.controller.ts # 
│   │   │   ├── quizzes.module.ts # 
│   │   │   └── quizzes.service.ts # 
│   │   ├── schemas # 
│   │   │   ├── coupon.schema.ts # 
│   │   │   ├── course.schema.ts # 
│   │   │   ├── lesson.schema.ts # 
│   │   │   ├── quiz-submission.schema.ts # 
│   │   │   ├── quiz.schema.ts # 
│   │   │   ├── upload-request.schema.ts # 
│   │   │   └── user.schema.ts # 
│   │   ├── uploads # 
│   │   │   ├── dto # 
│   │   │   │   └── upload.dto.ts # 
│   │   │   ├── uploads.controller.ts # 
│   │   │   ├── uploads.module.ts # 
│   │   │   └── uploads.service.ts # 
│   │   ├── users # 
│   │   │   ├── dto # 
│   │   │   │   └── update-profile.dto.ts # 
│   │   │   ├── users.controller.ts # 
│   │   │   ├── users.module.ts # 
│   │   │   └── users.service.ts # 
│   │   ├── app.controller.ts # 
│   │   ├── app.module.ts # 
│   │   ├── app.service.ts # 
│   │   └── main.ts # 
│   ├── test # 
│   │   ├── app.e2e-spec.ts # 
│   │   └── jest-e2e.json # 
│   ├── .env.example # 
│   ├── .eslintrc.js # 
│   ├── .gitignore # 
│   ├── .prettierrc # 
│   ├── jest.config.js # 
│   ├── nest-cli.json # 
│   ├── package-lock.json # 
│   ├── package.json # 
│   ├── tsconfig.build.json # 
│   └── tsconfig.json # 
├── mobile # 
│   ├── .expo # 
│   │   ├── devices.json # 
│   │   └── README.md # 
│   ├── assets # 
│   ├── src # 
│   │   ├── components # 
│   │   │   ├── CurvedButton.js # 
│   │   │   ├── CurvedCard.js # 
│   │   │   └── CurvedInput.js # 
│   │   ├── context # 
│   │   │   ├── AuthContext.js # 
│   │   │   └── LocalizationContext.js # 
│   │   ├── locales # 
│   │   │   ├── ar.js # 
│   │   │   └── en.js # 
│   │   ├── navigation # 
│   │   │   └── AppNavigator.js # 
│   │   ├── screens # 
│   │   │   ├── admin # 
│   │   │   │   ├── AdminHomeScreen.js # 
│   │   │   │   ├── ManageCouponsScreen.js # 
│   │   │   │   ├── ReviewUploadsScreen.js # 
│   │   │   │   └── UsersManagementScreen.js # 
│   │   │   ├── auth # 
│   │   │   │   ├── LoginScreen.js # 
│   │   │   │   └── RegisterScreen.js # 
│   │   │   ├── student # 
│   │   │   │   ├── CoursesScreen.js # 
│   │   │   │   ├── HomeScreen.js # 
│   │   │   │   ├── LessonDetailScreen.js # 
│   │   │   │   ├── LessonsScreen.js # 
│   │   │   │   ├── ProfileScreen.js # 
│   │   │   │   └── RedeemCouponScreen.js # 
│   │   │   └── teacher # 
│   │   │       ├── MyUploadsScreen.js # 
│   │   │       ├── TeacherHomeScreen.js # 
│   │   │       └── UploadContentScreen.js # 
│   │   ├── services # 
│   │   │   └── api.js # 
│   │   └── store # 
│   │       ├── slices # 
│   │       │   ├── authSlice.js # 
│   │       │   ├── couponsSlice.js # 
│   │       │   ├── coursesSlice.js # 
│   │       │   └── lessonsSlice.js # 
│   │       └── store.js # 
│   ├── .env.example # 
│   ├── app.config.js # 
│   ├── App.js # 
│   ├── app.json # 
│   ├── babel.config.js # 
│   ├── eas.json # 
│   ├── metro.config.js # 
│   ├── package-lock.json # 
│   ├── package.json # 
│   ├── tailwind.config.js # 
│   └── test-sdk54.js # 
├── .gitignore # 
└── README.md # 
```
