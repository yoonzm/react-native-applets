#!/bin/bash

node script/build.js

# 安卓自动化打包脚本
cd android
./gradlew assembleRelease

# 上传 当前在android文件夹内
fileNames=$(ls ./app/build/outputs/apk)
for fileName in ${fileNames}; do
  sh ../script/upload.sh uploadPGY "./app/build/outputs/apk/${fileName}/app-release.apk" "$fileName"
done
