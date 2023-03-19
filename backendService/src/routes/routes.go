package routes

import (
	"back_commit/src/controllers"
	"back_commit/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	api := app.Group("api/")
	api.Get("check", controllers.Check)
	api.Post("logout", controllers.Logout)
	admin := api.Group("admin")

	admin.Post("register", controllers.Register)
	admin.Post("login", controllers.Login)

	adminAuthenticated := admin.Use(middlewares.IsAuthenticated)
	adminAuthenticated.Get("user", controllers.User)
	adminAuthenticated.Get("users", controllers.Users)
	adminAuthenticated.Get("users/:id", controllers.ReadUserByID)
	adminAuthenticated.Put("users/:id", controllers.UpdateUserByID)
	adminAuthenticated.Delete("users/:id", controllers.DeleteUserByID)
	adminAuthenticated.Post("users/new", controllers.CreateUser)
	adminAuthenticated.Post("users/:id/password", controllers.UpdatePassword)
	//adminAuthenticated
	// new user
	//

	jCommit := api.Group("v1")
	jCommit.Post("upload", controllers.AddNewCommit)
	//jCommit.Get("listuser") - список пользователей
	//jCommit.Get("queuecommit")- очередь коммитов
	//jCommit.Get("errorscommit")
	jCommit.Post("projects", controllers.ProjectCreate)
	jCommit.Get("projects", controllers.ProjectReadAll)
	jCommit.Get("projects/:id", controllers.ProjectReadByID)
	jCommit.Put("projects/:id", controllers.ProjectUpdate)
	jCommit.Delete("projects/:id", controllers.ProjectDelete)

	jCommit.Get("errors", controllers.LoggerReadAll)
	jCommit.Get("queue", controllers.QueueCommit)

}
