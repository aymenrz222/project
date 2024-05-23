using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace project.Server.Ropository.Entity
{
    public class ProjectTeamsConverter : JsonConverter<List<TeamProject>>
    {
        public override List<TeamProject> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var teamIds = JsonSerializer.Deserialize<List<int>>(ref reader, options);
            var teamProjects = new List<TeamProject>();
            foreach (var teamId in teamIds)
            {
                teamProjects.Add(new TeamProject { TeamId = teamId });
            }
            return teamProjects;
        }

        public override void Write(Utf8JsonWriter writer, List<TeamProject> value, JsonSerializerOptions options)
        {
            writer.WriteStartArray();
            foreach (var teamProject in value)
            {
                writer.WriteNumberValue(teamProject.TeamId);
            }
            writer.WriteEndArray();
        }
    }
}
