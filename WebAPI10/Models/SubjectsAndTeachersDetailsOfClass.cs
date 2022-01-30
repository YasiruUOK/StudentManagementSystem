using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI10.Models
{
    public class SubjectsAndTeachersDetailsOfClass
    {
        [Key]
        public int SubjectsAndTeachersDetailsOfClassID { get; set; }
        public string subjectName { get; set; }
        public string teacherName { get; set; }
    }
}
