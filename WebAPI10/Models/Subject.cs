using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI10.Models
{
    [Table("subject")]
    public class Subject
    {
        [Key]
        public int subjectID { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [Required(ErrorMessage = "Subject Name is required")]
        [StringLength(100, ErrorMessage = "Subject Name can't be longer than 100 characters")]
        public string subjectName { get; set; }
    }
}
