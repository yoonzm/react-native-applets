package com.rnmp.applet;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.rnmp.ReactNativeBaseHost;

public class AppletActivityDelegate extends ReactActivityDelegate {
    private String jSBundleFile;

    public AppletActivityDelegate(ReactActivity activity, @Nullable String mainComponentName, @Nullable String jSBundleFile) {
        super(activity, mainComponentName);
        this.jSBundleFile = jSBundleFile;
    }

    @Override
    protected ReactNativeHost getReactNativeHost() {
        if (jSBundleFile != null) {
            return new ReactNativeBaseHost(getPlainActivity().getApplication()) {
                @Override
                public boolean getUseDeveloperSupport() {
                    return false;
                }

                @Nullable
                @Override
                protected String getJSBundleFile() {
                    return jSBundleFile;
                }
            };
        }
        return ((ReactApplication) getPlainActivity().getApplication()).getReactNativeHost();
    }
}
