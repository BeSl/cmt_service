package models

import (
	"time"

	"github.com/google/uuid"
)

type Logger struct {
	ID        uuid.UUID `json:"id"`
	DateEvent time.Time `json:"date"`
	DescError string    `json:"description"`
}

func (l *Logger) NewLog(descError string) {

	l.DateEvent = time.Now()
	l.ID = uuid.New()
	l.DescError = descError

}
