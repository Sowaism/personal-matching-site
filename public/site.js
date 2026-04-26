(function () {
  'use strict';

  function highlightCurrentNav() {
    var current = (location.pathname.split('/').pop() || 'tida_personal_top.html').toLowerCase();
    document.querySelectorAll('nav .nav-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var file = href.split('?')[0].split('#')[0].split('/').pop().toLowerCase();
      if (file && file === current) link.classList.add('active');
    });
  }

  function interceptPendingLinks() {
    document.body.addEventListener('click', function (e) {
      var target = e.target.closest('[data-pending]');
      if (!target) return;
      e.preventDefault();
      showPendingToast(target.textContent.trim() || 'この機能');
    });
  }

  var toastEl;
  function showPendingToast(label) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'site-toast';
      toastEl.style.cssText = [
        'position:fixed', 'left:50%', 'bottom:24px',
        'transform:translateX(-50%) translateY(20px)',
        'background:#1a1a2e', 'color:#fff', 'padding:14px 22px',
        'border-radius:10px', 'font-size:14px', 'font-weight:600',
        'box-shadow:0 10px 30px rgba(0,0,0,0.25)',
        'z-index:9999', 'opacity:0',
        'transition:opacity .25s ease, transform .25s ease',
        'max-width:90%', 'text-align:center', 'pointer-events:none'
      ].join(';');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = '「' + label + '」は現在準備中です';
    requestAnimationFrame(function () {
      toastEl.style.opacity = '1';
      toastEl.style.transform = 'translateX(-50%) translateY(0)';
    });
    clearTimeout(showPendingToast._t);
    showPendingToast._t = setTimeout(function () {
      toastEl.style.opacity = '0';
      toastEl.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    highlightCurrentNav();
    interceptPendingLinks();
  }
})();
