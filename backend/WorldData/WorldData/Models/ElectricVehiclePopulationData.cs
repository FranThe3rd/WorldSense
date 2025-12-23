
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/* This is the model for my Electric Vehicle Population Data table from my sql server database */

namespace WorldData.Models
{
    [Table("Electric_Vehicle_Population_Data")]
    public class ElectricVehiclePopulationData
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }  

        [Column("VIN")]
        public string Vin { get; set; } = string.Empty;

        [Column("County")]
        public string County { get; set; } = string.Empty;

        [Column("City")]
        public string City { get; set; } = string.Empty;

        [Column("State")]
        public string State { get; set; } = string.Empty;

        [Column("Postal Code")]
        public string PostalCode { get; set; } = string.Empty;

        [Column("Model Year")]
        public string ModelYear { get; set; } = string.Empty;

        [Column("Make")]
        public string Make { get; set; } = string.Empty;

        [Column("Model")]
        public string Model { get; set; } = string.Empty;

        [Column("Electric Vehicle Type")]
        public string ElectricVehicleType { get; set; } = string.Empty;

        [Column("Clean Alternative Fuel Vehicle (CAFV) Eligibility")]
        public string CafvEligibility { get; set; } = string.Empty;

        [Column("Electric Range")]
        public string ElectricRange { get; set; } = string.Empty;

        [Column("Legislative District")]
        public string LegislativeDistrict { get; set; } = string.Empty;

        [Column("DOL Vehicle ID")]
        public string DolVehicleId { get; set; } = string.Empty;

        [Column("Vehicle Location")]
        public string VehicleLocation { get; set; } = string.Empty;

        [Column("Electric Utility")]
        public string ElectricUtility { get; set; } = string.Empty;

        [Column("2020 Census Tract")]
        public string CensusTract2020 { get; set; } = string.Empty;
    }
}

