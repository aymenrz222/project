using AutoMapper;
using project.Server.Ropository.Entity;
using project.Server.Ropository.EntityDto;

namespace project.Server.Ropository.AutoMapper
{
    public class ProjetAutoMapper
    {
        public static void ConfigureProject(IMapperConfigurationExpression config)
        {
            config.CreateMap<ProjetDto, Project>();
        }

        public static void ConfigureProjectDto(IMapperConfigurationExpression config)
        {
            config.CreateMap<Project, ProjetDto>();
        }

        public static List<ProjetDto> MapProjectToDtos(List<Project> projects, IMapper mapper)
        {
            return projects.Select(projet => mapper.Map<ProjetDto>(projet)).ToList();
        }
    }
}
