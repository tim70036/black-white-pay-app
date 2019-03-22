adb devices
adb reverse tcp:8080 tcp:8080


lib/auth.js
controllers/api/*
controllers/auth/*
routes/api.js
routes/index.js

Component vs. Container
Component 處理 RN specific 的動作 ex. react-native-router-flux 的頁面切換
Container 處理跟 RN 無關的 ex. redux action
記得 async await 要小心

Web auth controller 檔案太多有點亂