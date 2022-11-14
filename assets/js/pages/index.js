$(document).ready(function () {
  AOS.init();
  
  var rellax = new Rellax('.greeting__whale', {
    horizontal: true,
  });

  var splide = new Splide('.splide', {
    autoWidth: true,
    focus: 'center',
    pagination: false,
    padding: {
      left: '100px',
      right: '100px',
    },
    perMove: 1,
    speed: 1000,
  });

  splide.mount();

  var data = {
    field1: {
      value: 0.3,
      color: '#00FFD0',
    },
    field2: {
      value: 0.21,
      color: '#00C9FF',
    },
    field3: {
      value: 0.18,
      color: '#4736D5',
    },
    field4: {
      value: 0.13,
      color: '#CB1FFF',
    },
    field5: {
      value: 0.07,
      color: '#FF0000',
    },
    field6: {
      value: 0.06,
      color: '#FF7D0C',
    },
    field7: {
      value: 0.05,
      color: '#FFF719',
    },
  };

  var items = [];
  let style = '<style>';
  var maximum = 0;
  Object.entries(data).forEach(function (item, index) {
    var label = item[0];
    var _data = item[1];
    var space = 0.015;

    items.push(
      {
        label,
        value: _data.value - space,
      },
      {
        label: label + 's',
        value: space,
      },
    );

    if (_data.value > maximum) {
      maximum = _data.value;
    }

    let _style = `
      .chart-item-${index * 2} {
        transition: stroke-opacity 0.3s ease;
        transition-delay: ${1 + (index + 1) / 20}s;
        stroke: ${_data.color};
        stroke-opacity: 0;
      }
    
      .token.aos-animate .chart-item-${index * 2} {
        stroke-opacity: 1;
      }
    
      .token__legend-item:nth-child(${index + 1}) .token__bar {
        background-color: ${_data.color};
      }
    `

    style += _style;
  });

  style += '</style>'
  $('head').append(style);

  var tokenInited = false;
  document.addEventListener('aos:in:token', ({ detail }) => {
    if (tokenInited) {
      return;
    }

    Object.entries(data).forEach(function (item, index) {
      var value = item[1].value;
      var width = (value / maximum) * 100;
      var el = document.getElementsByClassName('token__bar')[index];

      if (el) {
        el.style.width = width + '%';
      }
    });

    var counters = $('.token__name > span');
    if (counters) {
      counters.counterUp({
        delay: 1,
        time: 300,
      });
    }

    tokenInited = true;
  });

  var clientWidth = window.innerWidth;
  var radius = 200;
  var stroke = 80;
  if (clientWidth < 576) {
    radius = 150;
    stroke = 60;
  }

  var myChart = new DonutChart(document.getElementById('myChart'), {
    r: radius,
    stroke: stroke,
    scale: 100,
    items,
  });

  $('.roadmap__year').on('click', function () {
    if (!$(this).attr('data-tab')) {
      return;
    }

    var tabIndex = Number($(this).attr('data-tab'));
    var tabEl = $(`.roadmap__tab[data-tab='${tabIndex}']`);

    if (tabEl) {
      $('.roadmap__year').removeClass('roadmap__year--active');
      $(this).addClass('roadmap__year--active');

      $('.roadmap__tab').removeClass('roadmap__tab--active');
      tabEl.addClass('roadmap__tab--active');
    }
  });

  var emptyTab = document.querySelector('.roadmap__item--empty');
  if (emptyTab) {
    var rect = emptyTab.getBoundingClientRect();
    var width = rect.width - 20;
    var height = rect.height - 20;
    var diagonal = Math.hypot(width, height);

    var tanA = height / width;
    var angle = ((Math.atan(tanA) * 180) / Math.PI) * 0.96;

    var stickEl = $('.roadmap__stick');
    if (stickEl) {
      stickEl.css({
        width: diagonal - Math.hypot(18, 18),
        transform: `rotate(-${angle}deg)`,
      });
    }
  }

  $('.progress-bar').each(function (index) {
    var width = $(this).attr('data-pb-width');
    var height = $(this).attr('data-pb-height');
    var value = $(this).attr('data-pb-value');
    var valWidth = (value / 100) * width;

    $(this).css('width', width);
    $(this).css('height', height);

    $(this).append(
      `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_474_427-${index})">
          <rect width="${width}" height="${height}" rx="10" fill="url(#paint0_linear_474_427-${index})" />
          <g filter="url(#filter0_f_474_427-${index})">
            <rect x="2.5" y="2.5" width="${width - 5}" height="${
        height - 5
      }" rx="7.5" stroke="url(#paint1_linear_474_427-${index})" stroke-width="5" />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_474_427-${index}"
            x="-10"
            y="-10"
            width="${width + 20}"
            height="${height + 20}"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_474_427" />
          </filter>
          <linearGradient id="paint0_linear_474_427-${index}" x1="127.5" y1="33.2308" x2="127.5" y2="-10.5" gradientUnits="userSpaceOnUse">
            <stop stop-color="#848484" stop-opacity="0.09" />
            <stop offset="0.57794" stop-color="#F2F2F2" stop-opacity="0.09" />
            <stop offset="0.997917" stop-color="#848484" stop-opacity="0.09" />
          </linearGradient>
          <linearGradient id="paint1_linear_474_427-${index}" x1="225.96" y1="52.0385" x2="200.759" y2="-109.678" gradientUnits="userSpaceOnUse">
            <stop />
            <stop offset="0.77121" stop-opacity="0" />
          </linearGradient>
          <clipPath id="clip0_474_427-${index}">
            <rect width="${width}" height="${height}" rx="10" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <svg width="${valWidth}" height="${height}" viewBox="0 0 ${valWidth} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_474_412-${index})">
          <rect width="${valWidth}" height="${height}" rx="10" fill="url(#paint0_linear_474_412-${index})" />
          <g filter="url(#filter0_f_474_412-${index})">
            <rect x="2.5" y="2.5" width="${valWidth - 5 < 0 ? 0 : valWidth - 5}" height="${
        height - 5
      }" rx="7.5" stroke="url(#paint1_linear_474_412-${index})" stroke-width="5" />
          </g>
        </g>
        <defs>
          <filter id="filter0_f_474_412-${index}" x="-10" y="-10" width="${valWidth + 20}" height="${
        height + 20
      }" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_474_412" />
          </filter>
          <linearGradient id="paint0_linear_474_412-${index}" x1="34.5" y1="33.2308" x2="34.5" y2="-10.5" gradientUnits="userSpaceOnUse">
            <stop stop-color="#0073A9" />
            <stop offset="0.57794" stop-color="#00D0AE" />
            <stop offset="0.997917" stop-color="#0071A9" />
          </linearGradient>
          <linearGradient id="paint1_linear_474_412-${index}" x1="38.4297" y1="38.7692" x2="23.3464" y2="-18.2343" gradientUnits="userSpaceOnUse">
            <stop />
            <stop offset="0.77121" stop-opacity="0" />
          </linearGradient>
          <clipPath id="clip0_474_412-${index}">
            <rect width="${valWidth}" height="${height}" rx="10" fill="white" />
          </clipPath>
        </defs>
      </svg>
      `,
    );
  });
});
