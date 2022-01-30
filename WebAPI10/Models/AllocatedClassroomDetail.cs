using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI10.Models
{
    public class AllocatedClassroomDetail
    {
        [Key]
        public int allocateClassroomID { get; set; }

        [ForeignKey(nameof(Teacher))]
        public int teacherID { get; set; }
        //public Teacher Teacher { get; set; }

        [ForeignKey(nameof(ClassRoom))]
        public int classroomID { get; set; }
        //public ClassRoom ClassRoom { get; set; }
        public string classroomName { get; set; }
    }
}
