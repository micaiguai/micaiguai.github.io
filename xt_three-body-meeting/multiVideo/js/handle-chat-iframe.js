let iframeDom

// TODO: 尝试修改dify大模型的chat的iframe里面的样式，未完成
const iframeStyleTag = document.createElement('style')
iframeStyleTag.innerText = `
div {
  background-color: pink;
}
`

const config = { attributes: true, childList: true, subtree: true, characterData: false };

const chatObserver = new MutationObserver((e) => {
  console.log('chatObserver e :', e)
  let chatDoms
  if (chatDoms = iframeDom.contentWindow.document.querySelectorAll('.chat-answer-container')) {
    console.log('chatDoms :', chatDoms)
  }
});
const observer = new MutationObserver((e) => {
  console.log('e :', e)
  if (iframeDom = document.querySelector('iframe')) {
    console.log('iframeDom :', iframeDom)
    iframeDom.contentDocument.head.append(iframeStyleTag)
    // const iframeRootDiv = iframeDom.contentDocument.querySelector('body > div > div > div')
    // console.log('iframeRootDiv :', iframeRootDiv)
    // if (iframeRootDiv) {
    //   chatObserver.observe(iframeDom.contentDocument, config)
    // }
    observer.disconnect()
  }
});

observer.observe(document.body, config);
