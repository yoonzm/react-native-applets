#!/bin/bash

node script/build.js

today=$(date +%Y-%m-%d)
cd ios || exit

project_path=$(pwd)
project_name=rnMp
exportOptionsPlistPath=${project_path}/${project_name}/Info.plist
archivePath=~/Library/Developer/Xcode/Archives/${today}/${project_name}.xcarchive

rm -rf build
rm -rf DerivedData
rm -rf ./IPADir/*

# 打包异常退出后回滚
trap "reBackUp" 2 15
# npm run ios-build
archivePath=~/Library/Developer/Xcode/Archives/${today}/${project_name}.xcarchive

xcodebuild \
  archive -workspace ${project_name}.xcworkspace \
  -scheme ${project_name} \
  -archivePath "${archivePath}" || exit

#导出.ipa文件所在路径
exportIpaPath=${project_path}/IPADir/${project_name}

xcodebuild \
  -exportArchive \
  -archivePath "${archivePath}" \
  -exportPath "${exportIpaPath}" \
  -exportOptionsPlist "${exportOptionsPlistPath}" ||
  exit
# 上传 当前在 ios 文件夹内
fileNames=$(ls ./IPADir/)
for fileName in ${fileNames}; do
  sh ../script/upload.sh uploadPGY ./IPADir/"${fileName}"/${project_name}.ipa "${fileName}"
done
