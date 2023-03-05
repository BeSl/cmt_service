package main

import (
	"localcommitter/internal/app"
	"localcommitter/internal/config"

	"github.com/rs/zerolog/log"
)

type program struct{}

func main() {

	if err := config.ReadConfigYML("config.yml"); err != nil {
		log.Fatal().Err(err).Msg("Failed init configuration")
	}

	cfg := config.GetConfigInstance()

	log.Info().
		Str("version", cfg.Project.Version).
		Str("commitHash", cfg.Project.CommitHash).
		Bool("debug", cfg.Project.Debug).
		Str("environment", cfg.Project.Environment).
		Msgf("Starting service: %s", cfg.Project.Name)

	app := app.NewApp(&cfg)
	app.Start()

}
