
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/* This is the model from my restaurants table from my sql server database, I guess I technically don't need annotation columns for this class
 * since my variable names match the names of my database columns...*/

namespace WorldData.Models
{
    [Table("380K_US_Restaurants")]
    public class Restaurants
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Rating { get; set; } = string.Empty;
        public string Website { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Images { get; set; } = string.Empty;
        public string Categories { get; set; } = string.Empty;
        public string Geo_Coordinates { get; set; } = string.Empty;
        public string Time_Zone { get; set; } = string.Empty;
        public string Latitude { get; set; } = string.Empty;
        public string Longitude { get; set; } = string.Empty;
    }
}
