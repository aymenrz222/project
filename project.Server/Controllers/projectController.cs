 
$using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.Server.Entity;

namespace project.Server.Controllers
{
    [ApiController]
    [Route("api/projects")]
    public class projectController : ControllerBase
    {
        private readonly Servicesdatabase _database;

        public projectController(Servicesdatabase database)
        {
            _database = database;
        }

        [HttpGet]
        public async Task<List<Project>> GetProjects()
        {
            List<Project> Project = _database.projet.ToList();

            return Project;
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetProject(int id)
        {
            var project = _database.projet.FirstOrDefault(p => p.Id == id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

    }
}
