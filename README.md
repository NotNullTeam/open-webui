# Open WebUI 👋

**Open WebUI 是一款[可扩展](https://docs.openwebui.com/features/plugin/)、功能丰富且用户友好的自托管 AI 平台，设计即支持完全离线运行。** 它支持多种大语言模型运行时，如 **Ollama** 与 **兼容 OpenAI 的 API**，并内置用于 RAG 的推理引擎，是一套**强大的 AI 部署解决方案**。

## Open WebUI 关键特性 ⭐

- 🚀 **无痛安装**：通过 Docker 或 Kubernetes（kubectl、kustomize 或 helm）一键部署，同时支持带有 `:ollama` 与 `:cuda` 标签的官方镜像。

- 🤝 **Ollama / OpenAI API 集成**：可同时使用 Ollama 模型与兼容 OpenAI 的 API 进行对话。支持自定义 OpenAI API URL，连接 **LMStudio、GroqCloud、Mistral、OpenRouter** 等服务。

- 🛡️ **细粒度权限与用户组**：管理员可灵活配置角色与权限，增强安全性的同时带来可定制的用户体验，并强化用户责任感与归属感。

- 🔄 **SCIM 2.0 支持**：企业级用户与用户组的开通/回收（SCIM 2.0 协议），可与 Okta、Azure AD、Google Workspace 等身份提供商无缝集成，实现用户全生命周期自动化管理。

- 📱 **响应式设计**：在台式机、笔记本与移动端均获得一致、顺滑的体验。

- 📱 **移动端 PWA**：通过 PWA 在移动端享受类原生体验，支持在本机离线使用与流畅的界面交互。

- ✒️🔢 **完整 Markdown 与 LaTeX 支持**：为 LLM 交互提供全面的 Markdown 与 LaTeX 能力，表达更丰富。

- 🎤📹 **免手动语音/视频通话**：集成免手动语音与视频通话，让对话更生动、互动性更强。

- 🛠️ **模型构建器（Model Builder）**：在 Web UI 中轻松创建 Ollama 模型；支持创建/添加自定义角色或 Agent，定制聊天元素，并可通过 [Open WebUI 社区](https://openwebui.com/) 一键导入模型。

- 🐍 **原生 Python 函数调用工具**：在工具工作区内置代码编辑器，支持 BYOF（自带函数）：只需添加纯 Python 函数，便可与 LLM 无缝集成。

- 📚 **本地 RAG 集成**：支持前沿的检索增强生成（RAG），将文档交互无缝融入聊天体验。你可以直接在会话中加载文档，或将文件加入文档库，并在提问前通过 `#` 命令便捷引用。

- 🔍 **RAG 联网搜索**：可使用 `SearXNG`、`Google PSE`、`Brave Search`、`serpstack`、`serper`、`Serply`、`DuckDuckGo`、`TavilySearch`、`SearchApi`、`Bing` 等搜索提供方，将检索结果直接注入聊天。

- 🌐 **网页浏览能力**：在聊天中通过 `#`+URL 直接引入网页内容，让对话信息更丰富、更有深度。

- 🎨 **图像生成集成**：支持接入 AUTOMATIC1111 API 或 ComfyUI（本地），以及 OpenAI 的 DALL·E（外部），为对话带来动态视觉内容。

- ⚙️ **多模型会话**：可同时与多种模型对话，取长补短，获得更优答案；也可并行利用不同模型的能力。

- 🔐 **基于角色的访问控制（RBAC）**：以权限限制保障安全；只有获授权用户才能访问你的 Ollama；管理员独享模型创建/拉取权限。

- 🌐🌍 **多语言支持**：支持国际化（i18n），可在你熟悉的语言中使用 Open WebUI。欢迎一起扩充支持的语言，我们正在积极招募贡献者！

- 🧩 **Pipelines 与 Open WebUI 插件**：通过 [Pipelines 插件框架](https://github.com/open-webui/pipelines) 将自定义逻辑与 Python 库无缝集成进 Open WebUI。启动你的 Pipelines 实例，把 OpenAI URL 指向 Pipelines，即可解锁无限可能。可用[示例](https://github.com/open-webui/pipelines/tree/main/examples)包括：**函数调用**、用户**限流**（访问控制）、接入 Langfuse 的**用量监控**、使用 LibreTranslate 的**实时翻译**、**有害内容过滤**等。

- 🌟 **持续更新**：我们持续打磨 Open WebUI，不断带来修复与新功能。

想进一步了解功能？请查看[功能总览文档](https://docs.openwebui.com/features)！

## 如何安装 🚀

### 通过 Python pip 安装 🐍

Open WebUI 可通过 pip（Python 包管理器）安装。开始之前，请确保使用 **Python 3.11** 以避免兼容性问题。

1. **安装 Open WebUI**：
   在终端执行以下命令安装 Open WebUI：

   ```bash
   pip install open-webui
   ```

2. **运行 Open WebUI**：
   安装完成后，执行：

   ```bash
   open-webui serve
   ```

上述命令将启动 Open WebUI 服务端，然后访问 [http://localhost:8080](http://localhost:8080)。

### 其他安装方式

我们还提供非 Docker 的原生安装、Docker Compose、Kustomize 与 Helm 等多种方案。请访问[安装指南](https://docs.openwebui.com/getting-started/)，或加入我们的 [Discord 社区](https://discord.gg/5rJgQTnV4s) 获取完整指导。

进行本地开发？请查阅[本地开发指南](https://docs.openwebui.com/getting-started/advanced-topics/development)。

### 故障排查

遇到连接问题？请查看我们的[故障排查文档](https://docs.openwebui.com/troubleshooting/)。若需进一步帮助，也欢迎加入[Open WebUI Discord](https://discord.gg/5rJgQTnV4s) 与社区交流。

### 离线模式

如果你在离线环境运行 Open WebUI，可设置环境变量 `HF_HUB_OFFLINE=1`，避免从网络下载模型：

```bash
export HF_HUB_OFFLINE=1
```
## 接下来？🌟

在[路线图](https://docs.openwebui.com/roadmap/)中查看即将到来的功能。

```