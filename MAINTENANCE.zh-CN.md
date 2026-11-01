# 中文维护手册

平时改网站，主要是修改内容文件，再保存、预览。你无需理解全部 HTML 或 CSS。修改前可在项目外复制一份备份；不要把私人备份放进准备公开的网站仓库。

## 速查表

| 我想改什么 | 文件 | 要找的字段或位置 |
| --- | --- | --- |
| 首页个人介绍 | `_data/profile.yml` | `short_bio` |
| 姓名、职务、单位、邮箱 | `_data/profile.yml` | `primary_name`、`positions`、`email` |
| 姓名下方的研究定位短句 | `_data/profile.yml` | `tagline` |
| 头像及其说明 | `_data/profile.yml` | `portrait_url`、`portrait_alt` |
| 教育经历 | `_data/profile.yml` | `education` |
| 个人社交链接 | `_data/profile.yml` | `social_links` |
| 研究方向及概述 | `_data/research.yml` | `intro`、`areas` |
| 某篇论文的标题、状态、摘要、链接 | `_publications/对应论文.md` | 文件顶部字段、底部长摘要 |
| 论文顺序、是否显示、是否首页精选 | 同上 | `order`、`visible`、`selected` |
| 本人作者姓名加粗、作者主页 | `_data/authors.yml` | 对应作者姓名下的 `bold`、`url` |
| 教学经历、审稿服务 | `_data/teaching.yml` | `courses`、`service` |
| 首页模块、页脚 | `_data/display.yml` | `homepage`、`footer_text` |
| 顶部导航 | `_data/navigation.yml` | `pages` |
| 网页上的 CV 概览 | `cv.html` 及它读取的各份数据 | 页内内容与对应 `_data` 字段 |
| 页面配色、字号、头像裁切方式 | `assets/css/global.css` | 对应 CSS 规则 |
| 浏览器标题和默认搜索描述 | `_config.yml` | `title`、`description` |
| 线上地址和子目录 | `_config.yml` | `url`、`baseurl` |

## 先认识三种文件写法

**YAML** 是带字段名的配置文本，例如 `email: "liu-zz20@mails.tsinghua.edu.cn"`。字段名左侧位置很重要：同一层对齐，下一层通常缩进两个空格。不要用 Tab。`true` 和 `false` 是开关，不要给它们加引号。

**Markdown** 是简单的文字排版写法。空一行表示新段落；`**重点**` 表示加粗；`[显示文字](https://example.com)` 表示链接。

**Front matter** 是 Markdown 文件开头由两行 `---` 包围的 YAML，存放论文标题、作者、状态等；第二行 `---` 之后是正文。不要删除这两行边界。

带冒号、问号或引号的标题，建议放进双引号中。如果内容本身有英文双引号，可用反斜杠转义，例如 `title: "A Platform-Generated \"Second Voice\""`；也可以用 YAML 多行写法。不要让编辑器把直引号自动替换成不配对的符号。

## 1. 替换、增加和减少文字

### 修改首页的一句话

打开 `_data/profile.yml`，找到 `short_bio`。这是首页个人介绍，值中可以使用 Markdown。

修改前（格式示例）：

```yaml
short_bio: |-
  I study the economics of digital platforms.
```

修改后：

```yaml
short_bio: |-
  I study the economics of digital platforms, with a focus on digital advertising and AI-enabled retailing.
```

`|-` 表示后面是多行文字。每一行正文必须比 `short_bio` 多缩进两个空格。保留字段名，替换右侧或下面的文字即可。

### 增加第二段

```yaml
short_bio: |-
  I study the economics of digital platforms, with a focus on digital advertising and AI-enabled retailing.

  My work uses game-theoretic modeling, information design, and mechanism design.
```

两段之间空一行。删除某段时，删掉整段即可，保留其他段落缩进。普通的单次换行可能仍显示在同一个段落中；想分段，应空一行。

### 修改研究介绍

打开 `_data/research.yml`。页面开头的整体介绍是 `intro`；具体方向在 `areas` 数组中。

```yaml
areas:
  - id: advertising
    name: "Digital Advertising"
    description: "How platform technologies shape advertising markets and consumer welfare."
```

改描述时，保留 `id`，替换 `description`。`id` 是供页面连接或程序识别的稳定名字，不是必须展示的文字。修改方向名称时，还要检查论文中引用这个方向的 `area` 字段，避免同一方向出现两种名称。

### 增加或删除教学经历

打开 `_data/teaching.yml`，找到 `courses`。复制一整条，从 `- name:` 开始，到下一条 `- name:` 之前结束，修改成真实课程信息。

```yaml
courses:
  - name: "Introduction to Business Analytics"
    audience: "MBA"
    language: "Taught in English"
    terms: "Spring 2024, 2026"
```

删除课程时删掉整条记录，避免只留下一个空的 `-`。请继续如实标注 Teaching Assistant，只有承担过独立授课时才调整角色描述。

**保存与检查：** 保存后刷新本地预览，确认段落、标点和卡片间距。如果构建报错，先检查刚改的 YAML 缩进和引号。文件保存到电脑只影响本地；线上更新还需要提交到已配置发布的仓库。

如果改的是姓名、身份或研究定位，也应检查 `_config.yml` 的 `title`、`description`，以及各页面开头的 `description`。这些文字供浏览器标签和搜索摘要使用，不一定直接出现在正文里。

## 2. 增加、修改、隐藏和删除论文

### 修改现有论文

在 `_publications` 中打开对应 `.md` 文件。常见字段：

- `title`：完整英文标题。
- `authors`：按正确顺序填写作者；本人加粗由 `_data/authors.yml` 控制。
- `status`：例如 `Conditionally accepted`、`Major revision`、`Under review` 或 `Working paper`。
- `venue`：期刊名；未确定投稿期刊的工作论文留空。
- `abstract`：列表中直接展示的短介绍。
- 第二个 `---` 后的正文：点击展开后阅读的长介绍。
- `order`：整数，较小的数排在同组前面；修改顺序无需伪造日期。
- `group`：`job_market`、`journal` 或 `working`，决定 Research 页所在分组。
- `selected`：是否出现在首页精选。
- `visible`：是否允许在网站上显示。
- `links`：按钮文字到真实网址或站内文件路径的对应表。

例如，真实收到状态变更后，可以将：

```yaml
status: "Under review"
venue: "Management Science"
```

改为新收到通知中的准确措辞。不要把条件接收和正式接收混写，也不要因为已经参会而给工作论文补上期刊发表日期。

### 新增一篇论文：完整格式示例

在 `_publications` 新建 `new-research-project.md`。下面只是字段格式演示，方括号中的内容必须替换为真实资料；**不要将此示例直接放到正式网站上**。

```markdown
---
paper_id: new-research-project
title: "[完整的真实论文标题]"
order: 50
status: "Working paper"
venue: ""
area: "Digital Advertising"
group: working
selected: false
visible: true
authors:
  - Zizheng Liu
  - "[真实合作者姓名]"
abstract: >-
  [用一至两句英文介绍真实研究问题与发现。]
links: {}
---

[在这里写更详细的英文研究介绍。]

[空一行后可以增加第二段。]
```

文件名使用英文、小写和连字符，避免空格。每个 `paper_id` 使用不同的稳定名字。没有外部链接时用 `links: {}`，页面就不应该显示空按钮。

若后来有真实 SSRN 地址，可改为：

```yaml
links:
  SSRN: "https://ssrn.com/abstract=4562103"
```

这里使用的是本站已有论文的链接写法示例；新增论文必须换成它自己的真实链接。

### 首页精选与页面同步

```yaml
selected: true
```

表示首页可选中这篇论文；`false` 表示只在 Research 页等适当位置展示。首页与 Research 使用同一个文件，因此标题、作者、状态、介绍不用改两遍。

### 暂时隐藏与永久删除

- 暂时隐藏：将 `visible: true` 改为 `visible: false`。记录仍保留在源码中，适合稍后继续编辑。
- 永久删除：删除对应 `.md` 文件，并搜索其他页面是否还有单独指向它的链接。

**隐藏不是保密措施。** 如果仓库公开，隐藏论文的源文件依然可被看到。真正不应公开的材料应从网站项目及将来公开的仓库中移出。

保存后检查：首页条目数量、Research 分组、作者顺序、状态、展开摘要和每个按钮。新增论文不应被误标为 Job Market Paper。

## 3. 替换头像和配图

当前头像使用你指定的照片，存放在 `assets/images/photos/portrait.png`。网站沿用原图像素，仅通过 CSS 控制显示大小与取景位置。

### 方法 A：以后沿用同一个文件名

以后替换头像时，可以用新的 PNG 照片替换 `assets/images/photos/portrait.png`，并保留 `_data/profile.yml` 的配置：

```yaml
portrait_url: "/assets/images/photos/portrait.png"
portrait_alt: "Portrait of Zizheng Liu"
```

沿用同名的 `portrait.png` 替换旧照片，不用每次改配置。实际文件应为 PNG；如果新照片是 JPEG，可保留其真实扩展名并按方法 B 更新路径，不要只修改扩展名。

### 方法 B：上传新文件名

例如上传 `assets/images/photos/portrait-2027.png`，再将配置改为：

```yaml
portrait_url: "/assets/images/photos/portrait-2027.png"
portrait_alt: "Portrait of Zizheng Liu"
```

图片文件名尽量只用英文字母、数字和连字符，大小写必须完全一致。Windows 上有时不明显的大小写差异，在 GitHub Pages 上可能导致 404。

### 尺寸、裁剪和显示

- 建议上传约 800×1000 像素的竖版头像，或至少边长 800 像素的清晰方图，控制文件大小在约 1 MB 以内。
- 先用 Windows 照片应用裁剪，保证脸部与头顶有余量，再上传；无需编写图像处理代码。
- 网页显示大小由 `assets/css/global.css` 控制，不需要为了显示更小就上传很小的原图。
- 如脸部被裁切，检查图片相关规则中的 `object-fit: cover` 和 `object-position`。`object-position: center 35%` 可让取景位置偏上；保存后在电脑和手机都确认一次。
- `portrait_alt` 是给屏幕阅读器及图片无法显示时使用的文字，应简洁描述图片；它不等同于图片下方的公开图注。

论文目前以文字为主，不要求每篇都有配图。如以后增加配图，先上传到 `assets/images/` 的合适子目录，再修改对应渲染代码与图片路径，并写有意义的 `alt`。不要只加一个模板尚未读取的字段就以为图片会自动出现。

### 换图后仍看到旧图

先确认文件已保存/上传、路径和文件名正确，随后按 Ctrl+F5 强制刷新。如果线上仍旧，先检查 Actions 是否成功完成；必要时换一个新文件名并更新 `portrait_url`。

## 4. 替换和增加超链接

### 修改邮箱

打开 `_data/profile.yml`，只填写邮箱地址：

```yaml
email: "liu-zz20@mails.tsinghua.edu.cn"
```

网站模板会生成 `mailto:` 链接。这里不需要在字段值里再加 `mailto:`。

### 添加个人网站或社交主页

`social_links` 使用完整 URL，不是账号 ID：

```yaml
social_links:
  - name: "Google Scholar"
    url: "https://scholar.google.com/citations?user=你的真实ID"
```

只有拿到自己的真实主页地址后才添加。没有任何链接时保持 `social_links: []`。此处示例中的中文占位文字必须替换，不能直接用于正式网页。

### 修改论文 SSRN 或添加 PDF

打开论文 Markdown，在 `links` 中填写：

```yaml
links:
  SSRN: "https://ssrn.com/abstract=4562103"
  PDF: "/assets/files/your-paper.pdf"
```

`SSRN` 和 `PDF` 是显示在按钮上的文字。外部地址用 `https://`；站内文件先真实放到 `assets/files/`，再填以 `/assets/` 开头的路径。模板负责处理部署子路径。

不要写成本机路径，例如 `E:\论文\your-paper.pdf`，其他人的电脑无法访问它。不要将 SSRN 摘要页标为 PDF 下载。

### 在 Markdown 段落中加链接

```markdown
Read the [paper on SSRN](https://ssrn.com/abstract=4562103).
```

在会执行 Liquid 的页面或模板中引用站内文件时：

```liquid
<a href="{{ '/assets/files/your-paper.pdf' | relative_url }}">Read paper PDF</a>
```

注意：YAML 数据中的字符串通常不会被再次作为 Liquid 模板执行。不要把 `{{ ... }}` 随意塞进 `_data` 的普通文字或链接字段；站内资源优先使用相应的专用路径字段。

### 在 HTML 中改链接

```html
<a href="https://ssrn.com/abstract=4562103" target="_blank" rel="noopener noreferrer">SSRN</a>
```

修改显示文字只改 `>` 与 `</a>` 之间的内容；修改目的地址改 `href`。新窗口外链保留 `rel` 属性。未知地址不要先填 `#`，应暂时不显示按钮。

每次改链接后，实际点开确认目标。若地址能打开却是同名的其他学者或另一篇文章，仍然属于错误链接。

## 5. 维护网页 CV 与增减栏目

### 更新网页上的 CV 概览

当前 CV 页面是一份可直接阅读的 HTML 学术概览，不提供 CV PDF 下载。日常更新时修改共享内容文件：

1. 修改 `_data/profile.yml` 中的 `education`、`awards`、`methods`、`computing`、`languages`，更新教育、奖项和技能。
2. 修改 `_publications/` 中对应论文，更新研究标题、作者、状态与链接。
3. 修改 `_data/teaching.yml`，更新教学和学术服务。
4. 保存、重新构建并打开 `/cv/`，确认各项内容正确；同时检查首页和 Research 页中的共享信息。

只需调整内容时，优先改上述数据文件。只有需要增删页面结构或改变栏目顺序时，才修改 `cv.html`。

之前的 CV PDF 与生成文件已经移到网站项目外的 `.local-work/private-cv/` 作本机留存，不应放回上传文件夹。当前网站项目和上传包中不包含这些文件；通用的论文 PDF 链接功能仍可正常使用。

### 隐藏首页模块

打开 `_data/display.yml`，对应开关改成 `false`：

```yaml
homepage:
  show_experience: true
  show_news: false
  show_selected_publications: true
```

`show_experience` 控制首页自我介绍下方的教育经历，`show_selected_publications` 控制首页精选研究。News 默认关闭，只有同时准备了真实动态数据和相应展示内容时才开启；不要为了填满页面编造日期或新闻。

### 删除一个导航入口

打开 `_data/navigation.yml`，从 `pages` 中删除对应整条，例如：

```yaml
pages:
  - name: Home
    url: /
  - name: Research
    url: /research/
  - name: Teaching
    url: /teaching/
  - name: CV
    url: /cv/
```

删除导航只是隐藏入口，页面地址可能仍能访问。若要彻底移除 Teaching 页，还需删除 `teaching.html`，并检查首页、页脚、正文中是否有其他 `/teaching/` 链接。

### 增加一个页面

例如新建 `talks.html`，最前面写：

```liquid
---
layout: default
title: Talks
navbar_title: Talks
permalink: /talks/
---

<section class="page-heading">
  <h1>Talks</h1>
  <p>在这里填真实内容。</p>
</section>
```

然后在 `_data/navigation.yml` 增加：

```yaml
  - name: Talks
    url: /talks/
```

`name` 应与页面的 `navbar_title` 保持一致，导航才能正确标记当前页。先有内容再加导航，不留空页面。

## 保存、预览与发布的区别

本地改完后，先观察预览终端是否报错，再刷新浏览器。至少检查相关页面的文字、导航、图片、按钮和手机宽度。修改 `_config.yml` 后重启服务。

决定上线后，按 README 的 GitHub Pages 说明提交。只有已经启用部署工作流的仓库，才会在提交到指定分支时自动部署。构建成功前，线上网站可能仍显示旧版。

## 五条以后可直接发给 AI 的维护指令

1. **改简介：**“请在我的个人学术网站中，把首页 About 的这段文字替换为以下内容：[粘贴新文字]。保留现有设计和其他事实，先运行本地预览让我检查，等我明确确认后再公开发布。”
2. **替换头像：**“请使用我附上的真实头像替换当前头像，调整裁剪使电脑和手机都能看清脸部，同时更新替代文字。先给本地预览，等我确认后再发布。”
3. **更新论文状态：**“论文《[标题]》的新状态为 [准确措辞]，期刊为 [期刊]。请更新共享论文记录，检查首页、Research 和 HTML CV 是否一致，并保持当前不提供 CV 下载的设置。先预览，确认后再发布。”
4. **增加论文：**“请增加这篇研究：[标题、按序作者、状态、短介绍、研究方向、真实链接]。不要推断未给出的日期、期刊或贡献标记。先给本地预览，等我确认后再公开发布。”
5. **删除栏目：**“请从我的网站移除 [栏目名] 及不再使用的导航和内部链接，保留其他内容。先运行构建并展示预览，等我确认后再发布。”

## 遇到错误时

- **构建失败：** 先看本地终端或 GitHub Actions 的第一个明确报错，通常包含文件路径与行号；先修最近改过的文件。
- **YAML 错误：** 检查空格缩进、缺少的引号、冒号及不配对的 `---`；`links: {}` 和 `social_links: []` 分别表示空对象、空列表，不要混用。
- **修改没显示：** 确认改的是源码，不是 `_site`；保存后等构建完成，刷新浏览器。改全局配置后重启。
- **图片或文件 404：** 核对文件确实存在，大小写一致，并检查线上 `baseurl`。
- **线上显示旧版：** 先看 Actions 是否成功，再强制刷新；反复刷新不能修复失败的构建。

保留准确报错和你刚改的那几行，通常就足够请 AI 定位问题；无需提供账号密码或任何令牌。
