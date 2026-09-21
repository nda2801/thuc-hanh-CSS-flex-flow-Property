document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const flexPreview = document.getElementById('flexPreviewContainer');
  const previewStageWrapper = document.getElementById('previewStageWrapper');
  const activeCssCode = document.getElementById('activeCssCode');
  const copyBtn = document.getElementById('copyBtn');
  const resetBtn = document.getElementById('resetBtn');

  const directionRadios = document.querySelectorAll('input[name="direction"]');
  const wrapRadios = document.querySelectorAll('input[name="wrap"]');
  const directionValueBadge = document.getElementById('directionValue');
  const wrapValueBadge = document.getElementById('wrapValue');

  const presetBtns = document.querySelectorAll('.preset-btn');
  const addItemBtn = document.getElementById('addItemBtn');
  const removeItemBtn = document.getElementById('removeItemBtn');
  const itemCountLabel = document.getElementById('itemCountLabel');

  const gapSlider = document.getElementById('gapSlider');
  const gapValue = document.getElementById('gapValue');
  const containerWidthSlider = document.getElementById('containerWidthSlider');
  const containerWidthValue = document.getElementById('containerWidthValue');

  const mainAxisText = document.getElementById('mainAxisText');
  const wrapBehaviorText = document.getElementById('wrapBehaviorText');
  const explanationTitle = document.getElementById('explanationTitle');
  const explanationDesc = document.getElementById('explanationDesc');

  // State
  let currentDirection = 'row';
  let currentWrap = 'nowrap';
  let itemCount = 6;

  // Explanations Dictionary
  const explanations = {
    'row nowrap': {
      title: 'flex-flow: row nowrap (Mặc định)',
      desc: 'Sắp xếp các item theo hàng ngang từ trái sang phải theo hướng văn bản (LTR). Giá trị nowrap ép tất cả phần tử nằm trên cùng một hàng duy nhất mà không ngắt dòng, bất kể chiều rộng container bị giới hạn.'
    },
    'row-reverse nowrap': {
      title: 'flex-flow: row-reverse nowrap',
      desc: 'Sắp xếp các item theo hàng ngang đảo ngược từ phải sang trái (RTL). Item 1 sẽ nằm ở góc ngoài cùng bên phải và các item tiếp theo lùi dần sang trái, đồng thời không tự động xuống dòng.'
    },
    'row wrap': {
      title: 'flex-flow: row wrap',
      desc: 'Sắp xếp các item từ trái sang phải theo hàng ngang. Khi tổng chiều rộng các item vượt quá bề rộng của container, các item kế tiếp sẽ tự động bọc (wrap) xuống hàng mới bên dưới.'
    },
    'row-reverse wrap': {
      title: 'flex-flow: row-reverse wrap',
      desc: 'Sắp xếp các item theo hàng ngang từ phải sang trái. Khi không đủ diện tích trên hàng, các item tiếp theo sẽ ngắt và bọc xuống hàng mới bên dưới theo chiều từ phải sang trái.'
    },
    'row wrap-reverse': {
      title: 'flex-flow: row wrap-reverse',
      desc: 'Sắp xếp các item theo hàng ngang từ trái sang phải, nhưng khi bọc dòng (wrap), các dòng mới sẽ xuất hiện ngược lên phía trên thay vì xuống phía dưới.'
    },
    'row-reverse wrap-reverse': {
      title: 'flex-flow: row-reverse wrap-reverse',
      desc: 'Sắp xếp hàng ngang đảo ngược (phải sang trái) và bọc dòng ngược từ dưới lên trên.'
    },
    'column nowrap': {
      title: 'flex-flow: column nowrap',
      desc: 'Chuyển trục chính sang chiều dọc (từ trên xuống dưới). Tất cả các item nằm trên một cột duy nhất và không bọc cột.'
    },
    'column wrap': {
      title: 'flex-flow: column wrap',
      desc: 'Sắp xếp các item theo chiều dọc từ trên xuống dưới. Khi vượt quá chiều cao tối đa của container, các item sẽ tự động bọc sang cột mới bên phải.'
    },
    'column-reverse nowrap': {
      title: 'flex-flow: column-reverse nowrap',
      desc: 'Chuyển trục chính sang chiều dọc từ dưới lên trên. Item 1 nằm ở đáy container và các item tiếp theo xếp dần lên trên trên một cột duy nhất.'
    },
    'column-reverse wrap': {
      title: 'flex-flow: column-reverse wrap',
      desc: 'Sắp xếp từ dưới lên trên theo chiều dọc, khi chạm trần container các item sẽ bọc sang một cột mới bên phải.'
    },
    'column wrap-reverse': {
      title: 'flex-flow: column wrap-reverse',
      desc: 'Sắp xếp dọc từ trên xuống dưới, nhưng các cột được bọc thêm sẽ nằm dịch sang bên trái (ngược hướng thông thường).'
    },
    'column-reverse wrap-reverse': {
      title: 'flex-flow: column-reverse wrap-reverse',
      desc: 'Sắp xếp dọc từ dưới lên trên, các cột được bọc thêm xuất hiện dịch dần sang bên trái.'
    }
  };

  // Update UI & Styles
  function updateFlexFlow() {
    const flowValue = `${currentDirection} ${currentWrap}`;

    // Apply to preview container
    flexPreview.style.flexFlow = flowValue;

    // Adjust container height when column wrap is selected to demonstrate column wrapping visibly
    if (currentDirection.includes('column')) {
      flexPreview.style.minHeight = '340px';
      flexPreview.style.height = '340px';
    } else {
      flexPreview.style.minHeight = '300px';
      flexPreview.style.height = 'auto';
    }

    // Update code banner
    activeCssCode.textContent = `flex-flow: ${flowValue};`;

    // Update badge labels
    directionValueBadge.textContent = currentDirection;
    wrapValueBadge.textContent = currentWrap;

    // Update Axis guides
    updateAxisGuides();

    // Update dynamic explanation text
    const explKey = flowValue;
    const expl = explanations[explKey] || {
      title: `flex-flow: ${flowValue}`,
      desc: `Kết hợp giữa hướng sắp xếp ${currentDirection} và chế độ bọc dòng ${currentWrap}.`
    };
    explanationTitle.textContent = expl.title;
    explanationDesc.textContent = expl.desc;

    // Sync radio buttons
    directionRadios.forEach(r => {
      r.checked = (r.value === currentDirection);
    });
    wrapRadios.forEach(r => {
      r.checked = (r.value === currentWrap);
    });

    // Update preset button active states
    presetBtns.forEach(btn => {
      const bDir = btn.getAttribute('data-dir');
      const bWrap = btn.getAttribute('data-wrap');
      if (bDir === currentDirection && bWrap === currentWrap) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function updateAxisGuides() {
    let mainText = '';
    let wrapText = '';

    // Main axis direction
    switch (currentDirection) {
      case 'row':
        mainText = 'Ngang (Trái ➔ Phải)';
        break;
      case 'row-reverse':
        mainText = 'Ngang đảo (Phải ➔ Trái)';
        break;
      case 'column':
        mainText = 'Dọc (Trên ➔ Dưới)';
        break;
      case 'column-reverse':
        mainText = 'Dọc đảo (Dưới ➔ Trên)';
        break;
    }
    mainAxisText.textContent = mainText;

    // Wrap behavior
    switch (currentWrap) {
      case 'nowrap':
        wrapText = 'Không bọc (Một hàng/cột duy nhất)';
        break;
      case 'wrap':
        wrapText = currentDirection.includes('column') ? 'Bọc sang cột mới bên phải' : 'Bọc xuống hàng mới bên dưới';
        break;
      case 'wrap-reverse':
        wrapText = currentDirection.includes('column') ? 'Bọc sang cột mới bên trái (ngược)' : 'Bọc ngược lên hàng phía trên';
        break;
    }
    wrapBehaviorText.textContent = wrapText;
  }

  // Radio button listeners
  directionRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.checked) {
        currentDirection = e.target.value;
        updateFlexFlow();
      }
    });
  });

  wrapRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.checked) {
        currentWrap = e.target.value;
        updateFlexFlow();
      }
    });
  });

  // Preset Buttons
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentDirection = btn.getAttribute('data-dir');
      currentWrap = btn.getAttribute('data-wrap');
      updateFlexFlow();
    });
  });

  // Add Item
  addItemBtn.addEventListener('click', () => {
    if (itemCount >= 14) return;
    itemCount++;
    const newBox = document.createElement('div');
    newBox.className = 'flex-item-box';
    newBox.setAttribute('data-index', itemCount);
    newBox.innerHTML = `
      <div class="item-number">${itemCount}</div>
      <div class="item-sub">item</div>
    `;
    flexPreview.appendChild(newBox);
    itemCountLabel.textContent = itemCount;
  });

  // Remove Item
  removeItemBtn.addEventListener('click', () => {
    if (itemCount <= 2) return;
    const lastItem = flexPreview.querySelector('.flex-item-box:last-child');
    if (lastItem) {
      flexPreview.removeChild(lastItem);
      itemCount--;
      itemCountLabel.textContent = itemCount;
    }
  });

  // Gap Slider
  gapSlider.addEventListener('input', (e) => {
    const val = e.target.value + 'px';
    flexPreview.style.gap = val;
    gapValue.textContent = val;
  });

  // Container Width Slider
  containerWidthSlider.addEventListener('input', (e) => {
    const val = e.target.value + '%';
    flexPreview.style.width = val;
    containerWidthValue.textContent = val;
  });

  // Copy CSS button
  copyBtn.addEventListener('click', () => {
    const cssToCopy = `display: flex;\nflex-flow: ${currentDirection} ${currentWrap};`;
    navigator.clipboard.writeText(cssToCopy).then(() => {
      const span = copyBtn.querySelector('span');
      const originalText = span.textContent;
      span.textContent = 'Đã sao chép!';
      copyBtn.style.background = '#10b981';
      copyBtn.style.borderColor = '#10b981';

      setTimeout(() => {
        span.textContent = originalText;
        copyBtn.style.background = '';
        copyBtn.style.borderColor = '';
      }, 1500);
    }).catch(err => {
      console.error('Không thể sao chép:', err);
    });
  });

  // Reset Button
  resetBtn.addEventListener('click', () => {
    currentDirection = 'row';
    currentWrap = 'nowrap';
    gapSlider.value = 16;
    flexPreview.style.gap = '16px';
    gapValue.textContent = '16px';

    containerWidthSlider.value = 100;
    flexPreview.style.width = '100%';
    containerWidthValue.textContent = '100%';

    // Reset items to 6
    while (itemCount > 6) {
      const last = flexPreview.querySelector('.flex-item-box:last-child');
      if (last) flexPreview.removeChild(last);
      itemCount--;
    }
    while (itemCount < 6) {
      itemCount++;
      const newBox = document.createElement('div');
      newBox.className = 'flex-item-box';
      newBox.setAttribute('data-index', itemCount);
      newBox.innerHTML = `
        <div class="item-number">${itemCount}</div>
        <div class="item-sub">item</div>
      `;
      flexPreview.appendChild(newBox);
    }
    itemCountLabel.textContent = itemCount;

    updateFlexFlow();
  });

  // Initial call
  updateFlexFlow();
});
