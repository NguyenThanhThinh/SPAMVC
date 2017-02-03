namespace SPAMVC.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreatedDB : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PersonalDetails",
                c => new
                    {
                        AutoId = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Age = c.Int(),
                        Active = c.Boolean(),
                    })
                .PrimaryKey(t => t.AutoId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.PersonalDetails");
        }
    }
}
