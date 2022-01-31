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
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectRepository _repository;
        public SubjectController(ISubjectRepository repository)
        {
            _repository = repository;

        }

        [HttpGet]
        public async Task<ActionResult<Subject>> GetAllStudent()
        {
            var result = await _repository.GetAllSubjectAsync();
            return Ok(result);
        }

        [HttpPost]
        public ActionResult<int> CreateSubject(Subject subject)
        {
            var result = _repository.CreateSubject(subject);
            return Ok(result);
        }

        [HttpPut]
        public ActionResult<int> UpdateSubject(Subject subject)
        {
            var result = _repository.UpdateSubject(subject);
            return Ok(result);
        }

        [HttpDelete(("{subjectID:int}"))]
        public ActionResult<int> DeleteSubject(int subjectID)
        {
            var result = _repository.DeleteSubject(subjectID);
            return Ok(result);
        }
    }
}
