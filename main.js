// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS动画库
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // 初始化粒子效果
    initParticles();
    
    // 初始化滚动事件
    initScrollEvents();
    
    // 初始化移动菜单
    initMobileMenu();
    
    // 初始化数字计数器
    initCounters();
    
    // 初始化表单提交
    initContactForm();
});

// 粒子背景初始化
function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#1a73e8"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.2,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#7c4dff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

// 滚动事件处理
function initScrollEvents() {
    const header = document.querySelector('header');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        // 导航栏样式变化
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (scrollIndicator) {
                scrollIndicator.style.opacity = "0";
            }
        } else {
            header.classList.remove('scrolled');
            if (scrollIndicator) {
                scrollIndicator.style.opacity = "0.7";
            }
        }
        
        // 检查是否需要开始动画计数器
        startCountersOnScroll();
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 如果是移动菜单，点击后收起菜单
            if (window.innerWidth < 768) {
                document.querySelector('nav').classList.remove('active');
                document.querySelector('.menu-toggle').classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 移动菜单
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// 数字计数器动画
function initCounters() {
    window.counterElements = document.querySelectorAll('.counter');
    window.counterStarted = false;
}

// 当滚动到计数器位置时开始动画
function startCountersOnScroll() {
    if (window.counterStarted) return;
    
    const stats = document.querySelector('.about-stats');
    if (!stats) return;
    
    const statsPosition = stats.getBoundingClientRect().top;
    const screenPosition = window.innerHeight * 0.8;
    
    if (statsPosition < screenPosition) {
        window.counterStarted = true;
        
        window.counterElements.forEach(counter => {
            const target = parseInt(counter.textContent);
            let count = 0;
            const duration = 2000; // 2秒内完成动画
            const frameDuration = 1000 / 60; // 60fps
            const totalFrames = duration / frameDuration;
            const increment = target / totalFrames;
            
            const timer = setInterval(() => {
                count += increment;
                counter.textContent = Math.floor(count);
                
                if (count >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, frameDuration);
        });
    }
}

// 联系表单提交
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // 这里可以添加数据验证
            if (!name || !email || !subject || !message) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 正常情况下这里会发送数据到服务器
            // 但由于这是演示，我们只显示一个成功消息
            alert('感谢您的留言！我们将尽快回复您。');
            contactForm.reset();
        });
    }
}

// 图表动画效果
// 可以在这里添加更复杂的图表动画，比如使用Canvas绘制股票图表等 