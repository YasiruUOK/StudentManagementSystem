using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI10.Models
{
    [Table("classRoom")]
    public class ClassRoom
    {
        [Key]
        public int classroomID { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [Required(ErrorMessage = "ClassRoom Name is required")]
        [StringLength(100, ErrorMessage = "ClassRoom Name can't be longer than 100 characters")]
        public string classroomName { get; set; }
    }
}
