/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: '#1E3A8A',
                primaryDark: '#1E40AF',
                background: '#F9FAFB',
                text: '#1F2937',
                textLight: '#6B7280',
                border: '#E5E7EB'
            },
            borderRadius: {
                lg: '8px',
                DEFAULT: '8px'
            },
            spacing: {
                xs: '8px',
                sm: '16px',
                md: '24px',
                lg: '32px',
                xl: '48px',
                xxl: '64px'
            }
        },
    },
    plugins: [],
}
