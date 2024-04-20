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

        [HttpGet]
        [Route("{Id_team}")]
        public IActionResult GetTeam(int Id_team)
        {
            var team = _database.team.FirstOrDefault(t => t.Id_team == Id_team);
            if (team == null)
            {
                return NotFound();
            }
            return Ok(team);
        }
    }
}