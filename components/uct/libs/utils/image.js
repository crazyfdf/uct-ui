// 图片处理-选择图片
chooseImage(count = 1) {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: count, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: res => {
        resolve(res.tempFilePaths);
      }
    });
  }).catch(e => {
    reject(e)
  })
},
// 图片处理-上传图片
uploadImage(api, url) {
  let config_url = API_URL;
  uni.showLoading({
    title: '上传中'
  });
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: config_url + api,
      filePath: url,
      name: 'file',
      success: res => {
        res = JSON.parse(res.data);
        if (res.code === 1)
        {
          uni.hideLoading()
          uni.showToast({
            title: '上传成功',
            icon: 'none'
          });
          resolve(res.data)
        } else
        {
          uni.hideLoading()
          uni.showModal({
            title: '上传失敗',
            content: res.msg
          });
        }
      }
    });
  }).catch(e => {
    reject(e)
  })
},
// 图片处理-预览图片
previewImage(urls = [], current = 0) {
  uni.previewImage({
    urls: urls,
    current: current,
    indicator: 'default',
    loop: true,
    fail (err) {
      console.log('previewImage出错', urls, err)
    },
  })
},
// 图片处理-获取图片信息
getImageInfo(src = '') {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: src,
      success: (image) => {
        resolve(image)
      },
      fail (err) {
        console.log('getImageInfo出错', src, err)
      },
    })
  }).catch(e => {
    reject(e)
  })

},