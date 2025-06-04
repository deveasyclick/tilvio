package types

// ClerkUser represents the Clerk user data structure
type ClerkUser struct {
	ID             string  `json:"id"`
	FirstName      string  `json:"first_name"`
	LastName       string  `json:"last_name"`
	EmailAddresses []Email `json:"email_addresses"`
}

// Email represents an email address structure
type Email struct {
	ID           string `json:"id"`
	EmailAddress string `json:"email_address"`
	Verified     bool   `json:"verified"`
}
