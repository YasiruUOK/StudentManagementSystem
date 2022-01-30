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
    public class AllocateClassroomController: ControllerBase
    {
        private readonly IAllocateClassroomRepository _repository;
    public AllocateClassroomController(IAllocateClassroomRepository repository)
    {
        _repository = repository;

    }

    [HttpGet("{teacherID:int}")]
    public async Task<ActionResult<AllocatedClassroomDetail>> GetAllocatedClassroomDetailForTeacher(int teacherID)
    {
        var result = await _repository.GetAllocatedClassroomDetailForTeacher(teacherID);
        return Ok(result);
    }

    [HttpPost]
    public ActionResult<int> CreateAllocateClassroomDetail(AllocatedClassroomDetail allocateClassroomDetail)
    {
        var result = _repository.CreateAllocateClassroomDetail(allocateClassroomDetail);
        return Ok(result);
    }

    [HttpDelete(("{allocatClassroomID:int}"))]
    public ActionResult<int> DeleteAllocateSubjectDetail(int allocatClassroomID)
    {
        var result = _repository.DeleteAllocateClassroomDetail(allocatClassroomID);
        return Ok(result);
    }
}
}