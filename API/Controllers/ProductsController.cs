using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ProductsController(StoreContext context, IMapper mapper, ImageService imageService) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
    {
        var query = context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();
        var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

        Response.AddPaginationHeader(products.PaginationDetails);

        return products;
    }

    [HttpGet("{id}", Name = "GetProduct")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await context.Products.FindAsync(id);

        if (product == null) return NotFound();

        return product;
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var brands = await context.Products.Select(p => p.Brand).Distinct().ToListAsync();
        var types = await context.Products.Select(p => p.Type).Distinct().ToListAsync();


        return Ok(new { brands, types });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto createProductDto)
    {
        var product = mapper.Map<Product>(createProductDto);

        if (createProductDto.PictureFile is not null)
        {
            var imageResult = await imageService.AddImageAsync(createProductDto.PictureFile);
            if (imageResult.Error is not null)
                return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

            product.PictureUrl = imageResult.SecureUrl.ToString();
            product.PublicId = imageResult.PublicId;
        }

        context.Products.Add(product);

        var result = await context.SaveChangesAsync() > 0;
        if (result) return CreatedAtRoute("GetProduct", new { product.Id }, product);

        return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDto updateProductDto)
    {
        var product = await context.Products.FindAsync(updateProductDto.Id);
        if (product is null) return NotFound();

        if (updateProductDto.PictureFile is not null)
        {
            var imageResult = await imageService.AddImageAsync(updateProductDto.PictureFile);
            if (imageResult.Error is not null)
                return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

            if (!string.IsNullOrEmpty(product.PublicId))
            {
                await imageService.DeleteImageAsync(product.PublicId);
            }

            product.PictureUrl = imageResult.SecureUrl.ToString();
            product.PublicId = imageResult.PublicId;
        }

        mapper.Map(updateProductDto, product);

        var result = await context.SaveChangesAsync() > 0;
        if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating product." });

        return Ok(product);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var product = await context.Products.FindAsync(id);
        if (product is null) return NotFound();

        if (!string.IsNullOrEmpty(product.PublicId)) await imageService.DeleteImageAsync(product.PublicId);

        context.Products.Remove(product);

        var result = await context.SaveChangesAsync() > 0;
        if (!result) return BadRequest(new ProblemDetails { Title = "Problem deleting product." });

        return Ok();
    }
}