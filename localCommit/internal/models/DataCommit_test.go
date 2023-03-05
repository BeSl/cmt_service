package models

import (
	"testing"
)

func TestExtendFile(t *testing.T) {
	tests := []struct {
		name string
		cd   CommitData
		want string
	}{
		{
			name: "Отчет type",
			cd: CommitData{
				TypeObject: "Отчет",
			},
			want: "erf",
		},
		{
			name: "Other type",
			cd: CommitData{
				TypeObject: "Other",
			},
			want: "epf",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.cd.ExtendFile(); got != tt.want {
				t.Errorf("CommitData.ExtendFile() = %v, want %v", got, tt.want)
			}
		})
	}
}
