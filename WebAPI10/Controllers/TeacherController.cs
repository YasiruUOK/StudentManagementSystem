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
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherRepository _repository;

        public TeacherController(ITeacherRepository repository)
        {
            _repository = repository;

        }

        [HttpGet]
        public async Task<ActionResult<Teacher>> GetAllTeacher()
        {
            var result = await _repository.GetAllTeacherAsync();
            return Ok(result);
        }

        //[HttpPost("CreateTeacher")]
        [HttpPost]
        public ActionResult<int> CreateTeacher(Teacher teacher)
        {
            var result = _repository.CreateTeacher(teacher);
            return Ok(result);
        }

        [HttpPut]
        public ActionResult<int> UpdateTeacher(Teacher teacher)
        {
            var result = _repository.UpdateTeacher(teacher);
            return Ok(result);
        }

        [HttpDelete(("{teacherid:int}"))]
        public ActionResult<int> DeleteTeacher(int teacherid)
        {
            var result = _repository.DeleteTeacher(teacherid);
            return Ok(result);
        }
    }
}
