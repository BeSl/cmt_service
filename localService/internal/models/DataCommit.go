package models

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
)

type CommitData struct {
	AuthorEmail    string `json:"email"`
	AuthorGitLogin string `json:"author_git"`
	CommentCommit  string `json:"comment_commit"`
	Data           string `json:"data"`
	NameData       string `json:"data_name"`
	BranchName     string `json:"branch_name"`
	ProjectName    string `json:"project_name"`
	TypeObject     string `json:"type_object"`
	GitServiceURL  string `json:"git_sevice_url"`
}

func (cd *CommitData) ProjectFileExist(workDir string) bool {

	fullPath := fmt.Sprintf("%s/%s", workDir, cd.ProjectName)
	_, err := os.Stat(fullPath)
	if err != nil {
		return false
	}

	if os.IsNotExist(err) == false {
		return true
	}

	return false
}

func (cd *CommitData) GitCloneProject(workDir string) error {
	if cd.ProjectFileExist(workDir) {
		return nil
	}

	cmd := exec.Command("git", "clone", fmt.Sprintf("%s/%s.git", cd.GitServiceURL, cd.ProjectName), workDir)
	err := cmd.Run()
	if err != nil {
		return err
	}
	return nil
}

func (cd *CommitData) PathFile() string {
	return fmt.Sprintf("%s/%s/%s.%s",
		cd.ProjectName,
		cd.CatalogNameFromType(),
		cd.NameData,
		cd.ExtendFile())
}

// CatalogNameFromType - returns the directory name for the saved file
func (cd *CommitData) CatalogNameFromType() string {

	currType := strings.ToLower(cd.TypeObject)

	switch currType {
	case "отчет":
		return "Отчет"
	case "заполнение табличных частей":
		return "Обработка"
	}
	return "Обработка"
}

// ExtendFile - returns the extension of the saved file
func (cd *CommitData) ExtendFile() string {

	currType := strings.ToLower(cd.TypeObject)

	switch currType {
	case "отчет":
		return "erf"
	default:
		return "epf"
	}
}

func (cd *CommitData) FieldDataValid() bool {

	return (cd.AuthorEmail != "" && cd.BranchName != "" && cd.Data != "" && cd.NameData != "" && cd.ProjectName != "")

}
