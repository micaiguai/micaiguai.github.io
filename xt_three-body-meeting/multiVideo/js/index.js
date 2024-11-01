var self = this;

self.serverURL = ''
self.accessKey = ''
self.secretKey = ''
self.accessToken = '';

/** dify的token */
let difyToken

/**
 * 三体引擎
 */
let avdEngine = new (ModuleBase.use(ModulesEnum.avdEngine));

/** 请求工具 */
let restApi = null

/** 当前白板 */
var curShareBoard
/** 当前共享屏幕 */
var curShareScreen

/** 网址参数 */
const paramMap = new URLSearchParams(location.search)
/** 房间对象 */
var room = null;
/** 房间ID */
var roomId = paramMap.get('roomId');
/** 用户ID */
var userId = paramMap.get('userId');
/** 用户名称 */
var userName = paramMap.get('name');
/** 是否是管理员 */
const ROOT_FLAG = true

avdEngine.setDefaultVideoParams(2560, 1440, ResolutionSetType.ideal, 25, 1120, 2000);
avdEngine.setDefaultScreenParams(2560, 1440, 5, 10);

var topic = 'testingMeeting';

var isOpenVideoShow = true;
var isOpenAudioShow = true;

var participants = [];

var localAudioId = '';

var chatNum = 0;

var singleLocalVideo;
var singleLocalVideoId = [];
var localVideo = document.getElementById('localVideo');
var localVideoId = '';

var num = 0;

var openMicrophoneUser = [];

//新增 240923
var isStartRecord = false;
/** 是否当前用户开启白板 */
var selfShareBoardFlag = false;
/** 是否开启共享 */
var selfShareScreenFlag = false;
var shareVideo = document.getElementById("shareVideo");
let mediaRecorder;
let recordedBlobs;
let MyMediaStream = null;
let MyMediaStreamAudioTrackCount = 0;
let MyMediaStreamVideoTrackCount = 0;
var boardInfo = {
  // width: 900,
  // height: 400,
  // widthOriginal: 900,
  // heightOriginal: 400,
  backgroundColor: '255,255,255,0.5',
  annotationInitMode: AnnotationInitTypeEnum.proportional, // 默认为等比缩放
  annotationRenderElementType: 'div'
}
var remoteBorderByUserId = "";
var remoteBoardId = '';

/**
 * 小人是否在动
 */
let animatingFlag = false

/**
 * 程序主入口
 */
async function main() {
  // 初始化
  await Promise.all([
    initEngine(),
    initConfig()
  ])
  initDify()
  initRestApi()
  // 绑定事件
  registerEvents()
  registerIframeContact()
  // 初始化UI
  renderJoinForm()
  renderMobileUI()
  renderOperation()
  await restApi.getAccessToken(accessKey, secretKey)
    .then((res) => {
      console.log('Success', res)
      self.accessToken = res.token;
      joinRoom()
    })
    .otherwise((error) => {
      console.log(error.msg);
      showHintMsg('getAccessToken(),error:' + error.msg);
    })
}

main()

$('input[type="radio"][name=mediaType]').change(function (e) {
  var value = parseInt(e.target.value);
  avdEngine.setMediaConnectType(value);
  log.info('+++setMediaConnectType to ', value);
})

/**
 * 初始化交互按钮
 */
function renderOperation() {
  setTimeout(() => {
    $('.button.board').show()
    $('.button.screen').show()
    $('.loading-text').hide()
  }, 3000)
}

/**
 * 初始化接口
 */
function initRestApi() {
  restApi = new RestApi(serverURL);
}

/**
 * 渲染入会表单
 */
function renderJoinForm() {
  $('#meetingNum').val(roomId)
  $('#userName').val(`${userName}@${userId}`)
  $('#udpRadio').attr('checked', true);
}

/**
 * 初始化dify
 */
function initDify() {
  // 插入dify
  window.difyChatbotConfig = {
    token: difyToken,
    baseUrl: '/dify',
    dynamicScript: true
  };

  const script = document.createElement('script');
  script.src = '/dify/embed.min.js';
  script.id = `${difyToken}`;
  script.defer = true;

  const style = document.createElement('style');
  style.textContent = `
    #dify-chatbot-bubble-button {
      background-color: #1C64F2 !important;
    }
  `;

  document.head.appendChild(script);
  document.head.appendChild(style);
}

/**
 * 注册事件
 */
function registerEvents() {
  // 点击数字人展现聊天框
  $('.digital-human-wrapper').on('click', () => {
    $('#dify-chatbot-bubble-button').click()
  })
}

/**
 * 初始化引擎
 */
async function initEngine() {
  avdEngine.setLog(Appender.browserConsole, LogLevel.debug);
  await avdEngine.initDevice();
}

/**
 * 初始化项目配置
 */
async function initConfig() {
  const projectConfig = await fetch('/config/index.jsonc')
    .then(res => res.text())
    .then(res => res.replaceAll(/\/\/(.*)/g, ''))
    .then(res => JSON.parse(res))
    .then(res => res.projects.find(el => el.name === '元诊室').meta)
  console.log('projectConfig :', projectConfig)
  serverURL = projectConfig.serverURL
  accessKey = projectConfig.accessKey
  secretKey = projectConfig.secretKey
  difyToken = projectConfig.dify.token
}

/**
 * 注册iframe通讯
 */
function registerIframeContact() {
  window.addEventListener('message', e => {
    if (e.data.symbol === 'setPlayingFlag') {
      setDigitalHumanAnimate(e.data.value)
    }
  })
}

/**
 * 设置数字人播放动作
 * @param {boolean} flag 是否播放动画
 */
function setDigitalHumanAnimate(flag) {
  if (flag) {
    $('.virtual-digital-human-animate').show()
    $('.virtual-digital-human-static').hide()
  } else {
    $('.virtual-digital-human-animate').hide()
    $('.virtual-digital-human-static').show()
  }
}

/**
 * 在移动端隐藏部分UI
 */
function renderMobileUI() {
  if (!isMobile.any) {
    return
  }
  $('.button.record').css('display', 'none')
  $('.bottom_center').css('display', 'none')
  $('.chat-wrapper').css('display', 'none')
  $('.meeting-room-content__decorator').css('display', 'none')
  $('.board-tool').css('display', 'none')

  const styleTag = document.createElement('style')
  styleTag.innerHTML = `
#dify-chatbot-bubble-button {
  display: none;
}
`
  document.head.append(styleTag)
}

function createRoom() {
  var topic = 'testingMeeting';
  restApi.createRoom(self.accessToken, topic, self.userId).then((res) => {
    console.log('Success', res)
    $("#meetingNum").val(res.room_id);
  }).otherwise((error) => {
    console.log("Error", error)
    showHintMsg('createRoom(),error:' + error.msg);
  })
}

function joinRoom() {
  restApi.createRoom(self.accessToken, topic, self.userId, self.roomId).then((res) => {
    console.log('==================createRoom()res:', res);
    avdEngine.init(self.serverURL, self.accessToken).then(initSuccess).otherwise(initError);
  }).otherwise((error) => {
    console.log('==================createRoom()error:', error.msg);
    if (error.ret == 40005) {
      //如果error.ret = 40005 说明房间已经存在
      avdEngine.init(self.serverURL, self.accessToken).then(initSuccess).otherwise(initError);
    } else {
      showHintMsg('createRoom(),error:error.ret:' + error.ret + 'error.msg:' + error.msg);
    }
  })
}

function initSuccess() {
  room = avdEngine.obtainRoom(self.roomId);
  room.join(self.userId, self.userName, '', null).then(joinSuccess).otherwise(joinError);
}

function initError(error) {
  console.log('================initError()', error)
  console.log("AVDEngine 初始化失败！" + error.message);

  showHintMsg("AVDEngine 初始化失败！initError(),error:" + error.message);
}

function joinSuccess() {
  console.log('===============joinSuccess()', '加入会议成功');
  console.log('room.pubScreens :', room.pubScreens)
  console.log('getAllBoards() :', getAllBoards())
  console.log('room.selfUser.boards :', room.selfUser.boards)

  $('.join').css('display', 'none');
  // $('.meeting-room-wrapper').css('display', 'block');
  $('.meeting-room-wrapper').show()
  $('body').css('background', ' #222222');

  $('.meetingName').html(roomId);

  registerRoomCallback();

  onPublishScreenNotify(room.pubScreens);
  //加会登陆前，会议中已经发布的视频资源,采取订阅处理
  onPublishCameraNotify(room.pubVideos);

  participantContent();

  participantsHandle(room.getParticipants());


  $('.chatNum').css('opacity', '0');
  chatNum = 0;

  // openCamera();
  openMicrophone();
  // openBoard();
}

function participantContent() {
  $('.content').empty();
  participants = room.getParticipants();

  $('.participantNum').html('(' + participants.length + ')');
  $('#participantList').html(participants.length);
  for (var i = 0; i < participants.length; i++) {
    var text = participants[i].name.substring(0, 1);

    var str = "<div id='" + participants[i].id + "' class='participant_item'> <div class='participant_item_head'>";
    str += text + "</div><div class='participant_item_name'>" + participants[i].name + "</div><div class='participant_item_state'>";
    str += "<i class='icon_participantMir' id='" + participants[i].id + "Mir'";
    str += "/></i><i class='icon_participantCam' id='" + participants[i].id + "Cam'></i></div></div>";

    $('.content').append(str);

    $('#messageUserId').append('<option value="' + participants[i].id + '">' + participants[i].name + '</option>')
  }
}

function remotecmdOpenMicrophone(userId) {
  alert("+++remotecmdOpenMicrophone(),userId:" + userId);
}

function joinError(error) {
  console.log('joinError' + error.message);
  showHintMsg("joinError(),error: " + error.message);
}

$('.meetingName').html(GetQueryString('roomId'));
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return 0;
}

function registerRoomCallback() {
  room.addCallback(RoomCallback.connection_status, onConnectionStatus);
  room.addCallback(RoomCallback.connection_indicator, onConnectionIndicator);
  room.addCallback(RoomCallback.user_join_notify, onUserJoinNotify);
  room.addCallback(RoomCallback.user_leave_notify, onUserLeaveNotify);

  room.addCallback(RoomCallback.public_message, onPublicMessage);
  room.addCallback(RoomCallback.mcu_peerconnection_completed, onMCUPeerConnectionCompleted);

  room.addCallback(RoomCallback.screen_sharing_ended, onScreenSharingEnded);
}


function onConnectionIndicator(connectionIndicator) {
  if (room.isMcu()) {
    if (connectionIndicator) {
      //connectionIndicator.connectionQuality;   连接质量指数
      //connectionIndicator.bitrate.downloadBitrate  流量-下载
      //connectionIndicator.bitrate.uploadBitrate    流量-上传
      //connectionIndicator.packetLoss.downloaPacketLoss  丢包率-下载
      //connectionIndicator.packetLoss.uploadPacketLoss   丢包率-上传
      //connectionIndicator.resolution     分辨率
      //connectionIndicator.bandwidth.downloadBandwidth  估计带宽-下载
      //connectionIndicator.bandwidth.uploadBandwidth    估计带宽-上传
      //connectionIndicator.camera-video-wrapperaddress   本地地址
      //connectionIndicator.camera-video-wrapperport      本地端口
      //connectionIndicator.remoteaddress  远程地址
      //connectionIndicator.remoteport    远程端口
      //connectionIndicator.transport     协议

    }
  }
}

/**
 * @desc 网络状态回调
 */
function onConnectionStatus(status) {
  if (status == ConnectionStatus.connecting) {
    showHintMsg("网络故障,正在与服务器重连中...");
  } else if (status == ConnectionStatus.connected) {
    //连接成功
    // showHintMsg("");
  } else if (status == ConnectionStatus.reJoinConnected) {
    //重新加会成功
    // showHintMsg("");
  } else if (status == ConnectionStatus.reconnected) {
    //重连接成功
    // showHintMsg("");
  } else if (status == ConnectionStatus.connectFailed) {
    showHintMsg("网络故障,与服务器重连超时，正在重新加会操作中...");

    //应用层清场
    if (room.connectionInfoCollector) {
      room.connectionInfoCollector.stop(); //停止收集网络情况
    }
  } else if (status == ConnectionStatus.reJoinRoomTimeOut) {
    showHintMsg("网络故障,重新加会中...");
    room.continuousReJoin();
  }
}

/**
 * @desc 参会者加会回调
 * @param {Object} users － 参会者数组
 */
function onUserJoinNotify(users) {
  
  // console.log('new')
  // console.log('curShareBoard :', curShareBoard)
  // // console.log('getAllBoards() :', getAllBoards())
  // console.log('onUserJoinNotify room.selfUser.boards :', room.selfUser.boards)
  // console.log('onUserJoinNotify room.boardId2userId :', JSON.stringify(room.boardId2userId))
  participantsHandle(users);

  //添加参会者列表内容
  participantContent();
  cameraLayout();
}

/**
 * @desc 参会者退会回调
 * @param {int} opt - 退会类型
 * @param {int} reason  - 退会原因
 * @param {Object} user - 退会用户
 */
function onUserLeaveNotify(opt, reason, user) {
  console.log("==========onUserLeaveNotify(),reason:", reason, ",user:", user);
  //UDP媒体通道建立超时807错误
  if (reason == 807) {
    if (user.id == room.selfUser.id) {
      showHintMsg("本端 807错误,UDP不通或UDP媒体通道建立超时!");
    } else {
      showHintMsg(user.name + " 807错误,UDP不通或UDP媒体通道建立超时!");
    }
    return;
  }

  // if(reason == 812){
  // showHintMsg(user.name +" 已异常退会");
  // }else{
  // showHintMsg(user.name +" 已退会");
  // }

  $('.participantNum').html('(' + participants.length - 1 + ')');
  $('#participantList').html(participants.length - 1);

  $('#' + user.id).remove();
  $("#messageUserId option").remove("option[value=" + user.id + "]");

  $('.camera-video-list-wrapper div').remove('div[id="' + user.id + '"]');

  cameraLayout();
}

/**
 * @desc  用户回调事件
 * @param {Object} participants - 用户集数组
 */
function participantsHandle(participants) {

  participants.forEach(function (user) {
    user.addCallback(UserCallback.camera_status_notify, onCameraStatusNotify);
    user.addCallback(UserCallback.microphone_status_notify, onMicrophoneStatusNotify);

    user.addCallback(UserCallback.publish_camera_notify, onPublishCameraNotify);
    user.addCallback(UserCallback.subscrible_camera_result, onSubscribleCameraResult);
    user.addCallback(UserCallback.unpublish_camera_notify, onUnpublishCameraNotify);
    user.addCallback(UserCallback.unsubscrible_camera_result, onUnsubscribleCameraResult);

    user.addCallback(UserCallback.subscrible_microphone_result, onSubscribleMicrophoneResult);
    user.addCallback(UserCallback.unsubscrible_microphone_result, onUnsubscribleMicrophoneResult);

    user.addCallback(UserCallback.board_share_result, onBoardShareResult);
    user.addCallback(UserCallback.board_update_result, onBoardUpdateResult);
    user.addCallback(UserCallback.board_close_result, onBoardCloseResult);

    user.addCallback(UserCallback.publish_screen_notify, onPublishScreenNotify);
    user.addCallback(UserCallback.unpublish_screen_notify, onUnpublishScreenNotify);
    user.addCallback(UserCallback.subscrible_screen_result, onSubscribleScreenResult);
    user.addCallback(UserCallback.unsubscrible_screen_result, onUnsubscribleScreenResult);
    user.addCallback(UserCallback.subscrible_screen_audio_result, onSubscribleScreenAudioResult);
    user.addCallback(UserCallback.unsubscrible_screen_audio_result, onUnsubscribleScreenAudioResult);
  })
}

function leaveRoom() {
  if (!room) { return }
  var reason = 1; //退会原因
  room.leave(reason).then(function () {
    window.close()
    // 如果关闭不掉页面，则显示文案
    $('body').html(`<h1>离开会议成功！</h1>`)
    $('body').css('background-color', '#fff')
    $('body').css('padding', '24px')
    return false;
  });
}

function openCamera() {
  if (isOpenVideoShow) {
    isOpenVideoShow = false;
    videos = room.selfUser.videos;
    if (videos && videos.length > 0 && $('#single')[0].checked) {
      var video = videos[0];
      if (video) {
        video.setAspectRatio('1.7777777778'); // 分辨率宽高比 16:9
        localVideoId = video.id;
        if ($('.camera-video-list-wrapper').children().length == 4) {
          isOpenVideoShow = true;
          showHintMsg("视频最多允许4路");
          return
        }
        if ($('.camera-video-list-wrapper').children().length < 4) {
          $('.camera-video-list-wrapper').append(`
<div
  class="camera-video-wrapper" 
  id="${localVideoId}">
  <video id="localVideo" autoplay muted></video>
</div>
`);
        }

        localVideo = document.getElementById('localVideo');
        video.previewAndPublish(localVideo).otherwise(showError);
      }
    } else {
      var videosNum = videos.length;

      // if (videos.length <= 3) {
      //     videosNum = videos.length;
      // } else {
      //     videosNum = 3;
      // }
      // if($('.camera-video-list-wrapper').children().length == 4) {
      //     isOpenVideoShow = true;
      //     showHintMsg("视频最多允许4路");
      //     return
      // }


      for (var i = 0; i < videosNum; i++) {
        var video = videos[i];
        video.setAspectRatio('1.7777777778'); // 分辨率宽高比 16:9
        singleLocalVideoId.push(videos[i].id);
        // if ($('.camera-video-list-wrapper').children().length < 4) {

        $('.camera-video-list-wrapper').append('<div class="camera-video-wrapper" id="' + videos[i].id + '"><video id="localVideo' + i + '" autoplay muted></video></div>');
        // }

        singleLocalVideo = document.getElementById('localVideo' + i);

        video.previewAndPublish(singleLocalVideo).otherwise(showError);
      }
    }
    cameraLayout();
  }
}

function closeCamera() {
  if (!isOpenVideoShow) {
    isOpenVideoShow = true;
    if ($('#single')[0].checked) {
      var video = room.selfUser.getVideo(self.localVideoId);
      $('.camera-video-list-wrapper div').remove('div[id="' + self.localVideoId + '"]');
      if (video) {
        video.unpreview();
        video.unpublish();
      }
    } else {
      for (var i = 0; i < singleLocalVideoId.length; i++) {
        var video = room.selfUser.getVideo(self.singleLocalVideoId[i]);
        $('.camera-video-list-wrapper div').remove('div[id="' + self.singleLocalVideoId[i] + '"]');
        if (video) {
          video.unpreview();
          video.unpublish();
        }
      }
    }
    cameraLayout();
  }
}

//新增 240923
function handleDataAvailable(event) {
  console.log('handleDataAvailable', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

//新增 240923
function startRecord() {
  if (!isOpenAudioShow && !isStartRecord) {
    isStartRecord = true;
    $('#record').removeClass('startRecord');
    $('#record').addClass('stopRecord');
    $('.record span').html('停止录制');

    recordedBlobs = [];
    const mimeType = 'video/webm;codecs=vp9,opus';
    const options = { mimeType };

    try {
      var tempStream = new MediaStream();
      MyMediaStream.getTracks().forEach(track => {
        if (track.kind == 'audio') {
          tempStream.addTrack(track)
        }
      })
      mediaRecorder = new MediaRecorder(tempStream, options);
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e);
      return;
    }

    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    mediaRecorder.onstop = (event) => {
      console.log('Recorder stopped: ', event);
      console.log('Recorded Blobs: ', recordedBlobs);

      // playRecordedMedia()


      const blob = new Blob(recordedBlobs, { type: 'audio/mp3' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'test.webm';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    console.log('MediaRecorder started', mediaRecorder);
  }
}

//新增 240923
function stopRecord() {
  if (isStartRecord) {
    isStartRecord = false;
    $('#record').removeClass('stopRecord');
    $('#record').addClass('startRecord');
    $('.record span').html('录制音频');

    mediaRecorder.stop();
  }
}

/**
 * 获取所有白板
 * @returns {object[]} 白板列表
 */
function getAllBoards() {
  return room.getParticipants().reduce((preBoards, participant) => {
    console.log('preBoards, participant :', preBoards, participant)
    console.log('preBoards, participant.boards :', preBoards, participant.boards)
    // console.log('preBoards, JSON.stringify(participant.boards) :', preBoards, JSON.stringify(participant.boards))
    return preBoards.concat(participant.boards ?? [])
  }, [])
  // return room.getParticipants().reduce((preBoards, participant) => {
  //   return preBoards.concat(participant.getAllBoards() ?? [])
  // }, [])
}

function onBoardShareResult(board) {
  console.log('board :', board)
  $('#board_board').show()
  if (board.userId === room.selfUser.id) {
    $('#board span').html('关闭白板');
    selfShareBoardFlag = true;
  }
  console.log('onBoardShareResult !!!')
  // const boards = getAllBoards()
  // console.log('boards :', boards)
  // // 如果已经存在白板，不执行
  // if (curShareBoard) {
  //   return
  // }
  curShareBoard = board
  
  // showBoardDom()
  // $('#board_board').show()
  createBoardHandle(board);
  // console.log("===================onBoardShareResult(),board:",board);
  // console.log('+++123, onBoardShareResult()');

  // //设置当前白板的渲染宽(高)度，输入的对应的x,y等坐标也是基于这个输入的宽(高)度重新计算的。
  // // board.setRenderWidthAndHeight(800,800);
  // var isExist = false
  // for(var i in room.selfUser.boards){
  // if(room.selfUser.boards[i].id == board.id){
  // isExist = true
  // }
  // }
  // if(!isExist){
  // //设置当前白板的渲染宽(高)度，输入的对应的x,y等坐标也是基于这个输入的宽(高)度重新计算的。
  // // board.setRenderWidthAndHeight(1000,600);
  // createBoardHandle(board);
  // remoteBoardId = board.id;
  // remotecurShareBoardBorderByUserId = board.userId;
  // }

  // if(!firstBoardFlag){
  //     firstBoardFlag = true;
  //     createBoardHandle(board);
  // }

  // createBoardHandle(board);

  // 可能白板已经带有背景图或者背景色，收到就先处理
  // onBoardUpdateResult(board.id, board.backgroundColor, board.backgroundImage)
}
// console.log("+++onBoardUpateResult(),boardId:",boardId+",backgroundColor:"+backgroundColor+",backgroundImage:"+backgroundImage);

function onBoardUpdateResult(boardId, backgroundColor, backgroundImage) {
  console.log('update')
  if (backgroundColor) {
    curShareBoard.updateBackgroundColor(backgroundColor);
  }
  if (backgroundImage) {
    curShareBoard.updateBackgroundImage(backgroundImage);
  }
}

/**
 * 获取当前的共享屏幕
 * @returns 
 */
function getCurShareScreen() {
  if (!room.pubScreens) {
    return
  }
  return room.pubScreens[0]
}

function showBoard() {
  // 如果已经存在共享内容，不执行
  if (curShareBoard || getCurShareScreen()) {
    alert('已存在共享界面')
    return
  }
  showBoardDom()
  openBoard()
}

//新增 240923
function openBoard() {
  const boardWrapperDom = document.querySelector('#board_board')
  /** 白板工具栏高度 */
  const toolBarHeight = 60
  room.selfUser.createBoard(boardWrapperDom.offsetWidth, boardWrapperDom.offsetHeight - toolBarHeight, boardInfo.backgroundColor, '', '', boardInfo.widthOriginal, boardInfo.heightOriginal)
    .then((board) => {
      curShareBoard = board
      room.selfUser.shareBoardById(curShareBoard.id);
      createBoardHandle(board);
    })
    .otherwise(function (error) {
      self.$store.dispatch('processingError', error);
      self.$store.dispatch('showDialog', self.$store.getters.currError.msg);
      console.error('+++创建白板失败:', error);
      this.$emit("board", false);
    });
}

function showBoardDom() {
  $('#board_board').show()
  $('#board span').html('关闭白板');
  selfShareBoardFlag = true;
}

function onBoardCloseResult() {
  // hideBoardDom()
  $('#board_board').hide()
  // $('#board span').html('开启白板');
  $('#board_board .boardElement').remove()
  // selfShareBoardFlag = false;
  closeBoard()
}

function hideBoard() {
  $('#board_board').hide()
  $('#board span').html('开启白板');
  $('#board_board .boardElement').remove()
  selfShareBoardFlag = false;
  closeBoard()
}

/**
 * 关闭白板
 */
function closeBoard() {
  if (curShareBoard.userId === room.selfUser.id) {
    room.selfUser.closeBoardById(curShareBoard.id)
  }
  // const boardOwner = room.getParticipants().find(participant => {
  //   return participant.id = curShareBoard.userId
  // })
  // console.log('boardOwner :', boardOwner)
  // console.log('curShareBoard :', curShareBoard)
  curShareBoard = undefined
}

function hideBoardDom() {
  $('#board_board').hide()
  $('#board span').html('开启白板');
  $('#board_board .boardElement').remove()
  selfShareBoardFlag = false;
}

function openScreenAndPub() {
  // 如果已经存在共享内容，不执行
  // if (curShareBoard || getCurShareScreen()) {
  //   alert('已存在共享界面')
  //   return
  // }
  
  console.log('curShareBoard, curShareScreen :', curShareBoard, curShareScreen)
  // 如果已经存在共享内容，不执行
  if (curShareBoard || getCurShareScreen()) {
    alert('已存在共享界面')
    return
  }

  if (!room) { return }
  screen = room.selfUser.getScreen();
  console.log("========================================", screen.id)
  if (screen) {
    console.log('screen :', screen)
    // var shareScreenAudio = window.confirm('是否共享屏幕的音频？如果是，请打开“同时共享系统音频”的开关！');
    screen.publish(null).then(function () {
      console.log('=============openScreenAndPub(),桌面共享成功==========');
      console.log('screen :', screen)
      // curShareScreen = screen
      // openScreen();
          
      $('#screen_screen').show();
      $('#screen span').html('关闭共享');

      selfShareScreenFlag = true;
      screen.preview(shareVideo);
      // jumpA.style.display = 'inline-block';
      // jumpA.href = './receptionScreen.html?roomId=' + roomId;

    }).otherwise(alertError);
  }
}

function openScreen() {
  // hideBoard()
  $('#screen_screen').show();
  $('#screen span').html('关闭共享');

  selfShareScreenFlag = true;
}

function closeScreenAndUnpub() {
  screen = room.selfUser.getScreen();
  screen.unpublish();
  closeScreen();
  // curShareScreen = undefined
}

function closeScreen() {
  $('#screen_screen').hide();
  $('#screen span').html('开启共享');

  // $('#board_board').show();
  // $('#board span').html('关闭白板');
  // selfShareBoardFlag = true;
  selfShareScreenFlag = false;
}

/**
 * board对象的内容
 * @param {String} userId - 创建者userId
 * @param {int} width -  白板的渲染宽度
 * @param {int} height - 白板的渲染高度
 * @param {Object} backgroundColor - 白板的背景色
 * @param {String} backgroundImage - 白板的背景图访问路径
 * @param {String} title - 白标标题
 * @param {int} outputWidth - 白板的输出宽度
 * @param {int} outputHeight - 白板的输出高度
 * @param {String} description - 描述
 * @param {String} extendData - 扩展内容
 */
function createBoardHandle(board) {
  var boardDom = document.querySelector('#board_board');
  var boardElement = document.createElement("Div");
  boardElement.id = "board_" + board.id;
  boardElement.style.width = board.width + "px";
  boardElement.style.height = board.height + "px";
  boardElement.style.position = 'relative';
  boardElement.className = 'boardElement';
  boardElement.style.backgroundSize = '100% 100%';
  boardElement.style.boxSizing = 'border-box';

  boardElement.boardUserId = board.userId;
  boardElement.boardId = board.id;

  var boardContainer = document.createElement("div");
  boardContainer.className = 'boardContainer';
  boardContainer.style.width = parseInt(boardElement.style.width.split("px")[0]) + 'px';
  boardContainer.style.height = parseInt(boardElement.style.height.split("px")[0]) + 'px';
  boardContainer.style.position = 'relative';
  boardContainer.style.border = '1px solid #252f39';

  boardElement.appendChild(boardContainer);
  boardDom.appendChild(boardElement);

  // if(board.backgroundImage){
  // updateImgAndCanvas(board.backgroundImage);
  // }

  board.createAnnotation().then(function (annotation) {
    annotation.init(boardContainer, boardInfo.annotationInitMode) // 修改初始化白板方式
    board.annotation.hlightPointInit('../img/icon-laserPen-move.png', 30, 30);

    // onPublishScreenNotify(room.pubScreens);
  });

  // boardTool.style.display = 'flex';
  // clearBoardBtn.disabled = false;
  // createBoardBtn.disabled = true;
  // operateBoardBtn.disabled = false;
  // boardSetBtn.disabled = true;
  // updateBgBtn.disabled = false;
  // chooseBgColorBtn.disabled = false;
  // // updateBoardBgColorBtn.disabled = false;
  // if(boardColorSet.checked){
  // updateBgBtn.disabled = true;
  // }
}

function openMicrophone() {
  if (isOpenAudioShow) {
    isOpenAudioShow = false;
    var audio = room.selfUser.audio;
    localAudioId = audio.id;
    if (audio) {
      room.getParticipants().forEach(function (user) {
        if (user.id == userId) {
          openMicrophoneUser.push(user);
        }
      })
      audio.openMicrophone().then(function () {
        addTrack2MyStream(audio.track) //新增 240923
      }).otherwise(showError);
    }
  }
}

//新增 240923
function addTrack2MyStream(streamOrTrack) {
  if (!MyMediaStream) {
    MyMediaStream = new MediaStream;
  }
  if (streamOrTrack instanceof MediaStream) {
    streamOrTrack.getTracks().forEach(mediaTrack => {
      MyMediaStream.addTrack(mediaTrack)
      if (mediaTrack.kind == 'audio') {
        MyMediaStreamAudioTrackCount += 1;
      } else {
        MyMediaStreamVideoTrackCount += 1;
      }
    })
  } else if (streamOrTrack instanceof MediaStreamTrack) {
    MyMediaStream.addTrack(streamOrTrack)
    if (streamOrTrack.kind == 'audio') {
      MyMediaStreamAudioTrackCount += 1;
    } else {
      MyMediaStreamVideoTrackCount += 1;
    }
  }
}

function closeMicrophone() {
  if (!isOpenAudioShow) {
    isOpenAudioShow = true;
    var audio = room.selfUser.getAudio(self.localAudioId);
    if (audio) {
      openMicrophoneUser.forEach(function (user, index) {
        if (user.id == userId) {
          openMicrophoneUser.splice(index, 1);
        }
      })
      audio.closeMicrophone();

      isStartRecord = false;
      $('#record').removeClass('stopRecord');
      $('#record').addClass('startRecord');
      $('.record span').html('录制音频');
    }
  }
}

function showError(error) {
  console.log('===============showError()error:', error);
  if (error.code == 800) {
    console.log('===============showError()error:', $('.camera-video-list-wrapper').children().length);
    if ($('.camera-video-list-wrapper').children().length == 4) {
      showHintMsg("视频最多允许4路");
      return
    }
  }
  showHintMsg("showError()error.code" + error.code, + 'error.message:' + error.message);
}

/**
 * 摄像头状态更新
 * @param {Object} status － 状态
 * @param {Object} cameraId － 摄像头设备Id
 * @param {Object} cameraName－ 摄像头设备名称
 * @param {Object} userId－ 摄像头设备所属者ＩＤ
 */
function onCameraStatusNotify(status, cameraId, cameraName, userId) {
  var iconCam = document.getElementById(userId + 'Cam');
  if (status == 1) {
    iconCam.style.background = "url('./images/icon-participantCam-close.png') center center no-repeat";
    iconCam.style.backgroundSize = '100% 100%';
  } else {
    iconCam.style.background = "url('./images/icon-participantCam.png') center center no-repeat";
  }
  if (userId == room.selfUser.id) {
    if (status == StreamStatus.published) {
      $('#camera').removeClass('closeCamera');
      $('#camera').addClass('openCamera');
      $('.camera span').html('关闭视频');
    } else if (status == StreamStatus.init) {
      $('#camera').removeClass('openCamera');
      $('#camera').addClass('closeCamera');
      $('.camera span').html('开启视频');
    }
  }
}

/**
 * 麦克风状态更新
 * @param {Object} status － 状态
 * @param {Object} microphoneId － 麦克风设备Id 
 * @param {Object} microphoneName － 麦克风设备名称
 * @param {Object} userId － 麦克风设备所属者ＩＤ
 */
function onMicrophoneStatusNotify(status, microphoneId, microphoneName, userId) {
  var iconMir = document.getElementById(userId + "Mir");
  if (status == 1) {
    iconMir.style.background = "url('./images/icon-participantMir-close.png') center center no-repeat";
    iconMir.style.backgroundSize = '100% 100%';
  } else {
    iconMir.style.background = "url('./images/icon-participantMir.png') center center no-repeat";
  }
  if (userId == room.selfUser.id) {
    if (status == StreamStatus.published) {
      $('#microphone').removeClass('closeMicrophone');
      $('#microphone').addClass('openMicrophone');
      $('.microphone span').html('静音');
    } else if (status == StreamStatus.init) {
      $('#microphone').removeClass('openMicrophone');
      $('#microphone').addClass('closeMicrophone');
      $('.microphone span').html('解除静音');
    }
  }
}

//订阅未订阅的视频
function onPublishCameraNotify(videos) {
  videos.forEach(function (video) {
    //只订阅未订阅过的视频
    var subVideoIdsLen = room.selfUser.subVideoIds.length;
    if (subVideoIdsLen > 0) {
      var isSub = false;
      for (var i = 0; i < subVideoIdsLen; i++) {
        var videoId = room.selfUser.subVideoIds[i];
        if (video.id == videoId) {
          isSub = true;
          break;
        }
      }
      if (!isSub) {
        video.subscrible();
      }
    } else {
      video.subscrible();
    }
  });
}

/**
 * 订阅远端视频流反馈
 * @param {Object} stream － 远端视频流
 * @param {Object} userId － 所属用户ＩＤ
 * @param {Object} userName－ 所属用户名称
 * @param {Object} cameraId－ 摄像头设备ＩＤ
 */
function onSubscribleCameraResult(stream, userId, userName, cameraId) {
  num++;
  // if ($('.camera-video-list-wrapper').children().length < 4) {

  $('.camera-video-list-wrapper').append('<div class="camera-video-wrapper" id="' + userId + '"><video id="remoteVideo' + num + '" autoplay muted></video><audio autoplay></audio></div>');
  // }

  var remoteVideo = document.getElementById('remoteVideo' + num);
  room.selfUser.attachVideoElementMediaStream(remoteVideo, stream);
  cameraLayout();
}

/**
 * 房间中取消发布的视频回调
 * @param {Object} video-发布视频集
 */
function onUnpublishCameraNotify(video) {
  video.unsubscrible();
}

/**
 * 取消订阅远端视频流反馈
 * @param {Object} userId－ 所属用户ＩＤ
 * @param {Object} userName－所属用户名称
 * @param {Object} cameraId－摄像头设备ＩＤ
 */
function onUnsubscribleCameraResult(userId, userName, cameraId) {
  var remoteVideo = $('#' + userId).children('video')[0];
  room.selfUser.attachVideoElementMediaStream(remoteVideo, null);
  $('.camera-video-list-wrapper div').remove('div[id="' + userId + '"]');
  cameraLayout();
}

/**
 * 订阅远端音频流反馈
 * @param {Object} stream－ 远端音频流
 * @param {Object} userId－ 所属用户ＩＤ
 * @param {Object} userName－所属用户名称
 */
function onSubscribleMicrophoneResult(stream, userId, userName) {
  room.getParticipants().forEach(function (user) {
    if (user.id == userId) {
      openMicrophoneUser.push(user);
    }
  })

  $('.audio').append('<audio id="' + userId + '" autoplay></audio>');
  var remoteAudio = $('.audio audio')[0];
  room.selfUser.attachAudioElementMediaStream(remoteAudio, stream);
}

/**
 * 取消订阅远端音频流反馈
 * @param {Object} userId－ 所属用户ＩＤ
 * @param {Object} userName－所属用户名称
 */
function onUnsubscribleMicrophoneResult(userId, userName) {
  openMicrophoneUser.forEach(function (user, index) {
    if (user.id == userId) {
      openMicrophoneUser.splice(index, 1);
    }
  })

  $('.audio audio').remove('audio[id="' + userId + '"]');
  var remoteAudio = $('.audio audio')[0];
  room.selfUser.attachAudioElementMediaStream(remoteAudio, null);
}

function onPublishScreenNotify(screens) {
  console.log('screens :', screens)
  if (!screens) {
    return
  }
  if (screens.length === 0) {
    return
  }
  // curShareScreen = screens[0]
  getCurShareScreen().subscrible()
  console.log('screens :', screens)
  console.log('room.selfUser.subScreenIds :', room.selfUser.subScreenIds)
  // screens.forEach(function (screen) {
  //   //只订阅未订阅过的桌面共享
  //   var subScreenIdsLen = room.selfUser.subScreenIds.length;
  //   if (subScreenIdsLen > 0) {
  //     for (var i = 0; i < subScreenIdsLen; i++) {
  //       var screenId = room.selfUser.subScreenIds[i];
  //       if (screen.id == screenId) {
  //         isSub = true;
  //         break;
  //       }
  //     }
  //     if (!isSub) {
  //       screen.subscrible();
  //     }
  //   } else {
  //     screen.subscrible();
  //   }
  // });
}

function onUnpublishScreenNotify(screen) {
  console.log('onUnpublishScreenNotify')
  // curShareScreen = undefined
  screen.unsubscrible();
}

function onSubscribleScreenResult(stream, userId, userName, screenId, width, height, framerate) {
  console.log('onSubscribleScreenResult')
  console.log("=======onSubscribleScreenResult(),width:" + width + ",height:" + height + ",framerate:" + framerate);
  // openScreen();
  // $('#screen').hide();
  
  $('#screen_screen').show();
  // $('#screen span').html('关闭共享');
  // selfShareScreenFlag = true;
  room.selfUser.attachScreenElementMediaStream(shareVideo, stream);
}

function onUnsubscribleScreenResult(userId, userName, screenId) {
  // closeScreen();
  // $('#screen').show();
  console.log('onUnsubscribleScreenResult')
  
  $('#screen_screen').hide();
  // $('#screen span').html('关闭共享');
  // selfShareScreenFlag = true;
  room.selfUser.attachScreenElementMediaStream(shareVideo, null);
}

// 桌面共享关闭的回调
function onScreenSharingEnded() {
  closeScreen();
}

/**
 * 订阅远端音频流反馈
 * @param {Object} stream－ 远端音频流
 * @param {Object} userId－ 所属用户ＩＤ
 * @param {Object} userName－所属用户名称
 */
function onSubscribleScreenAudioResult(stream, userId, userName) {
  var screenAudioEl = document.createElement('audio');
  screenAudioEl.id = 'screenAudio-' + userId;
  screenAudioEl.autoplay = true;
  document.body.appendChild(screenAudioEl);
  room.selfUser.attachAudioElementMediaStream(screenAudioEl, stream);

}

/**
 * 取消订阅远端音频流反馈
 * @param {Object} userId－ 所属用户ＩＤ
 * @param {Object} userName－所属用户名称
 */
function onUnsubscribleScreenAudioResult(userId, userName) {
  var screenAudioEl = document.getElementById('screenAudio-' + userId);
  if (screenAudioEl) {
    room.selfUser.attachAudioElementMediaStream(screenAudioEl, null);
    screenAudioEl.remove();
  }
}

//打开参会者列表
function openParticipant() {
  $('.participant').css('display', 'block');
}

//关闭参会者窗口
$('.title img').click(() => {
  $('.participant').css('display', 'none');
})

//打开离开会议窗口
$('#leave').click(() => {
  $('.leave').css('display', 'block');
})

//关闭离开会议窗口
$('.leave_title img').click(() => {
  $('.leave').css('display', 'none');
})
$('.cancel').click(() => {
  $('.leave').css('display', 'none');
})

//打开聊天窗口
// $('#chat-wrapper').click(() => {
// $('.chat-wrapper').css('display', 'block');
// $('.chatNum').css('opacity', '0');
// chatNum = 0;
// })

//关闭聊天窗口
$('.chat_title img').click(() => {
  $('.chat-wrapper').css('display', 'none');
})

//选择单双摄像头模式时，关闭摄像头
$('.cameraModel input').click(() => {
  cameraModel = false;
  $('.cameraModel').css('opacity', '0');
  closeCamera();
})

$('.cameraModel label').click(() => {
  cameraModel = false;
  $('.cameraModel').css('opacity', '0');
  closeCamera();
})

var cameraModel = false;
//打开或关闭摄像头模式
$('.smallBtn').click(() => {
  if (cameraModel == false) {
    cameraModel = true;
    $('.cameraModel').css('opacity', '1');
  } else {
    cameraModel = false;
    $('.cameraModel').css('opacity', '0');
  }
})

//发送聊天信息
function messageSend() {
  var msg = $('#message').val();
  room.sendPublicMessage(msg).then(messageSendSuccess(message)).otherwise(messageSendError);
}

function messageSendSuccess(message) {
  $('.chat_screen').append('<div class="chat_screen_text"><p class="name">' + room.selfUser.name + ':' + '</p><p class="text">' + message.value + '</p></div>');

  $('.chat_massage').empty();
  $('.chat_massage').append('<textarea placeholder="请输入消息..." id="message" onkeydown="if(event.keyCode==13) messageSend()"></textarea>');
  setTimeout(function () {
    $('.chat_screen').scrollTop($('.chat_screen').children().length * $('.chat_screen_text').height());
  }, 100)
}

function messageSendError(error) {
  $('.chat_screen').append('<div class="chat_screen_text">发送聊天信息失败！messageSendError()error:' + error + '</div>');

  showHintMsg("发送聊天信息失败 messageSendError(),error" + error.message);
}

/**
 * 公聊回调
 * @param {Object} Message
 */
function onPublicMessage(Message) {

  if (Message) {
    $('.chatNum').css('opacity', '1');
    chatNum++;

    $('.chatNum').html(chatNum);
  }
  $('.chat_screen').append('<div class="chat_screen_text"><p class="name">' + Message.fromName + ':' + '</p><p class="text">' + Message.message + '</p></div>');
}

function onMCUPeerConnectionCompleted() {
  var statsInterval = 500; //sdk语音激励计算频率
  room.audioLevel.start(statsInterval).then(audioLevelHandler); //开始语音激励
}

function audioLevelHandler() {
  var statsInterval = 1000; //应用层语音激励显示频率
  clearInterval(statsIntervalId);
  var statsIntervalId = setInterval(
    function () {
      if (room && openMicrophoneUser.length > 0) {
        openMicrophoneUser.forEach(function (user) {
          var iconMir = document.getElementById(user.id + 'Mir');
          if (user.audio.getAudioLevel() > 0 && user.audio.getAudioLevel() <= 1) {
            iconMir.style.background = 'url("./images/icon-low0.png") center center no-repeat'
          } else if (user.audio.getAudioLevel() > 1 && user.audio.getAudioLevel() <= 3) {
            iconMir.style.background = 'url("./images/icon-low1.png") center center no-repeat'
          } else if (user.audio.getAudioLevel() > 3 && user.audio.getAudioLevel() <= 5) {
            iconMir.style.background = 'url("./images/icon-low2.png") center center no-repeat'
          } else if (user.audio.getAudioLevel() > 5 && user.audio.getAudioLevel() <= 7) {
            iconMir.style.background = 'url("./images/icon-low3.png") center center no-repeat'
          } else if (user.audio.getAudioLevel() > 7 && user.audio.getAudioLevel() <= 9) {
            iconMir.style.background = 'url("./images/icon-low4.png") center center no-repeat'
          }
        });
      }
    }, statsInterval);


}

//视频布局状态
function cameraLayout() {
  // $('.camera-video-wrapper').css({ 'width': '100%', 'height': '33%' });
}

//显示提示信息
function showHintMsg(msg) {
  $('.hintMsg').html(msg);
  $('.hintMsg').css('display', 'block');
  setTimeout(() => {
    $('.hintMsg').css('display', 'none');
  }, 5000)
}

//双击进入全屏
function enterScreenFull() {
  if (f_IsFullScreen()) {
    exitFullscreen();
  } else {
    requestFullScreen();
  }
}

//进入全屏
function requestFullScreen() {
  var de = document.documentElement;
  if (de.requestFullscreen) {
    de.requestFullscreen();
  } else if (de.mozRequestFullScreen) {
    de.mozRequestFullScreen();
  } else if (de.webkitRequestFullScreen) {
    de.webkitRequestFullScreen();
  }
}

//退出全屏
function exitFullscreen() {
  var de = document;
  if (de.exitFullscreen) {
    de.exitFullscreen();
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen();
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen();
  }
}

function f_IsFullScreen() {
  return (document.body.scrollHeight == window.screen.height && document.body.scrollWidth == window.screen.width);
}

function alertError(error) {
  console.log("============================alertError", error)
}

// commonjs start

// 鼠标
function chooseMouse() {
	curShareBoard.annotation.setShapeType(shapeTypeEnum.mouse);
}

// 激光笔
function startHlightPoint() {
	curShareBoard.annotation.startHlightPoint();
}

// 笔
function selectChangeType(shapeType) {
	if(shapeType == 999) {
		curShareBoard.annotation.setShapeType(shapeTypeEnum.line);
		curShareBoard.annotation.setArrowType(arrowTypeEnum.double);
	} else if(shapeType == 333) {
		curShareBoard.annotation.setShapeType(shapeTypeEnum.rect);
        curShareBoard.annotation.setFillColor(fillTypeEnum.full);
  		curShareBoard.annotation.setColorOpacity(0.5);        
	} else {
		curShareBoard.annotation.setArrowType(arrowTypeEnum.none);
		curShareBoard.annotation.setShapeType(shapeType);
	}
}

// 橡皮擦
function clearAnnotation() {
	curShareBoard.annotation.setShapeType(shapeTypeEnum.eraser, './img/board_eraser.png');
}

// 撤销
function undo() {
	curShareBoard.annotation.undo();
}

// 清除
function eraser() {
	curShareBoard.annotation.clear();
}

// 保存
function download() {
	curShareBoard.annotation.download();
}

function startTextInput() {
    var customConfig = {
        confirm: {
            text: 'Confirm',
            color: '#0078d4'
        },
        cancel: {
            text: 'Cancel',
            color: '#ffb833'
        }
    }
    
    curShareBoard.annotation.startTextInput(customConfig)
}

function boardReRenderWH(width, height) {
    curShareBoard.annotation.boardReRenderWH(width, height)
}

function uploadImg(e){
	var accessToken = $("#accessToken").val();

	curShareBoard.annotation.uploadImg(accessToken,e).otherwise(function(error){
		alert("uploadImg() error, code:"+ error.code +", message:" + error.message);
	});
}

function setAllowEditImg(){
	curShareBoard.annotation.setAllowEditImg();
}

function scaleImg(isEnlarge, percentage){
	curShareBoard.annotation.scaleImg(isEnlarge, percentage);
}

function rotateImg(){
	curShareBoard.annotation.rotateImg();
}

function delImg(){
	curShareBoard.annotation.delImg();
}

var colorIpt = document.getElementById('colorIpt');
// 监听颜色变化
function selectToolColorChange(){
    var color = "rgba(" + colorRgb(colorIpt.value) + ")";
    curShareBoard.annotation.setColor(color);
}


// 颜色值转化为rgba格式
function colorRgb(value){
    var sColor = value.toLowerCase();
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i=1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
        }
        return sColorChange.join(",") + ",1";
    }
    return sColor;
}

//iPhone手机上，QQ浏览器,搜狗浏览器,火狐浏览器等切换到后台再切回前台，或接听电话后，音视频控件的播放状态会变成暂停，通过监听进行处理。
document.addEventListener("visibilitychange", () => { 
    //当浏览器的某个标签页切换到后台就会触发
	if(document.hidden) {
		console.info("+++visibilitychange页面被挂起");
	//从后台切换到前台时就会触发
	}else {
		console.info("+++visibilitychange页面呼出");
		var videos = document.getElementsByTagName("video");
		for(var video of videos){
		   video.play();
		}
		
		var audios = document.getElementsByTagName("audio");
		for(var audio of audios){
		   audio.play();
		}
    }
});

// commonjs end
