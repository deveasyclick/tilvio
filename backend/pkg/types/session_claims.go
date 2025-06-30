package types

type CustomSessionClaims struct {
	UserId *string `json:"user_id"`
}

const (
	ActiveSessionUserId = "session_user_id"
)
