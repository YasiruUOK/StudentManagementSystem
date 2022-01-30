using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI10.Models;

namespace WebAPI10.Repository
{
    public interface ISubjectsAndTeachersDetailsOfClassRepository
    {
        Task<List<SubjectsAndTeachersDetailsOfClass>> GetSubjectsAndTeachersDetailsOfClass(int classroomID);
    }
}
