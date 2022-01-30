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
    public class AllocateSubjectRepository : IAllocateSubjectRepository
    {
        private readonly SchoolDBContext _context;
        public AllocateSubjectRepository(SchoolDBContext context)
        {
            _context = context;

        }

        public ActionResult<int> CreateAllocateSubjectDetail(AllocateSubjectDetail allocateSubjectDetail)
        {
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@teacherID", allocateSubjectDetail.teacherID));
            parameter.Add(new SqlParameter("@subjectID", allocateSubjectDetail.subjectID));

            int rowsAffected;
            string sql = "EXEC sp_CreateAllocateSubjectDetail @teacherID, @subjectID";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;
        }

        public ActionResult<int> DeleteAllocateSubjectDetail(int allocateSubjectID)
        {
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@allocateSubjectID", allocateSubjectID));

            int rowsAffected;
            string sql = "EXEC sp_DeleteAllocateSubjectDetail @allocateSubjectID";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;
        }

        public async Task<List<AllocateSubjectDetail>> GetAllocateSubjectDetailForTeacher(int teacherID)
        {
            List<AllocateSubjectDetail> subjects = new List<AllocateSubjectDetail>();
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@teacherID", teacherID));

            var result = await _context.AllocateSubjectDetails.FromSqlRaw(@"exec sp_GetAllocateSubjectDetailForTeacher @teacherID", parameter.ToArray()).ToListAsync();

            foreach (var row in result)
            {
                subjects.Add(new AllocateSubjectDetail
                {
                    allocateSubjectID = row.allocateSubjectID,
                    subjectID=row.subjectID,
                    teacherID=row.teacherID,
                    subjectName=row.subjectName

                });
            }
            return subjects;
        }
    }
}
