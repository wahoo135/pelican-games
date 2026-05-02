/**
 * 鹈鹕游戏桌游工作室 - 官网交互脚本
 * 功能：导航、滚动动画、响应式菜单
 */

(function() {
    'use strict';

    // DOM Elements
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const fadeElements = document.querySelectorAll('.fade-in');

    // State
    let lastScrollY = 0;
    let ticking = false;

    /**
     * 导航滚动效果
     */
    function handleNavScroll() {
        const currentScrollY = window.scrollY;
        
        // 添加/移除滚动状态
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }

    /**
     * 更新当前活动导航链接
     */
    function updateActiveNav() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - viewportHeight * 0.4;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /**
     * 滚动动画 - Intersection Observer
     */
    function setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // 动画触发后停止观察
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * 移动端菜单切换
     */
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    /**
     * 关闭移动端菜单
     */
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * 平滑滚动到锚点
     */
    function smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    /**
     * 滚动事件处理（带节流）
     */
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleNavScroll();
                updateActiveNav();
            });
            ticking = true;
        }
    }

    /**
     * 初始化
     */
    function init() {
        // 绑定滚动事件
        window.addEventListener('scroll', onScroll, { passive: true });

        // 移动端菜单
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileMenu);
        }

        // 导航链接点击
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                smoothScrollTo(href);
                closeMobileMenu();
            });
        });

        // ESC 关闭移动端菜单
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });

        // 点击菜单外区域关闭
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // 设置滚动动画
        setupScrollAnimations();

        // 初始状态检查
        handleNavScroll();
        updateActiveNav();

        // 立即显示首屏元素
        setTimeout(() => {
            fadeElements.forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    if (index < 5) {
                        el.classList.add('visible');
                    }
                }
            });
        }, 100);
    }

    // DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 页面可见性变化时重新检查
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            handleNavScroll();
            updateActiveNav();
        }
    });

})();
