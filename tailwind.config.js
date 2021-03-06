module.exports = {
  purge: [
    './demo/src/**/*.html',
    './demo/src/**/*.vue',
  ],
  plugins: [
    require('./index')({
      placeholders: {
        'post': `## ####
          #######

          ##########

          ##`,

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
          rows: [
            [20, 65]
          ]
        },

        'postinfo': {
          rows: [
            [15, 15, 15]
          ]
        },

        'paragraph': {
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
