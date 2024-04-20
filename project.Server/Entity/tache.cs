namespace project.Server.Entity
{
    public class tache
    {
        public int Id_tache { get; set; }
        public string nom_t { get; set; }
        public string etat { get; set; }
        public string membre_t { get; set; }
        public string team { get; set; }
        public string description_t { get; set; }
        public DateOnly date_echeance { get; set; }

    }
}
