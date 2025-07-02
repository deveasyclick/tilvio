package types

type CustomSessionClaims struct {
	UserId      string `json:"user_id"`
	WorkspaceId string `json:"workspace_id"`
}
