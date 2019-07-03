using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IOTGW_Admin_Panel.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(maxLength: 20, nullable: false),
                    Password = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    Roll = table.Column<int>(nullable: false),
                    FirstName = table.Column<string>(maxLength: 20, nullable: true),
                    LastName = table.Column<string>(maxLength: 20, nullable: true),
                    EnrollmentDate = table.Column<DateTime>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    PostalCode = table.Column<int>(nullable: false),
                    CompanyName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Gateways",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    Description = table.Column<string>(maxLength: 100, nullable: false),
                    UserID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gateways", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Gateways_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Nodes",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    Config = table.Column<string>(nullable: false),
                    Description = table.Column<string>(maxLength: 100, nullable: true),
                    Type = table.Column<int>(nullable: false),
                    GatewayID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nodes", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Nodes_Gateways_GatewayID",
                        column: x => x.GatewayID,
                        principalTable: "Gateways",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Gateways_UserID",
                table: "Gateways",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Nodes_GatewayID",
                table: "Nodes",
                column: "GatewayID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Nodes");

            migrationBuilder.DropTable(
                name: "Gateways");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
