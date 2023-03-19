package commitworker

import (
	"encoding/base64"
	"errors"
	"fmt"
	"localcommitter/internal/models"
	"os"
	"os/exec"
	"strings"

	"github.com/rs/zerolog/log"
)

func CreateCommit(cd *models.CommitData, baseDir string) error {

	check := isGitInstalled()

	if check != true {
		return errors.New("GIT not installed")
	}
	err := isOscriptInstalled()

	if check != true {
		return errors.New("Oscript not installed" + err.Error())
	}

	check = cd.ProjectFileExist(baseDir)
	if check != true {
		return errors.New("Dir project not exist")
	}

	//меняем ветку проекта
	cmdText := "git reset"
	err = system_exec(cmdText)
	if err != nil {
		return err
	}

	cmdText = fmt.Sprintf("git checkout %s", cd.BranchName)
	err = system_exec(cmdText)
	if err != nil {
		return err
	}

	cmdText = "git pull"
	err = system_exec(cmdText)
	if err != nil {
		return err
	}

	//сохраняем файл
	dataFile := cd.Data
	pathFile := cd.PathFile()
	file, _ := os.Create(pathFile)
	log.Info().Msg(baseDir + pathFile)
	defer file.Close()

	sDec, err := base64.StdEncoding.DecodeString(dataFile)
	if err != nil {
		return err
	}

	_, err = file.Write(sDec)
	if err != nil {
		return err
	}

	arg1 := strings.Split("git status", " ")
	cm := exec.Command(arg1[0], arg1[1:]...)
	cm.Dir = baseDir
	log.Info().Msg("Path: " + baseDir)

	stat, err := cm.CombinedOutput()
	if err != nil {
		return err

	} else {
		log.
			Info().
			Msg("git status! " + string(stat))
	}
	cmdText = "git add -A"
	cmdText = strings.Replace(cmdText, "\\", "/", -1)
	err = system_exec(cmdText)
	if err != nil {
		return err
	}

	var result = "git commit --author=%s<%s> -m"
	cmdText = fmt.Sprintf(result, cd.AuthorEmail, cd.AuthorGitLogin)

	arg := strings.Split(cmdText, " ")
	arg = append(arg, cd.CommentCommit)
	cm = exec.Command(arg[0], arg[1:]...)
	cm.Dir = baseDir

	b, err := cm.CombinedOutput()
	if err != nil {
		cmdText := "git status"
		err := system_exec(cmdText)
		if err != nil {
			log.Error().Err(err).Msg("Error CombinedOutput: ")
			return err
		}
	} else {
		log.Info().Msg("Done commit! : " + string(b))
	}
	// time.Sleep(time.Second * 30)

	cmdText = fmt.Sprintf("git push -u origin %s:%s", cd.BranchName, cd.BranchName)
	err = system_exec(cmdText)
	if err != nil {
		log.Error().Err(err).Msg(cmdText)
		return err
	}

	return nil
}
