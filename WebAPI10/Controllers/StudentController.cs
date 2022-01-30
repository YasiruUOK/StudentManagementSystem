using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI10.Models;
using WebAPI10.Repository;

namespace WebAPI10.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentRepository _repository;
        
        public StudentController(IStudentRepository repository)
        {
            _repository = repository;

        }

        [HttpGet]
        public async Task<ActionResult<Student>> GetAllStudent()
        {
            var result = await _repository.GetAllStudentAsync();
            return Ok(result);
        }

        //[HttpPost("CreateStudent")]
        [HttpPost]
        public ActionResult<int> CreateStudent(Student student)
        {
            var result = _repository.CreateStudent(student);
            return Ok(result);
        }

        [HttpPut]
        public ActionResult<int> UpdateStudent(Student student)
        {
            var result = _repository.UpdateStudent(student);
            return Ok(result);
        }

        [HttpDelete(("{studentid:int}"))]
        public ActionResult<int> DeleteStudent(int studentid)
        {
            var result = _repository.DeleteStudent(studentid);
            return Ok(result);
        }

        [HttpGet(("{studentid:int}"))]
        public async Task<ActionResult<Student>> GetStudentDetails(int studentid)
        {
            var result = await _repository.GetStudentDetails(studentid);
            return Ok(result);
        }
    }
}
