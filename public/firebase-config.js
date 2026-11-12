// public/firebase-config.js
// 파이어베이스 핵심 모듈 불러오기
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// 공통 파이어베이스 프로젝트 설정값
let firebaseConfig = {
    apiKey: "AIzaSyAoiX0R0hJoWYqyy52Y6sFWIxwPoljR_7k",
    authDomain: "talent.unifactory.kr",
    projectId: "talent-af055",
    storageBucket: "talent-af055.firebasestorage.app",
    messagingSenderId: "476130735120",
    appId: "1:476130735120:web:aae71ccf3e626152e40695",
    measurementId: "G-1XSNXNNGMH"
};

// 호스팅 환경 변수 대응 (선택사항)
if (typeof __firebase_config !== 'undefined') {
    firebaseConfig = JSON.parse(__firebase_config);
}

// 파이어베이스 초기화 (중복 실행 방지)
const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'talent-af055';

// 페이지 이동 및 새로고침 시에도 로그인 상태 영구 고정
const authReady = setPersistence(auth, browserLocalPersistence).catch(() => {});

// 다른 HTML 파일들에서 이 변수들을 가져다 쓸 수 있도록 내보내기(export)
export { app, db, auth, appId, authReady };