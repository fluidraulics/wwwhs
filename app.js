require('dotenv').config({ silent: true })

const _ = require('lodash-addons')
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('babel-preset-env')
const dynamicImport = require('babel-plugin-syntax-dynamic-import')
const Contentful = require('spike-contentful')
const marked = require('marked')
const locals = {}

module.exports = {
  devtool: 'source-map',
  vendor: 'assets/**',
  ignore: ['**/readme.md', '**/license.txt', '**/includes/*', '**/.*'],
  reshape: htmlStandards({
      parser: false,
      locals: Object.assign(
        locals,
        { marked: marked },
        { _: _})
  }),
  postcss: cssStandards({ parser: false }),
  babel: { presets: [[jsStandards, { modules: false }]], plugins: [dynamicImport] },
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
          name: 'vendorspage',
          id: 'page',
          filters: {
            'sys.id': '2yAJhG8bLKWOa4Q0mcC2sS'
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
          },
          template: {
            path: 'views/layouts/vendor.html',
            output: (vendor) => { return `vendors/${_.slugify(vendor.fields.title)}.html` }
          }
        }
      ],
      json: 'data/data.json'
    })
  ],
  server: { open: false}
}
