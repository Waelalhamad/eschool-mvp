import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1234567890123 implements MigrationInterface {
  name = 'InitialSchema1234567890123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TYPE "user_role_enum" AS ENUM('admin', 'teacher', 'student');
      
      CREATE TABLE "user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "passwordHash" character varying NOT NULL,
        "role" "user_role_enum" NOT NULL,
        "phone" character varying,
        "avatar" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_user_email" UNIQUE ("email"),
        CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
      );
    `);

    // Create courses table
    await queryRunner.query(`
      CREATE TABLE "course" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "description" text NOT NULL,
        "isActive" boolean NOT NULL DEFAULT true,
        "teacherId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_course_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_course_teacher" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE CASCADE
      );
    `);

    // Create lessons table
    await queryRunner.query(`
      CREATE TABLE "lesson" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "description" text,
        "youtubeId" character varying NOT NULL,
        "order" integer NOT NULL,
        "pdfUrl" character varying,
        "isPublished" boolean NOT NULL DEFAULT false,
        "courseId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_lesson_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_lesson_course" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE
      );
    `);

    // Create quizzes table
    await queryRunner.query(`
      CREATE TABLE "quiz" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "questions" json NOT NULL,
        "passingScore" integer NOT NULL DEFAULT 70,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_quiz_id" PRIMARY KEY ("id")
      );
    `);

    // Create quiz_submissions table
    await queryRunner.query(`
      CREATE TABLE "quiz_submission" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "answers" json NOT NULL,
        "score" integer NOT NULL,
        "passed" boolean NOT NULL,
        "studentId" uuid NOT NULL,
        "quizId" uuid NOT NULL,
        "submittedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_quiz_submission_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_quiz_submission_student" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_quiz_submission_quiz" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE CASCADE
      );
    `);

    // Create coupons table
    await queryRunner.query(`
      CREATE TABLE "coupon" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "code" character varying NOT NULL,
        "usageLimit" integer,
        "usedCount" integer NOT NULL DEFAULT 0,
        "expiresAt" TIMESTAMP,
        "isActive" boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_coupon_code" UNIQUE ("code"),
        CONSTRAINT "PK_coupon_id" PRIMARY KEY ("id")
      );
    `);

    // Create upload_requests table
    await queryRunner.query(`
      CREATE TYPE "upload_type_enum" AS ENUM('video', 'pdf', 'quiz');
      CREATE TYPE "upload_status_enum" AS ENUM('pending', 'approved', 'rejected');
      
      CREATE TABLE "upload_request" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "type" "upload_type_enum" NOT NULL,
        "status" "upload_status_enum" NOT NULL DEFAULT 'pending',
        "metadata" json NOT NULL,
        "adminNotes" text,
        "teacherId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_upload_request_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_upload_request_teacher" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE CASCADE
      );
    `);

    // Create junction tables
    await queryRunner.query(`
      CREATE TABLE "user_courses_unlocked_course" (
        "userId" uuid NOT NULL,
        "courseId" uuid NOT NULL,
        CONSTRAINT "PK_user_courses_unlocked" PRIMARY KEY ("userId", "courseId"),
        CONSTRAINT "FK_user_courses_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_user_courses_course" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "coupon_allowed_courses_course" (
        "couponId" uuid NOT NULL,
        "courseId" uuid NOT NULL,
        CONSTRAINT "PK_coupon_allowed_courses" PRIMARY KEY ("couponId", "courseId"),
        CONSTRAINT "FK_coupon_allowed_coupon" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_coupon_allowed_course" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE
      );
    `);

    // Create indexes
    await queryRunner.query(`CREATE INDEX "IDX_user_email" ON "user" ("email")`);
    await queryRunner.query(`CREATE INDEX "IDX_course_teacher" ON "course" ("teacherId")`);
    await queryRunner.query(`CREATE INDEX "IDX_lesson_course" ON "lesson" ("courseId", "order")`);
    await queryRunner.query(`CREATE INDEX "IDX_quiz_submission_student" ON "quiz_submission" ("studentId")`);
    await queryRunner.query(`CREATE INDEX "IDX_coupon_code" ON "coupon" ("code")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop all tables and types in reverse order
    await queryRunner.query(`DROP TABLE "coupon_allowed_courses_course"`);
    await queryRunner.query(`DROP TABLE "user_courses_unlocked_course"`);
    await queryRunner.query(`DROP TABLE "upload_request"`);
    await queryRunner.query(`DROP TABLE "quiz_submission"`);
    await queryRunner.query(`DROP TABLE "quiz"`);
    await queryRunner.query(`DROP TABLE "lesson"`);
    await queryRunner.query(`DROP TABLE "coupon"`);
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(`DROP TABLE "user"`);
    
    await queryRunner.query(`DROP TYPE "upload_status_enum"`);
    await queryRunner.query(`DROP TYPE "upload_type_enum"`);
    await queryRunner.query(`DROP TYPE "user_role_enum"`);
  }
}