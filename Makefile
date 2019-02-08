help:
	@echo "usage: make COMMAND [c=[arguments]]"
	@echo ""
	@echo "Commands:"
	@echo "  up               Up all docker services"
	@echo "  down             Stop all docker services"
	@echo "  dps              Show all running containers"
	@echo "  up-build         Up docker services with --build param"
	@echo "  lint             Linting js code"
	@echo "  precommit        Fixing possible errors before pushing to remote repo"
	@echo "  db-refresh       Rollback, migrate and seed"
	@echo "  unit             Run unit tests"

# Show all running containers
dps:
	@docker ps --format "table {{.ID}}\t{{.Ports}}\t{{.Names}}"

# Up docker environment
up:
	docker-compose up -d
	make dps

up-build:
	docker-compose up -d --build
	make dps

# Down docker environment
down:
	docker stop $(shell docker ps -a -q)

# Command should fix all possibe errors in style
precommit:
	@npm run precommit
	@make lint

# Linting js code for errors
# Should be executed before commit and pushing to git repository
lint:
	@npm run ci-lint

lintfix:
	@npm run precommit

# Refresh current DB
db-refresh:
	@node_modules/.bin/knex migrate:rollback
	@node_modules/.bin/knex migrate:latest
	@node_modules/.bin/knex seed:run

db-up:
	@node_modules/.bin/knex migrate:latest

db-down:
	@node_modules/.bin/knex migrate:rollback

unit:
	@npm test
