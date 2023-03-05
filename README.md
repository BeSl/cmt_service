# cmt_service

local committer:
принимает задания на коммиты
```
IP:PORT/api/v1/new
```
Пример тела запроса
```
{
	"email": "a@a.ru",
	"data": "testdata",
	"data_name": "fsa",
	"branch_name": "master",
	"project_name": "biner",
	"type_object": "unc",
	"git_sevice_url": "github.com"
}
```