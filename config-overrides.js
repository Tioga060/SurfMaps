const {
    override,
    addBabelPlugins,
} = require("customize-cra");

// Unused, but may be useful in the future TODO
const injectModuleRules = () => (config) =>  {
    config.module.rules[2].oneOf = [{
        test: /\.mjs$/,
        include: `${process.env.INIT_CWD}\\node_modules\\react-relay-network-modern`,
        type: 'javascript/auto',
    },
    ...config.module.rules[2].oneOf
    ];
    console.log(process.env)
    return config;
}

module.exports = override(
    ...addBabelPlugins(
        "relay",
    ),
    injectModuleRules(),
);
