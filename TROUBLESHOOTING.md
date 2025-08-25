# Open WebUI 故障排查指南

## 了解 Open WebUI 的架构

Open WebUI 的设计旨在简化客户端（浏览器）与 Ollama API 之间的交互。该架构的核心是后端反向代理，用于提高安全性并解决 CORS（跨域）问题。

- **工作原理**：Open WebUI 通过特定路由与 Ollama API 交互。当前端向 Ollama 发起请求时，请求并不是直接发送到 Ollama API，而是先发送到 Open WebUI 的后端（通常是 `/ollama` 路径）。后端再根据环境变量 `OLLAMA_BASE_URL` 指定的地址将该请求转发到 Ollama API。因此，前端请求 `/ollama` 实际上等同于后端向 `OLLAMA_BASE_URL` 发起相同请求。例如，前端请求 `/ollama/api/tags` 等同于后端请求 `OLLAMA_BASE_URL/api/tags`。

- **安全性优势**：此设计避免了将 Ollama API 直接暴露给前端，从而降低了 CORS 问题和未经授权访问的风险。另外，通过在后端强制认证访问 Ollama，可进一步提升安全性。

## Open WebUI：服务器连接错误

如果遇到连接问题，通常是因为 WebUI 的 Docker 容器无法在容器内访问 Ollama 服务（例如 127.0.0.1:11434 或 host.docker.internal:11434）。在运行容器时使用 `--network=host` 标志通常可以解决该问题。注意使用该模式时端口可能会从 3000 变为 8080，访问地址变为 `http://localhost:8080`。

**示例 Docker 命令**：

```bash
docker run -d --network=host -v open-webui:/app/backend/data -e OLLAMA_BASE_URL=http://127.0.0.1:11434 --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

### 关于 Ollama 响应缓慢导致的错误

Open WebUI 默认会等待 Ollama 最多 5 分钟来完成生成响应。若需更长或更短的超时时间，可通过环境变量 `AIOHTTP_CLIENT_TIMEOUT`（以秒为单位）调整客户端请求超时时间。

### 常见的连接问题通用排查

- **确认 Ollama 版本为最新版**：首先检查本地或服务器上的 Ollama 是否为最新版本，必要时更新。可访问 Ollama 官方网站获取最新信息：<https://ollama.com/>。

**排查步骤**：

1. **验证 Ollama URL 格式**：
   - 在运行 WebUI 容器时，确保已正确设置 `OLLAMA_BASE_URL`（例如在不同主机或网络环境下可能为 `http://192.168.1.1:11434`）。
   - 在 Open WebUI 的界面中，打开 “Settings（设置）” > “General（通用）”。
   - 确认 Ollama Server URL 配置正确（例如 `http://localhost:11434`）。

按照上述步骤通常可解决大多数连接问题。如需进一步帮助，请在我们的社区 Discord 中咨询。
