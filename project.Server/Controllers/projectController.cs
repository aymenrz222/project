using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.Server.Ropository.Entity;
using project.Server.Ropository.AutoMapper.Helper;
using project.Server.Ropository.AutoMapper;
using project.Server.Ropository.EntityDto;
using System.Text.Json.Serialization;
using System.Text.Json;

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
        public async Task<List<ProjetDto>> GetProjects()
        {
            var mapper = MapperHelper.ConfigureMapper(ProjetAutoMapper.ConfigureProjectDto);

            List<Project> projects = await _database.project.ToListAsync();

            return ProjetAutoMapper.MapProjectToDtos(projects, mapper);

        }

        [HttpGet("{id}")]
        public async Task<ApiResponse> GetProject(int projectId)
        {
            var project = await _database.project
                .Include(p => p.ProjectTeams)
                .ThenInclude(pt => pt.Team)
                .FirstOrDefaultAsync(p => p.Id == projectId);

            if (project == null)
            {
                return new ApiResponse(400, "projet non trouveé");
            }

            var teams = project.ProjectTeams.Select(pt => pt.Team).ToList();
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            string jsonString = JsonSerializer.Serialize(project, options);
            return new ApiResponse(200, "get project succefuly", jsonString);
        }

    
        [HttpPost]
        public async Task<IActionResult> CreateProject(ProjetDto project)
        {
            if (project == null)
            {
                return BadRequest("Project is null.");
            }

            var mapper = MapperHelper.ConfigureMapper(ProjetAutoMapper.ConfigureProject);
            Project projet = mapper.Map<Project>(project);

            if (ModelState.IsValid)
            {
                _database.Add(projet);
                await _database.SaveChangesAsync();

                // Add teams to the project
                foreach (int teamId in project.teamIds)
                {
                    var team = _database.team.Find(teamId);
                    if (team != null)
                    {
                        var teamProject = new TeamProject { TeamId = teamId , ProjectId = projet.Id };
                        _database.TeamProject.Add(teamProject);
                    }
                }

                await _database.SaveChangesAsync();

                Ok(projet);
            }
            
            return Ok(project);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProject( Project project)
        {
            if (!ModelState.IsValid) { 
                return BadRequest(ModelState);
            }
            if (!_database.project.Any(p => p.Id == project.Id)) {
                return NotFound(); 
            }
            _database.Entry(project).State = EntityState.Modified;

            try {
                await _database.SaveChangesAsync();
                var newproject = await _database.project.FindAsync(project.Id);
                return Ok(newproject);

            } catch (DbUpdateConcurrencyException) { 

                throw;
            }

            
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
