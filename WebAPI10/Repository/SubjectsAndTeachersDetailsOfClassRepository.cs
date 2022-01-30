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
    public class SubjectsAndTeachersDetailsOfClassRepository : ISubjectsAndTeachersDetailsOfClassRepository
    {
        private readonly SchoolDBContext _context;
        public SubjectsAndTeachersDetailsOfClassRepository(SchoolDBContext context)
        {
            _context = context;

        }
        public async Task<List<SubjectsAndTeachersDetailsOfClass>> GetSubjectsAndTeachersDetailsOfClass(int classroomID)
        {
            List<SubjectsAndTeachersDetailsOfClass> subjects = new List<SubjectsAndTeachersDetailsOfClass>();
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@classroomID", classroomID));

            var result = await _context.SubjectsAndTeachersDetailsOfClass.FromSqlRaw(@"exec sp_GetSubjectsAndTeachersDetailsOfClass @classroomID", parameter.ToArray()).ToListAsync();

            foreach (var row in result)
            {
                subjects.Add(new SubjectsAndTeachersDetailsOfClass
                {
                    SubjectsAndTeachersDetailsOfClassID=row.SubjectsAndTeachersDetailsOfClassID,
                    subjectName = row.subjectName,
                    teacherName = row.teacherName
                });
            }
            return subjects;
        }
    }
}
