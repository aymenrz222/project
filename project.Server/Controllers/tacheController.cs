using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using project.Server.Ropository.Entity;

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
        public async Task<IActionResult> CreateTeam(tache tache) // Renamed Createteam to CreateTeam and Team to follow PascalCase
        {
            _database.tache.Add(tache); // Used Add() to add the new team
            await _database.SaveChangesAsync(); // Used SaveChangesAsync() to asynchronously save the changes
            return CreatedAtAction(nameof(GetTache), new { TacheId = tache.tacheId }, tache); // Return the created team with CreatedAtAction
        }
        [HttpPut]
        public async Task<IActionResult> Updatetache(tache tache)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!_database.tache.Any(a => a.tacheId == tache.tacheId))
            {
                return NotFound();
            }
            _database.Entry(tache).State = EntityState.Modified;

            try
            {
                await _database.SaveChangesAsync();
                var newtache = await _database.tache.FindAsync(tache.tacheId);
                return Ok(newtache);

            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }


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
