function RestApi(serverURI) {
    axios.defaults.timeout = 5000;
    axios.defaults.baseURL = 'https://' + serverURI + '/sdkapi/v2';
    
    function fetchGet(url, params) {
    	var deferred = when.defer();
       
        axios.get(url, params).then(function(response) {
                if (response.data.ret === 0) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function(error) {
                if (error.response) {
                    // 服务器返回正常的异常对象
                    var data = {
                        ret: error.response.status,
                        msg: error.response.data
                    }
                    deferred.reject(data);
                } else {
                    // 服务器发生未处理的异常
                    var data = {
                        ret: 10000,
                        msg: error.message,
                    }
                    deferred.reject(data);
                }
                deferred.reject(error)
            })
      	return deferred.promise;
    }
    
    function fetchPost(url, params) {
    	var deferred = when.defer();
		axios.post(url, params,{headers: {'Content-Type': 'multipart/form-data'}}).then(function(response) {
				if (response.data.ret === 0) {
					deferred.resolve(response.data.data);
				} else {
					var error = {
		        		code:response.data.ret,
		        		message:response.data.msg
		        	}
	            	deferred.reject(error);
				}
			}).catch(function(error) {
				if (error.response) {
					// 服务器返回正常的异常对象
					var errorObj = new Error(error.response.status, error.response.data);
					deferred.reject(errorObj);
			    } else {
					// 服务器发生未处理的异常
					var errorObj = new Error(10000, error.message);
					deferred.reject(errorObj);
                }
	            deferred.reject(error);
			})
    	
    	
    	return deferred.promise;
    }

    /**
     * 获取访问令牌
     * @param {String} access_key 
     * @param {String} secret_key 
     */
    this.getAccessToken = function(access_key, secret_key) {
        return fetchGet('/app/get_token', { params: { "access_key": access_key, "secret_key": secret_key } });
    }

    /**
     * 创建房间
     * @param {String} token-访问令牌
     * @param {String} topic-会议主题 
     * @param {Boolean} enable_auto_cloud_recording-是否开启云端自动录制，默认false
     * @param {String} user_id-房间创建者用户ID 
     * @param {String} room_id-指定房间ID，如果不传服务器生成随机号
     * @param {Boolean} enable_auto_avc-是否启用自动视频AVC模式（视频合屏），默认false
     */
    this.createRoom = function(token, topic, user_id, room_id, enable_auto_cloud_recording, enable_auto_avc) {
        var paramsObj = {
            "token": token,
            "topic": topic,
            "user_id": user_id,
        }

        if (room_id) {
            paramsObj.room_id = room_id;
        }

        if (enable_auto_cloud_recording) {
            paramsObj.enable_auto_cloud_recording = enable_auto_cloud_recording;
        }

        if (enable_auto_avc) {
            paramsObj.enable_auto_avc = enable_auto_avc;
        }

        return fetchGet('/room/create', { params: paramsObj });
    }

    /**
     * 查询房间录制
     * @param {String} token-访问令牌
     * @param {String} room_id-房间ID 
     * @param {String} record_start_time-录制起始时间
     * @param {String} record_end_time-录制结束时间 
     */
    this.queryRoomRecording = function(token, room_id, record_start_time, record_end_time) {
        return fetchGet('/room/get_record', { params: { "token": token, "room_id": room_id ,"record_start_time": record_start_time, "record_end_time": record_end_time, } });
    }

    /**
     * 开始AVC合屏模式
     * @param {String} token-访问令牌
     * @param {String} room_id-房间ID 
     */
    this.startAvcModel = function(token, room_id) {
        return fetchGet('/room/avc/start', { params: { "token": token, "room_id": room_id } });
    }

    /**
     * 停止AVC合屏模式
     * @param {String} token-访问令牌
     * @param {String} room_id-房间ID 
     */
    this.stopAvcModel = function(token, room_id) {
        return fetchGet('/room/avc/stop', { params: { "token": token, "room_id": room_id } });
    }

    /**
     * 关闭房间的接口，用于将所有用户从房间踢出，包括设备和录制
     * @param {String} token-访问令牌
     * @param {String} room_id-房间ID 
     */
    this.closeRoom = function(token, room_id) {
        return fetchGet('/room/close', { params: { "token": token, "room_id": room_id } });
    }
    
    /**
     * 上传图片
     * @param {String} token-访问令牌
     * @param {String} room_id-房间ID 
     * @param {String} user_id-用户ID 
     */
    this.uploadImg = function(token, room_id, user_id) {
        return fetchPost('/file/upload_file?token='+token + '&room_id='+ room_id + '&user_id='+ user_id);
    }
    /**
     * @description 开始混屏直播
     * @param {*} params 
     * @returns 
     */
    this.mixLiveStart = function (params) { 
        return fetchGet(`room/mix_live/start?token=${params.token}&room_id=${params.roomId}&push_url=${params.pushUrl}&rtmp_url=${params.rtmpUrl}&name=${params.name}`)
    }
    /**
     * @description 停止混屏直播
     * @param {*} params 
     * @returns 
     */
    this.mixLiveStop = function (params) { 
        return fetchGet(`room/mix_live/stop?token=${params.token}&room_id=${params.roomId}&record_id=${params.recordId}`)
    }  
    /**
     * @description 开始混屏录制
     * @param {*} params 
     * @returns 
     */
    this.mixRecordStart = function (params) { 
        return fetchGet(`room/mix_record/start?token=${params.token}&room_id=${params.roomId}&name=${params.name}&video_resolution=${params.videoResolution}&video_bitrate=${params.videoBitrate}&video_framerate=${params.videoFramerate}&enable_realtime_transcode=true`)
    }
    /**
     * @description 停止混屏录制
     * @param {*} params 
     * @returns 
     */
    this.mixRecordStop = function (params) { 
        return fetchGet(`room/mix_record/stop?token=${params.token}&room_id=${params.roomId}&record_id=${params.recordId}`)
    }  
    /**
     * @description 开启合屏模式
     * @param {*} params 
     * @returns 
     */
    this.startAvcScreenModel = function (params) { 
        return fetchGet(`room/avc/start?token=${params.token}&room_id=${params.roomId}&video_name=${params.videoName}&video_resolution=${params.videoResolution}
        &video_bitrate=${params.videoBitrate}&video_framerate=${params.videoFramerate}&enable_manual_avc=${params.enableManualAvc}
        &layout_mode=${params.layoutMode}&max_video_number=${params.maxVideoNumber}`)
    }
    /**
     * @description 停止合屏模式
     * @param {*} params 
     * @returns 
     */
    this.stopAvcScreenModel = function (params) { 
        return fetchGet(`room/avc/stop?token=${params.token}&room_id=${params.roomId}`)
    }  
}
