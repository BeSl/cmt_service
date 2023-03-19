package commitworker

import (
	"errors"
	"os/exec"

	"github.com/rs/zerolog/log"
)

func EnvIsPrepar(workDir string) (bool, error) {

	return true, nil
}

func isGitInstalled() bool {
	cmd := exec.Command("git", "--version")
	err := cmd.Run()
	if err != nil {
		return false
	}
	return true
}

func isOscriptInstalled() error {
	cm := exec.Command("cmd", "oscript -v")
	stat, err := cm.CombinedOutput()
	if err != nil {
		return errors.New(err.Error() + string(stat))
	}
	return nil
}

func system_exec(str_cmd string) error {
	//run command system
	c := exec.Command("cmd", "/C", str_cmd)

	if err := c.Run(); err != nil {
		log.
			Error().
			Err(err).
			Msg("Error: " + str_cmd)

		return err
	} else {
		log.
			Info().
			Msg("Done! " + str_cmd)
		return nil
	}

}
