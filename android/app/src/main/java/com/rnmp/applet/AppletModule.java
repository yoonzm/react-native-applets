package com.rnmp.applet;

import android.app.Activity;
import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AppletModule extends ReactContextBaseJavaModule {
    public AppletModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "AppletModule";
    }

    /**
     * 用于开发模式下重新打开{@link AppRegistry.registerComponent}注册的组件
     * @param componentName
     */
    @ReactMethod
    public void startAppletFromComponentName(String componentName) {
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {
                Intent intent = new Intent(currentActivity, AppletActivity.class);
                AppletActivity.setComponentName(componentName);
                currentActivity.startActivity(intent);
            }
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "不能打开Activity : " + e.getMessage());
        }
    }

    @ReactMethod
    public void startAppletFromJSBundle(String componentName, String jsBundleFile) {
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {
                Intent intent = new Intent(currentActivity, AppletActivity.class);
                AppletActivity.setComponentName(componentName);
                AppletActivity.setJSBundleFile(jsBundleFile);
                currentActivity.startActivity(intent);
            }
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "不能打开Activity : " + e.getMessage());
        }
    }
}
