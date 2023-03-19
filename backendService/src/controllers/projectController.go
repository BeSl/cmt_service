package controllers

import (
	"back_commit/src/database"
	"back_commit/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func ProjectCreate(c *fiber.Ctx) error {
	var project models.Project

	if err := c.BodyParser(project); err != nil {
		fixLog(err.Error())
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request data" + err.Error(),
		})
	}

	database.DB.Create(project)
	return c.Status(fiber.StatusCreated).JSON(project)
}

func ProjectReadAll(c *fiber.Ctx) error {
	var project []models.Project

	database.DB.Model(&models.Project{}).Preload("ConnectParametrs").Find(&project)
	//b.Model(&User{}).Preload("CreditCards")
	return c.JSON(project)
}

func ProjectReadByID(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var project models.Project
	var parConnect []models.ConnectProject

	database.DB.Where("id=?", id).Find(&project)
	database.DB.Where("p_id=?", id).Find(&parConnect)
	project.ConnectParametrs = parConnect

	res := c.JSON(project)
	return res
}

func ProjectUpdate(c *fiber.Ctx) error {
	var project models.Project
	if err := database.DB.First(&project, c.Params("id")).Error; err != nil {
		fixLog(err.Error())
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Project not found " + err.Error(),
		})
	}
	if err := c.BodyParser(&project); err != nil {
		fixLog(err.Error())
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request data " + err.Error(),
		})
	}
	database.DB.Save(&project)
	return c.Status(fiber.StatusOK).JSON(project)
}

func ProjectDelete(c *fiber.Ctx) error {
	var project models.Project
	if err := database.DB.First(&project, c.Params("id")).Error; err != nil {
		fixLog(err.Error())
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Project not found",
		})
	}
	database.DB.Delete(&project)
	return c.Status(fiber.StatusNoContent).Send(nil)
}
