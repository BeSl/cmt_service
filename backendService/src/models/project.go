package models

type Project struct {
	Model
	Name        string `json:"name"`
	Description string `json:"description"`
	//IsArchive        bool             `json:"is_archive"`
	Platform         string           `json:"platform"`
	ConnectParametrs []ConnectProject `json:"connect_parameters" gorm:"foreignKey:PID"`
}

type ConnectProject struct {
	Model
	PID     uint
	Name    string `json:"name"`
	Path    string `json:"path"`
	Type    string `json:"type"`
	Сomment string `json:"comment"`
}
