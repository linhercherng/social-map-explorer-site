# 家鄉探險誌 線上成品

這個公開儲存庫只保存正式建置後的網頁成品與GitHub Pages部署流程。開發原始碼仍在私人儲存庫 `linhercherng/social-map-explorer`；沒有原始試卷、課本照片、學生個資或瀏覽器存檔。

`site/release.json`記錄來源提交及成品SHA-256。每次推送會先核對檔案，再部署到GitHub Pages。

遊戲包含五座島、25個地點及100道附件知識點改寫題。所有初始題目均待成人複核。玩家資料只在自己的瀏覽器，題庫可編輯、匯入與打包匯出；不同裝置不會自動同步，請使用完整備份搬移。

遊戲入口：https://linhercherng.github.io/social-map-explorer-site/ 。實際發布狀態以本repo的Deploy home atlas workflow為準，不能只以repo存在判定已上線。

v1.1.0支援主畫面安裝與離線遊玩。首次連網開啟並等待「已可離線遊玩」；Android使用Chrome的「安裝到手機」或瀏覽器安裝選單，iPhone使用Safari「分享」→「加入主畫面」。下載後可離線作答、探索及管理題庫。新版本會提示手動更新，保留原有存檔。清除網站資料或系統回收儲存可能影響離線內容與存檔，請定期從知識行囊匯出完整備份；不同手機不會自動同步。
