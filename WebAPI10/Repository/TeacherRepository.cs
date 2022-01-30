using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI10.Data;
using WebAPI10.Models;

namespace WebAPI10.Repository
{
    public class TeacherRepository : ITeacherRepository
    {
        private readonly SchoolDBContext _context;
        public TeacherRepository(SchoolDBContext context)
        {
            _context = context;

        }
        public ActionResult<int> CreateTeacher(Teacher teacher)
        {

            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@firstName", teacher.firstName));
            parameter.Add(new SqlParameter("@lastName", teacher.lastName));
            parameter.Add(new SqlParameter("@contactNo", teacher.contactNo));
            parameter.Add(new SqlParameter("@emailAddress", teacher.emailAddress));

            int rowsAffected;
            string sql = "EXEC sp_CreateTeacher @firstName, @lastName, @contactNo,  @emailAddress";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;

        }

        public async Task<List<Teacher>> GetAllTeacherAsync()
        {
            List<Teacher> teachers = new List<Teacher>();
            var result = await _context.Teachers.FromSqlRaw(@"exec sp_GetTeachers").ToListAsync();

            foreach (var row in result)
            {
                teachers.Add(new Teacher
                {
                    teacherID = row.teacherID,
                    firstName = row.firstName,
                    lastName = row.lastName,
                    contactNo = row.contactNo,
                    emailAddress = row.emailAddress

                });
            }
            return teachers;
        }

        public ActionResult<int> UpdateTeacher(Teacher teacher)
        {

            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@teacherID", teacher.teacherID));
            parameter.Add(new SqlParameter("@firstName", teacher.firstName));
            parameter.Add(new SqlParameter("@lastName", teacher.lastName));
            parameter.Add(new SqlParameter("@contactNo", teacher.contactNo));
            parameter.Add(new SqlParameter("@emailAddress", teacher.emailAddress));

            int rowsAffected;
            string sql = "EXEC sp_UpdateTeacher @teacherID, @firstName, @lastName, @contactNo,  @emailAddress";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;

        }

        public ActionResult<int> DeleteTeacher(int teacherid)
        {

            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@teacherID", teacherid));

            int rowsAffected;
            string sql = "EXEC sp_DeleteTeacher @teacherID";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;

        }
    }
}
