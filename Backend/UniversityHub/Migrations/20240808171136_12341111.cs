using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UniversityHub.Migrations
{
    /// <inheritdoc />
    public partial class _12341111 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AlphaTwoCode",
                table: "universities");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "universities",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Domains",
                table: "universities",
                newName: "domains");

            migrationBuilder.RenameColumn(
                name: "Country",
                table: "universities",
                newName: "country");

            migrationBuilder.RenameColumn(
                name: "WebPages",
                table: "universities",
                newName: "alpha_two_code");

            migrationBuilder.AddColumn<string>(
                name: "web_pages",
                table: "universities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "web_pages",
                table: "universities");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "universities",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "domains",
                table: "universities",
                newName: "Domains");

            migrationBuilder.RenameColumn(
                name: "country",
                table: "universities",
                newName: "Country");

            migrationBuilder.RenameColumn(
                name: "alpha_two_code",
                table: "universities",
                newName: "WebPages");

            migrationBuilder.AddColumn<string>(
                name: "AlphaTwoCode",
                table: "universities",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
