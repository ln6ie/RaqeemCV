class SiteHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header class="navbar">
                <div class="nav-container">
                    <div class="nav-brand">
                        <a href="index.html" style="display:flex; align-items:center; gap:12px; text-decoration:none;">
                            <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="nav-logo">
                                <circle cx="50" cy="50" r="46" stroke="#0A84FF" stroke-width="3" fill="none" opacity="0.15" />
                                <circle cx="50" cy="50" r="38" stroke="#0A84FF" stroke-width="2.5" fill="none" opacity="0.4" />
                                <circle cx="50" cy="50" r="28" stroke="#0A84FF" stroke-width="2.5" fill="none" />
                                <path d="M41,36 C41,36 53,29 58,39 C62,47 56,54 50,55 C58,58 61,67 61,67" stroke="#0A84FF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                                <path d="M43,34 L43,67" stroke="#0A84FF" stroke-width="3.5" stroke-linecap="round" fill="none" />
                            </svg>
                            <span class="brand-name">رقيم</span>
                        </a>
                    </div>

                    <nav class="nav-links desktop-only">
                        <a href="index.html">الرئيسية</a>
                        <a href="choices.html">الخيارات</a>
                        <a href="suitability.html">الملائمة</a>
                        <a href="support.html">الدعم الفني</a>
                        <a href="privacy.html">الخصوصية</a>
                    </nav>

                    <div class="nav-cta desktop-only">
                        <a href="#" class="btn btn-primary">ابدأ مجاناً</a>
                    </div>

                    <!-- Hamburger Menu Icon for Mobile -->
                    <div class="hamburger-menu mobile-only" id="mobile-menu-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </header>

            <!-- Mobile Dropdown Menu -->
            <div class="mobile-nav-dropdown" id="mobile-dropdown">
                <a href="index.html">الرئيسية</a>
                <a href="choices.html">الخيارات</a>
                <a href="suitability.html">الملائمة</a>
                <a href="support.html">الدعم الفني</a>
                <a href="privacy.html">الخصوصية</a>
                <a href="#" class="btn btn-primary mobile-cta" style="margin-top:12px; text-align:center;">ابدأ مجاناً</a>
            </div>
        `;

        // Interactive Mobile Menu Script
        const mobileMenuBtn = this.querySelector('#mobile-menu-btn');
        const mobileDropdown = this.querySelector('#mobile-dropdown');

        if (mobileMenuBtn && mobileDropdown) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                mobileDropdown.classList.toggle('open');
            });
        }
    }
}

class SiteFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-brand">
                        <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="footer-logo">
                            <circle cx="50" cy="50" r="46" stroke="#0A84FF" stroke-width="3" fill="none" opacity="0.15" />
                            <circle cx="50" cy="50" r="38" stroke="#0A84FF" stroke-width="2.5" fill="none" opacity="0.4" />
                            <circle cx="50" cy="50" r="28" stroke="#0A84FF" stroke-width="2.5" fill="none" />
                            <path d="M41,36 C41,36 53,29 58,39 C62,47 56,54 50,55 C58,58 61,67 61,67" stroke="#0A84FF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                            <path d="M43,34 L43,67" stroke="#0A84FF" stroke-width="3.5" stroke-linecap="round" fill="none" />
                        </svg>
                        <div class="brand-name-footer">رقيم</div>
                        <p class="mission-statement">تمكين المحترفين بأدوات بناء مسار مهني استثنائي بخصوصية وأناقة.</p>
                    </div>

                    <div class="footer-links-group">
                        <h4>الروابط المهمة</h4>
                        <a href="index.html">الرئيسية</a>
                        <a href="support.html">الدعم الفني</a>
                    </div>

                    <div class="footer-links-group">
                        <h4>القانونية والخصوصية</h4>
                        <a href="privacy.html">سياسة الخصوصية</a>
                        <a href="choices.html">خيارات الخصوصية</a>
                        <a href="suitability.html">الملائمة العمرية</a>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>© 2026 رقيم - Raqeem CV. جميع الحقوق محفوظة.</p>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
