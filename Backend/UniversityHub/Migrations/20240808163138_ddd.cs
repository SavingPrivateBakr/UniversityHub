using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UniversityHub.Migrations
{
    /// <inheritdoc />
    public partial class ddd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_universities_AspNetUsers_userId",
                table: "universities");

            migrationBuilder.DropIndex(
                name: "IX_universities_userId",
                table: "universities");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "universities");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "userId",
                table: "universities",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_universities_userId",
                table: "universities",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_universities_AspNetUsers_userId",
                table: "universities",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
