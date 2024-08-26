using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UniversityHub.Migrations
{
    /// <inheritdoc />
    public partial class universitylist : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "universities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AlphaTwoCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WebPages = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Domains = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StateProvince = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    userId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_universities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_universities_AspNetUsers_userId",
                        column: x => x.userId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_universities_userId",
                table: "universities",
                column: "userId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "universities");
        }
    }
}
