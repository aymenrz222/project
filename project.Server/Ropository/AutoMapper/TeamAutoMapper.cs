using AutoMapper;
using project.Server.Ropository.Entity;
using project.Server.Ropository.EntityDto;

namespace project.Server.Ropository.AutoMapper
{
    public class TeamAutoMapper
    {
        public static void ConfigureTeams(IMapperConfigurationExpression config)
        {
            config.CreateMap<TeamDto, team>();
        }

        public static void ConfigureTeamsDto(IMapperConfigurationExpression config)
        {
            config.CreateMap<team, TeamDto>();
        }
    }
}
