package models

import "time"

type Model struct {
	ID        uint `json:"id" gorm:"primary_key;AUTO_INCREMENT"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
