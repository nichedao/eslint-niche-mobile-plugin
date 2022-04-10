/**
 * @fileoverview Gaddis&#39; field and edges schema definitions must contain underscores only
 * @author Sasha
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/gaddis-fields-edges-underscore"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("gaddis-fields-edges-underscore", rule, {
  valid: [
    " definition = {    fields: {},    edges: {      owner: {      },      tokens_owned: {      },    },  };",
    "bro = {    fields: {},    edges: {      owner: {      },      tokensOwned: {      },    },  };"
  ],

  invalid: [
    {
      code: " definition = {    fields: {},    edges: {      owner: {      },      tokensOwned: {      },    },  };",
      errors: [{ message: "Invalid property 'tokensOwned'. Needs to follow underscore/snake case."}],
    },
  ],
});
