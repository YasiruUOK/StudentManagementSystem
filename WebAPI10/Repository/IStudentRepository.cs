using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI10.Models;

namespace WebAPI10.Repository
{
    public interface IStudentRepository
    {
        ActionResult<int> CreateStudent(Student student);
        Task<List<Student>> GetAllStudentAsync();
        ActionResult<int> UpdateStudent(Student student);
        ActionResult<int> DeleteStudent(int studentid);
        Task<Student> GetStudentDetails(int studentid);
    }
}
