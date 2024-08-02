// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
    rules: {
        //'no-console': 'error'
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'prettier/prettier': 'error',
    },
});
