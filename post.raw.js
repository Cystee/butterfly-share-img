// 交由 webpack 处理
import("./ele.js");
import("html2canvas");
import("mdui");
import("./node_modules/social-share.js/dist/js/social-share.min.js");

// html
const coverVal = page.cover_type === 'img' ? page.cover : theme.avatar.img;
const bf_si_sum = strip_html(page.content);
let expert = bf_si_sum.substring(0, 100);
bf_si_sum.length > 100 ? expert += ' ...' : '';
var urlHash = window.location.href;
var bf_post_time = ele('.post-meta-date-created').innerHTML.split("-");
ele('.bf-si-time').innerHTML = `${bf_post_time[2]}<br><span class="bf-si-time-2">${bf_post_time[0]}/${bf_post_time[1]}</span>`;
ele(".bf-s-img-li").innerHTML = "<span class='social-share-icon icon-img' onclick='new QRCode(document.getElementById(\"bf-si-qr\"),{text:urlHash,width:70,height:70,correctLevel:QRCode.CorrectLevel.L,colorLight:\"#f5f5f5\"});'><i class='fa-fw fas fa-share' style='font-family:\"Font Awesome 6 Free\"!important'></i></span>"; //插入share.js按钮，点击按钮生成二维码
ele("#post").innerHTML = `<link rel="stylesheet" href="https://source.casecori.top/js/mdui.min.css"><div class="bf-share-img" id="bf-share-img"><div class="bf-si-head mdui-color-theme" style='background-image:linear-gradient(rgba(0,0,0,0) 45%,rgba(0,0,0,.7) 100%),url("${url_for(coverVal)}")'><p>CasecoRI</p><span>${page.title}</span></div><div class="bf-si-sum">${expert}</div><div class="bf-si-box"><span>扫描二维码继续阅读</span><div class="bf-si-qr" id="bf-si-qr"></div></div><div class="bf-si-time"></div></div>`; //图片源码
/* 不能与 onclick 事件混用
    ["pjax: complete", "DOMContentLoaded"].forEach(eventItem => {
        document.addEventListener(eventItem, function () {
            var qrcode = new QRCode(document.getElementById("bf-si-qr"), {
                text: urlHash,
                width: 70,
                height: 70,
                correctLevel: QRCode.CorrectLevel.L,
                colorLight: '#f5f5f5'
            })
        })
    })
*/

// Share Image Functions
function convertCanvasToImage(canvas) {
    var image = new Image();
    var canvasData = canvas.toDataURL("image/png");
    sessionStorage.setItem('si_' + urlHash, canvasData);
    image.src = canvasData;
    document.getElementById('bf-share-img-loaded-container').appendChild(image);
    ele('#bf-share-img').style.display = 'none';
    ele('div.bf-share-img-loading', (e) => {
        e.parentNode.removeChild(e);
    });
    setTimeout(() => {
        window.share_dialog.handleUpdate();
        ele(".bf-share-img-dialog .mdui-dialog-actions", (e) => {
            let spanDom = document.createElement('span');
            spanDom.classList.add('bf-save-info');
            spanDom.innerHTML = `<i class="mdui-icon material-icons">&#xe80d;</i> 长按/右键保存图片`
            e.insertBefore(spanDom, e.firstChild);
        });
    }, 5);
}

function bf_show_img(e) {
    e.preventDefault();
    window.share_dialog = mdui.dialog({
        content: '<div class="bf-share-img-loaded" id="bf-share-img-loaded-container"></div><div class="mdui-valign bf-share-img-loading"><div class="mdui-center"><div class="mdui-spinner"></div></div></div>',
        buttons: [
            {
                text: "关闭",
            }
        ],
        history: false,
        cssClass: 'bf-share-img-dialog'
    });
    mdui.updateSpinners();
    ele('#bf-share-img').style.display = 'block';

    if (!sessionStorage.getItem('si_' + urlHash)) {
        html2canvas(document.getElementById('bf-share-img'), { useCORS: true }).then(convertCanvasToImage);
    } else {
        var image = new Image();
        image.src = sessionStorage.getItem('si_' + urlHash);
        document.getElementById('bf-share-img-loaded-container').appendChild(image);
        ele('#bf-share-img').style.display = 'none';
        ele('div.bf-share-img-loading', (e) => {
            e.parentNode.removeChild(e);
        });
        setTimeout(() => {
            window.share_dialog.handleUpdate();
            ele('.bf-share-img-dialog .mdui-dialog-actions', (e) => {
                let spanDom = document.createElement('span');
                spanDom.classList.add('bf-save-info');
                spanDom.innerHTML = `<i class="mdui-icon material-icons">&#xe80d;</i> 长按/右键保存图片`
                e.insertBefore(spanDom, e.firstChild);
            });
        }, 5);
    }
}

// 点击按钮执行
if (document.getElementsByClassName('bf-s-img-li').length > 0) {
    document.querySelector('.bf-s-img-li > .icon-img').addEventListener('click', bf_show_img, false);
}
