package controllers

import (
	"localcommitter/internal/commitworker"
	"localcommitter/internal/models"

	"github.com/gofiber/fiber/v2"
)

func NewDataCommit(c *fiber.Ctx) error {
	var data models.CommitData
	workDir := c.Locals("workDir").(string)
	err := c.BodyParser(&data)
	if err != nil {
		c.Status(fiber.ErrBadRequest.Code)
		return c.JSON(fiber.Map{
			"massage": err.Error(),
			"success": "NO",
		})
	}

	if !data.FieldDataValid() {
		c.Status(fiber.ErrBadRequest.Code)
		return c.JSON(fiber.Map{
			"massage": "data not valid",
			"success": "NO",
		})
	}

	err = commitworker.CreateCommit(&data, workDir)

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"massage": err.Error(),
			"success": "NO",
		})
	}
	return c.JSON(fiber.Map{
		"success": "OK",
	})
}

func CheckJob(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"success": "OK",
	})
}
