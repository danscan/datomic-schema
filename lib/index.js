'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jsedn = require('jsedn');

var _jsedn2 = _interopRequireDefault(_jsedn);

var _i = require('i');

var _i2 = _interopRequireDefault(_i);

// Instantiate inflector util
var inflect = new _i2['default']();

// System schema namespaces
var systemNamespaces = [':db', ':fressian'];

exports['default'] = function (apiUrl, dbAlias) {
  var queryApiUrl = apiUrl + '/api/query';

  return _axios2['default'].get(queryApiUrl, {
    params: {
      q: '[:find ?ident ?doc ?type ?index ?cardinality :where [_ :db/ident ?ident] [?ident :db/doc ?doc] [?ident :db/valueType ?typeE] [?typeE :db/ident ?type] [?ident :db/index ?index] [?ident :db/cardinality ?cardinalityE] [?cardinalityE :db/ident ?cardinality]]',
      args: '[{:db/alias "' + dbAlias + '"}]'
    },
    headers: {
      'Accept': 'application/edn'
    }
  }).then(function (res) {
    return res.data;
  }).then(function (schemaString) {
    return _jsedn2['default'].parse(schemaString);
  }).then(function (schemaData) {
    return schemaData.val.map(function (attribute) {
      return attribute.val;
    });
  }).then(function (schemaAttributes) {
    return schemaAttributes.reduce(function (schema, schemaAttribute) {
      var attributeIdent = schemaAttribute[0];
      var attributeKey = attributeIdent.name;
      var attributeType = inflect.camelize(attributeIdent.ns.replace(':', ''));
      var attributeDoc = schemaAttribute[1];
      var attributeValueType = schemaAttribute[2].name;
      var attributeIndex = schemaAttribute[3];
      var attributeCardinality = schemaAttribute[4].name;

      // Don't add system namespaces to schema
      if (systemNamespaces.indexOf(attributeIdent.ns) > -1) {
        return schema;
      }

      return _extends({}, schema, _defineProperty({}, attributeType, _extends({}, schema[attributeType], _defineProperty({}, attributeKey, {
        type: attributeValueType,
        description: attributeDoc,
        cardinality: attributeCardinality,
        index: attributeIndex
      }))));
    }, {});
  });
};

module.exports = exports['default'];