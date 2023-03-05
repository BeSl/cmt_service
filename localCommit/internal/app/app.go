package app

import (
	"fmt"
	"localcommitter/internal/config"
	"localcommitter/internal/routes"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

type App struct {
	Сonfig *config.Config
}

func NewApp(cfg *config.Config) *App {
	return &App{
		Сonfig: cfg,
	}
}

func (app *App) Start() {

	fbr := fiber.New()
	fbr.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	fbr.Use(func(c *fiber.Ctx) error {
		c.Locals("workDir", app.Сonfig.JobProject.DirRepos)
		return c.Next()
	}, cors.New(), logger.New())

	routes.Setup(fbr)
	port := ":" + strconv.Itoa(app.Сonfig.Status.Port)
	err := fbr.Listen(port)
	if err != nil {
		fmt.Printf(err.Error())

	}
}
