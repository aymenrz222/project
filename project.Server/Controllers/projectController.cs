using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.Server.Ropository.Entity;
using project.Server.Ropository.AutoMapper.Helper;
using project.Server.Ropository.AutoMapper;
using project.Server.Ropository.EntityDto;

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
        public async Task<ApiResponse> GetProjects()
        {
            var mapperDto = MapperHelper.ConfigureMapper(TeamAutoMapper.ConfigureTeamsDto);
           
          
            var projects = await _database.project
                    .Include(p => p.ProjectTeams)
                    .ThenInclude(pt => pt.Team)
                    .ToListAsync();

            var projectDtos = projects.Select(p => new ProjetDto
            {
                Id = p.Id,
                Titre = p.Titre,
                ProjectStatus = p.ProjectStatus,
                Client = p.Client,
                DebutDate = p.DebutDate,
                DueDate = p.DueDate,
                Description = p.Description,
                Categorie = p.Categorie,
                Budget = p.Budget,
                teamIds = p.ProjectTeams.Select(pt => pt.TeamId).ToList(),
                teams = p.ProjectTeams.Select(pt => mapperDto.Map<TeamDto>(pt.Team)).ToList()
            });

            return new ApiResponse(200 ,"success" , projectDtos);


        }

        [HttpGet]
        [Route("GetProjectById")]
        public async Task<ApiResponse> GetProject(int projectId)
        {
            var mapperDto = MapperHelper.ConfigureMapper(TeamAutoMapper.ConfigureTeamsDto);
            var project = await _database.project
                .Include(p => p.ProjectTeams)
                .ThenInclude(pt => pt.Team)
                .FirstOrDefaultAsync(p => p.Id == projectId);

            if (project == null)
            {
                return new ApiResponse(400, "projet non trouvé");
            }


            var projectDtos = new ProjetDto
            {
                Id = project.Id,
                Titre = project.Titre,
                ProjectStatus = project.ProjectStatus,
                Client = project.Client,
                DebutDate = project.DebutDate,
                DueDate = project.DueDate,
                Description = project.Description,
                Categorie = project.Categorie,
                Budget = project.Budget,
                teamIds = project.ProjectTeams.Select(pt => pt.TeamId).ToList(),
                teams = project.ProjectTeams.Select(pt => mapperDto.Map<TeamDto>(pt.Team)).ToList()
            };
          
          
            return new ApiResponse(200, "get project succefuly", projectDtos);
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
                          projet.ProjectTeams.Add(teamProject);
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

    }
}
