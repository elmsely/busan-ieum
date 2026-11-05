// 1. 공통 사이드바(메뉴) 컴포넌트
class AdminSidebar extends HTMLElement {
    connectedCallback() {
        // 현재 활성화된 메뉴 항목을 받아옵니다. (기본값: index)
        const active = this.getAttribute('active') || 'index';
        
        // 선택된 메뉴만 색상을 반전시키는 헬퍼 함수
        const getMenuClass = (menuId) => {
            const activeClass = "flex items-center gap-3 md:gap-4 px-3 md:px-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl bg-rosegold-500 text-white font-bold text-sm md:text-base shadow-md shadow-rosegold-200 transition-transform hover:scale-[1.02]";
            const inactiveClass = "flex items-center gap-3 md:gap-4 px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl text-gray-600 hover:bg-gray-50 hover:text-rosegold-600 font-bold text-sm md:text-base transition relative";
            return active === menuId ? activeClass : inactiveClass;
        };

        this.innerHTML = `
            <aside id="admin-sidebar" class="fixed md:static inset-y-0 left-0 transform -translate-x-full md:translate-x-0 w-72 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-40">
                <div class="h-16 md:h-20 flex items-center justify-between px-6 md:px-8 border-b border-gray-100 bg-rosegold-50/50 shrink-0">
                    <div class="flex items-center">
                        <i data-lucide="heart-handshake" class="w-6 h-6 md:w-8 md:h-8 text-rosegold-500 mr-2 md:mr-3"></i>
                        <div>
                            <span class="text-lg md:text-xl font-extrabold text-rosegold-800 tracking-tight">부산이음</span>
                            <span class="block text-[10px] md:text-xs font-bold text-rosegold-600 mt-0.5">관리사무소 🌻</span>
                        </div>
                    </div>
                    <button id="btn-close-sidebar" class="md:hidden text-gray-400 hover:text-gray-600">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>

                <nav class="flex-1 overflow-y-auto py-4 md:py-6 hide-scrollbar">
                    <ul class="space-y-1 md:space-y-2 px-3 md:px-4">
                        <li>
                            <a href="index.html" class="${getMenuClass('index')}">
                                <i data-lucide="layout-dashboard" class="w-4 h-4 md:w-5 md:h-5"></i> 전체현황
                            </a>
                        </li>
                        <li class="pt-2 pb-1 px-3 md:px-4">
                            <span class="text-[10px] md:text-xs font-extrabold text-gray-400 tracking-wider">주요 업무</span>
                        </li>
                        <li>
                            <a href="members.html" class="${getMenuClass('members')}">
                                <i data-lucide="users" class="w-4 h-4 md:w-5 md:h-5"></i> 이웃(회원) 관리
                            </a>
                        </li>
                        <li>
                            <a href="clubs.html" class="${getMenuClass('clubs')}">
                                <i data-lucide="camera" class="w-4 h-4 md:w-5 md:h-5"></i> 동아리 관리
                            </a>
                        </li>
                        <li>
                            <a href="market.html" class="${getMenuClass('market')}">
                                <i data-lucide="store" class="w-4 h-4 md:w-5 md:h-5"></i> 동네 소식 관리
                                <span id="badge-pending-posts" class="hidden ml-auto bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">0건</span>
                            </a>
                        </li>
                        <li class="pt-3 md:pt-4 pb-1 px-3 md:px-4">
                            <span class="text-[10px] md:text-xs font-extrabold text-gray-400 tracking-wider">기타 업무</span>
                        </li>
                        <li>
                            <a href="reports.html" class="${getMenuClass('reports')}">
                                <i data-lucide="alert-circle" class="w-4 h-4 md:w-5 md:h-5"></i> 건의 / 신고함
                                <span id="badge-pending-reports" class="hidden ml-auto bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">0건</span>
                            </a>
                        </li>
                        <li>
                            <a href="banners.html" class="${getMenuClass('banners')}">
                                <i data-lucide="image" class="w-4 h-4 md:w-5 md:h-5"></i> 메인 화면 광고 관리
                            </a>
                        </li>
                    </ul>
                </nav>

                <div class="p-4 md:p-6 border-t border-gray-100 bg-gray-50 shrink-0">
                    <a href="settings.html" class="flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl bg-white border border-gray-200 text-gray-600 font-bold text-xs md:text-sm hover:bg-gray-100 transition shadow-sm">
                        <i data-lucide="settings" class="w-3.5 h-3.5 md:w-4 md:h-4"></i> 운영 환경 설정
                    </a>
                    <a href="../index.html" class="mt-2 md:mt-3 flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-gray-500 font-bold text-xs md:text-sm hover:text-rosegold-600 transition underline underline-offset-4">
                        홈페이지로 돌아가기
                    </a>
                </div>
            </aside>
            <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-30 hidden md:hidden backdrop-blur-sm transition-opacity opacity-0"></div>
        `;
    }
}

// 2. 공통 헤더 컴포넌트
class AdminHeader extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || '관리사무소';
        this.innerHTML = `
            <header class="h-16 md:h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shadow-sm z-10 shrink-0 w-full">
                <div class="flex items-center gap-3 md:gap-4">
                    <button id="btn-open-sidebar" class="md:hidden text-gray-600 hover:text-rosegold-600 transition">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                    <h1 class="text-xl md:text-2xl font-bold text-gray-800 truncate">${title}</h1>
                    <div class="hidden sm:flex px-2 md:px-3 py-1 bg-rosegold-50 rounded-full border border-rosegold-100 items-center gap-1.5 md:gap-2">
                        <span class="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rosegold-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-rosegold-500"></span>
                        </span>
                        <span class="text-rosegold-700 font-bold text-[10px] md:text-xs">시스템 정상 작동 중</span>
                    </div>
                </div>
                
                <div class="flex items-center gap-3 md:gap-6">
                    <button id="btn-login" onclick="openLoginModal()" class="hidden px-3 md:px-5 py-1.5 md:py-2.5 bg-rosegold-500 text-white rounded-lg md:rounded-xl font-bold text-xs md:text-sm shadow-md hover:bg-rosegold-600 transition">로그인</button>
                    <div id="user-profile" class="hidden flex items-center gap-2 md:gap-3 border-l border-gray-200 pl-3 md:pl-6 cursor-pointer" onclick="logoutAdmin()">
                        <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-rosegold-100 flex items-center justify-center text-rosegold-600 font-bold text-sm md:text-base">최</div>
                        <div class="hidden sm:block">
                            <p class="text-xs md:text-sm font-bold text-gray-800">최고관리자</p>
                            <p class="text-[10px] md:text-xs text-gray-500">운영팀 (로그아웃)</p>
                        </div>
                        <i data-lucide="log-out" class="w-4 h-4 md:w-4 md:h-4 text-gray-400 sm:hidden"></i>
                    </div>
                </div>
            </header>
        `;
    }
}

// 3. 공통 관리자 로그인 모달 컴포넌트
class AdminLoginModal extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="modal-login" class="fixed inset-0 bg-black/60 z-[120] hidden flex items-center justify-center p-4 backdrop-blur-md">
                <div class="bg-white w-full max-w-md rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative animate-[fadeIn_0.3s_ease-out]">
                    <button onclick="closeLoginModal()" class="absolute top-5 right-5 md:top-6 md:right-6 text-gray-400 hover:text-gray-600"><i data-lucide="x" class="w-5 h-5 md:w-6 md:h-6"></i></button>
                    <div class="text-center mb-6 md:mb-8 mt-2 md:mt-4">
                        <div class="w-14 h-14 md:w-16 md:h-16 bg-rosegold-50 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-rosegold-500">
                            <i data-lucide="heart-handshake" class="w-7 h-7 md:w-8 md:h-8"></i>
                        </div>
                        <h3 class="text-2xl md:text-3xl font-black text-gray-800 mb-1 md:mb-2">관리자 로그인</h3>
                        <p class="text-xs md:text-sm text-gray-500 font-medium">이웃 관리 권한을 획득하세요.</p>
                    </div>
                    <div class="space-y-3 md:space-y-4">
                        <input type="text" id="login-id" placeholder="관리자 ID (admin)" class="w-full p-3 md:p-4 bg-gray-50 border border-gray-100 rounded-lg md:rounded-xl focus:border-rosegold-400 outline-none text-base md:text-lg font-bold">
                        <input type="password" id="login-pw" placeholder="비밀번호 (000000)" class="w-full p-3 md:p-4 bg-gray-50 border border-gray-100 rounded-lg md:rounded-xl focus:border-rosegold-400 outline-none text-base md:text-lg">
                        <button onclick="loginAdmin()" class="w-full bg-rosegold-500 text-white font-black text-lg md:text-xl py-4 md:py-5 rounded-xl md:rounded-2xl shadow-lg transition hover:bg-rosegold-600">시스템 접속하기</button>
                    </div>
                </div>
            </div>
        `;
    }
}

// 브라우저에 커스텀 태그 등록
customElements.define('admin-sidebar', AdminSidebar);
customElements.define('admin-header', AdminHeader);
customElements.define('admin-login-modal', AdminLoginModal);

// 모바일 사이드바 토글 로직 공통화
window.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('admin-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const btnOpen = document.getElementById('btn-open-sidebar');
    const btnClose = document.getElementById('btn-close-sidebar');

    const toggleSidebar = () => {
        if(!sidebar || !overlay) return;
        const isClosed = sidebar.classList.contains('-translate-x-full');
        if (isClosed) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        } else {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('opacity-0');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        }
    };

    if(btnOpen) btnOpen.addEventListener('click', toggleSidebar);
    if(btnClose) btnClose.addEventListener('click', toggleSidebar);
    if(overlay) overlay.addEventListener('click', toggleSidebar);
    
    // 삽입된 HTML 요소들의 아이콘 활성화
    if(window.lucide) window.lucide.createIcons();
});