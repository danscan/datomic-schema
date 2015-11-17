import axios from 'axios';
import edn from 'jsedn';
import Inflect from 'i';

// Instantiate inflector util
const inflect = new Inflect();

// System schema namespaces
const systemNamespaces = [':db', ':fressian'];

export default (apiUrl, dbAlias) => {
  const queryApiUrl = `${apiUrl}/api/query`;

  return axios.get(queryApiUrl, {
    params: {
      q: '[:find ?ident ?doc ?type ?index ?cardinality :where [_ :db/ident ?ident] [?ident :db/doc ?doc] [?ident :db/valueType ?typeE] [?typeE :db/ident ?type] [?ident :db/index ?index] [?ident :db/cardinality ?cardinalityE] [?cardinalityE :db/ident ?cardinality]]',
      args: `[{:db/alias "${dbAlias}"}]`,
    },
    headers: {
      'Accept': 'application/edn',
    },
  })
  .then(res => res.data)
  .then(schemaString => edn.parse(schemaString))
  .then(schemaData => schemaData.val.map(attribute => attribute.val))
  .then(schemaAttributes => {
    return schemaAttributes.reduce((schema, schemaAttribute) => {
      const attributeIdent = schemaAttribute[0];
      const attributeKey = attributeIdent.name;
      const attributeType = inflect.camelize(attributeIdent.ns.replace(':', ''));
      const attributeDoc = schemaAttribute[1];
      const attributeValueType = schemaAttribute[2].name;
      const attributeIndex = schemaAttribute[3];
      const attributeCardinality = schemaAttribute[4].name;

      // Don't add system namespaces to schema
      if (systemNamespaces.indexOf(attributeIdent.ns) > -1) {
        return schema;
      }

      return {
        ...schema,
        [attributeType]: {
          ...schema[attributeType],
          [attributeKey]: {
            type: attributeValueType,
            description: attributeDoc,
            cardinality: attributeCardinality,
            index: attributeIndex,
          },
        },
      };
    }, {});
  });
};
