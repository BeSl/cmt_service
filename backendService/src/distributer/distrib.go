package distributer

import (
	"back_commit/src/config"
	"back_commit/src/database"
	"back_commit/src/models"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"
)

type Distrib struct {
	ItWork        bool
	CommitService *config.CommitRecipient
}

func (dst *Distrib) Start() {

	dst.ItWork = true

	for {
		if dst.ItWork == false {
			break
		}
		dst.SendCommit(dst.CommitService)

		time.Sleep(time.Minute * time.Duration(1))
	}
}

func (dst *Distrib) Shutdown() error {

	dst.ItWork = false

	return nil
}

func (dst *Distrib) SendCommit(cr *config.CommitRecipient) {
	var ct models.Commit

	tx := database.DB.Begin()
	tx.Model(&models.Commit{}).Model(&models.User{}).
		Preload("ProjectSettings").
		Preload("DataCommit").
		Preload("User").
		Where("complete=false and blocked = false").Order("date_event").First(&ct)

	tx.Model(&ct).Update("blocked", true)

	senddata := models.SendDataCommit{}
	senddata.FillFromCommit(&ct)
	data, err := json.Marshal(senddata)
	if err != nil {
		tx.Rollback()
		log.Fatal(err)
		fixError(err.Error())
		return
	}
	url := fmt.Sprintf("http://%s:%v/%s", cr.Host, cr.Port, cr.Api)
	req, err := sendPOSTRequest(url, data)

	if err != nil {
		tx.Rollback()
		fixError(err.Error())
		return
	}
	if req.StatusCode != http.StatusOK {
		tx.Rollback()
		bodyBytes, err := io.ReadAll(req.Body)
		if err != nil {
			fixError(err.Error())
			log.Fatal(err)
		}
		bodyString := string(bodyBytes)

		fixError(fmt.Sprintf("%t|%v|%s", time.Now(), req.StatusCode, bodyString))
		return
	}
	tx.Model(&ct).Update("complete", true)
	tx.Commit()
}

func sendPOSTRequest(url string, body []byte) (*http.Response, error) {
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(body))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	return resp, nil
}

func fixError(dErr string) {
	tx := database.DB.Begin()

	var tlog models.Logger
	tlog.NewLog(dErr)
	tx.Create(&tlog)

	tx.Commit()

}
