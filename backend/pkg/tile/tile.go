package tile

import (
	"fmt"
	"strconv"
)

func GetTileMetadata(manufacturer, code string) (*CodeRange, error) {
	codeInt, err := strconv.Atoi(code)
	if err != nil {
		return nil, fmt.Errorf("invalid code format: %v", err)
	}

	ranges, ok := manufacturerRanges[manufacturer]
	if !ok {
		return nil, fmt.Errorf("no ranges found for manufacturer: %s", manufacturer)
	}

	for _, r := range ranges {
		if codeInt >= r.Min && codeInt <= r.Max {
			return &r, nil
		}
	}

	return nil, fmt.Errorf("code %d not in any known range for %s", codeInt, manufacturer)
}
