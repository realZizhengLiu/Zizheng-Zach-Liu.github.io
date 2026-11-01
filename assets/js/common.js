(() => {
  document.documentElement.classList.add('js');
  const toggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('.main-navigation');
  if (toggle && navigation) {
    const close = () => { toggle.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      navigation.classList.toggle('is-open', open);
    });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
    document.addEventListener('click', event => { if (!event.target.closest('.header-inner')) close(); });
    navigation.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  }
  const controls = document.querySelector('[data-research-controls]');
  const list = document.querySelector('[data-research-list]');
  if (!controls || !list) return;
  controls.hidden = false;
  const buttons = [...controls.querySelectorAll('[data-filter]')];
  const papers = [...list.querySelectorAll('.paper')];
  const groups = [...list.querySelectorAll('.paper-group')];
  function filter(area, updateUrl) {
    if (!buttons.some(button => button.dataset.filter === area)) area = 'all';
    buttons.forEach(button => {
      const active = button.dataset.filter === area;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    papers.forEach(paper => { paper.hidden = area !== 'all' && paper.dataset.area !== area; });
    groups.forEach(group => { group.hidden = ![...group.querySelectorAll('.paper')].some(paper => !paper.hidden); });
    const count = papers.filter(paper => !paper.hidden).length;
    controls.querySelector('[data-result-count]').textContent = `${count} ${count === 1 ? 'paper' : 'papers'}`;
    if (updateUrl) {
      const url = new URL(location.href);
      if (area === 'all') url.searchParams.delete('area'); else url.searchParams.set('area', area);
      history.replaceState(null, '', url);
    }
  }
  buttons.forEach(button => button.addEventListener('click', () => filter(button.dataset.filter, true)));
  filter(new URLSearchParams(location.search).get('area') || 'all', false);
})();
