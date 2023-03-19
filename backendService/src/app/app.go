package app

import (
	"back_commit/src/config"
	"back_commit/src/database"
	"back_commit/src/distributer"
	"back_commit/src/routes"
	"context"
	"os"
	"os/signal"
	"strconv"
	"syscall"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/rs/zerolog/log"
)

type App struct {
	Config *config.Config
}

func New(cfg *config.Config) *App {
	return &App{
		Config: cfg,
	}
}

func (a *App) Start() {

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	database.Connect(&a.Config.Database)
	database.AutoMigrate()
	// database.SetupRedis()
	// database.SetupCacheChannel()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))
	app.Use(logger.New())

	routes.Setup(app)
	go app.Listen(":" + strconv.Itoa(a.Config.Status.Port))

	cr := distributer.Distrib{}
	cr.CommitService = &a.Config.CommitService
	go cr.Start()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

	select {
	case v := <-quit:
		log.Info().Msgf("signal.Notify: %v", v)
	case done := <-ctx.Done():
		log.Info().Msgf("ctx.Done: %v", done)
	}

	if err := app.Server().Shutdown(); err != nil {
		log.Error().Err(err).Msg("appServer.Shutdown")
	} else {
		log.Info().Msg("appServer shut down correctly")
	}

	if err := cr.Shutdown(); err != nil {
		log.Error().Err(err).Msg("CommitRecipient.Shutdown")
	} else {
		log.Info().Msg("CommitRecipient shut down correctly")
	}
}
