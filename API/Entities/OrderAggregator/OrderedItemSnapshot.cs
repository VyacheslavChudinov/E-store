using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregator
{
    [Owned]
    public class OrderedItemSnapshot
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
    }
}