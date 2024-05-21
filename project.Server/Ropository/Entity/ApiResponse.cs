namespace project.Server.Ropository.Entity
{
    public class ApiResponse
    {
        public int Status { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

        public ApiResponse(int status, string message)
        {
            Status = status;
            Message = message;
        }

        public ApiResponse(int status, string message, object data) : this(status, message)
        {
            Data = data;
        }
    }
}
