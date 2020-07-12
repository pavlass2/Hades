using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Hades.Migrations
{
    public partial class MessagesDevelopment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FrontEndTimeStamp",
                table: "Messages",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeStamp",
                table: "Messages",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FrontEndTimeStamp",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "TimeStamp",
                table: "Messages");
        }
    }
}
