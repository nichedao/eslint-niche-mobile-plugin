/**
 * @fileoverview Gaddis' field and edges schema definitions must contain underscores only
 * @author Sasha
 */
 "use strict";

 const astUtils = require("../utils/ast-utils");

 
 //------------------------------------------------------------------------------
 // Rule Definition
 //------------------------------------------------------------------------------
 
 
 /**
  * @type {import('eslint').Rule.RuleModule}
  */
 module.exports = {
     meta: {
         type: "problem", // `problem`, `suggestion`, or `layout`
         docs: {
             description: "Gaddis' field and edges schema definitions must contain underscores only",
             category: "Fill me in",
             recommended: false,
             url: null, // URL to the documentation page for this rule
         },
         fixable: null, // Or `code` or `whitespace`
         schema: [], // Add a schema if the rule has options
         messages: {
             invalidPropertyName: "Invalid property '{{name}}'. Needs to follow underscore/snake case."
         }
     },
 
     create(context) {
         // variables should be defined here
         const STATIC_DEFINITION_SPEC_NAME = 'definition';
 
         //----------------------------------------------------------------------
         // Helpers
         //----------------------------------------------------------------------
 
         function hasUppercase(name) {
             return (/[A-Z]/.test(name));
         }
 
         // any helper functions should go here or else delete this section
 
         //----------------------------------------------------------------------
         // Public
         //----------------------------------------------------------------------
 
         return {
             Property(node) {
                 const propertyName = astUtils.getPropertyName(node);
 
                 if (propertyName !== "fields" && propertyName !== "edges") return;
                 if (!context.getSourceCode().text.includes(STATIC_DEFINITION_SPEC_NAME)) return;
 
                 node.value.properties.forEach(property => {
                     const key = astUtils.getPropertyName(property);
 
                     if (hasUppercase(key)) {
                         context.report({
                             node,
                             loc: node.key.loc,
                             messageId: "invalidPropertyName",
                             data: {
                                 name: key
                             }
                         });
                     }
                 });
             }
         };
     },
 };