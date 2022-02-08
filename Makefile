.PHONY:all
all:
	yarn start

.PHONY: setup
setup:
	yarn install

.PHONY: pr
pr:
	git push origin `git rev-parse --abbrev-ref HEAD`
	hub pull-request -b main -r returntocorp/pa

.PHONY: push
push:
	git push origin `git rev-parse --abbrev-ref HEAD`

.PHONY: merge
merge:
	A=`git rev-parse --abbrev-ref HEAD` && git checkout main && git pull && git branch -D $$A
