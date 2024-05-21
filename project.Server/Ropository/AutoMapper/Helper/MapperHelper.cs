using AutoMapper;

namespace project.Server.Ropository.AutoMapper.Helper
{
    public static class MapperHelper
    {
        public static IMapper ConfigureMapper(Action<IMapperConfigurationExpression> configurationAction)
        {
            var config = new MapperConfiguration(configurationAction);
            return config.CreateMapper();
        }
    }
}
