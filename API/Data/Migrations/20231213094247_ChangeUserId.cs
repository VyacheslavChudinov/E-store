using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeUserId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Baskets");

            migrationBuilder.AddColumn<string>(
                name: "BuyerId",
                table: "Baskets",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BuyerId",
                table: "Baskets");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Baskets",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
