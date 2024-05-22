using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Server.Ropository.Entity
{
    public class TeamProject
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
      
        public int ProjectId { get; set; }
        public int TeamId { get; set; }
        public Project Project { get; set; }
        public team Team { get; set; }
    }
}
