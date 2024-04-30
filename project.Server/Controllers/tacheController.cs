using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.Server.Entity;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace project.Server.Controllers
{
    [ApiController]
    [Route("api/taches")]
    public class TacheController : ControllerBase
    {
        private readonly Servicesdatabase _database;

        public TacheController(Servicesdatabase database)
        {
            _database = database;
        }

        [HttpGet]
        public async Task<List<tache>> GetTaches()
        {
            List<tache> taches = await _database.tache.ToListAsync();
            return taches;
        }

        [HttpGet("{tacheId}")]
        public IActionResult GetTache(int tacheId)
        {
            var tache = _database.tache.FirstOrDefault(a => a.tacheId == tacheId);
            if (tache == null)
            {
                return NotFound();
            }
            return Ok(tache);
        }
        [HttpPost]
        public async Task<IActionResult> CreateTache(tache tache)
        {
            _database.tache.Add(tache);
            await _database.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTache), new { TacheId = tache.tacheId }, tache);
        }

        [HttpPut("{tacheId}")]
        public async Task<IActionResult> UpdateTache(int tacheId, tache tache)
        {
            if (tacheId != tache.tacheId)
            {
                return BadRequest();
            }

            _database.Entry(tache).State = EntityState.Modified;

            try
            {
                await _database.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TacheExists(tacheId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{tacheId}")]
        public IActionResult DeleteTache(int tacheId)
        {
            var tache = _database.tache.FirstOrDefault(a => a.tacheId == tacheId);
            if (tache == null)
            {
                return NotFound();
            }

            _database.tache.Remove(tache);
            _database.SaveChanges();

            return NoContent();
        }

        private bool TacheExists(int tacheId)
        {
            return _database.tache.Any(a => a.tacheId == tacheId);
        }
    }
}
