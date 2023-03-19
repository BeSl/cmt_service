package controllers

import (
	"back_commit/src/database"
	"back_commit/src/models"

	"github.com/gofiber/fiber/v2"
)

func LoggerReadAll(c *fiber.Ctx) error {
	var data []models.Logger

	database.DB.Limit(30).Order("Date_event desc").Find(&data)

	return c.JSON(data)
}
