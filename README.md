# Weather API

API REST sencilla con Node.js y Express para consultar el clima actual de una ciudad usando OpenWeather.

## Caracteristicas

- Endpoint para consultar clima por ciudad
- Respuesta JSON limpia (no expone toda la respuesta cruda de OpenWeather)
- Cache en memoria por 10 minutos por ciudad
- Manejo centralizado de errores
- Middlewares de seguridad y soporte CORS (`helmet`, `cors`)

## Tecnologias

- Node.js
- Express
- dotenv
- nodemon

## Requisitos

- Node.js 18+ (recomendado)
- Una API key de OpenWeather

## Instalacion

1. Clona el repositorio.
2. Instala dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raiz del proyecto con estas variables:

```env
PORT=3000
OPEN_WEATHER_API_KEY=tu_api_key_aqui
```

4. Inicia en modo desarrollo:

```bash
npm run dev
```

Servidor por defecto: `http://localhost:3000`

## Como conseguir la API key (OpenWeather)

1. Entra a https://openweathermap.org/
2. Crea una cuenta o inicia sesion.
3. Ve a tu perfil y abre la seccion **API keys**.
4. Crea una nueva key (o usa una existente).
5. Copia la key y pegala en `OPEN_WEATHER_API_KEY` dentro de `.env`.

Nota: una key nueva puede tardar unos minutos en activarse.

## Endpoint

### GET /weather/:city

Obtiene el clima actual de una ciudad.

Ejemplo:

```http
GET /weather/medellin
```

Ejemplo con curl:

```bash
curl http://localhost:3000/weather/medellin
```

## Respuesta exitosa (200)

```json
{
  "city": "Medellin",
  "main": "Clouds",
  "description": "broken clouds",
  "temperature": "23.42 °C",
  "temperature_min": "22.10 °C",
  "temperature_max": "25.01 °C",
  "humidity": 74
}
```

## Respuestas de error

### Ciudad invalida o no encontrada

```json
{
  "error": "city not found"
}
```

Estado HTTP: `404`

### Ruta no encontrada

```json
{
  "error": "Route not found"
}
```

Estado HTTP: `404`

### Error interno

```json
{
  "error": "Internal Server Error"
}
```

Estado HTTP: `500`

## Cache

La API guarda respuestas en memoria durante 10 minutos por ciudad.

- Si una ciudad se consulta de nuevo dentro de ese tiempo, se responde desde cache.
- Si el cache expira, se consulta otra vez a OpenWeather.

## Scripts disponibles

- `npm run dev`: inicia el servidor con nodemon.

## Estructura del proyecto

```text
src/
  index.js
  middlewares/
    asyncHandler.middleware.js
    errorHandler.middleware.js
  routes/
    weather.routes.js
  services/
    weather.service.js
```

## Notas

- El cache es en memoria: se pierde al reiniciar el servidor.
- Este proyecto esta pensado para aprendizaje y desarrollo.
