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
    public class ClassRoomController : ControllerBase
    {
        private readonly IClassRoomRepository _repository;
        public ClassRoomController(IClassRoomRepository repository)
        {
            _repository = repository;

        }

        [HttpGet]
        public async Task<ActionResult<ClassRoom>> GetAllStudent()
        {
            var result = await _repository.GetAllclassRoomAsync();
            return Ok(result);
        }

        [HttpPost]
        public ActionResult<int> CreateClassRoom(ClassRoom classRoom)
        {
            var result = _repository.CreateclassRoom(classRoom);
            return Ok(result);
        }

        [HttpPut]
        public ActionResult<int> UpdateClassRoom(ClassRoom classRoom)
        {
            var result = _repository.UpdateclassRoom(classRoom);
            return Ok(result);
        }

        [HttpDelete(("{classroomid:int}"))]
        public ActionResult<int> DeleteClassRoom(int classroomid)
        {
            var result = _repository.DeleteclassRoom(classroomid);
            return Ok(result);
        }
    }
}
