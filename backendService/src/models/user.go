package models

import (
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Model
	ExtName   string            `json:"name"`
	ExtID     uuid.UUID         `json:"ext_id" gorm:"primary_key"`
	FirstName string            `json:"first_name"`
	LastName  string            `json:"last_name"`
	Email     string            `json:"email" gorm:"unique"`
	Password  []byte            `json:"-"`
	Projects  []ProjectSettings `json:"project_settings" gorm:"foreignKey:UserRefer"`
	IsAdmin   bool              `json:"is_admin"`
	Login1c   string            `json:"login1c"`
}

type ProjectSettings struct {
	Model
	ExtID     uuid.UUID `json:"ext_id" gorm:"primary_key"`
	UserRefer uuid.UUID
	ProjectID uint
	Project   Project   `json:"project" gorm:"foreignKey:ProjectID"`
	UuidUser  uuid.UUID `json:"uuidUser"`
	UserName  string    `json:"userName"`
}

func (user *User) SetPassword(password string) {
	hashPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 12)
	user.Password = hashPassword
}

func (user *User) ComparePassword(password string) error {
	return bcrypt.CompareHashAndPassword(user.Password, []byte(password))
}

func (user *User) Name() string {
	return user.FirstName + " " + user.LastName
}

type Admin User
