package controllers

import (
	"back_commit/src/database"
	"back_commit/src/models"

	"github.com/gofiber/fiber/v2"
)

func AddNewCommit(c *fiber.Ctx) error {
	var newCommit models.Commit
	var user models.User
	var dtProcess models.DataProccessor

	err := c.BodyParser(&newCommit)
	if err != nil {
		c.Status(fiber.ErrBadRequest.Code)
		fixLog(err.Error())
		return err
	}

	tx := database.DB.Begin()

	tx.Where("ext_id = ?", newCommit.User.ExtID).Find(&user)

	if user.ID != 0 {
		newCommit.User = user
	} else {
		//Сообщение о новом пользователе
		tx.Create(&user)
	}

	tx.Where("ext_id = ?", newCommit.DataCommit.ExtID).Find(&dtProcess)

	if user.ID != 0 {
		newCommit.DataCommit = dtProcess
	} else {
		tx.Create(&dtProcess)
	}

	if err := tx.Create(&newCommit).Error; err != nil {
		tx.Rollback()
		c.Status(fiber.StatusBadRequest)
		fixLog(err.Error())
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	tx.Commit()
	return nil
}

func QueueCommit(c *fiber.Ctx) error {
	var commits []models.Commit
	var queuedata []models.CommitQueue

	database.DB.Model(&models.Commit{}).Preload("DataCommit").Preload("User").Where("complete = false").Order("date_event asc").Find(&commits)

	for _, cm := range commits {
		queuedata = append(queuedata, *models.NewEvent(&cm))
	}

	return c.JSON(queuedata)

}

func fixLog(DescError string) {
	var tLog models.Logger
	tLog.NewLog(DescError)
	database.DB.Create(&tLog)

}
