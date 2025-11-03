#!/bin/bash

echo "🔍 Verificando configuración para detección instantánea de errores..."
echo ""

# Verificar extensiones de VS Code instaladas
echo "📦 Extensiones requeridas:"
echo "✅ ESLint (dbaeumer.vscode-eslint)"
echo "✅ Prettier (esbenp.prettier-vscode)"
echo "✅ TypeScript (incorporado en VS Code)"
echo ""

# Verificar archivos de configuración
echo "⚙️ Archivos de configuración:"

if [ -f ".vscode/settings.json" ]; then
    echo "✅ .vscode/settings.json - Configuración de VS Code"
else
    echo "❌ .vscode/settings.json - NO ENCONTRADO"
fi

if [ -f "tsconfig.json" ]; then
    echo "✅ tsconfig.json - Configuración de TypeScript"
else
    echo "❌ tsconfig.json - NO ENCONTRADO"
fi

if [ -f ".eslintrc.json" ]; then
    echo "✅ .eslintrc.json - Configuración de ESLint"
else
    echo "❌ .eslintrc.json - NO ENCONTRADO"
fi

echo ""
echo "🚀 Para activar detección instantánea:"
echo "1. Instala las extensiones listadas arriba"
echo "2. Reinicia VS Code"
echo "3. Abre un archivo .tsx y verás errores en tiempo real"
echo ""
echo "⚡ Los errores aparecerán:"
echo "   • Con subrayado rojo en el editor"
echo "   • En el panel 'Problems' (Ctrl+Shift+M)"
echo "   • En la barra de estado inferior"