using System.Text.Json;
using API.RequestHelpers;

namespace API.Extensions;

public static class HttpExtensions
{
    public static void AddPaginationHeader(this HttpResponse httpResponse, PaginationDetails paginationDetails)
    {
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        httpResponse.Headers.Append("Pagination", JsonSerializer.Serialize(paginationDetails, options));
        httpResponse.Headers.Append("Access-Control-Expose-Headers", "Pagination");
    }
}