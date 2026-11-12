// public/components.js - 부산이음 사용자 공통 웹 컴포넌트

// 1. 공통 네비게이션 헤더 (모바일 4개 카테고리 탭 완벽 지원!)
class PublicNav extends HTMLElement {
    connectedCallback() {
        const active = this.getAttribute('active') || 'home';
        
        // PC 화면용 활성화 클래스
        const getNavLinkClass = (page) => {
            return active === page
                ? "text-gray-900 font-extrabold border-b-2 border-gray-900 pb-1 text-base md:text-lg transition"
                : "text-gray-600 hover:text-gray-900 font-medium text-base md:text-lg transition";
        };

        // 모바일 화면용 탭 활성화 클래스 (동글동글 감성 칩 디자인)
        const getMobileTabClass = (page) => {
            return active === page
                ? "px-3.5 py-1.5 rounded-full bg-gray-900 text-white font-black text-xs shadow-sm transition whitespace-nowrap"
                : "px-3.5 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:text-gray-900 font-bold text-xs transition whitespace-nowrap";
        };

        this.innerHTML = `
            <!-- 상단 헤더 컨테이너 -->
            <header class="group fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 transition-all shadow-sm">
                
                <!-- [1단] 상단 로고 & 사용자 프로필 / 로그인 바 -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between relative z-20 bg-white">
                    
                    <!-- 공식 로고 -->
                    <a href="index.html" class="flex items-center py-1 overflow-visible focus:outline-none">
                        <img src="logo.png" alt="부산이음 로고" 
                             class="w-auto object-contain transition-transform duration-200 hover:scale-105"
                             style="height: 44px; max-height: 56px; min-height: 38px;">
                    </a>

                    <!-- PC 전용 상단 메뉴 목록 (태블릿/PC에서 표시) -->
                    <nav class="hidden md:flex items-center gap-10 h-full">
                        <a href="intro.html" class="${getNavLinkClass('intro')} flex items-center h-full">소개</a>
                        <a href="busan-ieum.html" class="${getNavLinkClass('busan-ieum')} flex items-center h-full">부산이음</a>
                        <a href="club.html" class="${getNavLinkClass('club')} flex items-center h-full">동아리</a>
                        <a href="market.html" class="${getNavLinkClass('market')} flex items-center h-full">우리기장</a>
                    </nav>

                    <!-- 우측 계정 및 액션 버튼 -->
                    <div class="flex items-center gap-2.5 sm:gap-4">
                        <button id="btn-login" onclick="window.openLoginModal()" class="text-xs sm:text-base font-bold text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-xl transition">
                            로그인
                        </button>
                        
                        <div id="user-profile" class="hidden items-center gap-2 sm:gap-3">
                            <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rosegold-100 text-rosegold-600 flex items-center justify-center text-xs font-black shadow-inner" id="user-avatar">이</div>
                            <span class="text-xs sm:text-sm font-bold text-gray-800" id="user-name">이웃 님</span>
                            <button onclick="window.logout()" class="text-[11px] sm:text-xs text-gray-400 hover:text-red-500 ml-0.5 font-medium transition">로그아웃</button>
                        </div>

                        ${active === 'club' ? `
                            <button onclick="window.openClubModal()" class="hidden sm:inline-block px-4 py-2 bg-gray-900 text-white rounded-full text-xs font-bold hover:bg-gray-800 transition shadow-sm whitespace-nowrap active:scale-95">
                                동아리 등록
                            </button>
                        ` : ''}

                        ${active === 'market' ? `
                            <button onclick="window.openRegisterModal()" class="hidden sm:inline-block px-4 py-2 bg-gray-900 text-white rounded-full text-xs font-bold hover:bg-gray-800 transition shadow-sm whitespace-nowrap active:scale-95">
                                소식 올리기
                            </button>
                        ` : ''}
                    </div>
                </div>

                <!-- 🌟 [2단] 모바일 전용 4개 카테고리 메뉴 바 (핸드폰에서 100% 항상 표시!) 🌟 -->
                <div class="md:hidden w-full bg-white border-t border-gray-100 px-3 py-2 flex items-center justify-center gap-2 overflow-x-auto hide-scrollbar shadow-inner">
                    <a href="intro.html" class="${getMobileTabClass('intro')}">소개</a>
                    <a href="busan-ieum.html" class="${getMobileTabClass('busan-ieum')}">부산이음</a>
                    <a href="club.html" class="${getMobileTabClass('club')}">동아리</a>
                    <a href="market.html" class="${getMobileTabClass('market')}">우리기장</a>
                </div>

                <!-- PC 전용 메가 메뉴 드롭다운 패널 -->
                <div class="hidden md:block absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-300 ease-out z-10">
                    <div class="max-w-7xl mx-auto px-6 py-8">
                        <div class="grid grid-cols-4 gap-8 divide-x divide-gray-100">
                            
                            <!-- 1열: 소개 -->
                            <div class="pr-6">
                                <h4 class="text-base font-black text-gray-900 mb-3 flex items-center gap-2">
                                    <i data-lucide="info" class="w-4 h-4 text-rosegold-500"></i> 소개
                                </h4>
                                <ul class="space-y-2.5 text-sm font-medium text-gray-600">
                                    <li><a href="intro.html" class="hover:text-rosegold-600 hover:font-bold transition flex items-center gap-1.5"><span class="w-1 h-1 rounded-full bg-gray-300"></span>부산이음이란?</a></li>
                                    <li><a href="intro.html" class="hover:text-rosegold-600 hover:font-bold transition flex items-center gap-1.5"><span class="w-1 h-1 rounded-full bg-gray-300"></span>설립 취지 및 목적</a></li>
                                    <li><a href="intro.html" class="hover:text-rosegold-600 hover:font-bold transition flex items-center gap-1.5"><span class="w-1 h-1 rounded-full bg-gray-300"></span>함께하는 분들</a></li>
                                </ul>
                            </div>

                            <!-- 2열: 부산이음 story -->
                            <div class="px-6">
                                <h4 class="text-base font-black text-gray-900 mb-3 flex items-center gap-2">
                                    <i data-lucide="sparkles" class="w-4 h-4 text-rosegold-500"></i> 부산이음
                                </h4>
                                <ul class="space-y-2.5 text-sm font-medium text-gray-600">
                                    <li><a href="busan-ieum.html" class="hover:text-rosegold-600 hover:font-bold transition flex items-center gap-1.5"><span class="w-1 h-1 rounded-full bg-gray-300"></span>함께하는 부산이음 story</a></li>
                                    <li><a href="busan-ieum.html" class="hover:text-rosegold-600 hover:font-bold transition flex items-center gap-1.5"><span class="w-1 h-1 rounded-full bg-gray-300"></span>우리들의 활동 피드</a></li>
                                    <li><a href="busan-ieum.html" class="hover:text-rosegold-600 hover:font-bold transition flex items-center gap-1.5"><span class="w-1 h-1 rounded-full bg-gray-300"></span>새 이야기 남기기</a></li>
                                </ul>
                            </div>

                            <!-- 3열: 동아리 -->
                            <div class="px-6">
                                <h4 class="text-base font-black text-gray-900 mb-3 flex items-center gap-2">
                                    <i data-lucide="users" class="w-4 h-4 text-rosegold-500"></i> 동아리
                                </h4>
                                <ul class="space-y-2.5 text-sm font-medium text-gray-600">
                                    <li><a href="club.html" class="hover:text-rosegold-600 hover:font-bold transition flex items-center gap-1.5"><span class="w-1 h-1 rounded-full bg-gray-300"></span>손수 (공예/만들기)</a></li>
                                    <li><a href="club.html" class="hover:text-rosegold-600 hover:font-bold transition flex items-center gap-1.5"><span class="w-1 h-1 rounded-full bg-gray-300"></span>몸소 (활동/건강)</a></li>
                                    <li><a href="club.html" class="hover:text-rosegold-600 hover:font-bold transition flex items-center gap-1.5"><span class="w-1 h-1 rounded-full bg-gray-300"></span>그 외 나눔 동아리</a></li>
                                </ul>
                            </div>

                            <!-- 4열: 우리기장 -->
                            <div class="pl-6">
                                <h4 class="text-base font-black text-gray-900 mb-3 flex items-center gap-2">
                                    <i data-lucide="store" class="w-4 h-4 text-rosegold-500"></i> 우리기장
                                </h4>
                                <ul class="space-y-2.5 text-sm font-medium text-gray-600">
                                    <li><a href="market.html" class="hover:text-rosegold-600 hover:font-bold transition flex items-center gap-1.5"><span class="w-1 h-1 rounded-full bg-gray-300"></span>추천 카페</a></li>
                                    <li><a href="market.html" class="hover:text-rosegold-600 hover:font-bold transition flex items-center gap-1.5"><span class="w-1 h-1 rounded-full bg-gray-300"></span>동네 맛집 탐방</a></li>
                                    <li><a href="market.html" class="hover:text-rosegold-600 hover:font-bold transition flex items-center gap-1.5"><span class="w-1 h-1 rounded-full bg-gray-300"></span>관광 & 나들이 명소</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </header>
        `;
        if (window.lucide) window.lucide.createIcons();
    }
}

// 2. 공통 푸터
class PublicFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="bg-white border-t border-gray-100 py-10 px-4 sm:px-6 relative z-10">
                <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div class="flex items-center gap-3">
                        <img src="logo.png" alt="부산이음 로고" class="w-auto object-contain opacity-85" style="height: 38px;">
                        <span class="text-xs sm:text-sm text-gray-400 font-medium">| 부산 기장군 이웃 커뮤니티</span>
                    </div>
                    <p class="text-[11px] sm:text-xs text-gray-400">© 2026 부산이음. All rights reserved.</p>
                </div>
            </footer>
        `;
        if (window.lucide) window.lucide.createIcons();
    }
}

// 3. 공통 모달 (로그인, 비밀번호 재설정 등)
class PublicModals extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- [1] 로그인 모달 -->
            <div id="modal-login" class="fixed inset-0 bg-black/60 z-[120] hidden flex items-center justify-center p-4 backdrop-blur-md transition-all">
                <div class="bg-white w-full max-w-md rounded-[2rem] p-6 sm:p-8 shadow-2xl relative animate-[fadeIn_0.3s_ease-out]">
                    <button onclick="window.closeLoginModal()" class="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition p-1">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                    
                    <div class="text-center mb-6 mt-1">
                        <img src="logo.png" alt="부산이음" class="w-auto mx-auto mb-2 object-contain" style="height: 48px;">
                        <h3 class="text-2xl font-black text-gray-900 mb-1 tracking-tight">부산이음 시작하기</h3>
                        <p class="text-sm text-gray-600 font-medium">우리 동네 이웃들의 따뜻한 모임 공간</p>
                    </div>

                    <div class="space-y-3.5">
                        <div>
                            <label class="block text-xs font-bold text-gray-600 mb-1 ml-1">아이디(이메일)</label>
                            <input type="text" id="login-email" placeholder="예: busan@naver.com" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-900 font-bold text-sm transition">
                        </div>
                        <div>
                            <div class="flex items-center justify-between mb-1 ml-1 mr-1">
                                <label class="block text-xs font-bold text-gray-600">비밀번호</label>
                                <button type="button" onclick="window.openResetPasswordModal()" class="text-xs text-rosegold-600 hover:text-rosegold-700 font-extrabold underline underline-offset-2">
                                    비밀번호 찾기
                                </button>
                            </div>
                            <input type="password" id="login-pw" placeholder="비밀번호 입력" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-900 font-bold text-sm transition">
                        </div>

                        <button type="button" onclick="window.loginWithEmail()" class="w-full bg-gray-900 text-white font-black text-base py-3.5 rounded-xl hover:bg-gray-800 transition shadow-md active:scale-95 mt-1">
                            로그인하기
                        </button>

                        <div class="relative my-3 text-center">
                            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
                            <span class="relative bg-white px-3 text-xs text-gray-400 font-bold">또는</span>
                        </div>

                        <button type="button" onclick="window.loginWithGoogle()" class="w-full bg-white border-2 border-gray-200 text-gray-800 font-bold text-sm py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2 shadow-sm active:scale-95">
                            <svg class="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3h3.86c2.26-2.09 3.685-5.18 3.685-9.1z"/>
                                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.37 24 12 24z"/>
                                <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.98-3.1z"/>
                                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.26 2.7 1.29 6.61l3.98 3.1c.95-2.85 3.6-4.96 6.73-4.96z"/>
                            </svg>
                            구글 계정으로 간편 로그인
                        </button>

                        <div class="pt-2 text-center">
                            <span class="text-xs text-gray-500 font-medium">아직 회원이 아니신가요?</span>
                            <button type="button" onclick="window.openEmailRegisterModal()" class="text-xs text-gray-900 font-black hover:underline ml-1">회원가입</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- [2] 비밀번호 재설정 모달 -->
            <div id="modal-reset-password" class="fixed inset-0 bg-black/60 z-[130] hidden flex items-center justify-center p-4 backdrop-blur-md transition-all">
                <div class="bg-white w-full max-w-md rounded-[2rem] p-6 sm:p-8 shadow-2xl relative animate-[fadeIn_0.3s_ease-out]">
                    <button onclick="window.closeResetPasswordModal()" class="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition p-1">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                    
                    <div class="text-center mb-6 mt-1">
                        <div class="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                            <i data-lucide="key-round" class="w-6 h-6"></i>
                        </div>
                        <h3 class="text-xl font-black text-gray-900 mb-1.5 tracking-tight">비밀번호 찾기</h3>
                        <p class="text-xs text-gray-700 leading-relaxed font-medium bg-amber-50/70 p-3 rounded-xl border border-amber-100 text-left">
                            💡 가입하셨던 <strong>이메일 주소</strong>를 입력해 주시면 비밀번호 재설정 링크를 보내드립니다.
                        </p>
                    </div>

                    <div class="space-y-3.5">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1 ml-1">가입한 이메일 입력</label>
                            <input type="email" id="reset-email" placeholder="예: busan@naver.com" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-900 font-bold text-sm transition">
                        </div>

                        <button type="button" onclick="window.handleSendPasswordReset()" class="w-full bg-gray-900 text-white font-black text-base py-3.5 rounded-xl hover:bg-gray-800 transition shadow-md active:scale-95">
                            재설정 메일 발송하기
                        </button>

                        <div class="text-center pt-1">
                            <button type="button" onclick="window.closeResetPasswordModal(); window.openLoginModal();" class="text-xs text-gray-500 hover:text-gray-900 font-bold transition flex items-center justify-center gap-1 mx-auto py-1">
                                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> 로그인 화면으로 돌아가기
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- [3] 일반 이메일 회원가입 모달 -->
            <div id="modal-email-register" class="fixed inset-0 bg-black/60 z-[125] hidden flex items-center justify-center p-4 backdrop-blur-md">
                <div class="bg-white w-full max-w-md rounded-[2rem] p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto hide-scrollbar">
                    <button onclick="window.closeEmailRegisterModal()" class="absolute top-5 right-5 text-gray-400 hover:text-gray-900 p-1">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                    
                    <h3 class="text-xl font-black text-gray-900 mb-1 mt-1 text-center">부산이음 회원가입</h3>
                    <p class="text-xs text-gray-500 mb-5 text-center font-medium">우리 동네 이웃들과 소통해 보세요!</p>

                    <div class="space-y-3">
                        <div>
                            <label class="block text-xs font-bold text-gray-600 mb-1 ml-1">이메일</label>
                            <input type="email" id="reg-email" placeholder="아이디로 사용할 이메일" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-900 text-sm font-bold">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-600 mb-1 ml-1">비밀번호</label>
                            <input type="password" id="reg-pw" placeholder="6자리 이상 입력" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-900 text-sm font-bold">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-600 mb-1 ml-1">이름 (실명)</label>
                            <input type="text" id="reg-name" placeholder="홍길동" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-900 text-sm font-bold">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-600 mb-1 ml-1">별명 (동아리 활동명)</label>
                            <input type="text" id="reg-nickname" placeholder="예: 햇살이웃" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-900 text-sm font-bold">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-600 mb-1 ml-1">연락처</label>
                            <input type="tel" id="reg-phone" placeholder="010-0000-0000" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-900 text-sm font-bold">
                        </div>
                        
                        <button type="button" onclick="window.submitEmailRegister()" class="w-full bg-gray-900 text-white font-black text-sm py-3.5 rounded-xl hover:bg-gray-800 transition shadow-md active:scale-95 mt-2">
                            가입 완료하기
                        </button>
                    </div>
                </div>
            </div>

            <!-- [4] 구글 추가 정보 입력 모달 -->
            <div id="modal-google-register" class="fixed inset-0 bg-black/60 z-[130] hidden flex items-center justify-center p-4 backdrop-blur-md">
                <div class="bg-white w-full max-w-md rounded-[2rem] p-6 sm:p-8 shadow-2xl relative">
                    <button onclick="window.closeGoogleRegisterModal()" class="absolute top-5 right-5 text-gray-400 hover:text-gray-900 p-1">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                    <h3 class="text-xl font-black text-gray-900 mb-1 text-center">추가 정보 입력</h3>
                    <p class="text-xs text-gray-500 mb-5 text-center font-medium">원활한 활동을 위해 성함과 연락처를 남겨주세요.</p>
                    <div class="space-y-3">
                        <input type="text" id="g-reg-name" placeholder="이름 (실명)" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-900 text-sm font-bold">
                        <input type="text" id="g-reg-nickname" placeholder="활동 닉네임" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-900 text-sm font-bold">
                        <input type="tel" id="g-reg-phone" placeholder="연락처 (010-0000-0000)" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-900 text-sm font-bold">
                        <button type="button" onclick="window.submitGoogleRegister()" class="w-full bg-gray-900 text-white font-black text-sm py-3.5 rounded-xl hover:bg-gray-800 transition shadow-md active:scale-95 mt-2">
                            가입 완료하기
                        </button>
                    </div>
                </div>
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();
    }
}

customElements.define('public-nav', PublicNav);
customElements.define('public-footer', PublicFooter);
customElements.define('public-modals', PublicModals);

// 전역 모달 제어 함수
window.openLoginModal = () => {
    const modal = document.getElementById('modal-login');
    if (modal) modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
};

window.closeLoginModal = () => {
    const modal = document.getElementById('modal-login');
    if (modal) modal.classList.add('hidden');
};

window.openEmailRegisterModal = () => {
    window.closeLoginModal();
    const modal = document.getElementById('modal-email-register');
    if (modal) modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
};

window.closeEmailRegisterModal = () => {
    const modal = document.getElementById('modal-email-register');
    if (modal) modal.classList.add('hidden');
};

window.closeGoogleRegisterModal = () => {
    const modal = document.getElementById('modal-google-register');
    if (modal) modal.classList.add('hidden');
};

window.openResetPasswordModal = () => {
    window.closeLoginModal();
    const modal = document.getElementById('modal-reset-password');
    if (modal) {
        modal.classList.remove('hidden');
        const loginEmail = document.getElementById('login-email');
        const resetEmail = document.getElementById('reset-email');
        if (loginEmail && resetEmail && loginEmail.value) {
            resetEmail.value = loginEmail.value.trim();
        }
    }
    if (window.lucide) window.lucide.createIcons();
};

window.closeResetPasswordModal = () => {
    const modal = document.getElementById('modal-reset-password');
    if (modal) modal.classList.add('hidden');
    const resetEmail = document.getElementById('reset-email');
    if (resetEmail) resetEmail.value = '';
};

// Firebase 인증 인스턴스 로더
const getFirebaseAuthInstances = async () => {
    const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
    const { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, signOut } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
    const { getFirestore, doc, setDoc, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");

    const firebaseConfig = { 
        apiKey: "AIzaSyAoiX0R0hJoWYqyy52Y6sFWIxwPoljR_7k", 
        authDomain: "talent.unifactory.kr", 
        projectId: "talent-af055", 
        storageBucket: "talent-af055.firebasestorage.app", 
        messagingSenderId: "476130735120", 
        appId: "1:476130735120:web:aae71ccf3e626152e40695", 
        measurementId: "G-1XSNXNNGMH" 
    };

    const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    return { auth, db, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, signOut, setDoc, doc, serverTimestamp };
};

// 이메일 로그인
window.loginWithEmail = async () => {
    const emailInput = document.getElementById('login-email');
    const pwInput = document.getElementById('login-pw');
    const email = emailInput ? emailInput.value.trim() : '';
    const password = pwInput ? pwInput.value.trim() : '';

    if (!email || !password) {
        alert("아이디(이메일)와 비밀번호를 모두 입력해 주세요! ✍️");
        return;
    }

    try {
        const { auth, signInWithEmailAndPassword } = await getFirebaseAuthInstances();
        const finalEmail = (email === 'admin') ? 'admin@internal.system' : email;
        await signInWithEmailAndPassword(auth, finalEmail, password);
        window.closeLoginModal();
        alert("로그인되었습니다! 환영합니다. 🎉");
    } catch (err) {
        console.error("로그인 실패:", err);
        alert("아이디 또는 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");
    }
};

// 구글 로그인
window.loginWithGoogle = async () => {
    try {
        const { auth, GoogleAuthProvider, signInWithPopup } = await getFirebaseAuthInstances();
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        window.closeLoginModal();
    } catch (err) {
        console.error("구글 로그인 실패:", err);
        alert("구글 로그인에 실패했습니다. 다시 시도해 주세요.");
    }
};

// 비밀번호 재설정 발송
window.handleSendPasswordReset = async () => {
    const resetInput = document.getElementById('reset-email');
    const email = resetInput ? resetInput.value.trim() : '';

    if (!email) {
        alert("이메일 주소를 입력해 주세요! ✍️");
        if (resetInput) resetInput.focus();
        return;
    }

    try {
        const { auth, sendPasswordResetEmail } = await getFirebaseAuthInstances();
        auth.languageCode = 'ko';
        await sendPasswordResetEmail(auth, email);
        window.closeResetPasswordModal();
        alert(`✅ [${email}]\n해당 이메일로 비밀번호 재설정 링크를 보냈습니다!\n\n※ 메일이 안 보일 경우, 메일함 내의 '스팸 메일함'을 꼭 확인해 주세요.`);
    } catch (err) {
        console.error("비밀번호 재설정 오류:", err);
        let errorMsg = "메일 발송에 실패했습니다. 이메일 주소를 다시 확인해 주세요.";
        if (err.code === 'auth/user-not-found') errorMsg = "등록되어 있지 않은 이메일 주소입니다.";
        else if (err.code === 'auth/invalid-email') errorMsg = "올바른 이메일 주소 형식이 아닙니다.";
        alert(errorMsg);
    }
};

// 로그아웃
window.logout = async () => {
    try {
        const { auth, signOut } = await getFirebaseAuthInstances();
        await signOut(auth);
        alert("안전하게 로그아웃되었습니다.");
        location.reload();
    } catch (err) {
        console.error(err);
    }
};