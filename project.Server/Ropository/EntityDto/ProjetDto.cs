﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using project.Server.Ropository.Entity;
using System.Text.Json.Serialization;

namespace project.Server.Ropository.EntityDto
{
    public class ProjetDto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } // It's advisable to have a unique identifier for each project

        [Required]
        public string Titre { get; set; }


        public string ProjectStatus { get; set; } // Use PascalCase for property names

        public string Client { get; set; }

        [DataType(DataType.Date)]
        public DateTime DebutDate { get; set; } // Changed DateOnly to DateTime with DataType attribute

        [DataType(DataType.Date)]
        public DateTime DueDate { get; set; } // Changed DateOnly to DateTime with DataType attribute

        public string Description { get; set; }
        public string Categorie { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Budget { get; set; } // Changed float to decimal for better precision

        public  ICollection<int> teamIds { get; set; }
     
        public ICollection<TeamDto>? teams { get; set; }
    } 
}
