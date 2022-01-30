using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI10.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "classRoom",
                columns: table => new
                {
                    classroomID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    classroomName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_classRoom", x => x.classroomID);
                });

            migrationBuilder.CreateTable(
                name: "student",
                columns: table => new
                {
                    studentID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    lastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    contactPerson = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    contactNo = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: false),
                    emailAddress = table.Column<string>(type: "nvarchar(100)", maxLength: 12, nullable: false),
                    dateOfbirth = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_student", x => x.studentID);
                });

            migrationBuilder.CreateTable(
                name: "subject",
                columns: table => new
                {
                    subjectID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    subjectName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_subject", x => x.subjectID);
                });

            migrationBuilder.CreateTable(
                name: "teacher",
                columns: table => new
                {
                    teacherID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    lastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    contactNo = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: false),
                    emailAddress = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_teacher", x => x.teacherID);
                });

            migrationBuilder.CreateTable(
                name: "StudentClassRoomDetail",
                columns: table => new
                {
                    studentClassRoomID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    studentID = table.Column<int>(nullable: false),
                    classroomID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentClassRoomDetail", x => x.studentClassRoomID);
                    table.ForeignKey(
                        name: "FK_StudentClassRoomDetail_classRoom_classroomID",
                        column: x => x.classroomID,
                        principalTable: "classRoom",
                        principalColumn: "classroomID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentClassRoomDetail_student_studentID",
                        column: x => x.studentID,
                        principalTable: "student",
                        principalColumn: "studentID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AllocatedClassroomDetails",
                columns: table => new
                {
                    allocateClassroomID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    teacherID = table.Column<int>(nullable: false),
                    classroomID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllocatedClassroomDetails", x => x.allocateClassroomID);
                    table.ForeignKey(
                        name: "FK_AllocatedClassroomDetails_classRoom_classroomID",
                        column: x => x.classroomID,
                        principalTable: "classRoom",
                        principalColumn: "classroomID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AllocatedClassroomDetails_teacher_teacherID",
                        column: x => x.teacherID,
                        principalTable: "teacher",
                        principalColumn: "teacherID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AllocateSubjectDetail",
                columns: table => new
                {
                    allocateSubjectID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    teacherID = table.Column<int>(nullable: false),
                    subjectID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllocateSubjectDetail", x => x.allocateSubjectID);
                    table.ForeignKey(
                        name: "FK_AllocateSubjectDetail_subject_subjectID",
                        column: x => x.subjectID,
                        principalTable: "subject",
                        principalColumn: "subjectID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AllocateSubjectDetail_teacher_teacherID",
                        column: x => x.teacherID,
                        principalTable: "teacher",
                        principalColumn: "teacherID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AllocatedClassroomDetails_classroomID",
                table: "AllocatedClassroomDetails",
                column: "classroomID");

            migrationBuilder.CreateIndex(
                name: "IX_AllocatedClassroomDetails_teacherID",
                table: "AllocatedClassroomDetails",
                column: "teacherID");

            migrationBuilder.CreateIndex(
                name: "IX_AllocateSubjectDetail_subjectID",
                table: "AllocateSubjectDetail",
                column: "subjectID");

            migrationBuilder.CreateIndex(
                name: "IX_AllocateSubjectDetail_teacherID",
                table: "AllocateSubjectDetail",
                column: "teacherID");

            migrationBuilder.CreateIndex(
                name: "IX_StudentClassRoomDetail_classroomID",
                table: "StudentClassRoomDetail",
                column: "classroomID");

            migrationBuilder.CreateIndex(
                name: "IX_StudentClassRoomDetail_studentID",
                table: "StudentClassRoomDetail",
                column: "studentID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AllocatedClassroomDetails");

            migrationBuilder.DropTable(
                name: "AllocateSubjectDetail");

            migrationBuilder.DropTable(
                name: "StudentClassRoomDetail");

            migrationBuilder.DropTable(
                name: "subject");

            migrationBuilder.DropTable(
                name: "teacher");

            migrationBuilder.DropTable(
                name: "classRoom");

            migrationBuilder.DropTable(
                name: "student");
        }
    }
}
