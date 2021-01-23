#!/bin/bash

# 上传至蒲公英
# 参数1 文件路径
# 参数1 版本描述
uploadPGY() {
    echo "上传至蒲公英----------------------------------------------------------------"
    echo "上传文件" "$1"
    echo "上传描述" "$2"
    echo "开始上传----------------------------------------------------------------"
    result=$(curl \
    -F "file=@$1" \
    -F "_api_key=c1449303211b4837129a239d2dd4dc30" \
    -F "buildUpdateDescription=$2" \
    -F "buildInstallType=2" \
    -F "buildPassword=0000" \
    https://www.pgyer.com/apiv2/app/upload)
    echo "$2 - 上传结果:$result"
}

#验证并上传到App Store
# 将-u 后面的XXX替换成自己的AppleID的账号，-p后面的XXX替换成自己的密码
uploadIosStore() {
    echo "上传至App Store----------------------------------------------------------------"
    echo "上传文件" "$1"
    echo "上传描述" "$2"

    IPA_PATH=$1
    API_KEY=454BDTPY7R
    ISSUER_ID=1cf4fd2e-ba2e-446c-aff8-46eb0c9d6611

    echo "开始验证----------------------------------------------------------------"
    xcrun altool --validate-app -f "$IPA_PATH" -t ios --apiKey "$API_KEY" --apiIssuer "$ISSUER_ID" --verbose
    echo "开始上传----------------------------------------------------------------"
    xcrun altool --upload-app -f "$IPA_PATH" -t ios --apiKey "$API_KEY" --apiIssuer "$ISSUER_ID" --verbose
}

case "$1" in
    uploadPGY)
        $1 "$2" "$3"
        ;;
    uploadIosStore)
        $1 "$2" "$3"
        ;;
    *)
    echo $"Usage: $0 {uploadPGY|uploadIosStore}"
    exit 2
esac
exit $?
