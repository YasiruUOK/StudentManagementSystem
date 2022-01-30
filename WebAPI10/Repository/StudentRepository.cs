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
    public class StudentRepository : IStudentRepository
    {
        private readonly SchoolDBContext _context;
        public StudentRepository(SchoolDBContext context)
        {
            _context = context;

        }
        public ActionResult<int> CreateStudent(Student student)
        {

            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@firstName", student.firstName));
            parameter.Add(new SqlParameter("@lastName", student.lastName));
            parameter.Add(new SqlParameter("@contactPerson", student.contactPerson));
            parameter.Add(new SqlParameter("@contactNo", student.contactNo));
            parameter.Add(new SqlParameter("@emailAddress", student.emailAddress));
            parameter.Add(new SqlParameter("@dateOfbirth", student.dateOfbirth));
            parameter.Add(new SqlParameter("@classroomID", student.classroomID));

            //var result = await Task.Run(() => _context.Students.FromSqlRaw(@"exec sp_CreateStudent 
            //                                                @firstName ={0},
            //                                                @lastName={1},
            //                                                @contactPerson={2},
            //                                                @contactNo={3},
            //                                                @emailAddress={4}",
            //                                                student.firstName, student.lastName, student.contactPerson, student.contactNo, student.emailAddress
            //                                                  //@dateOfbirth",
            //                                                  // parameter.ToArray()
            //                                                  ));
            //var result = await Task.Run(() => _context.Students.FromSqlRaw("EXECUTE sp_CreateStudent @firstName, @lastName, @contactPerson, @contactNo,  @emailAddress", parameter.ToArray()
            //                                                  ));

            //int retVal = int.Parse(parameter[4].Value.ToString()); //get @retVal return value

            int rowsAffected;
            string sql = "EXEC sp_CreateStudent @firstName, @lastName, @contactPerson, @contactNo,  @emailAddress, @dateOfbirth, @classroomID";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;

        }

        public async Task<List<Student>> GetAllStudentAsync()
        {
            List<Student> students = new List<Student>();
            var result = await _context.Students.FromSqlRaw(@"exec sp_GetStudents").ToListAsync();

            foreach (var row in result)
            {
                students.Add(new Student
                {
                    studentID = row.studentID,
                    firstName = row.firstName,
                    lastName=row.lastName,
                    contactPerson=row.contactPerson,
                    contactNo=row.contactNo,
                    emailAddress=row.emailAddress,
                    dateOfbirth=row.dateOfbirth,
                    DOBString= row.DOBString,
                    AgeYearsIntRound=row.AgeYearsIntRound,
                    classroomID = row.classroomID,
                    classroomName=row.classroomName

                });
            }
            return students;
        }

        public ActionResult<int> UpdateStudent(Student student)
        {

            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@studentID", student.studentID));
            parameter.Add(new SqlParameter("@firstName", student.firstName));
            parameter.Add(new SqlParameter("@lastName", student.lastName));
            parameter.Add(new SqlParameter("@contactPerson", student.contactPerson));
            parameter.Add(new SqlParameter("@contactNo", student.contactNo));
            parameter.Add(new SqlParameter("@emailAddress", student.emailAddress));
            parameter.Add(new SqlParameter("@dateOfbirth", student.dateOfbirth));

            int rowsAffected;
            string sql = "EXEC sp_UpdateStudent @studentID, @firstName, @lastName, @contactPerson, @contactNo,  @emailAddress, @dateOfbirth";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;

        }

        public ActionResult<int> DeleteStudent(int studentid)
        {

            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@studentID", studentid));

            int rowsAffected;
            string sql = "EXEC sp_DeleteStudent @studentID";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;

        }

        public async Task<Student> GetStudentDetails(int studentid)
        {
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@studentID", studentid));

            Student studentDetail = new Student();
            var result = await _context.Students.FromSqlRaw(@"exec sp_GetStudentDetails @studentID", parameter.ToArray()).ToListAsync();

            foreach (var row in result)
            {
                studentDetail= (new Student
                {
                    studentID = row.studentID,
                    firstName = row.firstName,
                    lastName = row.lastName,
                    contactPerson = row.contactPerson,
                    contactNo = row.contactNo,
                    emailAddress = row.emailAddress,
                    dateOfbirth = row.dateOfbirth,
                    DOBString = row.DOBString,
                    AgeYearsIntRound = row.AgeYearsIntRound,
                    classroomID = row.classroomID,
                    classroomName = row.classroomName

                });
            }
            
            return studentDetail;
        }
    }
}
