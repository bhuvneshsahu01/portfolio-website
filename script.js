document.addEventListener('DOMContentLoaded', function () {
    // 1. Theme Toggle (Default: Dark Engineering Theme)
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // 2. Mobile Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navLinksContainer) {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });
    });

    // 3. Card-Scoped Proof Tab Switcher
    function initProofTabs() {
        const tabButtons = document.querySelectorAll('.proof-tabs .tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.project-card');
                if (!card) return;

                const targetId = button.getAttribute('data-tab');
                const buttonsInCard = card.querySelectorAll('.proof-tabs .tab-btn');
                const panelsInCard = card.querySelectorAll('.proof-tabs .tab-panel');

                buttonsInCard.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });

                panelsInCard.forEach(panel => {
                    panel.classList.remove('active');
                });

                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');
                const targetPanel = card.querySelector(`#${targetId}`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    // 4. One-Click Clipboard Copy Buttons
    function initCopyButtons() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        copyButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const textToCopy = button.getAttribute('data-copy');
                if (!textToCopy) return;

                const labelEl = button.querySelector('.copy-label') || button;
                const originalText = labelEl.textContent;

                try {
                    await navigator.clipboard.writeText(textToCopy);
                } catch (err) {
                    const tempInput = document.createElement('input');
                    tempInput.value = textToCopy;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                }

                labelEl.textContent = 'Copied!';
                setTimeout(() => {
                    labelEl.textContent = originalText;
                }, 1800);
            });
        });
    }

    // 5. Scroll-Spy Active Navigation Highlighting
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        function updateActiveNav() {
            const scrollPos = window.scrollY + 140;
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav, { passive: true });
        updateActiveNav();
    }

    initProofTabs();
    initCopyButtons();
    initScrollSpy();
});
