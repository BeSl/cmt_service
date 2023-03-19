package controllers

import "github.com/gofiber/fiber/v2"

func Check(c *fiber.Ctx) error {

	return c.JSON(fiber.Map{
		"message": "OK",
		"status":  "healt",
	})
}
