package models

import "time"

type Model struct {
	ID        uint `json:"id" gorm:"primary_key;AUTO_INCREMENT;unique"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
