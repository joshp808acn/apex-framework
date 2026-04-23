(function () {
  var matrixEl = document.getElementById('acct-matrix');
  var detailEl = document.getElementById('acct-detail');
  var activeRoleId = null;

  document.getElementById('accountability-intro').textContent = APEX.accountability.intro;

  // Build ownership lookup: owns[conditionId][roleId] = true
  var owns = {};
  APEX.principles.forEach(function (p) { owns[p.id] = {}; });
  APEX.accountability.roles.forEach(function (role) {
    role.conditions.forEach(function (condId) {
      if (owns[condId]) owns[condId][role.id] = true;
    });
  });

  function ownerCount(condId) {
    return Object.keys(owns[condId] || {}).length;
  }

  function buildMatrix() {
    var roleCount = APEX.accountability.roles.length;
    matrixEl.style.gridTemplateColumns = '200px repeat(' + roleCount + ', 1fr)';

    // Header row
    var corner = document.createElement('div');
    corner.className = 'acct-corner';
    corner.innerHTML = '<span class="acct-corner__label">APEX condition</span>';
    matrixEl.appendChild(corner);

    APEX.accountability.roles.forEach(function (role) {
      var header = document.createElement('button');
      header.className = 'acct-col-header';
      header.dataset.roleId = role.id;
      header.innerHTML =
        '<span class="acct-col-header__abbr">' + role.abbr + '</span>' +
        '<span class="acct-col-header__count">' + role.conditions.length + ' conditions</span>';
      header.addEventListener('click', function () { selectRole(role.id); });
      matrixEl.appendChild(header);
    });

    // Condition rows
    APEX.principles.forEach(function (p) {
      var isSingle = ownerCount(p.id) === 1;

      var label = document.createElement('div');
      label.className = 'acct-row-label' + (isSingle ? ' acct-row-label--single' : '');
      label.innerHTML =
        '<span class="acct-row-number">' + p.number + '</span>' +
        '<span class="acct-row-name">' + p.name + '</span>' +
        (isSingle ? '<span class="acct-single-tag">Single owner</span>' : '');
      matrixEl.appendChild(label);

      APEX.accountability.roles.forEach(function (role) {
        var filled = !!owns[p.id][role.id];
        var cell = document.createElement('div');
        cell.className = 'acct-cell' + (filled ? ' acct-cell--filled' : '');
        cell.dataset.roleId = role.id;
        if (filled) cell.innerHTML = '<span class="acct-dot"></span>';
        matrixEl.appendChild(cell);
      });
    });
  }

  function selectRole(id) {
    document.querySelectorAll('.acct-col-header.active, .acct-cell.col-active').forEach(function (el) {
      el.classList.remove('active', 'col-active');
    });

    if (activeRoleId === id) {
      activeRoleId = null;
      detailEl.classList.remove('visible');
      return;
    }

    activeRoleId = id;

    document.querySelectorAll('[data-role-id="' + id + '"]').forEach(function (el) {
      el.classList.add(el.tagName === 'BUTTON' ? 'active' : 'col-active');
    });

    var role = APEX.accountability.roles.find(function (r) { return r.id === id; });
    renderDetail(role);
    detailEl.classList.add('visible');
  }

  function renderDetail(role) {
    var chips = role.conditions.map(function (condId) {
      var p = APEX.principles.find(function (x) { return x.id === condId; });
      return '<a href="framework.html#' + condId + '" class="condition-chip-link">' + (p ? p.name : condId) + '</a>';
    }).join('');

    detailEl.innerHTML =
      '<div class="acct-detail__inner">' +
        '<div class="acct-detail__left">' +
          '<div class="acct-detail__top">' +
            '<h2 class="acct-detail__title">' + role.title + '</h2>' +
            '<button class="acct-detail__close" id="acct-close">Close</button>' +
          '</div>' +
          '<p class="acct-detail__desc">' + role.description + '</p>' +
          '<div class="acct-owns__label">Primary accountability</div>' +
          '<div class="acct-owns__value">' + role.owns + '</div>' +
          '<div class="acct-conditions__label">Conditions governed</div>' +
          '<div class="conditions-row">' + chips + '</div>' +
        '</div>' +
        '<div class="acct-detail__right">' +
          '<div class="must-ask-block">' +
            '<div class="must-ask-block__label">The question this role must be able to answer</div>' +
            '<p class="must-ask-block__text">' + role.mustAsk + '</p>' +
          '</div>' +
          '<div class="if-absent-block">' +
            '<div class="if-absent-block__label">If this role is uninformed or absent</div>' +
            '<p class="if-absent-block__text">' + role.ifAbsent + '</p>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.getElementById('acct-close').addEventListener('click', function () {
      document.querySelectorAll('.acct-col-header.active, .acct-cell.col-active').forEach(function (el) {
        el.classList.remove('active', 'col-active');
      });
      activeRoleId = null;
      detailEl.classList.remove('visible');
    });
  }

  buildMatrix();
  selectRole(APEX.accountability.roles[0].id);
})();
