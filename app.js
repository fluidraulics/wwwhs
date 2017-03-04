require('dotenv').config({ silent: true })

const _ = require('lodash-addons')
const htmlStandards = require('spike-html-standards')
const cssStandards = require('spike-css-standards')
const latest = require('babel-preset-latest')
const Contentful = require('spike-contentful')
const marked = require('marked')
const locals = {}

module.exports = {
  devtool: 'source-map',
  vendor: 'assets/**',
  ignore: ['**/readme.md', '**/license.txt', '**/layouts/*', '**/includes/*', '**/_*', '**/.*'],
  reshape: (ctx) => {
    return htmlStandards({
      parser: false,
      webpack: ctx,
      locals: Object.assign(
        locals,
        { marked: marked },
        { _: _})
    })
  },
  postcss: (ctx) => {
    return cssStandards({ parser: false, webpack: ctx })
  },
  babel: { presets: [latest] },
  plugins: [
    new Contentful({
      addDataTo: locals,
      accessToken: process.env.accessToken,
      spaceId: process.env.spaceId,
      contentTypes: [
        {
          name: 'index',
          id: 'page',
          filters: {
            'sys.id': '4GP68pszosicYwowA2QuY2'
          }
        },
        {
          name: 'about',
          id: 'page',
          filters: {
            'sys.id': '1ShmJTtfuo0mgCcIOAu6Qi'
          }
        },
        {
          name: 'contact',
          id: 'page',
          filters: {
            'sys.id': '3ioJJTHOFyoOOksMuYEswa'
          }
        },
        {
          name: 'sales',
          id: 'page',
          filters: {
            'sys.id': '60aMIbHglykAuUwgg2QkUO'
          }
        },
        {
          name: 'credit',
          id: 'page',
          filters: {
            'sys.id': '31FKyKE2Huu6EAWI8YyIYK'
          }
        },
        {
          name: 'fourzerofour',
          id: 'page',
          filters: {
            'sys.id': '7dP1qSSE6s6OQcIy6WmyEc'
          }
        },
        {
          name: 'vendors',
          id: 'vendor',
          filters: {
            order: 'fields.title'
          }
        }
      ],
      json: 'data/data.json'
    })
  ],
  server: { open: false}
}
