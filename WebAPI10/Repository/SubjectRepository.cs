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
    public class SubjectRepository : ISubjectRepository
    {
        private readonly SchoolDBContext _context;
        public SubjectRepository(SchoolDBContext context)
        {
            _context = context;

        }

        public ActionResult<int> CreateSubject(Subject subject)
        {
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@subjectName", subject.subjectName));

            int rowsAffected;
            string sql = "EXEC sp_CreateSubject @subjectName";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;
        }

        public ActionResult<int> DeleteSubject(int subjectid)
        {
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@subjectID", subjectid));

            int rowsAffected;
            string sql = "EXEC sp_DeleteSubject @subjectID";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;
        }

        public async Task<List<Subject>> GetAllSubjectAsync()
        {
            List<Subject> subjects = new List<Subject>();
            var result = await _context.Subjects.FromSqlRaw(@"exec sp_GetSubject").ToListAsync();

            foreach (var row in result)
            {
                subjects.Add(new Subject
                {
                    subjectID = row.subjectID,
                    subjectName = row.subjectName
                });
            }
            return subjects;
        }

        public ActionResult<int> UpdateSubject(Subject subject)
        {
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@subjectID", subject.subjectID));
            parameter.Add(new SqlParameter("@subjectName", subject.subjectName));

            int rowsAffected;
            string sql = "EXEC sp_UpdateSubject @subjectID, @subjectName";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;
        }
    }
}
