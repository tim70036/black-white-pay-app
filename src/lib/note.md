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

後端 User session 需要存 cur storeId?
好像沒必要阿，直接由前端傳，然後後端驗證就好，存 session 沒有特別好
CMS 會需要記在後端是因為他們沒有 redux ，沒辦法存住 cur club (其實他們用 web cookie 搞不好可以)

小心後端 SQL 取出來的 field 要符合 redux state 的名字

error handling 還沒寫
目前想法是 dispatch status 
然後用 HOC ? 去檢查 status 然後 lightbox
還是各個 container 去處理

device id : gen uuid?

RNRF 坑: 小心跳轉會把前一個頁面放到 stack 上，如果不想讓他按上一頁，要用 reset() 跳轉

expo push 用 redux or async storage?
不同帳號的push token 一樣?
登入登出?
 New app
User A (first ever user) uses IPAD A
Register with APSN, get token
Send token to our servers through ws
Search for token in db, token is new, store it
assign token to USER A

Next user logs into app
Register with APSN, get token
Send token to our servers through ws
Search for token in db, token exists already
Remove connection to USER A
assign token to USER B

SEND Notification to device WITH USERNAME
if username is logged in show it - else dont

剩 listener & server push


dinbro

Top bar 太高
交易紀錄TOP bar 要顯示幣種
黑色不夠油
快速捷徑字拿掉，廣告稍微大點
通知鈴鐺選一個放
廣告換一下

