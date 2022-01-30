using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI10.Models;

namespace WebAPI10.Repository
{
    public interface ITeacherRepository
    {
        ActionResult<int> CreateTeacher(Teacher teacher);
        Task<List<Teacher>> GetAllTeacherAsync();
        ActionResult<int> UpdateTeacher(Teacher teacher);
        ActionResult<int> DeleteTeacher(int teacherid);
    }
}
