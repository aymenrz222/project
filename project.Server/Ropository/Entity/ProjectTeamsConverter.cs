using System.Text.Json;
using System.Text.Json.Serialization;

namespace project.Server.Ropository.Entity
{
    public class ProjectTeamsConverter : JsonConverter<List<TeamProject>>
    {
        public override List<TeamProject> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var values = JsonSerializer.Deserialize<JsonElement>(ref reader, options);
            if (values.ValueKind != JsonValueKind.Array)
            {
                throw new JsonException();
            }

            var result = new List<TeamProject>();
            foreach (var value in values.EnumerateArray())
            {
                result.Add(JsonSerializer.Deserialize<TeamProject>(value, options));
            }

            return result;
        }

        public override void Write(Utf8JsonWriter writer, List<TeamProject> value, JsonSerializerOptions options)
        {
            writer.WriteStartArray();
            foreach (var item in value)
            {
                writer.WriteStartObject();
                writer.WriteNumber("TeamId", item.TeamId);
                writer.WriteNumber("ProjectId", item.ProjectId);
                writer.WriteEndObject();
            }
            writer.WriteEndArray();
        }
    }
}
