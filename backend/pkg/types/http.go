package types

type APIERROR struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type APIResult struct {
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
	Code    int         `json:"code"`
}
