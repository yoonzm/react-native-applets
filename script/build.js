/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 2021/1/23
 * Time: 下午2:47
 * Desc:
 */
const {run} = require('runjs');
const fs = require('fs'); // 引入fs模块

['App3'].forEach((name) => {
  const bundleDir = `./bundle-server/${name}`;
  const exist = fs.existsSync(bundleDir);
  if (!exist) {
    run(`mkdir ${bundleDir}`);
  }
  run(`react-native bundle \\
  --entry-file ${name}.js \\
  --platform android \\
  --bundle-output ${bundleDir}/index.android.bundle \\
  --assets-dest ${bundleDir} \\
  --dev false \\`);
  run(`react-native bundle \\
  --entry-file ${name}.js \\
  --platform ios \\
  --bundle-output ${bundleDir}/index.ios.bundle \\
  --assets-dest ${bundleDir} \\
  --dev false \\`);
  run(`cd bundle-server &&  zip -r ${name}.zip ./${name}/`);
});
