package repository

import (
	"github.com/deveasyclick/tilvio/internal/models"
	"gorm.io/gorm"
)

type WorkspaceRepository interface {
	Create(workspace *models.Workspace) error
	Update(workspace *models.Workspace) error
	Delete(ID uint) error
	FindByID(ID uint) (*models.Workspace, error)
}

type workspaceRepository struct {
	db *gorm.DB
}

func (r *workspaceRepository) Create(workspace *models.Workspace) error {
	return r.db.Create(workspace).Error
}

func (r *workspaceRepository) Update(workspace *models.Workspace) error {
	return r.db.Save(workspace).Error
}

func (r *workspaceRepository) Delete(ID uint) error {
	return r.db.Delete(&models.Workspace{}, ID).Error
}

func (r *workspaceRepository) FindByID(ID uint) (*models.Workspace, error) {
	var workspace models.Workspace
	err := r.db.First(&workspace, ID).Error
	if err != nil {
		return nil, err
	}
	return &workspace, nil
}

func NewWorkspaceRepository(db *gorm.DB) WorkspaceRepository {
	return &workspaceRepository{db: db}
}
