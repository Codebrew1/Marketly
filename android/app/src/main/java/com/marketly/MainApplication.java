package com.marketly;

import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.imagepicker.ImagePickerPackage;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage; 

import java.util.List;
import java.util.Arrays;

public class MainApplication extends NavigationApplication {

     @Override
     public boolean isDebug() {
         // Make sure you are using BuildConfig from your own application
         return BuildConfig.DEBUG;
     }

     protected List<ReactPackage> getPackages() {
         // Add additional packages you require here
         // No need to add RnnPackage and MainReactPackage
         return Arrays.<ReactPackage>asList(
                new PickerPackage(),
                new ReactNativeRestartPackage(),
                new LinearGradientPackage(),
                new ReactMaterialKitPackage(),
                new ImagePickerPackage(),
                new TwitterSigninPackage(),
                new RNGoogleSigninPackage()
                // eg. new VectorIconsPackage()
         );
     }

     @Override
     public List<ReactPackage> createAdditionalReactPackages() {
         return getPackages();
     }
 }
