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
    public class AllocateClassroomRepository : IAllocateClassroomRepository
    {
        private readonly SchoolDBContext _context;
        public AllocateClassroomRepository(SchoolDBContext context)
        {
            _context = context;

        }
        public ActionResult<int> CreateAllocateClassroomDetail(AllocatedClassroomDetail allocatedClassroomDetail)
        {
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@teacherID", allocatedClassroomDetail.teacherID));
            parameter.Add(new SqlParameter("@classroomID", allocatedClassroomDetail.classroomID));

            int rowsAffected;
            string sql = "EXEC sp_CreateAllocatedClassroomDetail @teacherID, @classroomID";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;
        }

        public ActionResult<int> DeleteAllocateClassroomDetail(int allocateClassroomID)
        {
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@allocateClassroomID", allocateClassroomID));

            int rowsAffected;
            string sql = "EXEC sp_DeleteAllocatedClassroomDetail @allocateClassroomID";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;
        }

        public async Task<List<AllocatedClassroomDetail>> GetAllocatedClassroomDetailForTeacher(int teacherID)
        {
            List<AllocatedClassroomDetail> subjects = new List<AllocatedClassroomDetail>();
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@teacherID", teacherID));

            var result = await _context.AllocatedClassroomDetails.FromSqlRaw(@"exec sp_GetAllocatedClassroomDetailForTeacher @teacherID", parameter.ToArray()).ToListAsync();

            foreach (var row in result)
            {
                subjects.Add(new AllocatedClassroomDetail
                {
                    allocateClassroomID = row.allocateClassroomID,
                    classroomID = row.classroomID,
                    teacherID = row.teacherID,
                    classroomName=row.classroomName
                });
            }
            return subjects;
        }
    }
}
