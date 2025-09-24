import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexes1700000000002 implements MigrationInterface {
  name = 'AddIndexes1700000000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add indexes for better query performance
    
    // User entity indexes
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_user_email" ON "user" ("email")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_user_role" ON "user" ("role")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_user_createdAt" ON "user" ("createdAt")`);
    
    // Course entity indexes
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_course_teacherId" ON "course" ("teacherId")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_course_isActive" ON "course" ("isActive")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_course_createdAt" ON "course" ("createdAt")`);
    
    // Lesson entity indexes
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_lesson_courseId" ON "lesson" ("courseId")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_lesson_order" ON "lesson" ("order")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_lesson_isPublished" ON "lesson" ("isPublished")`);
    
    // Quiz submission indexes for better performance
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_quiz_submission_studentId" ON "quiz_submission" ("studentId")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_quiz_submission_quizId" ON "quiz_submission" ("quizId")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_quiz_submission_submittedAt" ON "quiz_submission" ("submittedAt")`);
    
    // Coupon indexes
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_coupon_code" ON "coupon" ("code")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_coupon_isActive" ON "coupon" ("isActive")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_coupon_expiresAt" ON "coupon" ("expiresAt")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_user_email"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_user_role"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_user_createdAt"`);
    
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_course_teacherId"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_course_isActive"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_course_createdAt"`);
    
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_lesson_courseId"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_lesson_order"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_lesson_isPublished"`);
    
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_quiz_submission_studentId"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_quiz_submission_quizId"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_quiz_submission_submittedAt"`);
    
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_coupon_code"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_coupon_isActive"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_coupon_expiresAt"`);
  }
}