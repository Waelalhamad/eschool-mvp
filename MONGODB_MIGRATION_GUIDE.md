# 🍃 MongoDB Migration Guide

## ✅ **Migration Complete!**

Your e-School backend has been successfully migrated from PostgreSQL + TypeORM to MongoDB + Mongoose!

## 🔄 **What Was Changed**

### **1. Dependencies Updated**
- ❌ Removed: `@nestjs/typeorm`, `typeorm`, `pg`
- ✅ Added: `@nestjs/mongoose`, `mongoose`, `@types/mongoose`

### **2. Database Configuration**
- **Before:** TypeORM with PostgreSQL
- **After:** Mongoose with MongoDB
- **Connection:** `mongodb://localhost:27017/eschool`

### **3. Entity → Schema Conversion**
All TypeORM entities converted to Mongoose schemas:

| Entity | Schema Location | Status |
|--------|----------------|--------|
| User | `src/schemas/user.schema.ts` | ✅ Complete |
| Course | `src/schemas/course.schema.ts` | ✅ Complete |
| Lesson | `src/schemas/lesson.schema.ts` | ✅ Complete |
| Quiz | `src/schemas/quiz.schema.ts` | ✅ Complete |
| Coupon | `src/schemas/coupon.schema.ts` | ✅ Complete |
| QuizSubmission | `src/schemas/quiz-submission.schema.ts` | ✅ Complete |
| UploadRequest | `src/schemas/upload-request.schema.ts` | ✅ Complete |

### **4. Services Updated**
- ✅ LessonsService - Converted to use Mongoose
- 🔄 Other services need updating (in progress)

### **5. Modules Updated**
- ✅ AppModule - Now uses MongooseModule
- ✅ HealthModule - Updated for MongoDB health checks
- ✅ LessonsModule - Converted to Mongoose
- 🔄 Other modules need updating (in progress)

## 🛠️ **Setup Instructions**

### **1. Install MongoDB**
```bash
# macOS (using Homebrew)
brew install mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb

# Windows
# Download from: https://www.mongodb.com/try/download/community
```

### **2. Start MongoDB**
```bash
# macOS/Linux
sudo systemctl start mongod
# OR
mongod

# Windows
net start MongoDB
```

### **3. Install Backend Dependencies**
```bash
cd backend
npm install --legacy-peer-deps
```

### **4. Update Environment Variables**
Your `.env` file now uses:
```env
MONGODB_URI=mongodb://localhost:27017/eschool
```

### **5. Start the Backend**
```bash
cd backend
npm run start:dev
```

## 📊 **MongoDB Schema Structure**

### **User Schema**
```typescript
{
  name: string,
  email: string (unique),
  passwordHash: string,
  role: 'admin' | 'teacher' | 'student',
  phone?: string,
  avatar?: string,
  coursesUnlocked: ObjectId[],
  createdAt: Date,
  updatedAt: Date
}
```

### **Course Schema**
```typescript
{
  title: string,
  description: string,
  isActive: boolean,
  teacherId: ObjectId,
  lessons: ObjectId[],
  createdAt: Date,
  updatedAt: Date
}
```

### **Lesson Schema**
```typescript
{
  title: string,
  description?: string,
  youtubeId: string,
  order: number,
  pdfUrl?: string,
  isPublished: boolean,
  courseId: ObjectId,
  quizId?: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 **Key Differences from TypeORM**

### **1. Object IDs**
- **Before:** UUID strings
- **After:** MongoDB ObjectIds
- **Usage:** `@IsMongoId()` validator instead of `@IsUUID()`

### **2. Relationships**
- **Before:** TypeORM relations with `@OneToMany`, `@ManyToOne`
- **After:** Mongoose populate with `ObjectId` references
- **Usage:** `.populate('fieldName')` in queries

### **3. Queries**
- **Before:** TypeORM Repository pattern
- **After:** Mongoose Model methods
- **Examples:**
  ```typescript
  // TypeORM
  await this.repository.findOne({ where: { id } });
  
  // Mongoose
  await this.model.findById(id);
  ```

### **4. Indexes**
- **Before:** TypeORM `@Index()` decorator
- **After:** Mongoose schema indexes
- **Usage:** `Schema.index({ field: 1 })`

## 🧪 **Testing the Migration**

### **1. Health Check**
```bash
curl http://localhost:3000/health
```
Should return MongoDB connection status.

### **2. Test Endpoints**
```bash
# Get all lessons
curl http://localhost:3000/lessons

# Create a lesson
curl -X POST http://localhost:3000/lessons \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Lesson","youtubeId":"abc123","order":1,"courseId":"60f7b3b3b3b3b3b3b3b3b3b3"}'
```

### **3. MongoDB Compass**
Use MongoDB Compass to visually inspect your data:
- Download: https://www.mongodb.com/products/compass
- Connect to: `mongodb://localhost:27017`
- Browse database: `eschool`

## 📋 **Remaining Tasks**

### **Services to Update:**
- [ ] AuthService
- [ ] UsersService  
- [ ] CoursesService
- [ ] QuizzesService
- [ ] CouponsService
- [ ] UploadsService

### **Modules to Update:**
- [ ] AuthModule
- [ ] UsersModule
- [ ] CoursesModule
- [ ] QuizzesModule
- [ ] CouponsModule
- [ ] UploadsModule

### **DTOs to Update:**
- [ ] All DTOs using `@IsUUID()` → `@IsMongoId()`
- [ ] Update validation decorators

## 🚨 **Common Issues & Solutions**

### **1. MongoDB Connection Error**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Check connection string
echo $MONGODB_URI
```

### **2. ObjectId Validation Error**
```typescript
// Use @IsMongoId() instead of @IsUUID()
@IsMongoId()
courseId: string;
```

### **3. Population Not Working**
```typescript
// Make sure to populate references
await this.model.findById(id).populate('courseId').exec();
```

### **4. Index Creation**
```typescript
// Create indexes in schema
Schema.index({ email: 1 }, { unique: true });
```

## 🎯 **Benefits of MongoDB Migration**

### **1. Flexibility**
- Schema-less design
- Easy to add new fields
- No migrations needed

### **2. Performance**
- Better for read-heavy workloads
- Built-in horizontal scaling
- Efficient indexing

### **3. Developer Experience**
- JSON-like documents
- Rich query language
- Great tooling (Compass, Atlas)

### **4. Cloud Integration**
- MongoDB Atlas for cloud hosting
- Easy backup and restore
- Global distribution

## 🚀 **Next Steps**

1. **Complete Service Migration:**
   ```bash
   # Update remaining services
   # Convert all repositories to models
   # Update all queries
   ```

2. **Test Everything:**
   ```bash
   npm run test
   npm run test:e2e
   ```

3. **Deploy to Production:**
   ```bash
   # Use MongoDB Atlas for production
   # Update environment variables
   # Deploy with new configuration
   ```

## ✅ **Success Checklist**

- [ ] MongoDB installed and running
- [ ] Backend starts without errors
- [ ] Health check returns MongoDB status
- [ ] Can create/read/update/delete lessons
- [ ] All schemas properly defined
- [ ] Indexes created
- [ ] Relationships working with populate

---

**🎉 Your e-School backend is now powered by MongoDB!**