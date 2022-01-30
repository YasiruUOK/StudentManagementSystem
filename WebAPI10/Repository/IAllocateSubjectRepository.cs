using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI10.Models;

namespace WebAPI10.Repository
{
    public interface IAllocateSubjectRepository
    {
        Task<List<AllocateSubjectDetail>> GetAllocateSubjectDetailForTeacher(int teacherID);
        ActionResult<int> CreateAllocateSubjectDetail(AllocateSubjectDetail allocateSubjectDetail);
        ActionResult<int> DeleteAllocateSubjectDetail(int allocateSubjectID);
    }
}
