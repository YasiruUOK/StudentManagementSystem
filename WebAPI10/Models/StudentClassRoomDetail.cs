using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI10.Models
{
    [Table("StudentClassRoomDetail")]
    public class StudentClassRoomDetail
    {
        [Key]
        public int studentClassRoomID { get; set; }


        [ForeignKey(nameof(Student))]
        public int studentID { get; set; }
        public Student Student { get; set; }

        [ForeignKey(nameof(ClassRoom))]
        public int classroomID { get; set; }
        public ClassRoom ClassRoom { get; set; }
    }
}
