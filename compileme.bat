
call cordova build android --release 
copy example.keystore platforms\android\app\build\outputs\apk\release
call cd "platforms\android\app\build\outputs\apk\release"
 
call jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore example.keystore -storepass ch3yh4mb0n3 -keypass ch3yh4mb0n3 app-release-unsigned.apk example
call del done.apk
call C:\Users\zcs01104\AppData\Local\Android\Sdk\build-tools\27.0.1\zipalign.exe -v 4  app-release-unsigned.apk  done.apk
cd..
cd..
cd..
cd..
cd..
cd..
cd..
