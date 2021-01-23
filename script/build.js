/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 2021/1/23
 * Time: 下午2:47
 * Desc:
 */
const {run} = require('runjs');

['App3'].forEach((name) => {
  const bundleDir = `./bundle-server/${name}`;
  // run(`mkdir ${bundleDir} || 0`);
  run(`react-native bundle \\
  --entry-file ${name}.js \\
  --platform android \\
  --bundle-output ${bundleDir}/index.android.bundle \\
  --assets-dest ${bundleDir} \\
  --dev false \\`);
  run(`cd bundle-server &&  zip -r ${name}.zip ./${name}/`);
});
