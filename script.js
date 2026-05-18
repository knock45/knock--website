// 页面加载完成后执行所有脚本
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing scripts...');

    // 移动端菜单切换
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // 作品集卡片点击展开/收起
    document.querySelectorAll('.portfolio-card').forEach(function(card) {
        card.addEventListener('click', function() {
            const details = this.querySelector('.card-details');
            if (details) {
                details.style.display = details.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // 将作品集中的数字加粗
    function boldNumbersInPortfolio() {
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        portfolioCards.forEach(function(card) {
            const paragraphs = card.querySelectorAll('p');
            paragraphs.forEach(function(p) {
                const text = p.innerHTML;
                const boldText = text.replace(/(\d+(?:\.\d+)?)/g, '<strong>$1</strong>');
                p.innerHTML = boldText;
            });
        });
    }
    boldNumbersInPortfolio();

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80;
                const top = targetElement.offsetTop - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });

                if (navLinks) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // 作品汇总图片点击跳转功能
    const summaryItems = document.querySelectorAll('.summary-item');
    console.log('Found ' + summaryItems.length + ' summary items');
    
    summaryItems.forEach(function(item, index) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function(e) {
            console.log('Summary item clicked:', index);
            
            const category = this.getAttribute('data-category');
            const idx = this.getAttribute('data-index');
            
            console.log('Category:', category, 'Index:', idx);
            
            let targetCaseId = '';
            
            if (category === 'xhs1') {
                targetCaseId = 'xhs1-case-' + idx;
            } else if (category === 'xhs2') {
                targetCaseId = 'xhs2-case-' + idx;
            } else if (category === 'gzh') {
                targetCaseId = 'gzh-case-' + idx;
            } else if (category === 'collage') {
                targetCaseId = 'collage-case-' + idx;
            }
            
            console.log('Target case ID:', targetCaseId);
            
            if (targetCaseId) {
                const portfolioSection = document.querySelector('.portfolio-categories');
                console.log('Portfolio section found:', portfolioSection ? 'yes' : 'no');
                
                if (portfolioSection) {
                    const offset = 80;
                    const top = portfolioSection.offsetTop - offset;
                    console.log('Scrolling to:', top);
                    
                    window.scrollTo({
                        top: top,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(function() {
                        document.querySelectorAll('.case-slide').forEach(function(slide) {
                            slide.classList.remove('active');
                        });
                        
                        const targetSlide = document.getElementById(targetCaseId);
                        console.log('Target slide found:', targetSlide ? 'yes' : 'no');
                        
                        if (targetSlide) {
                            targetSlide.classList.add('active');
                            console.log('Activated target slide');
                        }
                    }, 500);
                }
            }
        });
    });

    // 创建返回作品汇总按钮
    if (!document.querySelector('.back-to-summary')) {
        const btn = document.createElement('button');
        btn.className = 'back-to-summary';
        btn.textContent = '← 返回作品汇总';
        btn.style.cssText = 'position:fixed;bottom:30px;right:30px;padding:10px 20px;background:#FFB6C1;color:white;border:none;border-radius:20px;font-size:14px;cursor:pointer;z-index:999;box-shadow:0 2px 10px rgba(0,0,0,0.1);display:none;';
        document.body.appendChild(btn);

        btn.addEventListener('click', function() {
            const summarySection = document.querySelector('.portfolio-summary');
            if (summarySection) {
                const offset = 80;
                const top = summarySection.offsetTop - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });

        window.addEventListener('scroll', function() {
            const summarySection = document.querySelector('.portfolio-summary');
            const portfolioSection = document.querySelector('.portfolio-categories');

            if (summarySection && portfolioSection) {
                const scrollY = window.scrollY;

                if (scrollY >= portfolioSection.offsetTop - 200) {
                    btn.style.display = 'block';
                } else {
                    btn.style.display = 'none';
                }
            }
        });
    }
});