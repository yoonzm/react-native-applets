package com.rnmp.applet;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class AppletActivity extends ReactActivity {
  static private String componentName;
  static private String jSBundleFile;

  static void setComponentName(String name) {
    componentName = name;
  }

  static void setJSBundleFile(String file) {
    jSBundleFile = file;
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return componentName;
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new AppletActivityDelegate(this, getMainComponentName(), jSBundleFile);
  }
}
