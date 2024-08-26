using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UniversityHub.Migrations
{
    /// <inheritdoc />
    public partial class _1123 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Descussion",
                table: "applications",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descussion",
                table: "applications");
        }
    }
}
