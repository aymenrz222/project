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
        public async Task<List<team>> Getteams()
        {
            List<team> team = _database.team.ToList();
            return team;
        }

        [HttpGet("{teamId}")]
        public IActionResult GetTeam(int teamId)
        {
            var team = _database.team.FirstOrDefault(t => t.teamId == teamId);
            if (team == null)
            {
                return NotFound();
            }
            return Ok(team);
        }

        [HttpPut("{teamId}")]
        public async Task<IActionResult> UpdateTeam(int teamId, team team)
        {
            if (teamId != team.teamId)
            {
                return BadRequest();
            }

            _database.Entry(team).State = EntityState.Modified;

            try
            {
                await _database.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamExists(teamId))
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

        [HttpDelete("{teamId}")]
        public IActionResult DeleteTeam(int teamId)
        {
            var team = _database.team.FirstOrDefault(t => t.teamId == teamId);
            if (team == null)
            {
                return NotFound();
            }

            _database.team.Remove(team);
            _database.SaveChanges();

            return NoContent();
        }

        private bool TeamExists(int teamId)
        {
            return _database.team.Any(t => t.teamId == teamId);
        }
    }
}
