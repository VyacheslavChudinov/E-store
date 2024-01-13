using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UpdateProductDto
{
    public int Id { get; set; }

    [Required] public string Name { get; set; }

    [Required] public string Description { get; set; }

    [Required] [Range(1, double.MaxValue)] public long Price { get; set; }

    public IFormFile PictureFile { get; set; }

    [Required] public string Type { get; set; }

    [Required] public string Brand { get; set; }

    [Required] [Range(0, 9999)] public int QuantityInStock { get; set; }
}