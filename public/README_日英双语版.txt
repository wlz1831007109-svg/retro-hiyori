Retro日和 日英双语版 / JP-EN Bilingual Edition

更新日: 2026-09-10

结构:
- /               日本語版
- /en/            English edition
- 右上角 JP / EN 可在同一页面之间切换
- 日英购物篮共用同一个浏览器 localStorage
- 217位画家、13个时代、10个商品均有英文对应页
- お問い合わせ 已包含 Phase 07A AJAX 修复
- 英文 Contact 也使用相同 AJAX 逻辑
- 下单与批发仍使用 FormSubmit，分别跳转到日文/英文成功页

部署:
1. 将本更新包全部内容复制到 GitHub 仓库的 public/ 中并覆盖同名文件。
2. 不要删除原本 public/images/。本更新包默认不包含商品图片。
3. GitHub Desktop Commit + Push，等待 Cloudflare 自动部署。

公开前仍需处理:
- legal.html / en/legal.html 中运营负责人、所在地、电话号码仍为占位内容，必须填写真实且符合法令的信息。
- 银行账户信息没有写进网站；库存确认后再邮件发送。
- FormSubmit 的收件邮箱沿用当前网站设置。

英文画家页说明:
英文版217位画家页为面向海外访客的精简学习版，保留时代、姓名拼音、主题分类、参考图版与鉴赏入口；日文版仍保留原有更详细的日文内容。
