// Force Favicon Update Script
// Этот скрипт принудительно обновляет favicon сайта

(function() {
    'use strict';
    
    console.log('🚀 SkillSpark: Принудительное обновление favicon...');
    
    // Функция для обновления favicon
    function updateFavicon() {
        const timestamp = Date.now();
        const newFaviconUrl = `/favicon-new.svg?v=${timestamp}`;
        
        // Находим все ссылки на favicon
        const faviconLinks = document.querySelectorAll('link[rel*="icon"]');
        
        faviconLinks.forEach(link => {
            if (link.href.includes('favicon')) {
                const oldHref = link.href;
                link.href = newFaviconUrl;
                console.log(`✅ Обновлен favicon: ${oldHref} → ${link.href}`);
            }
        });
        
        // Также обновляем в head если есть
        const head = document.head;
        const existingFavicon = head.querySelector('link[rel="icon"]');
        
        if (existingFavicon) {
            existingFavicon.href = newFaviconUrl;
        } else {
            // Создаем новый если не существует
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            newLink.type = 'image/svg+xml';
            newLink.href = newFaviconUrl;
            head.appendChild(newLink);
            console.log('✅ Создан новый favicon link');
        }
        
        // Принудительно обновляем страницу через 1 секунду
        setTimeout(() => {
            console.log('🔄 Принудительное обновление страницы...');
            window.location.reload(true);
        }, 1000);
    }
    
    // Функция для очистки кэша
    function clearCache() {
        if ('caches' in window) {
            caches.keys().then(function(names) {
                for (let name of names) {
                    caches.delete(name);
                    console.log(`🗑️ Удален кэш: ${name}`);
                }
            });
        }
        
        // Очищаем localStorage и sessionStorage
        localStorage.clear();
        sessionStorage.clear();
        console.log('🗑️ Очищены localStorage и sessionStorage');
    }
    
    // Автоматическое обновление каждые 3 секунды
    let updateCounter = 0;
    const maxUpdates = 5;
    
    const autoUpdate = setInterval(() => {
        updateCounter++;
        console.log(`🔄 Автоматическое обновление favicon #${updateCounter}`);
        
        if (updateCounter >= maxUpdates) {
            clearInterval(autoUpdate);
            console.log('⏹️ Автоматическое обновление остановлено');
        }
        
        updateFavicon();
    }, 3000);
    
    // Добавляем кнопки на страницу
    function addUpdateButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: linear-gradient(45deg, #ef4444, #f59e0b);
            padding: 15px;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            font-family: Arial, sans-serif;
            color: white;
            font-weight: bold;
        `;
        
        buttonContainer.innerHTML = `
            <div style="margin-bottom: 10px;">🚀 Обновить Favicon</div>
            <button onclick="window.updateFavicon()" style="
                background: white;
                color: #ef4444;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                margin: 5px;
                cursor: pointer;
                font-weight: bold;
            ">Обновить</button>
            <button onclick="window.clearCache()" style="
                background: white;
                color: #ef4444;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                margin: 5px;
                cursor: pointer;
                font-weight: bold;
            ">Очистить кэш</button>
        `;
        
        document.body.appendChild(buttonContainer);
        console.log('✅ Добавлены кнопки обновления favicon');
    }
    
    // Делаем функции глобальными
    window.updateFavicon = updateFavicon;
    window.clearCache = clearCache;
    
    // Добавляем кнопки когда страница загружена
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addUpdateButtons);
    } else {
        addUpdateButtons();
    }
    
    // Первое обновление через 2 секунды
    setTimeout(updateFavicon, 2000);
    
    console.log('✅ Скрипт обновления favicon загружен!');
})();











