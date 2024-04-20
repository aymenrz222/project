using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.Server.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace project.Server.Controllers
{
    [ApiController]
    [Route("api/taches")]
    public class tacheController : ControllerBase
    {
        private readonly Servicesdatabase _database;

        public tacheController(Servicesdatabase database)
        {
            _database = database;
        }

        [HttpGet]
        public async Task<List<tache>> Gettaches()
        {
            List<tache> tache = _database.tache.ToList();

            return tache;
        }

        [HttpGet]
        [Route("{Id_tache}")]
        public IActionResult Gettache(int Id_tache)
        {
            var tache = _database.tache.FirstOrDefault(a => a.Id_tache == Id_tache);
            if (tache == null)
            {
                return NotFound();
            }
            return Ok(tache);
        }
    }
}