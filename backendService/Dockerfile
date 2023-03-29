FROM golang:1.19

WORKDIR /app
COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .
RUN echo ls -l
RUN go build -o hello main.go
CMD [". /hello"]
