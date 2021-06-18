---
template: cheat-sheet-base.html
title: Command Injection Prevention for Go
summary: |-
  This is Command injection prevention cheat sheet by r2c.
  It contains code patterns of potential ways to run an OS command in an application.
  Instead of scrutinizing code for exploitable vulnerabilities,
  the recommendations in this cheat sheet pave a safe road for developers that mitigates the possibility of Command injection in your code.
  By following these recommendations, you can be reasonably sure your code is free of Command injection.
mitigation_summary: |-
  In general, try not to let dynamic content in APIs intended for OS command execution.
  If this is not an option then perform proper input validation and contextually escape user data.
short_config_url: p/go-command-injection
pdf: https://web-assets.r2c.dev/security-cheat-sheets/xss/r2c-security-cheat-sheet-xss-prevention-for-django.pdf
conditions:
  - id: "1"
    description: 'Running an OS command'
    condition_details:
      - control: "A"
        short_description: "running OS commands with `exec.Command()`"
        description: |-
          `Command` and `CommandContext` return the Cmd struct to execute the named program with the given arguments.
          If unverified user data can reach its call site, this may end up in a command injection vulnerability.
          Both `Command` and `CommandContext` have built-in protections that will not let command arguments cause trouble.
          But make sure that the command itself is not controlled by the user, also do not use `sh`,
          because internal protection will not work in this case.
        example: |+
          package main

          import "os/exec"

          func main() {
            // Command example
            cmd := exec.Command("echo", "hello")

            // CommandContext is like Command but includes a context.
            err := exec.CommandContext(ctx, "sleep", "5").Run()

            // Not vulnerable
            cmd := exec.Command("echo", "1; cat /etc/passwd")

            // Vunerable
            out, _ = exec.Command("sh", "-c", "echo 1 | cat /etc/passwd").Output()

            // Vulnerable
            userInput1 = "cat" // value supplied by user input
            userInput2 = "/etc/passwd" // value supplied by user input
            out, _ = exec.Command(userInput1, userInput2)
          }
        example_lang: go
        references:
          - url: https://golang.org/pkg/os/exec/#Command
            text: "`Command` documentation"
          - url: https://golang.org/pkg/os/exec/#CommandContext
            text: "`CommandContext` documentation"
        mitigation:
          description: "Do not let user input in `exec.Command` and `exec.CommandContext` functions"
          alternative: |-
            Always try to use internal Go API (if it exists) instead of running an OS command.
            Try to avoid non-literal values for the command string.
            If it is not possible, then do not let running arbitrary commands, use a white list for inputs.
            Avoid running `sh` as a command with arguments,
            if it is not possible - strip everything except alphanumeric characters from an input provided for the command string and arguments.
          rule: "go.lang.security.audit.dangerous-exec-command.dangerous-exec-command"
      - control: "B"
        short_description: "creating `exec.Cmd` struct"
        description: |-
          `Cmd` represents an external command being prepared or run.
          If unverified user data can reach its call site, this may end up in a command injection vulnerability.
          Make sure that the command path and first argument are not controlled by the user, also do not use `sh`,
          because internal protection will not work in this case.
        example: |-
          package main

          import (
            "os/exec"
            "os"
          )

          func main() {
            cmd := &exec.Cmd {
              // Path is the path of the command to run.
              Path: "echo",
              // Args holds command line arguments, including the command as Args[0].
              Args: []string{ "echo", "hello" },
              Stdout: os.Stdout,
              Stderr: os.Stdout,
            }
            cmd.Start();
          }
        example_lang: go
        references:
          - url: https://golang.org/pkg/os/exec/#Cmd
            text: "`Cmd` struct documentation"
        mitigation:
          description: "Do not let user input in `exec.Cmd` struct"
          alternative: |-
            Always try to use internal Go API (if it exists) instead of running an OS command.
            Try to avoid non-literal values for the command string.
            If it is not possible, then do not let running arbitrary commands, use a white list for inputs.
            Avoid running `sh` as a command with arguments,
            if it is not possible - strip everything except alphanumeric characters from an input provided for the command string and arguments.
          rule: "go.lang.security.audit.dangerous-exec-cmd.dangerous-exec-cmd"
      - control: "C"
        short_description: "writing to a command's StdinPipe"
        description: |-
          Command's `StdinPipe` returns a pipe that will be connected to the command's standard input when it starts.
          If unverified user data can reach `StdinPipe`, this is a command injection vulnerability.
          A malicious actor can inject a malicious script to execute arbitrary code.
        example: |-
          package main

          import (
            "fmt"
            "os/exec"
          )

          func main() {
            cmd := exec.Command("bash")
            // StdinPipe initialization
            cmdWriter, _ := cmd.StdinPipe() 
            cmd.Start()
            // Vulnerability when `password` controlled by user input
            cmdInput := fmt.Sprintf("sshpass -p %s", password)
            // Writing to StdinPipe
            cmdWriter.Write([]byte(cmdInput + "\n"))
            cmd.Wait()
          }
        example_lang: go
        references:
          - url: https://golang.org/pkg/os/exec/#Cmd.StdinPipe
            text: "Cmd.StdinPipe documentation"
        mitigation:
          description: "Do not let user input in command's `StdinPipe`"
          alternative: |-
            Always try to use internal Go API (if it exists) instead of running an OS command.
            Do not use it to run the `bash` command and to avoid non-literal values for the command string.
            If it is not possible, then do not let running arbitrary commands, use a white list for inputs.
            Strip everything except alphanumeric characters from an input provided for the StdinPipe input.
          rule: "go.lang.security.audit.dangerous-command-write.dangerous-command-write"
      - control: "D"
        short_description: "running OS commands with `syscall.Exec()`"
        description: |-
          `Exec`/`ForkExec` invokes the execve(2) system call.
          If unverified user data can reach it's call site, this is a command injection vulnerability.
          Make sure that the command is not controlled by the user,
          also do not run `sh` with any possibility of user input involved in command arguments.
        example: |-
          package main

          import "syscall"
          import "os"
          import "os/exec"

          // Exec invokes the execve(2) system call.
          syscall.Exec(binary, args, env)
          // ForkExec - combination of fork and exec, careful to be thread safe.
          syscall.ForkExec(binary, args, env)

          func vulnerableCode(userInput string) {
            // Do not let `path` be defined by user input
            path, _ := exec.LookPath(userInput)
            args := []string{"ls", "-a", "-l", "-h"}
            env := os.Environ()
            execErr := syscall.Exec(path, args, env)
          }
        example_lang: go
        references:
          - url: https://golang.org/pkg/syscall/#Exec
            text: "`Exec` documentation"
          - url: https://golang.org/pkg/syscall/#ForkExec
            text: "`ForkExec` documentation"
        mitigation:
          description: "Do not let user input in `syscall.Exec` and `syscall.ForkExec` functions"
          alternative: |-
            Always try to use internal Go API (if it exists) instead of running an OS command.
            Try to avoid non-literal values for the command string.
            If it is not possible, then do not let running arbitrary commands, use a white list for inputs.
            Avoid running `sh` as a command with arguments,
            if it is not possible - strip everything except alphanumeric characters from an input provided for the command string and arguments.
          rule: "go.lang.security.audit.dangerous-syscall-exec.dangerous-syscall-exec"
---
