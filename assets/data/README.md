# 网站内容数据维护

论文和成员数据统一保存在 `site-data.js`，首页、论文页与成员页会自动读取并生成内容。站点为纯静态部署，因此这里使用版本可控的数据表，不依赖服务器数据库。

## 添加论文

在 `publications` 数组中新增一项：

```js
{
  id: "唯一英文标识",
  year: 2026,
  date: "2026-09-07",
  dateLabel: "07 SEP 2026",
  title: "论文标题",
  authors: ["Author One", "Author Two"],
  venue: "期刊及卷页信息",
  journal: "期刊简称",
  url: "https://doi.org/...",
  featured: true
}
```

`featured: true` 的最新三篇论文会出现在首页。

## 添加成员

在 `members` 数组中新增一项，`group` 可填写 `faculty`、`doctoral`、`master` 或 `alumni`：

```js
{
  id: "唯一英文标识",
  name: "姓名",
  nameEn: "English Name",
  group: "doctoral",
  title: "博士研究生",
  research: ["量子信息", "量子算法"],
  email: "",
  profileUrl: "",
  photo: ""
}
```

未确认的信息保持空字符串。照片仅使用成员本人授权的本地图片路径。
