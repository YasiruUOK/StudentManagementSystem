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
    public class ClassroomRepository : IClassRoomRepository
    {
        private readonly SchoolDBContext _context;
        public ClassroomRepository(SchoolDBContext context)
        {
            _context = context;

        }
        ActionResult<int> IClassRoomRepository.CreateclassRoom(ClassRoom classroom)
        {
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@classroomName", classroom.classroomName));

            int rowsAffected;
            string sql = "EXEC sp_CreateClassRoom @classroomName";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;
        }

        ActionResult<int> IClassRoomRepository.DeleteclassRoom(int classRoomid)
        {
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@classroomID", classRoomid));

            int rowsAffected;
            string sql = "EXEC sp_DeleteClassRoom @classroomID";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;
        }

        async Task<List<ClassRoom>> IClassRoomRepository.GetAllclassRoomAsync()
        {
            List<ClassRoom> classRooms = new List<ClassRoom>();
            var result = await _context.ClassRooms.FromSqlRaw(@"exec sp_GetClassRoom").ToListAsync();

            foreach (var row in result)
            {
                classRooms.Add(new ClassRoom
                {
                    classroomID = row.classroomID,
                    classroomName = row.classroomName
                });
            }
            return classRooms;
        }

        ActionResult<int> IClassRoomRepository.UpdateclassRoom(ClassRoom classRoom)
        {
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@classroomID", classRoom.classroomID));
            parameter.Add(new SqlParameter("@classroomName", classRoom.classroomName));

            int rowsAffected;
            string sql = "EXEC sp_UpdateClassRoom @classroomID, @classroomName";

            rowsAffected = _context.Database.ExecuteSqlRaw(sql, parameter.ToArray());
            return rowsAffected;
        }
    }
}
