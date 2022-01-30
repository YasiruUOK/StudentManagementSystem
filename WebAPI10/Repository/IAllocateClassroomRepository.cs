using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI10.Models;

namespace WebAPI10.Repository
{
    public interface IAllocateClassroomRepository
    {
        Task<List<AllocatedClassroomDetail>> GetAllocatedClassroomDetailForTeacher(int teacherID);
        ActionResult<int> CreateAllocateClassroomDetail(AllocatedClassroomDetail allocatedClassroomDetail);
        ActionResult<int> DeleteAllocateClassroomDetail(int allocateClassroomID);
    }
}
