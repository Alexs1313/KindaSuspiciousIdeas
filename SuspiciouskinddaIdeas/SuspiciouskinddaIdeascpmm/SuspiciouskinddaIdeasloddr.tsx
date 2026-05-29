import React, {useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

import {Animated} from 'react-native';

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

export const owwlmindthinkinhtmlLoader = `<!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            overflow: hidden;
          }

          body {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .loader {
            display: block;
            --height-of-loader: 4px;
            --loader-color:#2EB3FF;
            width: 130px;
            height: var(--height-of-loader);
            border-radius: 30px;
            background-color: rgba(0, 0, 0, 0.2);
            position: relative;
            overflow: hidden;
          }

          .loader::before {
            content: "";
            position: absolute;
            background: var(--loader-color);
            top: 0;
            left: 0;
            width: 0%;
            height: 100%;
            border-radius: 30px;
            animation: moving 1s ease-in-out infinite;
          }

          @keyframes moving {
            50% {
              width: 100%;
            }

            100% {
              width: 0;
              right: 0;
              left: unset;
            }
          }
        </style>
      </head>

      <body>
        <div class="loader"></div>
      </body>
    </html>`;

const SuspiciouskinddaIdeasloddr = () => {
  const navigation = useNavigation<any>();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      navigation.replace('SuspiciouskinddaIdeasonbrd');
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        console.log('timer cleared');
      }
    };
  }, [navigation]);

  return (
    <ImageBackground
      style={styles.suspiciouskinddaIdeasBackdrop}
      source={require('../../assts/immgs/kinddsuspiccoonbrdbg.png')}>
      <ScrollView
        contentContainerStyle={styles.suspiciouskinddaIdeasScrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {Platform.OS === 'ios' ? (
            <Image
              source={require('../../assts/immgs/loaderIco.png')}
              style={{width: 220, height: 220, borderRadius: 50}}
            />
          ) : (
            <Image
              source={require('../../assts/immgs/andricon.png')}
              style={{width: 220, height: 220, borderRadius: 50}}
            />
          )}
        </View>
        <View style={styles.suspiciouskinddaIdeasLoaderWrap}>
          <WebView
            originWhitelist={['*']}
            source={{html: owwlmindthinkinhtmlLoader}}
            style={styles.suspiciouskinddaIdeasWebView}
            scrollEnabled={false}
            transparent={true}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  suspiciouskinddaIdeasBackdrop: {flex: 1},
  suspiciouskinddaIdeasScrollContent: {flexGrow: 1},
  suspiciouskinddaIdeasLoaderWrap: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  suspiciouskinddaIdeasWebView: {
    width: 260,
    height: 80,
    backgroundColor: 'transparent',
  },
});

export default SuspiciouskinddaIdeasloddr;
