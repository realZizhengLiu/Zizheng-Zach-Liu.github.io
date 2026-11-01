# Zizheng (Zach) Liu · 个人学术网站

这是一个以英文展示的学术个人网站，包含 Home、Research、Teaching 和 CV 四个页面。日常内容主要存放在 YAML 和 Markdown 文件中，不需要改动网页布局。

本项目已为现有仓库 [realZizhengLiu/Zizheng-Zach-Liu.github.io](https://github.com/realZizhengLiu/Zizheng-Zach-Liu.github.io) 准备 GitHub Pages 发布配置，目标地址为 `https://realzizhengliu.github.io/Zizheng-Zach-Liu.github.io/`。这是带仓库名子路径的项目站点。工作流位于 `.github/workflows/pages.yml`；本地准备文件不代表已经上传或上线，实际状态以 GitHub Actions 和 Pages 为准。

## 先在自己的电脑打开网站

### 本地预览入口

最简单的方法：在资源管理器打开本项目中的 `scripts` 文件夹，双击 **`preview.bat`**。保留弹出的窗口，等 Jekyll 提示服务已就绪后，在浏览器打开脚本打印的地址。当前配置对应 **`http://127.0.0.1:4000/Zizheng-Zach-Liu.github.io/`**。这个地址只用于自己的电脑，不是公开网址。

如果更习惯复制命令，也可以：

1. 在 Windows 开始菜单搜索并打开 **PowerShell**。
2. 复制以下第一行，按回车，进入网站文件夹。
3. 复制第二行，按回车，启动同一个预览服务。

```powershell
Set-Location -LiteralPath 'E:\讲座安排\个人网页\academic-site'
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\preview.ps1
```

第二行中的执行策略选项仅用于这次启动的 PowerShell 进程，不会修改电脑的永久设置。

本次已在项目旁的 `.local-work/runtime` 准备好便携运行环境：Java 17、JRuby、Bundler 和 Jekyll 3.9.5。预览脚本会自动调用它，不需要你再安装 Ruby、修改系统设置或开通账号。请保留 `academic-site` 与 `.local-work` 现在的相对位置；不要把运行环境搬进准备公开的网站项目。

启动脚本会先打印网址，再开始构建。首次启动需要等待，**以终端显示服务已就绪为准**，不能只看到网址就判断启动成功。保留窗口；关闭窗口会停止服务。停止预览可回到该窗口按 **Ctrl+C**；双击入口结束后如提示按键，按任意键即可关闭窗口。

如果 4000 端口被其他程序占用，可在 PowerShell 中改用另一个端口：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\preview.ps1 -Port 4001
```

此时打开 `http://127.0.0.1:4001/Zizheng-Zach-Liu.github.io/`。只想检查能否构建、不启动浏览器服务时，可以运行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\preview.ps1 -BuildOnly
```

构建成功后，生成的普通网页位于 `_site`；日常修改仍应改 `_data`、`_publications` 等源码。

不要双击 `index.html` 来判断网站是否正常。它是 Jekyll 源文件，需要先构建，浏览器不能直接执行里面的模板指令。

### 如果在新电脑上使用：标准 Ruby 备选方法

这台电脑已经配置好便携环境，下面仅用于以后迁移到没有该环境的新电脑。本网站使用 **Ruby → Bundler → Jekyll** 构建：Ruby 是运行环境，Bundler 安装项目依赖，Jekyll 将内容和模板变成普通网页。通常只需配置一次。

1. 按 [Jekyll 的 Windows 安装说明](https://jekyllrb.com/docs/installation/windows/)安装合适的 Ruby + Devkit。以项目 `Gemfile` 中的 Ruby/Jekyll 兼容要求为准。
2. 安装后重新打开 PowerShell，进入本项目文件夹。
3. 依次运行：

```powershell
gem install bundler
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

然后打开终端打印的网址，当前配置为 `http://127.0.0.1:4000/Zizheng-Zach-Liu.github.io/`。第一次 `bundle install` 会下载依赖，需要联网；以后通常不必重复安装。

**文字修改后的预览：** 大多数内容文件保存后会自动重新构建，刷新浏览器即可。修改 `_config.yml` 后，应先按 Ctrl+C 停止，再重新启动。若改了 `Gemfile`，先重新运行 `bundle install`。

## 从哪里开始修改

详细示例见 [中文维护手册](MAINTENANCE.zh-CN.md)。最常用的文件如下：

| 想做什么 | 打开哪个文件 |
| --- | --- |
| 修改姓名、职位、邮箱、简介、头像、教育经历 | `_data/profile.yml` |
| 修改研究概述和三个研究方向 | `_data/research.yml` |
| 修改一篇论文、状态、作者、摘要、SSRN/PDF 链接 | `_publications/` 中对应的 `.md` 文件 |
| 修改教学和审稿服务 | `_data/teaching.yml` |
| 修改导航 | `_data/navigation.yml` |
| 隐藏首页模块、修改页脚 | `_data/display.yml` |
| 更换头像 | `assets/images/photos/`，并核对 `portrait_url` |
| 更新网页上的 CV 概览 | `cv.html` 及其读取的 `_data`、`_publications` 文件 |
| 改字号、颜色、间距 | `assets/css/global.css` |

先复制一份要修改的文件到项目外备份，然后用 VS Code 或其他纯文本编辑器打开。不要使用 Word 编辑 YAML、Markdown 或 HTML。

首页和 Research 页读取同一批论文文件。修改论文状态只需改一个地方，两个页面会同时更新。论文的显示顺序由 `order` 控制，不靠虚构的发表日期排序。

首页使用你指定的照片，文件为 `assets/images/photos/portrait.png`。教育经历紧接自我介绍展示，内容由 `_data/profile.yml` 的 `education` 维护，显示开关仍为 `_data/display.yml` 中的 `show_experience`。没有提供的个人社交账号默认不显示。

CV 页面保留可直接浏览的学术概览，当前不提供 CV PDF 下载，上传文件也不携带 CV PDF 或其生成源文件。

## 发布到 GitHub Pages

当前发布路线是 **现有 GitHub 仓库 + GitHub Actions + GitHub Pages**。它会自行安装 Gemfile 中的依赖并构建 Jekyll。上传包已经按当前仓库名配置；实际公开状态以 GitHub 的部署结果为准。

### 1. 上传到已经创建的仓库

1. 登录 GitHub，打开 [Zizheng-Zach-Liu.github.io 仓库](https://github.com/realZizhengLiu/Zizheng-Zach-Liu.github.io)。这个仓库已经创建，默认分支为 `main`。
2. 空仓库页面点击 **uploading an existing file**；如果已有文件，使用 **Add file → Upload files**。
3. 在电脑上打开 `E:\讲座安排\个人网页\github-pages-upload`，将这个文件夹**里面的全部文件和子文件夹**拖入上传区。也可以先解压最新上传 ZIP，再上传解压后的内容。
4. 等上传完成，填写提交说明，例如 `Publish academic website`，并提交到 `main` 分支。
5. 上传后，仓库根目录应直接看到 `_config.yml`、`Gemfile`、`index.html`、`_data` 等，并且确实包含 `.github/workflows/pages.yml`。上传的是文件夹里的内容；ZIP 本身和外层文件夹不应成为网站根目录中的唯一文件。

使用已经整理好的 `github-pages-upload` 上传目录。不要把父文件夹、原始申请材料、本机运行环境、私人待办或临时文件一起上传。`.gitignore` 可帮助 Git 忽略文件，但不能阻止你手动通过网页上传它们。

### 2. 核对已经配置好的网址

当前 `_config.yml` 应保持下面的实际配置：

```yaml
url: "https://realzizhengliu.github.io"
baseurl: "/Zizheng-Zach-Liu.github.io"
```

因此正式网址为 `https://realzizhengliu.github.io/Zizheng-Zach-Liu.github.io/`。路径中的大小写与仓库名一致，`baseurl` 末尾不加 `/`。下面两种配置仅用于理解命名规则，当前发布无需按示例改动。

个人主页仓库命名示例：

```yaml
# 个人主页仓库：你的用户名.github.io
url: "https://你的用户名.github.io"
baseurl: ""
```

这是另一种仓库命名方式的示例；当前仓库继续使用前面的实际配置。

其他项目仓库的命名示例，例如 `academic-site`：

```yaml
url: "https://你的用户名.github.io"
baseurl: "/academic-site"
```

这时网址为 `https://你的用户名.github.io/academic-site/`。`baseurl` 填错最常见的后果是样式、照片或 PDF 显示 404。站内资源在模板中通过 `relative_url` 处理；修改资源链接时保留这一机制。

### 3. 启用部署工作流

项目已根据你的 GitHub 账号准备好 `.github/workflows/pages.yml`，`tools/github-pages.yml.example` 保留为参考示例。发布时：

1. 确认上传文件中包含 `.github/workflows/pages.yml`。注意路径开头的点，以及最后的 `.yml` 扩展名；不要只上传 `.example`。
2. 将新工作流和网站源码一起提交到 GitHub 的 `main` 分支。
3. 在仓库的 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 进入 **Actions** 标签，左侧选择 **Build and deploy academic site**，点击 **Run workflow**，选择 `main` 后运行。这样可以在启用 Pages 后发起一次完整构建和部署。
5. 等工作流显示绿色勾号，再到 **Settings → Pages** 或成功的部署任务中打开最终网址。红色叉号表示需要查看日志；首次设置通常需要等待构建完成后再刷新。

工作流依照 GitHub 官方 [自定义 Pages 工作流说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)组织。不要再同时启用另一条 “Deploy from a branch” 发布路线，避免混淆两个构建来源。

示例工作流使用与本地相同的 Java 17 和 JRuby 9.4.15.0，读取现有 `Gemfile.lock`，以保持依赖一致。目前尚未在 GitHub 执行过这个工作流，首次公开时需要查看 Actions 日志确认部署结果。

### 4. 以后通过 GitHub 网页更新

- **改文字：** 打开对应文件 → 点铅笔图标 → 修改 → **Commit changes**。如果已启用上面的工作流，对 `main` 的提交会触发网站更新。
- **上传头像或 PDF：** 进入对应的 `assets` 子文件夹 → **Add file → Upload files** → 上传 → **Commit changes**。换文件名时同时修改引用它的配置。
- **查看是否更新成功：** 先看 Actions 是否成功，再刷新个人网站。如果浏览器保留旧资源，可按 Ctrl+F5 强制刷新。

只在电脑上保存文件不会更新互联网网站；推送或提交到已配置发布的 GitHub 分支可能会自动更新公开网站。需要先检查的修改，应先保留在本地预览。

## 常见故障

| 现象 | 先看哪里 | 最少处理步骤 |
| --- | --- | --- |
| 本地提示 `ruby` / `bundle` 找不到 | PowerShell 报错和运行环境 | 这台电脑优先双击 `scripts/preview.bat`；不要绕过脚本直接运行未装到系统的命令。若移动过文件夹，检查项目旁 `.local-work/runtime` 是否仍在。换电脑时才按备用说明配置 Ruby。 |
| 提示端口已被占用 | 启动窗口中的报错 | 关闭之前的预览窗口，或用上面的 `-Port 4001` 命令启动并访问新端口。 |
| YAML 报错，网站无法构建 | 报错中给出的文件名和行号 | 撤销最近改动，检查空格缩进和引号。不能用 Tab 缩进，带冒号的长标题建议加引号。 |
| 内容改了仍是旧页面 | 终端构建信息 / GitHub Actions | 确认保存并构建成功；改配置后重启本地服务；线上先确认 Commit 已完成并等待 Actions。 |
| 图片不显示 | 浏览器地址、`portrait_url` 和实际文件名 | 核对目录、大小写、扩展名及 `baseurl`。不要填写电脑的 `E:\...` 路径。 |
| 链接或 PDF 404 | 链接指向和文件是否真的存在 | 核对文件名大小写、空格、扩展名；文件上传后再加入按钮。 |
| GitHub Actions 失败 | Actions → 本次运行 → 红色步骤日志 | 读取第一个明确错误；依赖问题检查 Gemfile，内容问题检查 YAML/模板，部署权限问题检查 Pages 设置。 |

如需请 AI 协助，可以复制报错中相关的几行，并说明改了哪个文件。不要发送密码、验证码或访问令牌。

## 项目来源与结构

网站以 [luost26/academic-homepage](https://github.com/luost26/academic-homepage) 的 Jekyll 数据和模板结构为基础，重新设计页面样式，并新增 Research、Teaching 和 CV 页面。保留上游 MIT 许可证，见 `LICENSE`。

本地源码、生成网页、运行环境分别承担不同作用：

- `_data`、`_publications` 和页面模板是日常维护的**源码**。
- `_site` 是 Jekyll 生成的**预览/部署成品**，不要直接在里面修改内容，因为下次构建会覆盖它。
- 项目旁的 `.local-work` 用于本机环境和私有记录，不属于应发布的网站。

当前只维护网页上的 HTML CV：教育、论文、教学、奖项等内容分别读取对应的数据文件，修改后重新构建即可更新。之前的 CV PDF 与生成文件保存在项目外的 `.local-work/private-cv/`，用于本机留存，不属于网站项目和上传文件。
