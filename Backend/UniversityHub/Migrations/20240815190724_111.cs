using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UniversityHub.Migrations
{
    /// <inheritdoc />
    public partial class _111 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "applications",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_applications_UserId",
                table: "applications",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_applications_AspNetUsers_UserId",
                table: "applications",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_applications_AspNetUsers_UserId",
                table: "applications");

            migrationBuilder.DropIndex(
                name: "IX_applications_UserId",
                table: "applications");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "applications");
        }
    }
}
