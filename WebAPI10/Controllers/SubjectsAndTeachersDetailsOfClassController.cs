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
    public class SubjectsAndTeachersDetailsOfClassController : ControllerBase
    {
        private readonly ISubjectsAndTeachersDetailsOfClassRepository _repository;
        public SubjectsAndTeachersDetailsOfClassController(ISubjectsAndTeachersDetailsOfClassRepository repository)
        {
            _repository = repository;

        }

        [HttpGet(("{classroomID:int}"))]
        public async Task<ActionResult<SubjectsAndTeachersDetailsOfClass>> GetSubjectsAndTeachersDetailsOfClass(int classroomID)
        {
            var result = await _repository.GetSubjectsAndTeachersDetailsOfClass(classroomID);
            return Ok(result);
        }
    }
}
