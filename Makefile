up:
	@docker compose -f compose.yaml up -d

down:
	@docker compose down -v

restart: down up