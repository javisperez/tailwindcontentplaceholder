module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
  ],
  plugins: [
    require('./tailwindcss/plugins/content-placeholder')({
      placeholders: {
        'post': {
          height: 8, // height in em
          rows: [
            [20, 40],
            [70],
            [], // use empty rows to create some space
            [100],
            [],
            [15]
          ]
        },

        'users': {
          height: 8, // height in em
          rows: [
            [85],
            [],
            [90],
            [],
            [80],
            [],
            [70]
          ]
        },

        'list': {
          height: 8, // height in em
          rows: [
            [20, 65],
            [],
            [20, 75],
            [],
            [20, 60],
            [],
            [20, 55]
          ]
        },

        'line-2': {
          height: 1,
          rows: [
            [20, 65]
          ]
        },

        'postinfo': {
          height: 1,
          rows: [
            [15, 15, 15]
          ]
        },

        'paragraph': {
          height: 4,
          rows: [
            [100],
            [100],
            [40],
            []
          ]
        },
      }
    }),
  ],
}
