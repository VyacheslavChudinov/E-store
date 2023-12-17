using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrEmpty(orderBy)) { return query.OrderBy(p => p.Name); }

            return orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                "brand" => query.OrderByDescending(p => p.Brand),
                "brandDesc" => query.OrderByDescending(p => p.Brand),
                _ => query.OrderBy(p => p.Name),
            };
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) { return query; }

            var searchTermLowerCase = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(searchTermLowerCase));
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types)
        {
            var splittedBrands = new List<string>();
            var splittedTypes = new List<string>();

            if (!string.IsNullOrEmpty(brands))
            {
                splittedBrands.AddRange(brands
                                        .Trim()
                                        .ToLower()
                                        .Split(',')
                                        .Select(type => type.Trim())
                                        .ToList()
                );
            }

            if (!string.IsNullOrEmpty(types))
            {
                splittedTypes.AddRange(types
                                        .ToLower()
                                        .Split(',')
                                        .Select(type => type.Trim())
                                        .ToList()
                );
            }

            return query
                .Where(p => splittedBrands.Count == 0 || splittedBrands.Contains(p.Brand.ToLower()))
                .Where(p => splittedTypes.Count == 0 || splittedTypes.Contains(p.Type.ToLower()));
        }
    }
}