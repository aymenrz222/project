using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using project.Server.Entity;
using project.Server.Ropository.Entity;

namespace project.Server.Ropository.EntityDto
{
    public class ProjetDto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Titre { get; set; }

        public string ProjectStatus { get; set; }

        public string Client { get; set; }

        [DataType(DataType.Date)]
        public DateTime DebutDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime DueDate { get; set; }

        public string Description { get; set; }
        public string Categorie { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Budget { get; set; }

        public List<int> teamIds { get; set; }

        [NotMapped] // Indique que cette propriété ne sera pas mappée à la base de données
        public List<TeamDto> team { get; set; } // Liste des équipes associées au projet
    }
}
