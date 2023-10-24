//
//  SplashScreen.h
//
//  Created by Vimal Bhaktwarti on 17/12/16.
//  Copyright © 2016 Facebook. All rights reserved.
//
#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>
@interface SplashScreen : NSObject<RCTBridgeModule>
+ (void)showSplash:(NSString*)splashScreen inRootView:(UIView*)rootView;
+ (void)show;
+ (void)hide;
@end
