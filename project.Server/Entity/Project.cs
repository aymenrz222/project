using System;
using System.ComponentModel.DataAnnotations;

namespace project.Server.Entity
{
    public class Project
    {
        public int Id { get; set; } // It's advisable to have a unique identifier for each project

        [Required]
        public string Titre { get; set; }

       
        public string ProjectStatus { get; set; } // Use PascalCase for property names

        public string Client { get; set; }
        public string Team { get; set; }

        [DataType(DataType.Date)]
        public DateTime DebutDate { get; set; } // Changed DateOnly to DateTime with DataType attribute

        [DataType(DataType.Date)]
        public DateTime DueDate { get; set; } // Changed DateOnly to DateTime with DataType attribute

        public string Description { get; set; }
        public string Categorie { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Budget { get; set; } // Changed float to decimal for better precision
    }
   
}

