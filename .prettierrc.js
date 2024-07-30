module.exports = {
    trailingComma: 'none',
    tabWidth: 4,
    singleQuote: true,
    printWidth: 120,
    overrides: [
        {
            files: '.prettierrc',
            options: {
                parser: 'json'
            }
        }
    ]
};
