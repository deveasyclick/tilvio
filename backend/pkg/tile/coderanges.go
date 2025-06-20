package tile

// Struct with extra info
type CodeRange struct {
	Min         int
	Max         int
	Description string
	Type        string
	WeightInKg  float32
	Dimension   string
}

// Manufacturer → Code Ranges
var manufacturerRanges = map[string][]CodeRange{
	"Goodwill": {
		{Min: 25000, Max: 25499, Description: "inkjet", Type: "wall", WeightInKg: 19, Dimension: "250X400"},
		{Min: 25500, Max: 25799, Description: "stereo", Type: "wall", WeightInKg: 19, Dimension: "250X400"},
		{Min: 25800, Max: 25899, Description: "crack", Type: "wall", WeightInKg: 21, Dimension: "250X500"},
		{Min: 25900, Max: 32999, Description: "super crack", Type: "wall", WeightInKg: 21, Dimension: "250X500"},
		{Min: 33000, Max: 39999, Description: "vitrified and rustic", Type: "floor", WeightInKg: 19.5, Dimension: "300X300"},
		{Min: 40000, Max: 40999, Description: "vitrified plain", Type: "floor", WeightInKg: 27.5, Dimension: "400X400"},
		{Min: 40100, Max: 40179, Description: "glazed design", Type: "floor", WeightInKg: 27.5, Dimension: "400X400"},
		{Min: 40180, Max: 40499, Description: "black glazed", Type: "floor", WeightInKg: 27.5, Dimension: "400X400"},
		{Min: 40500, Max: 40700, Description: "rustic", Type: "floor", WeightInKg: 27.5, Dimension: "400X400"},
		{Min: 36100, Max: 36300, Description: "inkject", Type: "wall", WeightInKg: 27, Dimension: "300X600"},
		{Min: 36700, Max: 36799, Description: "rustic", Type: "floor", WeightInKg: 34, Dimension: "300X600"},
		{Min: 36800, Max: 36900, Description: "matte and crack", Type: "floor", WeightInKg: 27, Dimension: "300X600"},
		{Min: 36000, Max: 36100, Description: "vitrified", Type: "floor", WeightInKg: 31, Dimension: "300X600"},
		{Min: 60000, Max: 60100, Description: "vitrified", Type: "floor", WeightInKg: 27.5, Dimension: "600X600"},
		{Min: 66800, Max: 66899, Description: "porcelain vitrified", Type: "floor", WeightInKg: 31, Dimension: "600X600"},
		{Min: 66200, Max: 66399, Description: "glazed", Type: "floor", WeightInKg: 27.5, Dimension: "600X600"},
		{Min: 66000, Max: 66199, Description: "super polished nylon face", Type: "floor", WeightInKg: 31, Dimension: "600X600"},
		{Min: 66500, Max: 66599, Description: "rustic", Type: "floor", WeightInKg: 27.5, Dimension: "600X600"},
		{Min: 66700, Max: 66799, Description: "porcelain rustic", Type: "floor", WeightInKg: 31, Dimension: "600X600"},
		{Min: 12600, Max: 12699, Description: "super polish", Type: "floor", WeightInKg: 32, Dimension: "600X1200"},
		{Min: 12700, Max: 12799, Description: "porcelain rustic", Type: "floor", WeightInKg: 32, Dimension: "600X1200"},
	},
}
