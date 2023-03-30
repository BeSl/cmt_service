FROM golang:1.19-alpine AS builder

WORKDIR backendService
COPY Makefile Makefile
RUN make deps-go
COPY . .
RUN apk --no-cache add ca-certificates
WORKDIR /root/
RUN chown -R node /proc/sys/net/ipv4/ip_unprivileged_port_start
RUN make build

COPY . .
RUN ls -l
# RUN go build -o back main.go
RUN go run main.go
# CMD [". /back"]
EXPOSE 8081
