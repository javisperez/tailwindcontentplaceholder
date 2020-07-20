module.exports = function (userOptions = {}) {
  const options = {
    borderRadius: '4',
    animationDuration: '1.4s',
    animated: true,
    bgColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    width: '80%',
    placeholders: [],
    ...userOptions,
  };

  const baseStyle = {
    content: '" "',
    height: `${options.height}em`,
    color: 'transparent',
    width: options.width,
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
      const height = `calc(${options.height}em - 3px)`;
      const lineWithSegments = renderSingleLine(row);
      const rowLines = lineWithSegments.map(line =>
        line.replace(`y='0'`, `y='${yPosition}em'`).replace(`height='90%'`, `height='${height}'`)
      );

      yPosition += Number(options.height);

      return rowLines.join('');
    });
  }

  function getPartsWithRandomValues(number, parts, minValue) {
    const randombit = number - minValue * parts;
    const out = [];

    for (let i = 0; i < parts; i++) {
      out.push(Math.random());
    }

    const mult = randombit / out.reduce((a, b) => a + b);
    return out.map((el) => el * mult + min);
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

      customComponents[`.cp-${name}::before`] = {
        ...baseStyle,
        width: placeholder.width || options.width,
        height: placeholder.height ? `${placeholder.height}em` : options.height,
        backgroundImage: generateBackground(placeholder.rows, '100%')
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
