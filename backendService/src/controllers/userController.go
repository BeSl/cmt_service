package controllers

import (
	"back_commit/src/database"
	"back_commit/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func ReadUserByID(c *fiber.Ctx) error {

	id, _ := strconv.Atoi(c.Params("id"))
	var user models.User
	//db.Model(&User{}).Preload("CreditCards").Find(&users).Error
	database.DB.
		Model(&models.User{}).
		Preload("ProjectSettings").
		Where("id=?", id).Find(&user)
	res := c.JSON(user)
	return res

}

func Users(c *fiber.Ctx) error {
	var users []models.User

	database.DB.Find(&users)

	return c.JSON(users)
}

func UpdateUserByID(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var user models.User

	database.DB.Where("id=?", id).Find(&user)

	var upduser models.User

	if err := c.BodyParser(&upduser); err != nil {
		c.Status(500)
		return c.JSON(err.Error())
	}

	user.ExtID = upduser.ExtID
	user.FirstName = upduser.FirstName
	user.LastName = upduser.LastName
	user.Login1c = upduser.Login1c

	database.DB.Save(&user)
	c.Status(200)
	return c.JSON(fiber.Map{
		"message": "OK",
		"success": true,
	})
}

func DeleteUserByID(c *fiber.Ctx) error {

	id, _ := strconv.Atoi(c.Params("id"))
	var user models.User

	database.DB.Where("id=?", id).Find(&user)

	database.DB.Delete(&user)

	return c.JSON(fiber.Map{
		"message": "OK",
		"success": true,
	})
}

func CreateUser(c *fiber.Ctx) error {
	var user models.User

	err := c.BodyParser(&user)

	if err != nil {
		return c.JSON(user)
	}
	database.DB.Create(&user)

	return c.JSON(fiber.Map{
		"message": "OK",
		"success": true,
	})
}
