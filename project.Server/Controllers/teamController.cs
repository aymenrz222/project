using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.Server.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace project.Server.Controllers
{
    [ApiController]
    [Route("api/teams")]
 
     public class teamController : ControllerBase
    {
        private readonly Servicesdatabase _database;

        public teamController(Servicesdatabase database)
        {
            _database = database;
        }

        [HttpGet]
        public async Task<List<team>> GetTeams() // Renamed GetTeams and Team to follow PascalCase
        {
            List<team> teams = await _database.team.ToListAsync(); // Used ToListAsync() to asynchronously retrieve the list of teams
            return teams; // Return the list of teams
        }

        [HttpGet("{teamId}")]
        public IActionResult GetTeam(int teamId)
        {
            var team = _database.team.FirstOrDefault(t => t.teamId == teamId); // Renamed TeamId to follow PascalCase
            if (team == null)
            {
                return NotFound();
            }
            return Ok(team);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTeam(team team) // Renamed Createteam to CreateTeam and Team to follow PascalCase
        {
            _database.team.Add(team); // Used Add() to add the new team
            await _database.SaveChangesAsync(); // Used SaveChangesAsync() to asynchronously save the changes
            return CreatedAtAction(nameof(GetTeam), new { TeamId = team.teamId }, team); // Return the created team with CreatedAtAction
        }


        [HttpPut]
        public async Task<IActionResult> Updateteam(team team)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!_database.team.Any(t => t.teamId == team.teamId))
            {
                return NotFound();
            }
            _database.Entry(team).State = EntityState.Modified;

            try
            {
                await _database.SaveChangesAsync();

                var newteam = _database.team.FirstOrDefault(t => t.teamId == team.teamId);
                return Ok(newteam);

            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }


        }

        [HttpDelete("{teamId}")]
        public IActionResult DeleteTeam(int teamId)
        {
            var team = _database.team.FirstOrDefault(t => t.teamId == teamId);
            if (team == null)
            {
                return NotFound();
            }

            _database.team.Remove(team);
            _database.SaveChanges(); // Used SaveChanges() to save the changes synchronously

            return NoContent();
        }

        private bool TeamExists(int teamId)
        {
            return _database.team.Any(t => t.teamId == teamId);
        }
    }
}
