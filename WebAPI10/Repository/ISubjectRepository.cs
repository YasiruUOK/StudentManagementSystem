using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI10.Models;

namespace WebAPI10.Repository
{
    public interface ISubjectRepository
    {
        ActionResult<int> CreateSubject(Subject subject);
        Task<List<Subject>> GetAllSubjectAsync();
        ActionResult<int> UpdateSubject(Subject subject);
        ActionResult<int> DeleteSubject(int subjectid);
    }
}
