(function () {
  var ICONS = {
    'recognition': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    'first-contact': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12 19.79 19.79 0 0 1 1.58 3.5 2 2 0 0 1 3.56 1.33h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16z"/></svg>',
    'triage': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    'recommendation': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="m9 12 2 2 4-4"/></svg>',
    'handoff': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
    'resolution': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
  };

  var track = document.getElementById('journey-track');
  var accordion = document.getElementById('journey-accordion');
  var detailPanel = document.getElementById('journey-detail');
  var activeStageId = null;

  function renderDesktopTrack() {
    APEX.journey.forEach(function (stage) {
      var col = document.createElement('div');
      col.className = 'journey-stage';
      col.dataset.id = stage.id;
      col.setAttribute('role', 'listitem');
      col.innerHTML = renderStageBands(stage);
      col.addEventListener('click', function () { selectStage(stage.id); });
      track.appendChild(col);
    });
  }

  function renderStageBands(stage) {
    var topRisks = stage.risks.slice(0, 2);
    var extraRisks = stage.risks.length - 2;
    var riskItems = topRisks.map(function (r) { return '<li>' + r + '</li>'; }).join('');
    var moreIndicator = extraRisks > 0 ? '<div class="risk-more">+' + extraRisks + ' more</div>' : '';
    var chips = stage.conditions.map(function (c) {
      return '<span class="condition-chip condition-chip--' + c.status + '">' + c.name + '</span>';
    }).join('');

    return '<div class="stage-band--header">' +
        '<div class="stage-icon">' + (ICONS[stage.id] || '') + '</div>' +
        '<div class="stage-number">' + stage.number + '</div>' +
        '<div class="stage-name">' + stage.name + '</div>' +
        '<div class="patient-voice">' + stage.voice + '</div>' +
      '</div>' +
      '<div class="stage-band--tension">' +
        '<div class="label">Patient tension</div>' +
        '<div class="tension-bar-track">' +
          '<div class="tension-bar-fill tension-bar-fill--' + stage.tension.level + '" style="width:' + stage.tension.width + '%"></div>' +
        '</div>' +
        '<div class="tension-description">' + stage.tension.label + '</div>' +
      '</div>' +
      '<div class="stage-band--conditions">' +
        '<div class="label">APEX conditions</div>' +
        '<div class="condition-chips">' + chips + '</div>' +
      '</div>' +
      '<div class="stage-band--risks">' +
        '<div class="label">Key risks</div>' +
        '<ul class="risk-list">' + riskItems + '</ul>' +
        moreIndicator +
      '</div>';
  }

  function renderMobileAccordion() {
    APEX.journey.forEach(function (stage) {
      var item = document.createElement('div');
      item.className = 'accordion-stage';
      item.dataset.id = stage.id;
      item.setAttribute('role', 'listitem');

      var trigger = document.createElement('button');
      trigger.className = 'accordion-trigger';
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML =
        '<span class="accordion-trigger__left">' +
          '<span class="accordion-tension-dot accordion-tension-dot--' + stage.tension.level + '"></span>' +
          '<span class="accordion-trigger__name">' + stage.name + '</span>' +
        '</span>' +
        '<span class="accordion-chevron">&#9650;</span>';

      var body = document.createElement('div');
      body.className = 'accordion-body';
      body.innerHTML = renderStageBands(stage);

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.accordion-stage').forEach(function (s) {
          s.classList.remove('open');
          s.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
          selectStage(stage.id);
        } else {
          clearSelection();
        }
      });

      item.appendChild(trigger);
      item.appendChild(body);
      accordion.appendChild(item);
    });
  }

  function selectStage(id) {
    if (activeStageId === id) {
      clearSelection();
      return;
    }
    activeStageId = id;
    document.querySelectorAll('.journey-stage').forEach(function (s) {
      s.classList.toggle('active', s.dataset.id === id);
    });
    var stage = APEX.journey.find(function (s) { return s.id === id; });
    renderDetailPanel(stage);
    detailPanel.classList.add('visible');
    detailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function clearSelection() {
    activeStageId = null;
    document.querySelectorAll('.journey-stage').forEach(function (s) {
      s.classList.remove('active');
    });
    detailPanel.classList.remove('visible');
  }

  function renderDetailPanel(stage) {
    var conditionNotes = stage.conditions.map(function (c) {
      return '<li>' +
        '<span class="condition-dot condition-dot--' + c.status + '"></span>' +
        '<span>' +
          '<span class="condition-note-list__name">' + c.name + '</span>' +
          '<span class="condition-note-list__note">' + c.note + '</span>' +
        '</span>' +
      '</li>';
    }).join('');

    var failItems = stage.risks.map(function (f) {
      return '<li>' + f + '</li>';
    }).join('');

    detailPanel.innerHTML =
      '<div class="journey-detail__header">' +
        '<div class="journey-detail__header-left">' +
          '<span class="stage-tag">Stage ' + stage.number + '</span>' +
          '<div class="journey-detail__name">' + stage.name + '</div>' +
          '<div class="journey-detail__quote">' + stage.voice + '</div>' +
        '</div>' +
        '<button class="journey-detail__close" id="detail-close">Close</button>' +
      '</div>' +
      '<div class="journey-detail__body">' +
        '<div>' +
          '<div class="detail-col__label">What is happening</div>' +
          '<p class="detail-col__text">' + stage.what + '</p>' +
        '</div>' +
        '<div>' +
          '<div class="detail-col__label">Conditions in play</div>' +
          '<ul class="condition-note-list">' + conditionNotes + '</ul>' +
        '</div>' +
        '<div>' +
          '<div class="detail-col__label">Where it can fail</div>' +
          '<ul class="fail-list">' + failItems + '</ul>' +
        '</div>' +
      '</div>' +
      '<button class="btn-explore" id="detail-explore">Explore further &rarr;</button>';

    document.getElementById('detail-close').addEventListener('click', clearSelection);
    document.getElementById('detail-explore').addEventListener('click', function () {
      console.log('[APEX] Stage ' + stage.number + ' — ' + stage.name);
      console.log('[APEX] ' + stage.explorePrompt);
    });
  }

  renderDesktopTrack();
  renderMobileAccordion();
})();
