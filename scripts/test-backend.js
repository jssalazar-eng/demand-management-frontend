/**
 * Script para probar la conectividad con el backend y obtener IDs reales
 * Ejecutar con: node scripts/test-backend.js
 */

const https = require("https");

const API_BASE_URL = "https://localhost:7243";

// Función para hacer peticiones GET
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 7243,
      path: url,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Ignorar certificados SSL en desarrollo
      rejectUnauthorized: false,
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (error) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });

    req.end();
  });
}

async function testBackend() {
  console.log("🔍 Probando conectividad con el backend...\n");

  try {
    // 1. Probar endpoint de demandas
    console.log("📝 Probando GET /api/Demand...");
    const demandsResponse = await makeRequest("/api/Demand");

    if (demandsResponse.status === 200) {
      console.log("✅ Demandas obtenidas correctamente");
      console.log("📊 Total de demandas:", demandsResponse.data.length || 0);

      if (demandsResponse.data.length > 0) {
        console.log("\n📋 Primeros 3 IDs reales encontrados:");
        demandsResponse.data.slice(0, 3).forEach((demand, index) => {
          console.log(`   ${index + 1}. ${demand.id} - "${demand.title}"`);
        });

        console.log("\n💡 Puedes usar estos IDs reales en tu aplicación:");
        console.log("   Para usarlos, reemplaza los IDs mock en useDemands.ts");
      } else {
        console.log("⚠️  No se encontraron demandas en la base de datos");
      }
    } else {
      console.log(`❌ Error: ${demandsResponse.status}`);
      console.log(demandsResponse.data);
    }

    // 2. Probar endpoint filtrado
    console.log("\n📝 Probando GET /api/Demand/filtered...");
    const filteredResponse = await makeRequest(
      "/api/Demand/filtered?pageNumber=1&pageSize=5"
    );

    if (filteredResponse.status === 200) {
      console.log("✅ Endpoint filtrado funciona correctamente");
      console.log(
        "📊 Items en página 1:",
        filteredResponse.data.items?.length || 0
      );
    } else {
      console.log(`❌ Error en endpoint filtrado: ${filteredResponse.status}`);
    }

    // 3. Probar otros endpoints
    const endpoints = [
      { name: "DemandType", path: "/api/DemandType" },
      { name: "Status", path: "/api/Status" },
      { name: "User", path: "/api/User" },
      { name: "Role", path: "/api/Role" },
    ];

    console.log("\n📝 Probando otros endpoints...");
    for (const endpoint of endpoints) {
      try {
        const response = await makeRequest(endpoint.path);
        const status = response.status === 200 ? "✅" : "❌";
        const count = Array.isArray(response.data) ? response.data.length : "?";
        console.log(`   ${status} ${endpoint.name}: ${count} items`);
      } catch (error) {
        console.log(`   ❌ ${endpoint.name}: Error de conexión`);
      }
    }
  } catch (error) {
    console.log("❌ Error de conexión con el backend:");
    console.log("   ", error.message);
    console.log("\n💡 Asegúrate de que:");
    console.log("   1. El backend esté ejecutándose en https://localhost:7243");
    console.log("   2. Los certificados SSL estén configurados correctamente");
    console.log("   3. El CORS esté habilitado para tu frontend");
  }
}

// Ejecutar el test
testBackend()
  .then(() => {
    console.log("\n🏁 Test completado");
  })
  .catch((error) => {
    console.error("💥 Error fatal:", error);
  });
