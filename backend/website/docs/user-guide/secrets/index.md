# Secrets

Zed can pull API keys from external secret managers at process startup instead of storing them in `~/.zed/.env`. The bootstrap token for the secret manager lives in `.env`; every other provider key (OpenAI, Anthropic, OpenRouter, etc.) can stay in the manager and rotate centrally.

Supported:

- [Bitwarden Secrets Manager](./bitwarden) â€” `bws` CLI, lazy-installed, free tier works.

More backends (Vault, AWS Secrets Manager, 1Password CLI) are easy to add behind the same interface â€” the lift is one module in `agent/secret_sources/` and one CLI handler. File a request if you have a specific one in mind.
