package main

import (
    "github.com/gin-gonic/gin"
    // "net/http"
    // "github.com/google/uuid"
    // "github.com/go-notify"
    "log"
    "runtime"
    "syscall"
    "os"
    "control"
    // "ktools"
    // "net/url"
    // "strconv"
    // "fmt"
    // "db"
    // "block"
    // "img"
    // "reflect"
    // "sync"
    // "encoding/json"
    // "bytes"
    // "strings"
    // "encoding/binary"
    // "time"
)

func setRunEnv() (success bool) {
    log.Println("start set runtime environment...")
    var rLimit syscall.Rlimit
    rLimit.Max = 999999
    rLimit.Cur = 999999
    err := syscall.Setrlimit(syscall.RLIMIT_NOFILE, &rLimit)
    if err != nil {
        log.Println("Error Setting Rlimit ", err)
        os.Exit(2)
    }
    log.Println("set runtime environment success.")
    return true
}

func authCheck() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next()
    }
}

func main() {
    setRunEnv()
    runtime.GOMAXPROCS(runtime.NumCPU())
    ctl := control.Init("D7")    //控制器初始化。
    r := gin.Default()
    r.LoadHTMLGlob("html/*")
    r.Static("/js", "./js")
    r.Static("/css", "./css")
    r.Static("/img", "./img")
    r.StaticFile("/favicon.ico", "./img/favicon.ico")
    r.GET("/", authCheck(), func(c *gin.Context) {
        ctl.Main(c)
    })
    r.RunTLS(":10080", "./ssl/zuopintong_com.crt", "./ssl/zuopintong_com.key")
}