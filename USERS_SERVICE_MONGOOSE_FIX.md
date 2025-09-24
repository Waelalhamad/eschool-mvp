# 🔧 UsersService Mongoose Fix Guide

## ❌ **Issues Identified**

### **1. UsersService Dependency Error:**
```
Nest can't resolve dependencies of the UsersService (?). Please make sure that the argument "UserRepository" at index [0] is available in the UsersModule context.
```

### **2. Mongoose Duplicate Index Warnings:**
```
Warning: Duplicate schema index on {"email":1} found.
Warning: Duplicate schema index on {"code":1} found.
```

## ✅ **Solutions Applied**

### **1. UsersService Updated to Mongoose**

**Problem:** UsersService was still using TypeORM repository injection

**Solution:** Converted UsersService to use Mongoose:

**Before (TypeORM):**
```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id },
      relations: ['coursesUnlocked'] 
    });
    // ...
  }
}
```

**After (Mongoose):**
```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).populate('coursesUnlocked');
    // ...
  }
}
```

### **2. All Remaining Services Updated**

**Updated Services:**
- ✅ UsersService - Manual update
- ✅ QuizzesService - Auto-updated
- ✅ CouponsService - Auto-updated  
- ✅ UploadsService - Auto-updated
- ✅ CoursesService - Auto-updated

### **3. Fixed Duplicate Schema Index Warnings**

**Problem:** Schemas had both `unique: true` in `@Prop` decorator AND separate index definitions

**Solution:** Removed duplicate `unique: true` from `@Prop` decorators:

**Before (Duplicate):**
```typescript
@Prop({ required: true, unique: true })
email: string;

// Later in schema...
UserSchema.index({ email: 1 }, { unique: true }); // DUPLICATE!
```

**After (Fixed):**
```typescript
@Prop({ required: true })
email: string;

// Later in schema...
UserSchema.index({ email: 1 }, { unique: true }); // Only here
```

## 🔄 **Key Changes Made**

### **1. Service Injection Changes**
```typescript
// OLD (TypeORM)
@InjectRepository(User)
private userRepository: Repository<User>

// NEW (Mongoose)
@InjectModel(User.name)
private userModel: Model<UserDocument>
```

### **2. Query Method Changes**
```typescript
// OLD (TypeORM)
this.userRepository.findOne({ where: { id }, relations: ['courses'] })

// NEW (Mongoose)
this.userModel.findById(id).populate('courses')
```

### **3. Save Method Changes**
```typescript
// OLD (TypeORM)
await this.userRepository.save(user)

// NEW (Mongoose)
await user.save()
```

### **4. Schema Index Fixes**
- ✅ User schema: Removed duplicate email index
- ✅ Coupon schema: Removed duplicate code index

## 🧪 **Testing the Fix**

### **Start Backend:**
```bash
cd backend
npm run start:dev
```

### **Expected Output:**
```
[Nest] Starting Nest application...
[Nest] MongooseModule dependencies initialized
[Nest] Application successfully started
```

**No more dependency injection errors or duplicate index warnings!**

### **Test Endpoints:**
```bash
# Health check
curl http://localhost:3000/health

# Users endpoint (if available)
curl http://localhost:3000/users
```

## 📊 **Before vs After**

### **Before (Broken):**
```
ERROR [ExceptionHandler] Nest can't resolve dependencies of the UsersService
Warning: Duplicate schema index on {"email":1} found
Warning: Duplicate schema index on {"code":1} found
- UsersService fails to load
- Duplicate index warnings
- Backend crashes
```

### **After (Fixed):**
```
[Nest] Starting Nest application...
[Nest] MongooseModule dependencies initialized
[Nest] Application successfully started
- All services load successfully
- No duplicate index warnings
- Clean startup
```

## 🎯 **What Was Fixed**

### **Services Updated:**
1. **UsersService** - Manual conversion to Mongoose
2. **QuizzesService** - Auto-converted to Mongoose
3. **CouponsService** - Auto-converted to Mongoose
4. **UploadsService** - Auto-converted to Mongoose
5. **CoursesService** - Auto-converted to Mongoose

### **Schema Fixes:**
1. **User Schema** - Removed duplicate email index
2. **Coupon Schema** - Removed duplicate code index

### **Method Conversions:**
- `findOne({ where: { id } })` → `findById(id)`
- `findOne({ where: { id }, relations: ['courses'] })` → `findById(id).populate('courses')`
- `this.repository.save(user)` → `user.save()`
- `this.repository.create(data)` → `new this.model(data)`

## ✅ **Success Indicators**

You'll know the fix worked when:

- ✅ Backend starts without dependency injection errors
- ✅ No Mongoose duplicate index warnings
- ✅ All services load successfully
- ✅ MongoDB connection established
- ✅ All endpoints respond correctly

## 🚨 **If Issues Persist**

### **Issue 1: Still getting dependency errors**
```bash
# Check for remaining TypeORM references
grep -r "@InjectRepository" src/
grep -r "Repository<" src/
```

### **Issue 2: MongoDB connection issues**
```bash
# Check if MongoDB is running
brew services list | grep mongodb  # macOS
sudo systemctl status mongod      # Linux
```

### **Issue 3: Schema validation errors**
```bash
# Check schema files for syntax errors
node -e "require('./src/schemas/user.schema.ts')"
```

## 🎉 **Expected Result**

After applying this fix:

- ✅ **Backend starts cleanly** without dependency errors
- ✅ **No Mongoose warnings** about duplicate indexes
- ✅ **All services work** with Mongoose models
- ✅ **Database operations** function properly
- ✅ **API endpoints** respond correctly

---

**🔧 Your backend should now start successfully with all services using Mongoose!**