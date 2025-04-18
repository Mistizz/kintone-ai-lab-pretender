(function () {
  'use strict';

  if (location.pathname !== '/k/') return;

  const menuItemId = 'MenuLinkItem-pretend-ai-manager';

  const waitForMenu = () => {
    const menuSelector = 'ul[role="menu"]';
    const systemAdminSelector = 'a[href="/k/admin/system/"]';

    const interval = setInterval(() => {
      const menuList = document.querySelector(menuSelector);
      const systemAdminItem = document.querySelector(systemAdminSelector);

      if (menuList && systemAdminItem) {
        if (!document.getElementById(menuItemId)) {
          // <li> 要素を作成：区切り線 + AI管理リンク
          const separator = document.createElement('li');
          separator.setAttribute('role', 'none');
          separator.innerHTML = `
            <div role="separator" class="sc-gUnrjs dBSOMQ__separator" 
              data-testid="shared-GlobalNavigationBar-SettingMenuIconButton-SettingMenuPopup-slashManagementSeparator">
            </div>
          `;

          const newItem = document.createElement('li');
          newItem.setAttribute('role', 'none');
          newItem.setAttribute('data-testid', 'shared-MenuPopup-MenuItem');
          newItem.innerHTML = `
            <a href="#" class="sc-fRXopL yriro" role="menuitem" tabindex="-1" id="${menuItemId}">
              kintone AI管理
            </a>
          `;

          const systemAdminLi = systemAdminItem.closest('li');
          if (systemAdminLi && systemAdminLi.parentNode) {
            // 「kintoneシステム管理」の次に separator → AI管理 を挿入
            const parent = systemAdminLi.parentNode;
            parent.insertBefore(separator, systemAdminLi.nextSibling);
            parent.insertBefore(newItem, separator.nextSibling);
          }

          // クリックイベント（遷移抑止）
          newItem.querySelector('a')?.addEventListener('click', (e) => {
            e.preventDefault();
            alert('🤖 これは幻の「kintone AI管理」です（未来を先取り中）');
          });
        }
        clearInterval(interval);
      }
    }, 500);
  };

  document.addEventListener('click', (e) => {
    const settingsButton = e.target.closest('[data-testid="shared-GlobalNavigationBar-SettingMenuIconButton-button"]');
    if (settingsButton) {
      setTimeout(waitForMenu, 300);
    }
  });
})();
