
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/* This is the model for my Crime Data from 2020 to Present table from my sql server database.
 * It's about Crime Data from Los Angeles, California, from 2020 to Present.
 * Source: https://catalog.data.gov/dataset/crime-data-from-2020-to-present
 */


namespace WorldData.Entities
{
    [Table("Crime_Data_from_2020_to_Present")]
    public class CrimeEntity
    {
        [Key]
        [Column("DR_NO")]
        public int Id { get; set; }

        [Column("Date Rptd")]
        public string DateReported { get; set; } = string.Empty;

        [Column("DATE OCC")]
        public string DateOccurred { get; set; } = string.Empty;

        [Column("TIME OCC")]
        public string TimeOccurred { get; set; } = string.Empty;

        [Column("AREA")]
        public string Area { get; set; } = string.Empty;

        [Column("AREA NAME")]
        public string AreaName { get; set; } = string.Empty;

        [Column("Rpt Dist No")]
        public string ReportDistrictNo { get; set; } = string.Empty;

        [Column("Part 1-2")]
        public string Part12 { get; set; } = string.Empty;

        [Column("Crm Cd")]
        public string CrimeCode { get; set; } = string.Empty;

        [Column("Crm Cd Desc")]
        public string CrimeCodeDesc { get; set; } = string.Empty;

        [Column("Mocodes")]
        public string Mocodes { get; set; } = string.Empty;

        [Column("Vict Age")]
        public string VictimAge { get; set; } = string.Empty;

        [Column("Vict Sex")]
        public string VictimSex { get; set; } = string.Empty;

        [Column("Vict Descent")]
        public string VictimDescent { get; set; } = string.Empty;

        [Column("Premis Cd")]
        public string PremiseCode { get; set; } = string.Empty;

        [Column("Premis Desc")]
        public string PremiseDesc { get; set; } = string.Empty;

        [Column("Weapon Used Cd")]
        public string WeaponCode { get; set; } = string.Empty;

        [Column("Weapon Desc")]
        public string WeaponDescription { get; set; } = string.Empty;

        [Column("Status")]
        public string Status { get; set; } = string.Empty;

        [Column("Status Desc")]
        public string StatusDescription { get; set; } = string.Empty;

        [Column("Crm Cd 1")]
        public string CrimeCode1 { get; set; } = string.Empty;

        [Column("Crm Cd 2")]
        public string CrimeCode2 { get; set; } = string.Empty;

        [Column("Crm Cd 3")]
        public string CrimeCode3 { get; set; } = string.Empty;

        [Column("Crm Cd 4")]
        public string CrimeCode4 { get; set; } = string.Empty;

        [Column("LOCATION")]
        public string Location { get; set; } = string.Empty;

        [Column("Cross Street")]
        public string CrossStreet { get; set; } = string.Empty;

        [Column("LAT")]
        public string Latitude { get; set; } = string.Empty;

        [Column("LON")]
        public string Longitude { get; set; } = string.Empty;
    }
}
