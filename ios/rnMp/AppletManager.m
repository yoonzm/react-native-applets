#import "AppletManager.h"
#import "AppDelegate.h"
#import "React/RCTLog.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppletManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(startAppletFromComponentName) {
  RCTLog(@"name");
  //
  dispatch_sync(dispatch_get_main_queue(), ^{
    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://192.168.10.83:8081/index.bundle?platform=ios&dev=true"];
    RCTRootView * rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"App3" initialProperties:nil launchOptions:nil];
    UIViewController *vc = [[UIViewController alloc] init];
    vc.view = rootView;
  //  [self.window.rootViewController presentViewController:vc animated:true completion:nil];
    
    AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [app.nav setNavigationBarHidden:NO animated:YES];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      [app.nav pushViewController:vc animated:YES];
    });
  });
}

//RCT_EXPORT_METHOD(startAppletFromComponentName:(NSString *)componentName) {
//  RCTLog(@"name");
//  //
//  dispatch_sync(dispatch_get_main_queue(), ^{
//    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://192.168.10.83:8081/index.bundle?platform=ios&dev=true"];
//    RCTRootView * rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:componentName initialProperties:nil launchOptions:nil];
//    UIViewController *vc = [[UIViewController alloc] init];
//    vc.view = rootView;
//  //  [self.window.rootViewController presentViewController:vc animated:true completion:nil];
//
//    AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
//    [app.nav setNavigationBarHidden:NO animated:YES];
//    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//      [app.nav pushViewController:vc animated:YES];
//    });
//  });
//}
//
RCT_EXPORT_METHOD(startAppletFromJSBundle:(NSString *)componentName jsBundleFile: (NSString *)jsBundleFile) {
  dispatch_sync(dispatch_get_main_queue(), ^{
    NSURL *jsCodeLocation = [NSURL URLWithString:jsBundleFile];
    RCTRootView * rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:componentName initialProperties:nil launchOptions:nil];
    UIViewController *vc = [[UIViewController alloc] init];
    vc.view = rootView;
  //  [self.window.rootViewController presentViewController:vc animated:true completion:nil];

    AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [app.nav setNavigationBarHidden:NO animated:YES];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      [app.nav pushViewController:vc animated:YES];
    });
  });
}

@end
