using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UniversityHub.Migrations
{
    /// <inheritdoc />
    public partial class second : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "lastname",
                table: "AspNetUsers",
                newName: "lastName");

            migrationBuilder.RenameColumn(
                name: "firstname",
                table: "AspNetUsers",
                newName: "firstName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "lastName",
                table: "AspNetUsers",
                newName: "lastname");

            migrationBuilder.RenameColumn(
                name: "firstName",
                table: "AspNetUsers",
                newName: "firstname");
        }
    }
}
