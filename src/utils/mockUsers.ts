/**
 * Utilidad para agregar usuarios del backend a los datos mock
 * Ejecutar cuando encuentres nuevos GUIDs de usuarios en el backend
 */

// Usuarios conocidos del backend - agregar aquí cuando encuentres nuevos GUIDs
export const BACKEND_USERS = [
  {
    id: "1779998e-f9ec-412a-b0cd-4234801656ca",
    name: "Usuario Backend 1",
    email: "usuario1@haceb.com",
    roleId: "role-1",
    isActive: true,
  },
  {
    id: "19fca53d-d0ae-4eb7-a5ad-2d7213797e71",
    name: "Usuario Backend 2",
    email: "usuario2@haceb.com",
    roleId: "role-2",
    isActive: true,
  },
  // Agregar más usuarios aquí cuando los encuentres
];

/**
 * Función auxiliar para generar un nombre descriptivo basado en el GUID
 */
export const generateUserDisplayName = (guid: string): string => {
  if (!guid || guid.length < 8) return "Usuario Desconocido";

  const shortId = guid.substring(0, 8);
  return `Usuario (${shortId}...)`;
};

/**
 * Instrucciones para agregar nuevos usuarios:
 *
 * 1. Cuando veas un nuevo GUID en la aplicación como:
 *    "Usuario 12345678-abcd-ef12-3456-789012345678"
 *
 * 2. Agrega el usuario al array BACKEND_USERS arriba:
 *    {
 *      id: "12345678-abcd-ef12-3456-789012345678",
 *      name: "Nombre Real del Usuario",  // <- Cambia esto por el nombre real
 *      email: "usuario@haceb.com",
 *      roleId: "role-1",
 *      isActive: true,
 *    },
 *
 * 3. Actualiza los datos mock en useReferenceData.ts para incluir este usuario
 *
 * 4. O mejor aún, pide al backend que devuelva los datos de usuarios reales
 */
