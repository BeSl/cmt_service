package routes

import (
	"localcommitter/internal/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	api := app.Group("api")

	cmt := api.Group("v1")
	cmt.Post("/new", controllers.NewDataCommit)

	healt := app.Group("api")
	healt.Get("check", controllers.CheckJob)

}
