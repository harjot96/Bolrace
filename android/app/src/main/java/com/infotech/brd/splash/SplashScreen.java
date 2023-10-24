package com.infotech.brd.splash;

import android.app.Activity;
import android.app.Dialog;
import android.os.Build;

import com.infotech.brd.R;

import java.lang.ref.WeakReference;


public class SplashScreen {
    private static Dialog mSplashDialog;
    private static WeakReference<Activity> mActivity;

    public static void show(final Activity activity, final int themeResId){
        if (activity == null) return;
        mActivity = new WeakReference<Activity>(activity);
        mSplashDialog = new Dialog(activity, themeResId);
        mSplashDialog.setContentView(R.layout.launch_screen);
        mSplashDialog.setCancelable(false);

        if (!mSplashDialog.isShowing()) {
            mSplashDialog.show();
        }
    }

    public static void show(final Activity activity, final boolean fullScreen) {
        int resourceId = fullScreen ? R.style.SplashScreen_Fullscreen : R.style.SplashScreen_SplashTheme;

        show(activity, resourceId);
    }

    public static void show(final Activity activity) {
        show(activity, false);
    }

    public static void hide(Activity activity) {
        if (activity == null) {
            if (mActivity == null) {
                return;
            }
            activity = mActivity.get();
        }

        if (activity == null) return;

        final Activity _activity = activity;

        if (mSplashDialog != null && mSplashDialog.isShowing()) {
            boolean isDestroyed = false;

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
                isDestroyed = _activity.isDestroyed();
            }

            if (!_activity.isFinishing() && !isDestroyed) {
                mSplashDialog.dismiss();
            }
            mSplashDialog = null;
        }
    }
}