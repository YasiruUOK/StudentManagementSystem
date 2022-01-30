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
    public class AllocateSubjectController : ControllerBase
    {
        private readonly IAllocateSubjectRepository _repository;
        public AllocateSubjectController(IAllocateSubjectRepository repository)
        {
            _repository = repository;

        }

        [HttpGet("{teacherID:int}")]
        public async Task<ActionResult<AllocateSubjectDetail>> GetAllocateSubjectDetailForTeacher(int teacherID)
        {
            var result = await _repository.GetAllocateSubjectDetailForTeacher(teacherID);
            return Ok(result);
        }

        [HttpPost]
        public ActionResult<int> CreateAllocateSubjectDetail(AllocateSubjectDetail allocateSubjectDetail)
        {
            var result = _repository.CreateAllocateSubjectDetail(allocateSubjectDetail);
            return Ok(result);
        }

        [HttpDelete(("{allocateSubjectID:int}"))]
        public ActionResult<int> DeleteAllocateSubjectDetail(int allocateSubjectID)
        {
            var result = _repository.DeleteAllocateSubjectDetail(allocateSubjectID);
            return Ok(result);
        }
    }
}
