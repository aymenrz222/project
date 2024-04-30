namespace project.Server.Entity
{
    public class tache
    {
        public int tacheId { get; set; }
        public string NomTache { get; set; }
        public string etat { get; set; }
        public string membre{ get; set; }
      
        public string descriptionTache { get; set; }
        public DateTime dateecheance { get; set; }

    }
}
