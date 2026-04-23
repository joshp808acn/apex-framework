(function () {
  var ICONS = {
    'clarity': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    'relevance': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    'timeliness': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    'continuity': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    'trust': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    'effort': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>',
    'clinician-confidence': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>'
  };

  var grid = document.getElementById('principle-grid');
  var detailPanel = document.getElementById('detail-panel');
  var hint = document.getElementById('principle-hint');
  var activePrincipleId = null;

  function renderGrid() {
    APEX.principles.forEach(function (p) {
      var card = document.createElement('div');
      card.className = 'principle-card';
      card.dataset.id = p.id;
      card.setAttribute('role', 'listitem');
      card.innerHTML =
        '<div class="principle-card__icon">' + (ICONS[p.id] || '') + '</div>' +
        '<div class="principle-card__number">' + p.number + '</div>' +
        '<div class="principle-card__name">' + p.name + '</div>';
      card.addEventListener('click', function () { selectPrinciple(p.id); });
      grid.appendChild(card);
    });
  }

  function selectPrinciple(id) {
    if (activePrincipleId === id) {
      clearSelection();
      return;
    }
    activePrincipleId = id;
    document.querySelectorAll('.principle-card').forEach(function (c) {
      c.classList.toggle('active', c.dataset.id === id);
    });
    var principle = APEX.principles.find(function (p) { return p.id === id; });
    renderDetailPanel(principle);
    detailPanel.classList.add('visible');
    if (hint) hint.style.display = 'none';
  }

  function clearSelection() {
    activePrincipleId = null;
    document.querySelectorAll('.principle-card').forEach(function (c) {
      c.classList.remove('active');
    });
    detailPanel.classList.remove('visible');
    if (hint) hint.style.display = '';
  }

  function renderDetailPanel(principle) {
    detailPanel.innerHTML =
      '<div class="detail-panel__header">' +
        '<div class="detail-panel__number">' + principle.number + '</div>' +
        '<div class="detail-panel__name">' + principle.name + '</div>' +
        '<p class="detail-panel__definition">' + principle.definition + '</p>' +
      '</div>' +
      '<div class="tabs" role="tablist">' +
        '<button class="tab-btn active" data-tab="overview" role="tab" aria-selected="true">Overview</button>' +
        '<button class="tab-btn" data-tab="failure" role="tab" aria-selected="false">Failure modes</button>' +
        '<button class="tab-btn" data-tab="vendor" role="tab" aria-selected="false">Vendor assessment</button>' +
      '</div>' +
      '<div id="tab-overview" class="tab-panel active">' + renderOverviewTab(principle) + '</div>' +
      '<div id="tab-failure" class="tab-panel">' + renderFailureTab(principle) + '</div>' +
      '<div id="tab-vendor" class="tab-panel">' + renderVendorTab(principle) + '</div>';

    detailPanel.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        detailPanel.querySelectorAll('.tab-btn').forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        detailPanel.querySelectorAll('.tab-panel').forEach(function (p) {
          p.classList.remove('active');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
      });
    });

    detailPanel.querySelectorAll('.btn-explore').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var prompt = btn.dataset.tab === 'failure'
          ? principle.failurePrompt
          : principle.explorePrompt;
        console.log('[APEX] ' + principle.number + ' ' + principle.name + ' — ' + btn.dataset.tab);
        console.log('[APEX] ' + prompt);
      });
    });
  }

  function renderOverviewTab(p) {
    var moments = p.overview.moments.map(function (m) {
      return '<div class="moment-card">' +
        '<div class="moment-card__context">' + m.context + '</div>' +
        '<p class="moment-card__text">' + m.text + '</p>' +
      '</div>';
    }).join('');

    return '<div class="overview-grid">' +
      '<div>' +
        '<div class="overview-label">In practice</div>' +
        '<div class="moment-list">' + moments + '</div>' +
      '</div>' +
      '<div>' +
        '<div class="overview-label">Why it matters</div>' +
        '<p class="system-impact">' + p.overview.impact + '</p>' +
        '<div class="danger-block">' +
          '<div class="danger-block__label">If this fails</div>' +
          '<div class="danger-block__text">' + p.overview.ifFails + '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<button class="btn-explore" data-tab="overview">Explore further &rarr;</button>';
  }

  function renderFailureTab(p) {
    var cards = p.failures.map(function (f) {
      return '<div class="failure-mode-card">' +
        '<div class="failure-mode-header">' +
          '<span class="failure-mode-name">' + f.name + '</span>' +
          '<span class="context-pill">' + f.context + '</span>' +
        '</div>' +
        '<div class="failure-mode-body">' +
          '<div>' +
            '<div class="failure-mode-col-label">What breaks down</div>' +
            '<p class="failure-mode-breakdown">' + f.breakdown + '</p>' +
          '</div>' +
          '<div>' +
            '<div class="failure-mode-col-label">Consequence</div>' +
            '<p class="failure-mode-consequence">' + f.consequence + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="failure-mode-source">' + f.source + '</div>' +
      '</div>';
    }).join('');
    return cards + '<button class="btn-explore" data-tab="failure">Explore further &rarr;</button>';
  }

  function renderVendorTab(p) {
    var cards = p.vendor.map(function (v) {
      return '<div class="vendor-card">' +
        '<div class="vendor-card__header">' +
          '<span class="category-tag category-tag--' + v.tag + '">' + v.label + '</span>' +
        '</div>' +
        '<p class="vendor-card__question">' + v.question + '</p>' +
        '<p class="vendor-card__intent">' + v.intent + '</p>' +
      '</div>';
    }).join('');
    return cards + '<button class="btn-explore" data-tab="vendor">Explore further &rarr;</button>';
  }

  renderGrid();
})();
