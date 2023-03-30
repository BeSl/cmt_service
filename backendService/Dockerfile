FROM golang:1.19-alpine AS builder

WORKDIR backendService
COPY backendService/go.mod .
COPY backendService/go.sum .
RUN go mod download
WORKDIR /backendService
COPY . .
RUN apk --no-cache add ca-certificates
RUN ls -l

# RUN go run ./backendService/main.go

EXPOSE 8081
