using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IOTGW_Admin_Panel.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gateways_Users_UserID",
                table: "Gateways");

            migrationBuilder.DropForeignKey(
                name: "FK_Nodes_Gateways_GatewayID",
                table: "Nodes");

            migrationBuilder.DropColumn(
                name: "Roll",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Users",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "GatewayID",
                table: "Nodes",
                newName: "GatewayId");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Nodes",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Nodes_GatewayID",
                table: "Nodes",
                newName: "IX_Nodes_GatewayId");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Gateways",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Gateways",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Gateways_UserID",
                table: "Gateways",
                newName: "IX_Gateways_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "Users",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Type",
                table: "Nodes",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "GatewayId",
                table: "Nodes",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Gateways",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(nullable: false),
                    NodeId = table.Column<int>(nullable: false),
                    SourceNode = table.Column<string>(nullable: false),
                    RecievedDateTime = table.Column<DateTime>(nullable: false),
                    Data = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_Nodes_NodeId",
                        column: x => x.NodeId,
                        principalTable: "Nodes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_NodeId",
                table: "Messages",
                column: "NodeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Gateways_Users_UserId",
                table: "Gateways",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Nodes_Gateways_GatewayId",
                table: "Nodes",
                column: "GatewayId",
                principalTable: "Gateways",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gateways_Users_UserId",
                table: "Gateways");

            migrationBuilder.DropForeignKey(
                name: "FK_Nodes_Gateways_GatewayId",
                table: "Nodes");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Users",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "GatewayId",
                table: "Nodes",
                newName: "GatewayID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Nodes",
                newName: "ID");

            migrationBuilder.RenameIndex(
                name: "IX_Nodes_GatewayId",
                table: "Nodes",
                newName: "IX_Nodes_GatewayID");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Gateways",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Gateways",
                newName: "ID");

            migrationBuilder.RenameIndex(
                name: "IX_Gateways_UserId",
                table: "Gateways",
                newName: "IX_Gateways_UserID");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Users",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Roll",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "Type",
                table: "Nodes",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<int>(
                name: "GatewayID",
                table: "Nodes",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "UserID",
                table: "Gateways",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Gateways_Users_UserID",
                table: "Gateways",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Nodes_Gateways_GatewayID",
                table: "Nodes",
                column: "GatewayID",
                principalTable: "Gateways",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
