# Resultados de la práctica — Inventory API

Peticiones ejecutadas contra `http://localhost:3001/api/products` con los datos iniciales (`Notebook` = 1, `Mouse` = 2, `Keyboard` = 3, inactivo).

| # | Petición | Body / Query | Esperado | Obtenido |
| --- | --- | --- | --- | --- |
| 1 | `GET /api/products` | — | 200 | 200 |
| 2 | `POST /api/products` | `{"name":"Pen","category":"office","stock":0}` | 201 | 201 (`status: "active"`) |
| 3 | `POST /api/products` | `stock: -1` | 400 | 400 |
| 4 | `POST /api/products` | `stock: "3"` | 400 | 400 |
| 5 | `POST /api/products` | propiedad adicional `status` | 400 | 400 |
| 6 | `PATCH /api/products/1` | `{"stock":0}` | 200 | 200 (conserva `name: "Notebook"`) |
| 7 | `PATCH /api/products/abc` | `{"stock":2}` | 400 | 400 |
| 8 | `PATCH /api/products/9999` | `{"stock":2}` | 404 | 404 |
| 9 | `PATCH /api/products/3` (Keyboard, inactivo) | `{"stock":10}` | 409 | 409 |
| 10 | `GET /api/products/3` | — | 200, sin cambios | 200 (`stock: 0`, `inactive`) |
| 11 | `GET /api/products` | `?category=electronics&limit=2` | 200, máx. 2 | 200 (Mouse, Keyboard) |
| 12 | `GET /api/products` | `?category=toys` | 400 | 400 |
| 13 | `GET /api/products` | `?limit=21` | 400 | 400 |
| 14 | `PATCH /api/products/1` | `{"category":"office"}` | 400 | 400 |

## 400 frente a 409

Una entrada inválida devuelve `400 Bad Request` porque la petición está mal formada: el `ValidationPipe` o el `ParseIntPipe` la rechazan antes de llegar al servicio. Actualizar un producto inactivo devuelve `409 Conflict` porque la petición es válida, pero entra en conflicto con el estado actual del recurso; esa regla de negocio la aplica `ProductsService` y no se guarda ningún cambio.
