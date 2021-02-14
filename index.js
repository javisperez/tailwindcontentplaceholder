module.exports = function (userOptions = {}) {
  const options = {
    borderRadius: '4',
    animationDuration: '1.4s',
    animated: true,
    bgColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    prefix: 'cp',
    width: '80%',
    placeholders: [],
    ...userOptions,
  };

  const height = options.height + (typeof options.height === 'number' ? 'em' : '')
  const width = options.width + (typeof options.width === 'number' ? '%' : '')

  const baseStyle = {
    content: '" "',
    height: height,
    color: 'transparent',
    width: width,
    display: 'block',
    backgroundPosition: '0 0',
    backgroundRepeat: 'no-repeat',
    borderRadius: `${options.borderRadius}px`,
  };

  if (options.animated) {
    baseStyle.animation = `contentPlaceholder ${options.animationDuration} ease infinite`;
  }

  function renderSingleLine(segments) {
    const r = [];
    let xPosition = 0;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const width = i < segments.length - 1 ? `calc(${segment}% - 5px)` : `${segment}%`;

      r.push(
        `<rect x='${xPosition}%' y='0' width='${width}' height='90%' rx='${options.borderRadius}' fill='${options.bgColor}' />`
      );

      xPosition += segment;
    }

    return r;
  }

  function renderRowsOfLines(rows = [[100]]) {
    let yPosition = 0;

    return rows.map(row => {
      const height = 'calc(1em - 3px)';
      const lineWithSegments = renderSingleLine(row);
      const rowLines = lineWithSegments.map(line =>
        line.replace(`y='0'`, `y='${yPosition}em'`).replace(`height='90%'`, `height='${height}'`)
      );

      yPosition++;

      return rowLines.join('');
    });
  }

  function generateBackground(rows = [[100]], svgHeight = options.height) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='${svgHeight}'>${
      rows.length === 1 ? renderSingleLine(rows[0]) : renderRowsOfLines(rows)
    }</svg>`;

    return `url("data:image/svg+xml;utf8,${svg}")`;
  }

  return function ({ addBase, addComponents }) {
    const customComponents = {};
    Object.keys(options.placeholders).forEach(name => {
      const placeholder = options.placeholders[name];

      let rows = placeholder.rows

      if (typeof placeholder === 'string') {
        rows = placeholder.split('\n').map((line) => {
          return line.trim().split(' ').map((segment) => segment.length * 10)
        });
      }

      customComponents[`.${options.prefix}-${name}::before`] = {
        ...baseStyle,
        width: placeholder.width || width,
        height: `${placeholder.height || rows.length || height}em`,
        backgroundImage: generateBackground(rows, '100%')
      };
    });

    // Add the animation
    if (options.animated) {
      addBase({
        '@keyframes contentPlaceholder': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.5,
          },
        },
      });
    }

    // Add the components
    addComponents({
      ...customComponents
    });
  };
};
