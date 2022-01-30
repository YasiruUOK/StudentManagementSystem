using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI10.Models;

namespace WebAPI10.Data
{
    public class SchoolDBContext : DbContext
    {
        public SchoolDBContext(DbContextOptions<SchoolDBContext> options) : base(options)
        {

        }
        public DbSet<Student> Students { get; set; }
        public DbSet<ClassRoom> ClassRooms { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<AllocatedClassroomDetail> AllocatedClassroomDetails { get; set; }
        public DbSet<StudentClassRoomDetail> StudentClassRoomDetails { get; set; }
        public DbSet<AllocateSubjectDetail> AllocateSubjectDetails { get; set; }
        public DbSet<SubjectsAndTeachersDetailsOfClass> SubjectsAndTeachersDetailsOfClass { get; set; }
    }
}
