using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.Server.Entity;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace project.Server.Controllers
{
    [ApiController]
    [Route("api/projects")]
    public class ProjectController : ControllerBase
    {
        private readonly Servicesdatabase _database;

        public ProjectController(Servicesdatabase database)
        {
            _database = database;
        }

        [HttpGet]
        public async Task<List<Project>> GetProjects()
        {
            List<Project> projects = await _database.project.ToListAsync();
            return projects;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var project = await _database.project.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject(Project project)
        {
            _database.project.Add(project);
            await _database.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            _database.Entry(project).State = EntityState.Modified;

            try
            {
                await _database.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _database.project.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _database.project.Remove(project);
            await _database.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectExists(int id)
        {
            return _database.project.Any(e => e.Id == id);
        }
    }
}
