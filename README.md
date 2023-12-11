## butterfly-share-img
改了 [@yrccondor/mdx](https://github.com/yrccondor/mdx) 的源码，利用了 [sharejs](https://github.com/overtrue/share.js) 以及引入了 [html2cavans](https://github.com/niklasvh/html2canvas) 库和 [MDUI](https://mdui.org) 框架。对 butterfly 改动的方法其实和大部分魔改“类似”。由于时间关系，本人仅对 mdx 的功能做了移植。

# Quick Start
```bash
$ git clone https://github.com/Cystee/butterfly-share-img.git [yourFolder]
$ cd [yourFolder]
$ mv layout.post.pug post.pug
```

```bash
$ mv [yourFolder]/post.pug [path to themeRoot]/layout -i
```

然后你可以决定是否覆盖。

## 致谢
源码来自 [@yrccondor](https://github.com/yrccondor)

## Contribute
由于时间关系，本人仅对 mdx 的功能做了移植。你可以随时创建 Pull Requests.
