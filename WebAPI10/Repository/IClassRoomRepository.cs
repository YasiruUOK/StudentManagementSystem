using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI10.Models;

namespace WebAPI10.Repository
{
    public interface IClassRoomRepository
    {
        ActionResult<int> CreateclassRoom(ClassRoom classroom);
        Task<List<ClassRoom>> GetAllclassRoomAsync();
        ActionResult<int> UpdateclassRoom(ClassRoom classRoom);
        ActionResult<int> DeleteclassRoom(int classRoomid);
    }
}
