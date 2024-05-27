using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using project.Server.Ropository.Entity;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

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

        public  ICollection<int> teamIds { get; set; }
     
        public ICollection<TeamDto>? teams { get; set; }
    } 
}
