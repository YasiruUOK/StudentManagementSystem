using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI10.Models
{
    [Table("AllocateSubjectDetail")]
    public class AllocateSubjectDetail
    {
        [Key]
        public int allocateSubjectID { get; set; }

        [ForeignKey(nameof(Teacher))]
        public int teacherID { get; set; }
        //public Teacher Teacher { get; set; }

        [ForeignKey(nameof(Subject))]
        public int subjectID { get; set; }
        //public Subject SubjectName { get; set; }
        public string subjectName { get; set; }
    }
}
