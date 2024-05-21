using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace project.Server.Ropository.EntityDto
{
    public class TeamDto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int teamId { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public int Cin { get; set; }
        public string Poste { get; set; }
        public int Telephone { get; set; }
        public string Email { get; set; } 
    }
}
