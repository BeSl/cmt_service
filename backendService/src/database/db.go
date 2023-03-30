package database

import (
	"backendService/src/models"

	"github.com/rs/zerolog/log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

type DsnParam interface {
	NewDSN() string
}

func Connect(dsn DsnParam) {
	var err error
	conn := dsn.NewDSN()
	log.Info().Str("DSN", conn)
	DB, err = gorm.Open(postgres.Open(conn), &gorm.Config{})

	if err != nil {
		panic("Could not connect with the database!")
	}
}

func AutoMigrate() {
	DB.AutoMigrate(
		models.DataProccessor{},
		models.Commit{},
		models.Project{},
		models.ConnectProject{},
		models.Logger{},
		models.ProjectSettings{},
		models.User{},
	)
}
