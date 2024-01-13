using Microsoft.EntityFrameworkCore.Migrations;

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations.SqliteMigrations;

/// <inheritdoc />
public partial class InitialCreate : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            "AspNetRoles",
            table => new
            {
                Id = table.Column<int>("INTEGER", nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                Name = table.Column<string>("TEXT", maxLength: 256, nullable: true),
                NormalizedName = table.Column<string>("TEXT", maxLength: 256, nullable: true),
                ConcurrencyStamp = table.Column<string>("TEXT", nullable: true)
            },
            constraints: table => { table.PrimaryKey("PK_AspNetRoles", x => x.Id); });

        migrationBuilder.CreateTable(
            "AspNetUsers",
            table => new
            {
                Id = table.Column<int>("INTEGER", nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                UserName = table.Column<string>("TEXT", maxLength: 256, nullable: true),
                NormalizedUserName = table.Column<string>("TEXT", maxLength: 256, nullable: true),
                Email = table.Column<string>("TEXT", maxLength: 256, nullable: true),
                NormalizedEmail = table.Column<string>("TEXT", maxLength: 256, nullable: true),
                EmailConfirmed = table.Column<bool>("INTEGER", nullable: false),
                PasswordHash = table.Column<string>("TEXT", nullable: true),
                SecurityStamp = table.Column<string>("TEXT", nullable: true),
                ConcurrencyStamp = table.Column<string>("TEXT", nullable: true),
                PhoneNumber = table.Column<string>("TEXT", nullable: true),
                PhoneNumberConfirmed = table.Column<bool>("INTEGER", nullable: false),
                TwoFactorEnabled = table.Column<bool>("INTEGER", nullable: false),
                LockoutEnd = table.Column<DateTimeOffset>("TEXT", nullable: true),
                LockoutEnabled = table.Column<bool>("INTEGER", nullable: false),
                AccessFailedCount = table.Column<int>("INTEGER", nullable: false)
            },
            constraints: table => { table.PrimaryKey("PK_AspNetUsers", x => x.Id); });

        migrationBuilder.CreateTable(
            "Baskets",
            table => new
            {
                Id = table.Column<int>("INTEGER", nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                BuyerId = table.Column<string>("TEXT", nullable: true),
                PaymentIntentId = table.Column<string>("TEXT", nullable: true),
                ClientSecret = table.Column<string>("TEXT", nullable: true)
            },
            constraints: table => { table.PrimaryKey("PK_Baskets", x => x.Id); });

        migrationBuilder.CreateTable(
            "Orders",
            table => new
            {
                Id = table.Column<int>("INTEGER", nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                BuyerId = table.Column<string>("TEXT", nullable: true),
                ShippingAddress_Name = table.Column<string>("TEXT", nullable: true),
                ShippingAddress_Address1 = table.Column<string>("TEXT", nullable: true),
                ShippingAddress_Address2 = table.Column<string>("TEXT", nullable: true),
                ShippingAddress_Country = table.Column<string>("TEXT", nullable: true),
                ShippingAddress_State = table.Column<string>("TEXT", nullable: true),
                ShippingAddress_City = table.Column<string>("TEXT", nullable: true),
                ShippingAddress_Zip = table.Column<string>("TEXT", nullable: true),
                Subtotal = table.Column<long>("INTEGER", nullable: false),
                DeliveryFee = table.Column<long>("INTEGER", nullable: false),
                OrderStatus = table.Column<int>("INTEGER", nullable: false),
                CreatedTime = table.Column<DateTime>("TEXT", nullable: false),
                PaymentIntentId = table.Column<string>("TEXT", nullable: true)
            },
            constraints: table => { table.PrimaryKey("PK_Orders", x => x.Id); });

        migrationBuilder.CreateTable(
            "Products",
            table => new
            {
                Id = table.Column<int>("INTEGER", nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                Name = table.Column<string>("TEXT", nullable: true),
                Description = table.Column<string>("TEXT", nullable: true),
                Price = table.Column<long>("INTEGER", nullable: false),
                PictureUrl = table.Column<string>("TEXT", nullable: true),
                Type = table.Column<string>("TEXT", nullable: true),
                Brand = table.Column<string>("TEXT", nullable: true),
                QuantityInStock = table.Column<int>("INTEGER", nullable: false),
                PublicId = table.Column<string>("TEXT", nullable: true)
            },
            constraints: table => { table.PrimaryKey("PK_Products", x => x.Id); });

        migrationBuilder.CreateTable(
            "AspNetRoleClaims",
            table => new
            {
                Id = table.Column<int>("INTEGER", nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                RoleId = table.Column<int>("INTEGER", nullable: false),
                ClaimType = table.Column<string>("TEXT", nullable: true),
                ClaimValue = table.Column<string>("TEXT", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                table.ForeignKey(
                    "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                    x => x.RoleId,
                    "AspNetRoles",
                    "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            "AspNetUserClaims",
            table => new
            {
                Id = table.Column<int>("INTEGER", nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                UserId = table.Column<int>("INTEGER", nullable: false),
                ClaimType = table.Column<string>("TEXT", nullable: true),
                ClaimValue = table.Column<string>("TEXT", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                table.ForeignKey(
                    "FK_AspNetUserClaims_AspNetUsers_UserId",
                    x => x.UserId,
                    "AspNetUsers",
                    "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            "AspNetUserLogins",
            table => new
            {
                LoginProvider = table.Column<string>("TEXT", nullable: false),
                ProviderKey = table.Column<string>("TEXT", nullable: false),
                ProviderDisplayName = table.Column<string>("TEXT", nullable: true),
                UserId = table.Column<int>("INTEGER", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                table.ForeignKey(
                    "FK_AspNetUserLogins_AspNetUsers_UserId",
                    x => x.UserId,
                    "AspNetUsers",
                    "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            "AspNetUserRoles",
            table => new
            {
                UserId = table.Column<int>("INTEGER", nullable: false),
                RoleId = table.Column<int>("INTEGER", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                table.ForeignKey(
                    "FK_AspNetUserRoles_AspNetRoles_RoleId",
                    x => x.RoleId,
                    "AspNetRoles",
                    "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    "FK_AspNetUserRoles_AspNetUsers_UserId",
                    x => x.UserId,
                    "AspNetUsers",
                    "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            "AspNetUserTokens",
            table => new
            {
                UserId = table.Column<int>("INTEGER", nullable: false),
                LoginProvider = table.Column<string>("TEXT", nullable: false),
                Name = table.Column<string>("TEXT", nullable: false),
                Value = table.Column<string>("TEXT", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                table.ForeignKey(
                    "FK_AspNetUserTokens_AspNetUsers_UserId",
                    x => x.UserId,
                    "AspNetUsers",
                    "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            "UserAddress",
            table => new
            {
                Id = table.Column<int>("INTEGER", nullable: false),
                Name = table.Column<string>("TEXT", nullable: true),
                Address1 = table.Column<string>("TEXT", nullable: true),
                Address2 = table.Column<string>("TEXT", nullable: true),
                Country = table.Column<string>("TEXT", nullable: true),
                State = table.Column<string>("TEXT", nullable: true),
                City = table.Column<string>("TEXT", nullable: true),
                Zip = table.Column<string>("TEXT", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_UserAddress", x => x.Id);
                table.ForeignKey(
                    "FK_UserAddress_AspNetUsers_Id",
                    x => x.Id,
                    "AspNetUsers",
                    "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            "OrderItem",
            table => new
            {
                Id = table.Column<int>("INTEGER", nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                Price = table.Column<long>("INTEGER", nullable: false),
                Quantity = table.Column<int>("INTEGER", nullable: false),
                OrderedItemSnapshot_ProductId = table.Column<int>("INTEGER", nullable: true),
                OrderedItemSnapshot_Name = table.Column<string>("TEXT", nullable: true),
                OrderedItemSnapshot_PictureUrl = table.Column<string>("TEXT", nullable: true),
                OrderId = table.Column<int>("INTEGER", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_OrderItem", x => x.Id);
                table.ForeignKey(
                    "FK_OrderItem_Orders_OrderId",
                    x => x.OrderId,
                    "Orders",
                    "Id");
            });

        migrationBuilder.CreateTable(
            "BasketItems",
            table => new
            {
                Id = table.Column<int>("INTEGER", nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                Quantity = table.Column<int>("INTEGER", nullable: false),
                ProductId = table.Column<int>("INTEGER", nullable: false),
                BasketId = table.Column<int>("INTEGER", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_BasketItems", x => x.Id);
                table.ForeignKey(
                    "FK_BasketItems_Baskets_BasketId",
                    x => x.BasketId,
                    "Baskets",
                    "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    "FK_BasketItems_Products_ProductId",
                    x => x.ProductId,
                    "Products",
                    "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.InsertData(
            "AspNetRoles",
            new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
            new object[,]
            {
                { 1, null, "Member", "MEMBER" },
                { 2, null, "Admin", "ADMIN" }
            });

        migrationBuilder.CreateIndex(
            "IX_AspNetRoleClaims_RoleId",
            "AspNetRoleClaims",
            "RoleId");

        migrationBuilder.CreateIndex(
            "RoleNameIndex",
            "AspNetRoles",
            "NormalizedName",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_AspNetUserClaims_UserId",
            "AspNetUserClaims",
            "UserId");

        migrationBuilder.CreateIndex(
            "IX_AspNetUserLogins_UserId",
            "AspNetUserLogins",
            "UserId");

        migrationBuilder.CreateIndex(
            "IX_AspNetUserRoles_RoleId",
            "AspNetUserRoles",
            "RoleId");

        migrationBuilder.CreateIndex(
            "EmailIndex",
            "AspNetUsers",
            "NormalizedEmail");

        migrationBuilder.CreateIndex(
            "UserNameIndex",
            "AspNetUsers",
            "NormalizedUserName",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_BasketItems_BasketId",
            "BasketItems",
            "BasketId");

        migrationBuilder.CreateIndex(
            "IX_BasketItems_ProductId",
            "BasketItems",
            "ProductId");

        migrationBuilder.CreateIndex(
            "IX_OrderItem_OrderId",
            "OrderItem",
            "OrderId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            "AspNetRoleClaims");

        migrationBuilder.DropTable(
            "AspNetUserClaims");

        migrationBuilder.DropTable(
            "AspNetUserLogins");

        migrationBuilder.DropTable(
            "AspNetUserRoles");

        migrationBuilder.DropTable(
            "AspNetUserTokens");

        migrationBuilder.DropTable(
            "BasketItems");

        migrationBuilder.DropTable(
            "OrderItem");

        migrationBuilder.DropTable(
            "UserAddress");

        migrationBuilder.DropTable(
            "AspNetRoles");

        migrationBuilder.DropTable(
            "Baskets");

        migrationBuilder.DropTable(
            "Products");

        migrationBuilder.DropTable(
            "Orders");

        migrationBuilder.DropTable(
            "AspNetUsers");
    }
}