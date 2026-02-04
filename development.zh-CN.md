# FastAPI 项目 - 开发

## Docker Compose

* 使用 Docker Compose 启动本地堆栈：

```bash
docker compose watch
```

* 现在你可以打开浏览器并与这些 URL 交互：

前端，使用 Docker 构建，根据路径处理路由：<http://localhost:5173>

后端，基于 OpenAPI 的 JSON Web API：<http://localhost:8000>

使用 Swagger UI 的自动交互式文档（来自 OpenAPI 后端）：<http://localhost:8000/docs>

Adminer，数据库 Web 管理：<http://localhost:8080>

Traefik UI，查看代理如何处理路由：<http://localhost:8090>

**注意**：第一次启动堆栈时，可能需要一分钟才能准备好。当后端等待数据库准备好并配置所有内容时。你可以查看日志来监控它。

要查看日志，请运行（在另一个终端中）：

```bash
docker compose logs
```

要查看特定服务的日志，请添加服务名称，例如：

```bash
docker compose logs backend
```

## Mailcatcher

Mailcatcher 是一个简单的 SMTP 服务器，在本地开发期间捕获后端发送的所有电子邮件。它不发送真实的电子邮件，而是捕获并在 Web 界面中显示它们。

这对以下情况很有用：

* 在开发期间测试电子邮件功能
* 验证电子邮件内容和格式
* 调试与电子邮件相关的功能，而无需发送真实电子邮件

后端在本地使用 Docker Compose 运行时会自动配置为使用 Mailcatcher（端口 1025 上的 SMTP）。所有捕获的电子邮件都可以在 <http://localhost:1080> 查看。

## 本地开发

Docker Compose 文件配置为每个服务在 `localhost` 的不同端口上可用。

对于后端和前端，它们使用与本地开发服务器相同的端口，因此，后端位于 `http://localhost:8000`，前端位于 `http://localhost:5173`。

这样，你可以关闭 Docker Compose 服务并启动其本地开发服务，一切都会继续工作，因为它们都使用相同的端口。

例如，你可以在 Docker Compose 中停止 `frontend` 服务，在另一个终端中运行：

```bash
docker compose stop frontend
```

然后启动本地前端开发服务器：

```bash
bun run dev
```

或者你可以停止 `backend` Docker Compose 服务：

```bash
docker compose stop backend
```

然后你可以运行后端的本地开发服务器：

```bash
cd backend
fastapi dev app/main.py
```

## 在 `localhost.tiangolo.com` 中使用 Docker Compose

当你启动 Docker Compose 堆栈时，默认情况下它使用 `localhost`，每个服务使用不同的端口（后端、前端、adminer 等）。

当你将其部署到生产环境（或预发布环境）时，它将在不同的子域中部署每个服务，例如后端的 `api.example.com` 和前端的 `dashboard.example.com`。

在关于[部署](deployment.zh-CN.md)的指南中，你可以阅读有关 Traefik 的信息，即配置的代理。这是负责根据子域将流量传输到每个服务的组件。

如果你想在本地测试一切是否正常工作，你可以编辑本地 `.env` 文件，并更改：

```dotenv
DOMAIN=localhost.tiangolo.com
```

这将被 Docker Compose 文件用于配置服务的基本域。

Traefik 将使用它将 `api.localhost.tiangolo.com` 的流量传输到后端，将 `dashboard.localhost.tiangolo.com` 的流量传输到前端。

域 `localhost.tiangolo.com` 是一个特殊域，配置为（及其所有子域）指向 `127.0.0.1`。这样你就可以将其用于本地开发。

更新后，再次运行：

```bash
docker compose watch
```

在部署时，例如在生产环境中，主 Traefik 在 Docker Compose 文件之外配置。对于本地开发，`compose.override.yml` 中包含一个 Traefik，只是为了让你测试域是否按预期工作，例如使用 `api.localhost.tiangolo.com` 和 `dashboard.localhost.tiangolo.com`。

## Docker Compose 文件和环境变量

有一个主 `compose.yml` 文件，其中包含适用于整个堆栈的所有配置，它由 `docker compose` 自动使用。

还有一个 `compose.override.yml`，其中包含开发的覆盖，例如将源代码挂载为卷。它由 `docker compose` 自动使用，以在 `compose.yml` 之上应用覆盖。

这些 Docker Compose 文件使用 `.env` 文件，其中包含要作为环境变量注入到容器中的配置。

它们还使用在调用 `docker compose` 命令之前在脚本中设置的环境变量中获取的一些其他配置。

更改变量后，请确保重新启动堆栈：

```bash
docker compose watch
```

## .env 文件

`.env` 文件是包含所有配置、生成的密钥和密码等的文件。

根据你的工作流程，你可能希望将其从 Git 中排除，例如，如果你的项目是公开的。在这种情况下，你必须确保设置一种方法，让你的 CI 工具在构建或部署项目时获取它。

一种方法是将每个环境变量添加到你的 CI/CD 系统，并更新 `compose.yml` 文件以读取该特定环境变量，而不是读取 `.env` 文件。

## Pre-commits 和代码检查

我们使用一个名为 [prek](https://prek.j178.dev/) 的工具（[Pre-commit](https://pre-commit.com/) 的现代替代品）进行代码检查和格式化。

当你安装它时，它会在 git 中进行提交之前运行。这样可以确保代码在提交之前是一致的和格式化的。

你可以在项目根目录找到一个包含配置的文件 `.pre-commit-config.yaml`。

#### 安装 prek 以自动运行

`prek` 已经是项目依赖项的一部分。

安装 `prek` 工具并使其可用后，你需要在本地仓库中"安装"它，以便它在每次提交之前自动运行。

使用 `uv`，你可以这样做（确保你在 `backend` 文件夹内）：

```bash
❯ uv run prek install -f
prek installed at `../.git/hooks/pre-commit`
```

`-f` 标志强制安装，以防之前已经安装了 `pre-commit` 钩子。

现在，每当你尝试提交时，例如使用：

```bash
git commit
```

...prek 将运行并检查和格式化你即将提交的代码，并要求你再次使用 git 添加该代码（暂存它）然后再提交。

然后你可以再次 `git add` 修改/修复的文件，现在你可以提交了。

#### 手动运行 prek 钩子

你还可以在所有文件上手动运行 `prek`，你可以使用 `uv` 这样做：

```bash
❯ uv run prek run --all-files
check for added large files..............................................Passed
check toml...............................................................Passed
check yaml...............................................................Passed
fix end of files.........................................................Passed
trim trailing whitespace.................................................Passed
ruff.....................................................................Passed
ruff-format..............................................................Passed
biome check..............................................................Passed
```

## URL

生产或预发布 URL 将使用这些相同的路径，但使用你自己的域。

### 开发 URL

开发 URL，用于本地开发。

前端：<http://localhost:5173>

后端：<http://localhost:8000>

自动交互式文档（Swagger UI）：<http://localhost:8000/docs>

自动替代文档（ReDoc）：<http://localhost:8000/redoc>

Adminer：<http://localhost:8080>

Traefik UI：<http://localhost:8090>

MailCatcher：<http://localhost:1080>

### 配置了 `localhost.tiangolo.com` 的开发 URL

开发 URL，用于本地开发。

前端：<http://dashboard.localhost.tiangolo.com>

后端：<http://api.localhost.tiangolo.com>

自动交互式文档（Swagger UI）：<http://api.localhost.tiangolo.com/docs>

自动替代文档（ReDoc）：<http://api.localhost.tiangolo.com/redoc>

Adminer：<http://localhost.tiangolo.com:8080>

Traefik UI：<http://localhost.tiangolo.com:8090>

MailCatcher：<http://localhost.tiangolo.com:1080>
