package models

import (
	"strings"
	"time"

	"github.com/google/uuid"
)

type Commit struct {
	Model
	DateEvent     time.Time `json:"dateevent"`
	Base64Data    string    `json:"base64data"`
	UserId        uint
	User          User `json:"author" gorm:"foreignKey:UserId"`
	DataCommitId  uint
	DataCommit    DataProccessor `json:"DataProccessor" gorm:"foreignKey:DataCommitId"`
	CommitMessage string         `json:"textCommit"`
	Source        string         `json:"source"`
	BranchName    string
	Complete      bool
	Blocked       bool
}

type CommitQueue struct {
	Date       time.Time `json:"date"`
	NameData   string    `json:"nameData"`
	Author     string    `json:"author"`
	TextCommit string    `json:"text_commit"`
	Barnch     string    `json:"branch"`
	Project    string    `json:"project"`
}

type SendDataCommit struct {
	Email         string `json:"email"`
	GitLogin      string `json:"author_git"`
	CommentCommit string `json:"comment_commit"`
	Data          string `json:"data"`
	NameData      string `json:"data_name"`
	BranchName    string `json:"branch_name"`
	ProjectName   string `json:"project_name"`
	TypeObject    string `json:"type_object"`
	GitServiceURL string `json:"git_sevice_url"`
}

func (sd *SendDataCommit) FillFromCommit(ct *Commit) {

	sd.Email = ct.User.Email
	sd.GitLogin = ct.User.Email
	sd.CommentCommit = ct.CommitMessage
	sd.Data = ct.Base64Data
	sd.NameData = ct.DataCommit.Name
	sd.BranchName = "develop"
	sd.ProjectName = ct.Source
	sd.TypeObject = ""
	sd.GitServiceURL = ""

}

func NewEvent(cm *Commit) *CommitQueue {
	return &CommitQueue{
		Date:       cm.DateEvent,
		NameData:   cm.DataCommit.Name,
		Author:     cm.User.Login1c,
		TextCommit: cm.CommitMessage,
		Barnch:     cm.Source,
	}

}

func (cm *Commit) BranchOurSource() string {
	if strings.HasPrefix(cm.Source, "!") {
		return "develop"
	}

	return "master"
}

type DataProccessor struct {
	Model
	ExtID uuid.UUID `json:"extID"`
	Name  string    `json:"name"`
}
