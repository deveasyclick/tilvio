package types

type CreateWorkspaceRequest struct {
	Name             string `json:"name" validate:"required,min=3,max=50"`
	Logo             string `json:"logo" validate:"omitempty,url"`
	OrganizationName string `json:"organizationName" validate:"required,min=3,max=50"`
	OrganizationUrl  string `json:"organizationUrl" validate:"omitempty,url"`
	Email            string `json:"email" validate:"required,email"`
	Phone            string `json:"phone" validate:"required,min=10,max=50"`
	State            string `json:"state" validate:"required,min=2,max=30"`
	City             string `json:"city" validate:"required,min=2,max=30"`
	Address          string `json:"address" validate:"required,min=5,max=100"`
	Country          string `json:"country" validate:"required,min=2,max=100"`
}

type UpdateWorkspaceRequest struct {
	Name             string `json:"name" validate:"omitempty,min=3,max=50"`
	Logo             string `json:"logo" validate:"omitempty,url"`
	OrganizationName string `json:"organizationName" validate:"omitempty,min=3,max=50"`
	OrganizationUrl  string `json:"organizationUrl" validate:"omitempty,url"`
	Email            string `json:"email" validate:"omitempty,email"`
	Phone            string `json:"phone" validate:"omitempty,min=10,max=50"`
	State            string `json:"state" validate:"omitempty,min=2,max=30"`
	City             string `json:"city" validate:"omitempty,min=2,max=30"`
	Address          string `json:"address" validate:"omitempty,min=5,max=100"`
	OnboardedAt      *bool  `json:"onboardedAt" validate:"omitempty"`
}
