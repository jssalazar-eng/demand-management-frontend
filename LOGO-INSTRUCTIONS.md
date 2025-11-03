# Instrucciones para Reemplazar el Logo

## 📝 Pasos para usar tu logo.webp:

### 1. **Coloca tu archivo logo.webp**

```
src/assets/images/logo.webp
```

### 2. **Actualiza la importación en Logo.tsx**

En el archivo `src/components/common/Logo.tsx`, cambia la línea 6:

**De:**

```typescript
import logoImage from "../../assets/images/logo-temp.svg";
```

**A:**

```typescript
import logoImage from "../../assets/images/logo.webp";
```

### 3. **Especificaciones recomendadas para tu logo:**

- **Formato**: WebP (para mejor compresión)
- **Tamaño**: 256x256 px o 512x512 px (proporción cuadrada)
- **Fondo**: Transparente preferiblemente
- **Colores**: Compatible con el tema verde HACEB (#abbc2e)

### 4. **Características actuales del componente:**

- ✅ **Responsive**: Se adapta a 3 tamaños (small, medium, large)
- ✅ **Fallback**: Si la imagen falla, muestra logo generado por código
- ✅ **Optimizado**: Usa objectFit: "contain" para mantener proporciones
- ✅ **Estilizado**: Incluye sombra y border-radius
- ✅ **Accesible**: Incluye atributo alt para lectores de pantalla

### 5. **Ubicación en la app:**

El logo aparece en el **header superior izquierdo** junto al texto "HACEB" y el nombre de la aplicación.

### 6. **Compilar después del cambio:**

```bash
npm run build
```

## 🎨 Logo Temporal Actual

Mientras tanto, se está usando un logo SVG temporal con:

- Fondo verde degradado (#abbc2e → #7a8620)
- Letra "H" blanca y bold
- Sombra sutil
- Bordes redondeados

¡Reemplaza cuando tengas tu logo oficial!
