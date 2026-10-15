![Símbolo de AntartidaLabs][image1]

AntartidaLabs

# **MANUAL FUNCIONAL — SITIO WEB COMERCIAL ANTARTIDALABS**

Especificación de contenidos, navegación, interacciones y aceptación

Proyecto  Sitio institucional y comercial

Versión 1.1  |  15 de octubre de 2026

Destinatarios  Equipo de desarrollo, diseño y aseguramiento de calidad

El sitio presentará la propuesta institucional y el catálogo de 19 servicios, y permitirá iniciar una consulta comercial mediante un formulario con envío por correo electrónico. Este manual define el contenido y el comportamiento necesarios para implementarlo.

# **Índice**

| Capítulo | Página |
| :---- | :---: |
| [1\. Introducción](#bookmark=id.ycupriwzw25o) | 3 |
| [2\. Descripción de AntartidaLabs](#bookmark=id.ug0xt1izudj) | 6 |
| [3\. Arquitectura del sitio](#bookmark=id.f5yu2gjfvtb4) | 8 |
| [4\. Especificación funcional](#bookmark=id.2bit06ekeub1) | 9 |
| [5\. Catálogo de productos y servicios](#bookmark=id.jw0izqafswoj) | 13 |
| [6\. Formulario de contacto](#bookmark=id.8gdkq5s9yunk) | 24 |
| [7\. Diseño y experiencia de usuario](#bookmark=id.lbo0vov7ozil) | 31 |
| [8\. Requisitos no funcionales](#bookmark=id.og4i6hf7qyae) | 34 |
| [9\. Matriz de requisitos funcionales](#bookmark=id.yvgpefp967cn) | 36 |
| [10\. Criterios de aceptación](#bookmark=id.of82jr4o0ay3) | 39 |

Los capítulos se encuentran vinculados desde este índice. Los estilos de títulos permiten recorrer las subsecciones desde el panel de navegación de Word.

# **Capítulo 1 — Introducción**

## **1.1 Objetivo del documento**

Definir de forma cerrada el sitio, su contenido público y sus reglas de interacción y aceptación. Los capítulos 3 a 8 constituyen la especificación de implementación. El capítulo 9 identifica requisitos y el 10 define pruebas. No se requiere una nueva decisión editorial ni un relevamiento funcional: los valores operativos del entorno se completan en configuración según 6.9. Se conserva la independencia de lenguajes, frameworks y proveedores.

Solo se publican los textos expresamente identificados como públicos, las denominaciones de servicios y los campos de ficha definidos en 5.1. No se publican fuentes documentales, IDs, supuestos, códigos de requisitos, criterios de prueba ni instrucciones de este manual. Las etiquetas visibles y microtextos se reproducen literalmente; no se reemplazan por redacción generada durante el desarrollo.

## **1.2 Objetivo del sitio web**

Presentar AntartidaLabs, explicar su propuesta de capacidad tecnológica administrada para investigar en inteligencia artificial (IA), describir su catálogo y facilitar solicitudes de información. La conversión esperada es una consulta comercial enviada por correo; la cotización y el acuerdo de alcance ocurren fuera del sitio.

## **1.3 Alcance y exclusiones**

Se incluye una página pública en español, navegación por anclas, presentación institucional, AI Research LAB como núcleo previsto, modelo de servicio, catálogo completo y formulario de contacto. Incluye adaptación móvil, accesibilidad, metadatos de buscadores y un mecanismo protegido de envío de correo.

Se excluyen comercio electrónico, precios publicados, cotizador, carrito, pagos, registro, inicio de sesión, cuentas, portal de clientes, paneles operativos, reservas de recursos, tickets y funcionalidades de los servicios dentro de la web. También quedan fuera blog, noticias, testimonios, casos, descarga del catálogo interno, buscador, filtros, chat, agenda de reuniones, CRM, base de datos de consultas, panel de administración, analítica comercial y selector de idioma o de tema. Los dashboards, usuarios y APIs que mencionan las fichas son entregables de servicios, no funciones del sitio.

## **1.4 Fuentes y jerarquía documental**

| Ref. | Documento de entrada | Versión y localizador |
| :---: | :---- | :---- |
| M | Manual de Marca | 1.2 · 14/10/2026Marca/AntartidaLabs\_Manual\_de\_Marca.docx |
| D | Definición Comercial | 1.1 · 14/10/2026Comercial/AntartidaLabs\_Definicion\_Comercial.docx |
| C | Catálogo de Servicios | 1.1 · 14/10/2026Comercial/AntartidaLabs\_Catalogo\_Servicios.docx |
| V | Visión Institucional | 1.1 · 14/10/2026 · PropuestaComercial/AntartidaLabs\_Vision\_Institucional.docx |

M rige identidad y comunicación; D rige el alcance comercial, subordinada a M; C y V se subordinan a ambas. Las referencias M, D, C y V en este manual remiten exclusivamente a esos cuatro archivos. No se utilizan planes estratégicos, vínculos, archivos asociados ni cifras externas como evidencia sobre la empresa.

Los cuatro documentos describen un modelo previsto. Publicar su descripción no acredita disponibilidad operativa, aprobación institucional, presencia regional, clientes ni certificaciones. C contiene hipótesis económicas y referencias internas de plazos y disponibilidad: no deben trasladarse a la web ni exponerse en archivos públicos, código fuente o metadatos.

## **1.5 Supuestos y decisiones funcionales**

| ID | Decisión adoptada ante información insuficiente |
| :---: | :---- |
| S01 | Una página en español con seis familias y fichas desplegables conserva el catálogo completo sin crear 19 páginas. |
| S02 | La misión no está formulada por separado. Se comunica propósito y visión; no se inventa una misión. |
| S03 | Se adopta tema claro y la guía digital propuesta de M como base de implementación, conservando su estado documental de propuesta. |
| S04 | AI Research LAB es una consulta sobre una solución integrada, no un vigésimo servicio. Se agrega también Consulta general como motivo, no como producto. |
| S05 | Se definen límites de campos, tiempos y controles de abuso como decisiones de este manual; no son compromisos comerciales de AntartidaLabs. |
| S06 | Correo receptor, remitente autorizado y dominio público son parámetros de despliegue sin valores inventados. Su verificación es condición de publicación, no un nuevo relevamiento funcional. |
| S07 | No se agregan teléfono, dirección, redes ni datos legales no acreditados. Se muestra un aviso breve de tratamiento de la consulta, sin afirmar certificación ni cumplimiento jurídico no comprobado. |
| S08 | Sin base de consultas, copia automática ni CRM. Se admite estado temporal con ID, huella con clave, resultado y tiempos para abuso y duplicación, conforme a 6.6–6.7. |
| S09 | Usar AS-01 extraído del Manual de Marca; no exigir SVG externo, crear favicon ni nuevas variantes. Cabecera con nombre textual. |
| S10 | Los contenidos se mantienen mediante los archivos del sitio; no se requiere un gestor de contenidos ni fuentes comerciales remotas. |

## **1.6 Resultado de la auditoría de la versión 1.1**

La revisión conserva el alcance comercial y las 19 fichas, y cierra ocho puntos de implementación. La versión 1.1 reemplaza las reglas de la versión 1.0 en los aspectos indicados; las tablas y pruebas de esta edición ya incorporan las correcciones.

| Cierre | Regla incorporada y comprobación |
| :---- | :---- |
| Contenido | Textos públicos completos, etiquetas de ficha y separación de instrucciones internas. 4.7, 4.9 y 5.1; PA-03/04. |
| Marca | Símbolo recuperable de M, con ubicación y huella; no exige un quinto archivo. 7.1; PA-16. |
| Navegación | Cabecera adhesiva, algoritmo de sección activa y resolución de anclas e historial. 3.3–4.1; PA-01/02/05. |
| Consulta | Reglas del CTA durante envío, incertidumbre y éxito. 4.6 y 6.3; PA-06/10/11. |
| Contrato | Nombres de campos, dos operaciones, respuestas y mensajes definidos. 6.1–6.5; PA-08/09/12/22. |
| Reintentos | Contexto de 30 minutos, estados temporales, huella y conciliación sin nuevo correo. 6.6; PA-10/11/23. |
| Validación | Normalización y conteo idénticos, política de email y cuota verificables. 6.2/6.7; PA-07/12/13. |
| Entrega | LCP y condiciones de prueba precisos, alto contraste y lista cerrada de configuración. 6.9/8.1/10.4; PA-15/18/24. |

# **Capítulo 2 — Descripción de AntartidaLabs**

## **2.1 Presentación institucional**

AntartidaLabs orienta su modelo comercial a integrar entornos de trabajo, cómputo, datos, herramientas, ingeniería y operación para investigación en IA. Busca reducir la carga tecnológica de universidades y grupos científicos mediante una gestión técnica coordinada. AI Research LAB constituye el núcleo previsto de ese modelo. Fuentes: D, introducción y apartados 1–2; M, capítulos 4 y 12\.

## **2.2 Propuesta de valor y diferenciadores**

La propuesta consiste en convertir necesidades de investigación en capacidad tecnológica utilizable. Los beneficios buscados son reducir tareas de selección de proveedores, configuración, accesos y dependencias, preparación de datos y operación; facilitar acceso a especialistas por proyecto y visibilidad de recursos y costos. Son beneficios propuestos, sin porcentajes de mejora ni resultados garantizados. Fuente: D, apartado 1\.

Sus diferenciadores propuestos son la coordinación integral de recursos y proveedores, la contratación modular, la integración con capacidades institucionales existentes y la definición explícita de entregables y responsabilidades. AntartidaLabs complementa a las áreas de tecnologías de la información y comunicaciones (TIC) y a los centros de cómputo de alto rendimiento (HPC). Fuente: D, apartados 2 y 6; V, pilares 2, 4 y 5\.

## **2.3 Visión y propósito**

Contenido público de visión: “Ser el socio tecnológico de referencia para la investigación en Inteligencia Artificial en Argentina y Latinoamérica, haciendo posible que universidades, institutos y grupos científicos accedan a laboratorios de IA integrados, confiables y sostenibles, para que concentren su talento y sus recursos en generar conocimiento y transformar sus resultados en impacto.” Fuente: V, Nuestra visión; también recogida en M, capítulo 4\.

La visión se introduce en el sitio con “Nuestra visión” y “Aspiramos a…”. Argentina es el comienzo previsto; la expansión latinoamericana depende de validar capacidades, referencias, especialistas, operación y viabilidad económica. No se presenta como cobertura actual. El propósito se sintetiza en “Capacidad tecnológica para hacer investigación”, sin rotularlo como misión oficial.

## **2.4 Público objetivo**

Universidades públicas y privadas, grupos y laboratorios académicos, investigadores principales, institutos científicos, centros tecnológicos, equipos de transferencia, consorcios interinstitucionales y spin-offs o emprendimientos surgidos de universidades. Los usuarios técnicos incluyen investigadores, becarios, científicos de datos, ingenieros y desarrolladores. Las decisiones de contratación pueden involucrar dirección de laboratorio, TIC, seguridad, compras y administración. Fuentes: D, apartado 2; V, A quién queremos servir.

## **2.5 Organización de la oferta**

Las tres líneas comerciales son laboratorios administrados de IA; puesta en marcha e integración; e ingeniería y consultoría especializada. No constituyen tres paquetes de compra. AI Research LAB articula el modelo; los 19 servicios se organizan en seis familias detalladas en el capítulo 5\. Las capacidades pueden contratarse individualmente o combinadas, con alcance, compatibilidad, recursos y dependencias verificados. No se exige adquirir un laboratorio completo para consultar por un servicio parcial.

Las propuestas pueden distinguir implementación, gestión recurrente, consumo de recursos y servicios profesionales. Los componentes variables pueden medirse, según alcance, en uso de cómputo, almacenamiento y tráfico o consumo de APIs. La ingeniería y consultoría se acuerdan por sprints, proyectos o paquetes con entregables. No se publican importes ni márgenes internos. Fuente: D, apartado 6; C, apartados 1 y 5\.

## **2.6 Límites que debe conservar la comunicación**

La institución conserva hipótesis, metodología, criterios de validez y conclusiones científicas. La reproducibilidad es técnica y no certifica resultados científicos. Los datos y resultados permanecen bajo control y derechos de sus titulares; código, confidencialidad, permisos, portabilidad y salida se acuerdan. El entrenamiento con datos del cliente requiere autorización expresa. No se promete soporte, capacidad ni recursos ilimitados. Las dependencias de terceros y quién contrata o factura se precisan en cada propuesta. Fuentes: D, apartados 5–6; V, Límites; C, apartado 8\.

# **Capítulo 3 — Arquitectura del sitio**

## **3.1 Mapa del sitio**

Una sola página comercial en la raíz del dominio. Todas las anclas son destinos del mismo documento; no hay páginas por servicio ni descarga de documentos internos.

| Destino | Nombre visible | Contenido y relación |
| :---- | :---- | :---- |
| /\#inicio | Inicio | Titular, síntesis, símbolo y llamada a contacto. |
| /\#propuesta | Propuesta | AI Research LAB, tres líneas y condiciones del modelo. |
| /\#servicios | Servicios | Índice de seis familias y 19 fichas; cada una enlaza al formulario. |
| /\#nosotros | Nosotros | Públicos, visión, seis pilares y límites institucionales. |
| /\#contacto | Contacto | Formulario y aviso de privacidad de la consulta. |
| /\#privacidad | Uso de tus datos | Bloque dentro de contacto; acceso adicional desde el pie. |

## **3.2 Menú y relaciones entre secciones**

La cabecera es adhesiva y conserva su espacio en el flujo. Contiene AntartidaLabs → \#inicio y, en orden, Propuesta, Servicios, Nosotros y Contacto. El salto al contenido es el primer control. En móvil, expandir el panel aumenta su altura y desplaza el contenido, sin modal ni botón de contacto duplicado.

Inicio ofrece “Explorar servicios” → \#servicios y “Conversar sobre el proyecto” → \#contacto. Propuesta enlaza a familias y permite consultar AI Research LAB. Las fichas preseleccionan interés; Nosotros cierra con CTA general. Las reglas de consulta son las de 4.6.

## **3.3 Índice de familias y anclas profundas**

Índice: \#familia-a a \#familia-f, con nombres del capítulo 5\. Fichas: \#servicio-01 a \#servicio-19. Resolver fragmentos al cargar, activar enlaces, cambiar fragmento y usar Atrás/Adelante. El destino de servicio abre su ficha y sitúa el título bajo cabecera; no cierra otras ni selecciona interés. Familia solo navega. Un fragmento desconocido no bloquea la página ni cambia datos.

## **3.4 Navegación y adaptación móvil**

Los enlaces actualizan fragmento e historial; los botones de detalle y el desplazamiento manual no lo hacen. Margen del destino: altura real de cabecera más 16 px, recalculado al cambiar menú, ancho o texto. Activar con teclado enfoca el encabezado; desplazamiento manual e historial no fuerzan foco. Ningún destino ni control enfocado queda tapado.

Activo: último inicio de sección que cruza la línea a altura de cabecera más 16 px. Antes de Propuesta, ninguno. Familias y fichas cuentan como Servicios; privacidad como Contacto. Al final de página, Contacto. Solo el enlace activo lleva línea de 2 px y aria-current="location"; actualizarlo no cambia foco o URL.

Desde 768 px, enlaces en línea; debajo, botón “Abrir navegación” de al menos 44 × 44 px y panel dentro del flujo. El índice de familias admite varias líneas sin arrastre horizontal. Grillas en 7.4 y comportamiento de menú en 4.1.

# **Capítulo 4 — Especificación funcional**

## **4.1 Cabecera y navegación compacta**

La cabecera adhesiva tiene alto mínimo de 64 px, superficie blanca y nombre textual. Su comportamiento se rige por 3.2–3.4. “Saltar al contenido” se hace visible al recibir foco y enfoca el inicio del contenido principal. El símbolo detallado no se reduce para colocarlo en esta barra.

En móvil, el botón muestra “Abrir navegación” al estar cerrado y “Cerrar navegación” al estar abierto, con aria-expanded y aria-controls. Abrir conserva foco en el botón; Tab llega al primer enlace y no hay trampa de foco. Escape cierra y vuelve al botón. Seleccionar enlace cierra y enfoca destino. Un clic fuera cierra sin robar el foco al control activado. En escritorio la lista siempre es visible y se retira el botón compacto del recorrido. Sin mejora interactiva la lista queda visible en el flujo. Si el botón compacto tenía foco al pasar a escritorio, transferirlo al primer enlace de navegación; si estaba en un enlace, conservarlo. Cerrar pulsando el propio botón mantiene el foco en él.

## **4.2 Inicio**

H1 público: “Capacidad tecnológica para investigar en IA”. Párrafo público: “AntartidaLabs aspira a acompañar a universidades y grupos científicos con capacidad tecnológica administrada para investigar en inteligencia artificial (IA). El modelo previsto reúne infraestructura, ingeniería de datos e IA y operación tecnológica, con alcance acordado y control institucional de los resultados.” Mantener esta expansión de la sigla en la primera exposición del inicio. Fuente: M, capítulos 10 y 12; D, apartado 1\.

Acción primaria: “Conversar sobre el proyecto”, consulta general. Acción secundaria: “Explorar servicios”, ancla \#servicios. El símbolo original completo acompaña el texto sobre blanco con las reglas del capítulo 7\. No hay video, carrusel, contadores, clientes, certificaciones ni fotografía de instalaciones supuestamente propias.

## **4.3 Propuesta y AI Research LAB**

H2: “Una capacidad de investigación integrada”. Introducción pública: “AI Research LAB es el núcleo previsto de un modelo que integra entornos de trabajo, acceso a cómputo, gestión de datos, herramientas para experimentar, seguridad, trazabilidad de costos y soporte. Cada propuesta dimensiona recursos y confirma capacidades y condiciones.” Fuente: D, apartado 2\.

| Bloque | Texto público y acción |
| :---- | :---- |
| Laboratorios administrados de IA | Entornos, datos, cómputo, herramientas y operación coordinados según las necesidades del equipo. Acción Consultar por AI Research LAB → contacto con interés lab. |
| Puesta en marcha e integración | Preparación de proyectos nuevos e integración de plataformas e infraestructura existentes. Acción Ver inicio e integración → \#familia-a; enlace complementario Hybrid Research → \#servicio-07. |
| Ingeniería y consultoría especializada | Ingeniería de datos e IA, preparación de datasets, reproducibilidad técnica, modelos y asesoramiento con entregables definidos. Acción Ver ingeniería y consultoría → \#familia-f; enlace Datos e ingeniería → \#familia-c. |

Debajo se publica: “Las capacidades pueden contratarse individualmente o combinarse. No es necesario contratar un laboratorio completo. El alcance identifica recursos, dependencias, soporte y responsabilidades, y puede integrar capacidades institucionales compatibles.” Se añade: “AntartidaLabs coordina proveedores como intermediario tecnológico y comercial. Cada propuesta define quién contrata y factura los recursos de terceros.” Fuente: D, apartados 2 y 6\.

## **4.4 Modelo comercial dentro de la propuesta**

Subtítulo: “De la necesidad a una propuesta”. Secuencia informativa de cuatro pasos: 1\) conversar sobre la necesidad de investigación; 2\) relevar recursos existentes y verificar capacidades y disponibilidad; 3\) acordar alcance, cotización y responsabilidades; 4\) implementar o prestar lo contratado. Son textos sin controles de contratación ni agenda automática.

Texto público: “La cotización depende del alcance y del consumo. La propuesta distingue implementación, gestión recurrente, recursos variables y servicios profesionales, con inclusiones y límites definidos. El cómputo, el almacenamiento, el tráfico y las APIs se dimensionan según el proyecto. Los componentes compartidos de una solución combinada no deben duplicar cargos.” Fuente: D, apartado 6; C, apartado 5\.

## **4.5 Catálogo y detalles desplegables**

H2: “Servicios para cada necesidad de investigación”. Se muestran todas las familias y las 19 tarjetas, en el orden del capítulo 5\. Sobre el índice se publica: “Este catálogo describe el modelo previsto. Cada propuesta confirma disponibilidad, recursos, entregables, dependencias y condiciones. La descripción no acredita por sí sola disponibilidad operativa.” La advertencia queda visible también cuando las fichas están cerradas.

Cada tarjeta contiene nombre corto, descripción y dos controles separados: “Ver detalle” y “Solicitar información”. El detalle incluye características, beneficio esperado, destinatarios, entregables y condiciones. La tarjeta no es un enlace envolvente ni un área de clic invisible. Los textos no se truncan con puntos suspensivos ni se limitan a hover.

Al cargar, los 19 detalles están cerrados, salvo la ficha indicada por un fragmento válido. “Ver detalle” es un botón con nombre accesible “Ver detalle de \[nombre\]”, aria-expanded y aria-controls; abierto muestra “Ocultar detalle” y el nombre accesible equivalente. El panel aparece en el flujo después de los controles. Se admiten varios abiertos. Alternar no mueve foco, no cambia el interés ni modifica la URL. Enter y Espacio alternan. Cerrar mantiene foco en el botón; cualquier ocultación externa devuelve foco allí si estaba dentro del panel. Sin mejora interactiva se ven todos los detalles completos.

“Solicitar información” tiene nombre accesible “Solicitar información sobre \[nombre\]”. Las tarjetas son artículos informativos; sus únicos elementos activables son los dos controles. En una misma fila se alinean al inicio; abrir detalle aumenta la altura de la fila y admite espacio libre en las otras tarjetas, sin estirar su contenido ni recortarlo.

## **4.6 Transferencia al contacto**

En formulario editable, “Solicitar información” aplica el ID de la ficha, desplaza a \#contacto y enfoca el selector. “Consultar por AI Research LAB” aplica lab. “Conversar sobre el proyecto” conserva cualquier interés válido existente; si el selector está vacío, aplica general. Contacto del menú solo navega y conserva el estado. Nunca se completa ni sustituye el mensaje del visitante. El cambio de interés anuncia una vez “Interés seleccionado: \[nombre visible\]”.

Se conservan nombre, empresa, email y mensaje al cambiar de interés. En preparación o renovación de contexto, los CTA pueden seleccionar interés y conservan los datos. Mientras se envía o se verifica una solicitud, un CTA solo lleva a contacto y enfoca el estado: no cambia la instantánea en curso y muestra “Esperá a que termine el envío para iniciar otra consulta”. Después del éxito, un CTA comercial abre un formulario vacío con contexto nuevo y aplica su interés; Contacto del menú conserva la confirmación. En error o incertidumbre, un CTA puede cambiar interés, pero la siguiente consulta usa contexto nuevo y mantiene visible cualquier advertencia de posible envío anterior. Ninguna de estas acciones envía automáticamente.

Los datos no se incorporan a URL, almacenamiento local ni sesión del navegador. Recargar o abandonar la página descarta el borrador de la aplicación; no se agrega aviso de salida ni guardado automático. La restauración que haga el navegador no constituye persistencia implementada por el sitio. Si restaura campos, se obtiene un contexto nuevo antes de enviar y se vuelve a validar todo.

## **4.7 Nosotros**

H2 público: “Investigación primero”. Introducción pública: “Aspiramos a conectar investigación, ingeniería y operación tecnológica para que los equipos científicos concentren sus recursos en generar conocimiento. La institución y sus investigadores conservan la conducción científica y el control de sus resultados.” Subtítulo “A quién queremos acompañar”. Texto público: “Nuestra propuesta se dirige a universidades públicas y privadas, grupos y laboratorios académicos, institutos científicos, centros tecnológicos, equipos de transferencia, consorcios interinstitucionales y emprendimientos surgidos de universidades.” Fuentes: D, apartados 1–2; V.

Subtítulo público “Nuestra visión”. Texto público: “Aspiramos a ser el socio tecnológico de referencia para la investigación en inteligencia artificial en Argentina y Latinoamérica, haciendo posible que universidades, institutos y grupos científicos accedan a laboratorios de IA integrados, confiables y sostenibles, para que concentren su talento y sus recursos en generar conocimiento y transformar sus resultados en impacto.” Es una adaptación aspiracional de V; no declara liderazgo actual.

Seis bloques informativos presentan los siguientes pilares, derivados de V. No son botones ni tarjetas con estados de selección.

**Investigación primero.** Toda decisión tecnológica se evalúa por su contribución al trabajo del investigador y a la generación de conocimiento.

**Socio tecnológico integral.** Un interlocutor coordina recursos, proveedores, plataformas, operación e ingeniería; la consultoría se incluye cuando está contratada.

**Laboratorio como servicio.** AI Research LAB es el núcleo previsto, con entornos de trabajo, recursos dimensionados, soporte y trazabilidad de costos.

**Confianza y control institucional.** Seguridad, privacidad, titularidad, reproducibilidad técnica y portabilidad se acuerdan según alcance y derechos aplicables.

**Colaboración con las universidades.** El modelo busca integrar infraestructura, identidad y capacidades existentes, complementando a TIC y HPC.

**Crecimiento responsable.** La ampliación de alcance y presencia regional depende de referencias reales, automatización comprobada, especialistas y viabilidad.

Subtítulo público “Responsabilidades y control institucional”. Texto público: “La ingeniería y la operación acompañan la investigación; las hipótesis, la metodología y las conclusiones corresponden al equipo científico. La seguridad, la confidencialidad, el uso autorizado de datos, la titularidad y la exportación de datos, código y artefactos se precisan en cada acuerdo. La reproducibilidad es técnica y no valida conclusiones científicas.” Subtítulo público “Crecimiento responsable”. Texto público: “Argentina es nuestro punto de partida previsto. La expansión a Latinoamérica estará sujeta a validar capacidades, referencias, especialistas disponibles, condiciones de operación y viabilidad económica.” CTA: “Conversar sobre el proyecto”.

## **4.8 Contacto y pie**

H2: “Conversemos sobre tu proyecto”. Introducción: “Contanos qué necesitás investigar y qué recursos tenés disponibles. Evaluaremos el alcance y las condiciones que podrían incorporarse a una propuesta.” Se presenta el formulario del capítulo 6 con los cinco campos y un único botón “Enviar consulta”. No se fija un plazo de respuesta comercial.

El pie identifica AntartidaLabs y enlaza a \#inicio y \#privacidad. No contiene enlaces vacíos ni iconos de redes sin destino verificado. El símbolo del inicio no es interactivo y usa alternativa “AntartidaLabs”. El resto de elementos decorativos se ocultan a tecnologías de asistencia.

## **4.9 Orden de composición y contenido visible**

| Región | Orden obligatorio dentro de la página |
| :---- | :---- |
| Cabecera | Salto al contenido; nombre enlazado; navegación o botón compacto. Panel móvil dentro de la cabecera. |
| Inicio | H1; párrafo de 4.2; CTA primario y secundario. Símbolo a la derecha en escritorio y después de los CTA en móvil. |
| Propuesta | H2 e introducción; tres bloques en el orden de 4.3; párrafos de modularidad e intermediación; subtítulo y cuatro pasos; texto de cotización. |
| Servicios | H2; advertencia de modelo previsto; índice de seis familias; familia A a F y servicios 01 a 19\. Ninguna tarjeta se oculta mediante filtro. |
| Nosotros | H2 e introducción; público; visión; seis pilares en el orden de 4.7; responsabilidades; geografía; CTA. |
| Contacto | H2 e introducción; aviso de obligatorios; cinco campos; aviso de datos; botón; estado o resultado. El bloque de datos tiene subtítulo “Uso de tus datos”. |
| Pie | Nombre AntartidaLabs; enlaces “Inicio” y “Uso de tus datos”. No se agrega información no documentada. |

Los tres bloques de Propuesta y los seis pilares se muestran en tres columnas desde 1200 px, dos desde 768 px y una en móvil, conservando el orden de lectura. El inicio usa dos columnas desde 768 px, texto primero, y una debajo de ese ancho. Solo la cabecera es adhesiva; no hay barras flotantes de contacto. El ancho de lectura y el formulario se limitan según 7.3–7.4. No se añaden imágenes de banco ni textos, slogans o secciones ajenos a este inventario.

# **Capítulo 5 — Catálogo de productos y servicios**

## **5.1 Organización y reglas editoriales**

Se conserva el inventario de 19 servicios de C, fichas 01–19, y sus seis familias. Los títulos de familia siguen las denominaciones descriptivas de C. Las fichas siguientes contienen el texto comercial base que debe presentar el sitio. Los beneficios son resultados buscados derivados del problema descrito, sin garantía cuantitativa. Todas las fichas heredan la advertencia de disponibilidad del apartado 4.5.

| Familia | Denominación | Servicios |
| :---: | :---- | :---- |
| A | Inicio e integración | 01–03 |
| B | Infraestructura y plataforma | 04–07 |
| C | Datos e ingeniería | 08–10 |
| D | Experimentación, MLOps y modelos | 11–14 |
| E | Operación, seguridad y soporte | 15–17 |
| F | Ingeniería especializada y consultoría | 18–19 |

Se utiliza un único registro de catálogo para tarjetas, paneles, anclas y opciones del formulario: ID estable, nombre corto, familia y campos de contenido. El nombre completo es AntartidaLabs más el nombre corto; la tarjeta usa el corto para evitar repeticiones. No se importan los campos internos de costo, precio, margen, escalabilidad, demanda, automatización, perfiles ni SLA hipotéticos.

### **5.1.1 Contrato de publicación de las fichas**

Tarjeta cerrada: nombre corto y descripción, sin prefijo “Descripción”; familia visible una sola vez como encabezado de grupo; botones “Ver detalle” y “Solicitar información”. Panel abierto: publicar las etiquetas “Características principales”, “Beneficios esperados”, “Para quién”, “Entregables” y “Condiciones y límites”, seguidas por los textos de la ficha. La modalidad de contratación forma parte de Condiciones y límites. El nombre es el encabezado de la ficha, no otra etiqueta repetida.

Las líneas “ID servicio-NN | Familia | Fuente…” y “Consulta → interés…” son metadatos internos: no se renderizan como contenido comercial. El CTA de Consulta se implementa según 4.6. No mostrar los números 5.2.N ni referencias C/D en el sitio. Los nombres y descripciones de las 19 fichas siguientes son definitivos para esta edición; sus valores de ID 01–19 alimentan el selector y el correo sin otra tabla manual.

## **5.2 Fichas comerciales**

### **5.2.1 Research Launch**

ID servicio-01  |  Familia A  |  Fuente C, ficha 01; D, descripción del servicio.

**Descripción.** Preparación tecnológica de un nuevo proyecto de IA.

**Características.** Relevamiento; dimensionamiento de cómputo; arquitectura; selección e integración de recursos; configuración inicial de herramientas y seguridad básica; pruebas y capacitación.

**Beneficio esperado.** Reducir la carga de preparación tecnológica para comenzar el proyecto con un entorno definido.

**Destinatarios.** Investigadores principales, directores de laboratorio y grupos que inician un proyecto con financiación.

**Entregables.** Arquitectura, presupuesto, entorno operativo, inventario técnico, accesos y manual.

**Condiciones y límites.** Proyecto de implementación. No incluye investigación científica, datasets pagos, entrenamiento completo ni desarrollos extensos a medida.

**Consulta.** “Solicitar información” → interés 01 y formulario \#contacto.

### **5.2.2 Research Integration**

ID servicio-02  |  Familia A  |  Fuente C, ficha 02; D, descripción del servicio.

**Descripción.** Integración de proveedores, infraestructura y plataformas de un laboratorio existente.

**Características.** Diagnóstico y arquitectura; identidades y accesos; conectividad; recursos de nube; repositorios; herramientas de operación de aprendizaje automático y automatización.

**Beneficio esperado.** Conectar recursos heterogéneos y organizar accesos y herramientas según el proyecto.

**Destinatarios.** Laboratorios en marcha y áreas TIC universitarias.

**Entregables.** Diagramas, configuraciones e integraciones implementadas, pruebas, documentación y matriz de integración.

**Condiciones y límites.** Proyecto con mantenimiento opcional acordado. No supone renovar toda la infraestructura ni desarrollar componentes extensos no presupuestados.

**Consulta.** “Solicitar información” → interés 02 y formulario \#contacto.

### **5.2.3 One Stop Research IT**

ID servicio-03  |  Familia A  |  Fuente C, ficha 03; D, descripción del servicio.

**Descripción.** Coordinación operativa de proveedores mediante un interlocutor tecnológico.

**Características.** Comparación técnica; seguimiento de incidentes, consumos, inventario y cambios; coordinación y reportes.

**Beneficio esperado.** Reducir la dispersión de gestiones tecnológicas que recaen en el equipo de investigación.

**Destinatarios.** Investigadores principales, directores de laboratorio e instituciones.

**Entregables.** Inventario de proveedores, matriz de responsabilidades, panel de seguimiento e informes de costos e incidentes según alcance.

**Condiciones y límites.** Abono de coordinación con alcance definido, independiente o integrado. No incluye representación legal, asesoramiento jurídico de compras, garantías propias sobre terceros ni financiación ilimitada.

**Consulta.** “Solicitar información” → interés 03 y formulario \#contacto.

### **5.2.4 Research Workspace**

ID servicio-04  |  Familia B  |  Fuente C, ficha 04; D, descripción del servicio.

**Descripción.** Entornos de trabajo administrados para investigadores y desarrolladores.

**Características.** Notebooks y herramientas de programación, repositorios, dependencias, imágenes de contenedor, gestión de usuarios y mantenimiento.

**Beneficio esperado.** Reducir instalaciones y resolución manual de dependencias en cada equipo.

**Destinatarios.** Investigadores, becarios y equipos de aprendizaje automático.

**Entregables.** Espacios operativos, cuentas, plantillas y documentación.

**Condiciones y límites.** Puesta en marcha, gestión recurrente y recursos dimensionados. GPU y licencias comerciales no se presuponen incluidas; no comprende cambios extensos de código científico ni soporte ilimitado.

**Consulta.** “Solicitar información” → interés 04 y formulario \#contacto.

### **5.2.5 GPU Compute**

ID servicio-05  |  Familia B  |  Fuente C, ficha 05; D, descripción del servicio.

**Descripción.** Aprovisionamiento y gestión de GPU externas como capacidad de investigación administrada.

**Características.** Selección de hardware; configuración del entorno; creación y parada de recursos; cuotas; medición, alertas y coordinación de proveedores.

**Beneficio esperado.** Facilitar la selección, operación y seguimiento del consumo de cómputo para investigación.

**Destinatarios.** Grupos de aprendizaje profundo, visión por computadora, procesamiento del lenguaje natural e IA generativa.

**Entregables.** Entornos GPU, panel de consumo y reportes acordados.

**Condiciones y límites.** Gestión más consumo GPU, individual o combinada según recursos, compatibilidad y dependencias verificados. No incluye capacidad ilimitada, reservas no contratadas ni garantías de rendimiento científico. La GPU es un recurso integrado.

**Consulta.** “Solicitar información” → interés 05 y formulario \#contacto.

### **5.2.6 Research Storage**

ID servicio-06  |  Familia B  |  Fuente C, ficha 06; D, descripción del servicio.

**Descripción.** Almacenamiento y protección de datasets, modelos y artefactos.

**Características.** Espacios de almacenamiento; permisos; versionado; políticas de retención; copias de seguridad, monitoreo y pruebas de restauración según plan.

**Beneficio esperado.** Organizar los datos y disponer de procedimientos de protección y recuperación acordados.

**Destinatarios.** Grupos que trabajan con datasets y puntos de control de modelos.

**Entregables.** Almacenamiento operativo, política, inventario y procedimiento de restauración.

**Condiciones y límites.** Puesta en marcha, abono y consumo de almacenamiento y tráfico. Retención y recuperación se pactan; no se ofrece retención perpetua, capacidad ilimitada ni recuperación de datos no protegidos.

**Consulta.** “Solicitar información” → interés 06 y formulario \#contacto.

### **5.2.7 Hybrid Research**

ID servicio-07  |  Familia B  |  Fuente C, ficha 07; D, descripción del servicio.

**Descripción.** Integración con infraestructura, identidad y cómputo propios de la institución.

**Características.** Relevamiento; arquitectura híbrida; identidades; conectividad; integración con HPC; pruebas y manuales.

**Beneficio esperado.** Aprovechar capacidades institucionales existentes e integrarlas con los servicios compatibles.

**Destinatarios.** Universidades, institutos y laboratorios con servidores o recursos propios.

**Entregables.** Arquitectura híbrida, integraciones implementadas, pruebas y procedimientos.

**Condiciones y límites.** Proyecto y mantenimiento opcional coordinado con TIC. No incluye renovación de servidores, reparación física ni administración general de redes institucionales.

**Consulta.** “Solicitar información” → interés 07 y formulario \#contacto.

### **5.2.8 Research Data Platform**

ID servicio-08  |  Familia C  |  Fuente C, ficha 08; D, descripción del servicio.

**Descripción.** Organización y gestión técnica de datasets científicos.

**Características.** Catálogo; versiones; metadatos; permisos; trazabilidad del origen y transformaciones; integración con almacenamiento y entornos de trabajo.

**Beneficio esperado.** Facilitar la localización, el control y la trazabilidad técnica de datos compartidos.

**Destinatarios.** Investigadores principales, científicos de datos y grupos colaborativos.

**Entregables.** Plataforma configurada, catálogo inicial y documentación.

**Condiciones y límites.** Puesta en marcha, gestión recurrente y almacenamiento según alcance. No incluye adquisición de datos comerciales, curación científica exhaustiva ni evaluación de pertinencia científica.

**Consulta.** “Solicitar información” → interés 08 y formulario \#contacto.

### **5.2.9 Data Engineering**

ID servicio-09  |  Familia C  |  Fuente C, ficha 09; D, descripción del servicio.

**Descripción.** Diseño, implementación y mantenimiento acordado de pipelines de datos.

**Características.** Ingesta y conectores; integración con APIs; transformación; validaciones; procesamiento; automatización y orquestación; pruebas y documentación.

**Beneficio esperado.** Reducir tareas repetitivas de integración y procesamiento de fuentes heterogéneas.

**Destinatarios.** Grupos con fuentes diversas o datasets de gran volumen.

**Entregables.** Pipelines probados, código, pruebas, documentación y métricas técnicas.

**Condiciones y límites.** Proyecto o servicio con mantenimiento y evolución acordados. Se delimitan fuentes y recursos; no incluye interpretación científica ni fuentes ilimitadas.

**Consulta.** “Solicitar información” → interés 09 y formulario \#contacto.

### **5.2.10 Data Preparation**

ID servicio-10  |  Familia C  |  Fuente C, ficha 10; D, descripción del servicio.

**Descripción.** Preparación de datasets mediante calidad, limpieza, normalización y anotación.

**Características.** Perfilado; tratamiento de duplicados; normalización; herramientas y operación de anotaciones; reportes de calidad.

**Beneficio esperado.** Disponer de datos preparados con transformaciones registradas para el trabajo del equipo.

**Destinatarios.** Proyectos de visión por computadora, lenguaje natural, audio y series temporales.

**Entregables.** Dataset preparado, informe de calidad y registro de transformaciones.

**Condiciones y límites.** Proyecto, lote o unidad con volumen y criterios acordados. Los criterios científicos y de etiquetado experto se acuerdan con el investigador; no se define ni valida la verdad científica en su reemplazo.

**Consulta.** “Solicitar información” → interés 10 y formulario \#contacto.

### **5.2.11 Research MLOps**

ID servicio-11  |  Familia D  |  Fuente C, ficha 11; D, descripción del servicio.

**Descripción.** Herramientas y operación para gestionar experimentos, modelos y artefactos.

**Características.** Registro de experimentos; registros de modelos y artefactos; comparación; notebooks; flujos base de aprendizaje automático y mantenimiento.

**Beneficio esperado.** Mejorar la trazabilidad y organización técnica de la experimentación recurrente.

**Destinatarios.** Grupos con entrenamiento recurrente de modelos.

**Entregables.** Plataforma configurada, proyectos integrados, flujos base y documentación.

**Condiciones y límites.** Puesta en marcha y abono según alcance. No implica entrenamiento operado por AntartidaLabs, algoritmos a medida ni garantía de precisión de los modelos.

**Consulta.** “Solicitar información” → interés 11 y formulario \#contacto.

### **5.2.12 Reproducible Research**

ID servicio-12  |  Familia D  |  Fuente C, ficha 12; D, descripción del servicio.

**Descripción.** Empaquetado técnico de experimentos para facilitar su reconstrucción y nueva ejecución.

**Características.** Registro de código, datos, dependencias, contenedor, parámetros, semillas y hardware; prueba de nueva ejecución.

**Beneficio esperado.** Facilitar la reconstrucción de las condiciones técnicas de un experimento.

**Destinatarios.** Grupos que publican resultados o colaboran con otros equipos.

**Entregables.** Paquete de reproducibilidad técnica y evidencia de ejecución.

**Condiciones y límites.** Proyecto con mantenimiento opcional. La aceptación considera condiciones y tolerancias acordadas; no constituye certificación científica, validación de hipótesis ni identidad numérica garantizada.

**Consulta.** “Solicitar información” → interés 12 y formulario \#contacto.

### **5.2.13 Model Access**

ID servicio-13  |  Familia D  |  Fuente C, ficha 13; D, descripción del servicio.

**Descripción.** Acceso integrado a modelos comerciales y de código abierto mediante una puerta común.

**Características.** Integraciones; credenciales y permisos; cuotas; métricas de uso; enrutamiento y plantillas; componentes básicos de recuperación de información según alcance.

**Beneficio esperado.** Centralizar accesos y medición de uso de modelos que de otro modo quedarían dispersos.

**Destinatarios.** Investigación con grandes modelos de lenguaje, lenguaje natural, recuperación de información e interacción multimodal.

**Entregables.** Puerta de acceso configurada, catálogo de modelos, permisos y reportes de consumo.

**Condiciones y límites.** Puesta en marcha, gestión y consumo acordados. APIs e inferencia se dimensionan en la propuesta; no se presuponen incluidos sus consumos, garantías de terceros, soluciones personalizadas de recuperación ni evaluación científica.

**Consulta.** “Solicitar información” → interés 13 y formulario \#contacto.

### **5.2.14 Model Deployment**

ID servicio-14  |  Familia D  |  Fuente C, ficha 14; D, descripción del servicio.

**Descripción.** Publicación técnica de modelos como APIs, demostradores o servicios de inferencia.

**Características.** Empaquetado; despliegue; contenedores; integración y entrega continuas; gestión de versiones; monitoreo y documentación.

**Beneficio esperado.** Hacer accesible un modelo o prototipo para su evaluación y uso dentro del alcance acordado.

**Destinatarios.** Equipos de transferencia, emprendimientos universitarios y proyectos colaborativos.

**Entregables.** Servicio o demostrador funcional, código de despliegue y API documentada.

**Condiciones y límites.** Puesta en marcha, operación e infraestructura acordadas. No incluye producto empresarial completo, interfaz compleja, escala masiva ni guardia permanente.

**Consulta.** “Solicitar información” → interés 14 y formulario \#contacto.

### **5.2.15 Research Security**

ID servicio-15  |  Familia E  |  Fuente C, ficha 15; D, descripción del servicio.

**Descripción.** Configuración y administración de controles de seguridad e identidad para laboratorios.

**Características.** Accesos e identidad; autenticación reforzada y permisos por rol; secretos; segmentación; registros de actividad y controles técnicos de vulnerabilidades.

**Beneficio esperado.** Reducir la exposición de datos, credenciales, repositorios y recursos compartidos mediante controles definidos.

**Destinatarios.** Universidades y laboratorios que necesitan controles sobre datos y recursos sensibles.

**Entregables.** Configuraciones, matriz de accesos, inventario, arquitectura y evidencia de controles implementados.

**Condiciones y límites.** Proyecto más gestión acordada. Los requisitos adicionales dependen del entorno; no incluye asesoría jurídica, certificaciones ni cumplimiento integral de toda la institución.

**Consulta.** “Solicitar información” → interés 15 y formulario \#contacto.

### **5.2.16 Research Cost Control**

ID servicio-16  |  Familia E  |  Fuente C, ficha 16; D, descripción del servicio.

**Descripción.** Seguimiento y gestión del gasto tecnológico de los recursos contratados.

**Características.** Presupuestos; cuotas; alertas; consumo por proyecto o usuario; apagado acordado; recomendaciones e informes.

**Beneficio esperado.** Facilitar el seguimiento de consumos y el ajuste de recursos al presupuesto del proyecto.

**Destinatarios.** Investigadores principales y responsables de administrar fondos.

**Entregables.** Panel, alertas, reportes y presupuestos parametrizados.

**Condiciones y límites.** Puesta en marcha y abono. Se limita a recursos incluidos y datos disponibles de proveedores; no comprende contabilidad general, auditoría financiera ni garantía de ahorro.

**Consulta.** “Solicitar información” → interés 16 y formulario \#contacto.

### **5.2.17 Research Helpdesk**

ID servicio-17  |  Familia E  |  Fuente C, ficha 17; D, descripción del servicio.

**Descripción.** Soporte especializado y capacitación acordada para herramientas de investigación.

**Características.** Atención de consultas e incidentes de accesos, notebooks, contenedores y herramientas de experimentación; diagnóstico, guías e incorporación de usuarios.

**Beneficio esperado.** Reducir el tiempo del investigador dedicado a resolver dificultades de acceso y herramientas.

**Destinatarios.** Usuarios de laboratorio y equipos externos con alcance de soporte contratado.

**Entregables.** Consultas e incidentes atendidos, base de conocimiento y capacitaciones registradas según acuerdo.

**Condiciones y límites.** Abono con volumen acotado y sesiones acordadas. Cobertura y tiempos se definen en la propuesta. No incluye programación ilimitada, corrección integral de código científico ni consultoría avanzada de IA.

**Consulta.** “Solicitar información” → interés 17 y formulario \#contacto.

### **5.2.18 AI Engineering**

ID servicio-18  |  Familia F  |  Fuente C, ficha 18; D, descripción del servicio.

**Descripción.** Implementación y optimización técnica de componentes de IA.

**Características.** Pipelines de entrenamiento e inferencia; integración de modelos y herramientas; APIs; recuperación aumentada de información; optimización de GPU; pruebas y documentación.

**Beneficio esperado.** Aportar ingeniería especializada a equipos de investigación con necesidades técnicas delimitadas.

**Destinatarios.** Investigadores principales, centros y emprendimientos universitarios.

**Entregables.** Código, componentes funcionales, pruebas y manuales por sprint o proyecto.

**Condiciones y límites.** Sprints o proyectos con entregables y dedicación definidos. No incluye hipótesis ni conclusiones científicas, rendimiento garantizado ni cesión implícita de propiedad intelectual.

**Consulta.** “Solicitar información” → interés 18 y formulario \#contacto.

### **5.2.19 AI Research Consulting**

ID servicio-19  |  Familia F  |  Fuente C, ficha 19; D, descripción del servicio.

**Descripción.** Asesoramiento técnico sobre IA y preparación para una eventual transferencia tecnológica.

**Características.** Evaluación técnica de modelos; estrategias de ajuste; arquitecturas; comparación de desempeño; revisión y madurez de prototipos; demostradores y documentación.

**Beneficio esperado.** Acceder a especialistas para decisiones técnicas puntuales sin incorporar un equipo permanente.

**Destinatarios.** Investigadores principales, laboratorios, centros y spin-offs universitarios.

**Entregables.** Diagnósticos, recomendaciones, diseños, evaluaciones técnicas o paquetes técnicos de transferencia.

**Condiciones y límites.** Diagnóstico, paquete o abono delimitado. No sustituye hipótesis, validación de conclusiones ni autoría científica; no incluye asesoría legal o de patentes ni garantiza transferencia comercial.

**Consulta.** “Solicitar información” → interés 19 y formulario \#contacto.

## **5.3 Mecanismo de consulta comercial**

Todas las tarjetas admiten consultar sin abrir el detalle. El selector reproduce los 19 nombres en el mismo orden, agrupados por familia, además de AI Research LAB y Consulta general. Estos dos motivos se identifican separadamente para no aumentar el número de servicios. No se exige elegir una combinación ni completar un presupuesto. Una propuesta comercial posterior verifica la disponibilidad y el alcance solicitado.

# **Capítulo 6 — Formulario de contacto**

## **6.1 Campos y contrato de datos**

Texto público previo a los campos: “Los campos marcados con \* son obligatorios”. Mostrar etiquetas persistentes en el orden siguiente. Los límites y la normalización de 6.2 rigen en navegador y servidor; el servidor es la validación definitiva. Todos los valores son cadenas de texto y empresa vacía se representa como cadena vacía.

| Nombre de dato | Etiqueta y tipo | Regla |
| :---- | :---- | :---- |
| nombre | Nombre y apellido \*Texto | Obligatorio, 2–120 caracteres; autocomplete=name. No exigir dos palabras ni limitar a letras ASCII. |
| empresa | Empresa / InstituciónTexto | Opcional, 0–160; autocomplete=organization. |
| email | Correo electrónico \*Email | Obligatorio, hasta 254; política de 6.2; autocomplete=email. |
| interes | Producto o servicio de interés \*Selección única | Obligatorio; valores general, lab y 01–19. Placeholder “Elegí una opción”, valor vacío inválido. |
| mensaje | Mensaje \*Multilínea | Obligatorio, 10–3000. Altura inicial 120 px y redimensionado vertical sin recorte. |

Ayuda pública del mensaje: “Contanos el objetivo de investigación y tu necesidad tecnológica. No incluyas contraseñas, datos sensibles ni datasets”. El selector muestra “Consulta general” y “AI Research LAB — solución integrada” primero; luego seis grupos con las familias y sus servicios en orden 01–19. Las etiquetas de opciones son los nombres cortos, sin numeración ni disponibilidad. La carga directa de contacto deja el selector vacío. Un CTA puede preseleccionarlo según 4.6.

Campos técnicos no visibles: submission\_id, form\_token y website. submission\_id es un ID de 128 bits aleatorio del servidor, expresado en 32 caracteres hexadecimales minúsculos. form\_token es opaco para el cliente, firmado y vinculado a ID y vencimiento. website es el campo trampa y debe permanecer vacío. No contiene datos de usuario, no se anuncia ni se recorre con teclado y tiene autocompletado desactivado. No agregar campos públicos, adjuntos, consentimiento comercial ni presupuesto.

## **6.2 Normalización y validaciones**

Aplicar en este orden: normalización Unicode NFC; convertir CRLF y CR del mensaje a LF; recortar espacios exteriores, tabulación, CR, LF y espacio no separable; convertir únicamente el dominio del email a minúsculas; contar puntos de código Unicode, sin contar bytes ni unidades UTF-16. No colapsar espacios internos ni cambiar mayúsculas del nombre, empresa, mensaje o parte local del email. El mismo texto normalizado se valida, se envía y se usa para la huella temporal. No truncar nombres, empresa o mensaje con límites que cuenten unidades UTF-16: validar el texto completo por puntos de código y mostrar error cuando exceda el máximo.

Rechazar U+0000–U+001F y U+007F–U+009F, excepto tabulación U+0009 y LF U+000A dentro del mensaje. No imponer al nombre un patrón que excluya acentos, apóstrofos, guiones o escrituras no latinas. El contenido se maneja como texto plano: no se interpreta como marcado, enlace activo o instrucción de programa. Los campos de solo espacios son vacíos.

Política única de email de esta versión: una dirección ASCII sin espacios ni controles y con un solo @; parte local de 1–64 caracteres, con letras, dígitos y los símbolos . \! \# \$ % & ’ \* \+ / \= ? ^ \_ \` { | } \~ \- (apóstrofo ASCII U+0027); sin punto inicial, final o consecutivo. Dominio con al menos un punto, etiquetas de 1–63 caracteres, letras ASCII, dígitos y guion, sin guion en extremos. Acepta dominios internacionalizados en su forma ASCII punycode; no se admiten partes locales Unicode ni direcciones entre comillas. Esta es una decisión de compatibilidad del formulario, no una comprobación de existencia de la casilla. No exigir correo institucional, consultar DNS ni llamar validadores externos.

| Condición | Mensaje público |
| :---- | :---- |
| Nombre vacío o corto | Ingresá tu nombre y apellido, entre 2 y 120 caracteres. |
| Nombre mayor de 120 | Usá hasta 120 caracteres para el nombre y apellido. |
| Empresa mayor de 160 | Usá hasta 160 caracteres para la empresa o institución. |
| Email vacío | Ingresá tu correo electrónico. |
| Email fuera de política o límite | Ingresá un correo válido de hasta 254 caracteres, por ejemplo nombre@institucion.org. |
| Interés vacío o desconocido | Elegí un producto, servicio o motivo de consulta de la lista. |
| Mensaje fuera de 10–3000 | Escribí un mensaje de entre 10 y 3000 caracteres. |
| Controles no admitidos | Quitá los caracteres de control no admitidos en este campo. |

Validar al pulsar Enviar consulta; después, al salir de un campo con error. No mostrar errores por cada tecla. Si hay varios, usar este orden: nombre, empresa, email, interes, mensaje; en un mismo campo priorizar obligatorio, caracteres no admitidos, formato y longitud. Mostrar resumen “Revisá los campos indicados”, con enlaces a cada campo; enfocar el resumen. Cada error se muestra junto al campo y se vincula con aria-describedby y aria-invalid. No se intenta correo y se conservan valores. El resumen enfocado no se duplica con un anuncio role=alert.

## **6.3 Estados de pantalla y foco**

| Estado | Campos y acciones | Foco y resultado |
| :---- | :---- | :---- |
| Preparando | Campos editables; Enviar consulta deshabilitado. Texto “Preparando formulario…”. | Al cargar no robar foco. Un CTA mantiene el foco en selector. |
| Listo | Campos editables; Enviar consulta habilitado aunque estén incompletos. | Permite validar al pulsar; nunca se envía por seleccionar interés. |
| Validación | Conservar datos y habilitar corrección. | Resumen enfocado según 6.2. |
| Enviando o verificando | Congelar instantánea de datos y contexto; campos temporalmente no editables, botón deshabilitado y aria-busy=true. Texto “Enviando…” o “Verificando envío…”. | Estado anunciado una vez con región polite. Los CTA cumplen 4.6; el resto del sitio sigue operable. |
| Éxito | Sustituir formulario por confirmación y “Enviar otra consulta”. Limpiar valores y referencias de estado accesibles a la aplicación, sin prometer borrado físico de RAM. | Enfocar encabezado de confirmación. No cerrarlo automáticamente ni repetirlo por live region. |
| Fallo conocido | Conservar datos y contexto si siguen vigentes. Botón “Reintentar envío”. | Enfocar bloque de resultado con mensaje; el reintento es manual. |
| Sin confirmación | Conservar datos, instantánea y contexto. Ofrecer “Verificar envío” y el aviso de incertidumbre. | Enfocar resultado. Verificar no debe crear otro correo si hay estado conocido; 6.6. |
| Espera por frecuencia | Campos editables; botón de envío deshabilitado hasta el fin de la espera. | Mostrar tiempo restante; no anunciar cada segundo. Al vencer habilitar, sin enviar automáticamente. |
| No disponible | Campos editables y valores conservados; no intentar correo. Ofrecer “Reintentar preparación”. | Mensaje enfocable solo si falla tras una acción del usuario; fallo al cargar no roba foco. |

Éxito público: “Tu consulta fue enviada. AntartidaLabs podrá responder al correo que indicaste.” Texto complementario: “El envío no implica reserva, contratación ni confirmación de disponibilidad”. Éxito significa aceptación por el mecanismo de correo, sin asegurar recepción final en bandeja o lectura. “Enviar otra consulta” vacía los campos, restituye placeholder, obtiene contexto nuevo y enfoca Nombre y apellido; no envía copia, suscripción ni publicidad.

## **6.4 Operaciones de preparación y envío**

Se fijan dos operaciones HTTP en el mismo origen para que implementaciones independientes compartan el mismo comportamiento. Esto no elige lenguaje, framework o proveedor. GET /contacto/contexto prepara el formulario al cargar la página y en cada renovación. No envía correo. Respuesta 200 JSON: {"code":"context\_ready","submission\_id":"ID de 32 hex","form\_token":"token opaco","expires\_at":"fecha ISO 8601 UTC"}. ID y token vencen juntos a los 30 minutos desde emisión. Respuestas no almacenables en cachés; no contienen secretos ni datos personales. Una renovación fallida deja el formulario no disponible y conserva campos. La preparación espera como máximo 10 segundos; luego pasa a no disponible con reintento manual. Si no se dispone de interacción o no puede inicializarse, mostrar ese mismo aviso y no dejar “Preparando…” indefinidamente. El contenido y los detalles siguen disponibles según 4.1 y 4.5.

POST /contacto/consulta usa JSON UTF-8 y solo los ocho campos de 6.1: nombre, empresa, email, interes, mensaje, submission\_id, form\_token y website (cinco públicos y tres técnicos). Los ocho son obligatorios en el contrato; empresa y website admiten vacío. Rechazar campos inesperados. Tamaño total máximo 32 KiB. No aceptar nombre de destinatario, remitente o asunto enviados por el navegador. El cliente conserva la instantánea hasta resolver el intento; no lee campos editados para reconstruir un reintento anterior. El encabezado X-Contact-Intent es obligatorio y solo admite send o verify; ausencia u otro valor produce 400 request\_rejected sin correo. send inicia o reintenta un envío; verify solo consulta su estado según 6.6.

Toda respuesta de POST incluye code y submission\_id cuando este sea válido. errors solo contiene claves públicas y mensajes de 6.2; retry\_after es un entero positivo en segundos; no devolver texto arbitrario de proveedores. El cliente usa el catálogo de mensajes de 6.5, no interpola HTML remoto. El intento del servidor dura hasta 15 segundos; el cliente espera hasta 20\. Si el correo aún no se transmitió, el fallo puede ser conocido; si ya se transmitió y no se conoce la aceptación, el resultado es incierto. Sin red o con respuesta ilegible/desconocida después de iniciar POST, aplicar incertidumbre.

## **6.5 Respuestas y mensajes de resultado**

| HTTP y code | Efecto funcional | Mensaje público y acción |
| :---- | :---- | :---- |
| 200 accepted | Correo aceptado o repetición conocida del mismo ID y huella. | Confirmación de 6.3. No reenviar el mismo ID. |
| 422 validation\_error | Sin invocación de correo; errors por campo. | Resumen y errores de 6.2; corregir y enviar manualmente. |
| 429 rate\_limited | Sin nueva invocación; devuelve retry\_after. | “Alcanzaste el límite temporal de envíos. Esperá \[tiempo restante\] antes de reintentar”. Conservar datos. |
| 403 token\_expired | Sin nueva invocación; renovar contexto conservando campos. | “La sesión del formulario venció. Tus datos siguen disponibles. Volvé a enviar la consulta”. Renovar no envía. |
| 403 request\_rejected | Origen, firma, ID o campo trampa inválido. No enviar. | “No pudimos validar el envío. Tus datos siguen disponibles. Reintentá desde este formulario”. Renovar contexto; reintento manual. |
| 503 temporary\_failure | Rechazo definitivo del proveedor o fallo antes de transmitir. | “No pudimos enviar tu consulta. Tus datos siguen en el formulario. Intentá nuevamente”. Reintentar con mismo contexto vigente si no cambió contenido. |
| 504 uncertain | Tras transmitir, se desconoce la aceptación. | “No pudimos confirmar el envío. Es posible que la consulta se haya enviado. Tus datos siguen disponibles”. Acciones de 6.6. |
| 503 unavailable | Falta configuración o no pudo prepararse contexto. | “El formulario no está disponible en este momento. Intentá más tarde”. Ofrecer Reintentar preparación. |
| 409 processing | Mismo ID y huella con ejecución vigente. No invocar otra vez. | “La consulta todavía se está procesando. Podés verificar el envío nuevamente”. Ofrecer Verificar envío. |
| 409 conflict | Mismo ID con huella distinta. No enviar; renovar contexto. | “El formulario se actualizó. Revisá los datos y volvé a enviar”. Conservar la advertencia si hubo incertidumbre. |
| 400 / 413 / 405 / 415request\_rejected | JSON malformado, tipos no cadena, campos faltantes o adicionales (400); tamaño (413), método (405) o formato (415). Sin correo. | Mismo mensaje público de validación del envío; sin revelar detalles internos. Conservar datos si el cliente los tiene. |

La espera se muestra en minutos redondeados hacia arriba mientras reste al menos un minuto, y en segundos cuando reste menos. Renovar un contexto no evita el límite por red. El bloque de resultado y el botón de acción se mantienen visibles hasta una nueva acción; no usar un aviso transitorio que desaparezca antes de poder leerlo. Un estado de procesamiento que supera los 15 segundos sin resultado definitivo pasa a incertidumbre, sin aparentar actividad indefinida.

## **6.6 Reintentos, conciliación y duplicados**

Mantener temporalmente submission\_id, huella HMAC de los cinco valores normalizados en orden nombre, empresa, email, interes y mensaje, estado, instante del primer intento y vencimiento. Para construir la huella, representar los cinco valores como un arreglo JSON UTF-8 sin ambigüedad; usar clave de servidor, nunca un hash simple de emails. No guardar el arreglo ni el cuerpo. El registro expira 30 minutos después del primer intento. El contexto vence 30 minutos desde su emisión; por ello no permanece válido cuando ya desapareció un registro usado.

Orden del receptor: validar método, formato y tamaño; validar origen, firma y relación token-ID; validar trampa y campos; calcular huella; consultar estado por ID. Con firma válida, un registro ya aceptado y huella igual puede responder accepted aun si venció el contexto, mientras el registro exista. Un ID con huella distinta responde conflict. Una ejecución todavía activa devuelve processing y no llama al correo. Solo después se comprueba vencimiento para iniciar o reintentar una ejecución, y luego cuota. Un ID sin estado, firmado pero vencido, nunca inicia correo.

Una sola ejecución simultánea por ID. Tras accepted, ninguna nueva invocación por ese ID mientras exista su registro. Tras temporary\_failure, el mismo ID y huella pueden reintentarse manualmente si el contexto sigue vigente; cada invocación real consume cuota. Una edición tras cualquier intento obtiene contexto nuevo antes del siguiente envío, pero no altera la instantánea anterior. Las respuestas de un ID anterior no pueden sobrescribir un formulario nuevo.

Si el navegador perdió respuesta, “Verificar envío” repite manualmente el mismo POST e instantánea: el servidor devuelve accepted, processing o uncertain si conoce ese estado; una aceptación conocida nunca envía otro correo. Si el intento anterior consta como temporary\_failure, se muestra el fallo y recién una pulsación posterior en “Reintentar envío” permite invocar correo. Distinguir la verificación de ese reintento: el POST de verificación añade el encabezado X-Contact-Intent: verify; el envío o reintento usa X-Contact-Intent: send. Una verificación de un ID desconocido devuelve uncertain y no envía. El encabezado solo selecciona comportamiento, no autentica ni sustituye validaciones.

Si el servidor conoce uncertain, no vuelve a enviar con ese ID. Mostrar “Puede haberse enviado una consulta anterior. Un nuevo intento podría duplicarla” y un botón “Realizar un nuevo intento”. Este botón obtiene contexto nuevo conservando campos; la advertencia permanece y el usuario debe pulsar “Enviar consulta” para efectuarlo. Una renovación por edición o vencimiento tampoco elimina esa advertencia. No hay reintentos automáticos de correo ni sondeo automático de estado.

El estado es técnico y temporal; no hay base de consultas ni cola persistente. Debe ser coherente entre procesos activos que reciban el mismo ID. Un reinicio que pierda el estado o una aceptación del proveedor sin confirmación impiden garantizar ausencia absoluta de duplicados. En verificación sin estado se informa incertidumbre; un nuevo intento exige contexto y acción manual explícita. No se promete entrega exactamente una vez ni borrado físico inmediato del mensaje de los sistemas de transporte.

## **6.7 Protección contra envíos automatizados**

Token firmado vinculado al ID y vencimiento, origen del mismo sitio, campo trampa vacío y límites del receptor se verifican siempre en servidor. No usar un tiempo mínimo de escritura como único bloqueo; no imponer CAPTCHA ni servicios de rastreo. No autenticar ni registrar al visitante.

Límite inicial: cinco nuevas invocaciones de correo por identificador de red en ventana móvil de 15 minutos. Contar inmediatamente antes de invocar al proveedor, incluso si este falla. Validaciones rechazadas, verificaciones y repeticiones aceptadas o en proceso no consumen cuota. Sexta invocación devuelve rate\_limited con el tiempo hasta liberar la primera posición. No se fija otro límite comercial global; el tamaño y la frecuencia definidos son los controles de esta versión.

Identificar la red mediante huella con clave, sin guardar IP cruda ni adjuntarla al correo. El contador expira con su ventana, con tolerancia de un minuto. Mantener la clave durante la ventana activa; rotarla no reinicia cuotas. No registrar contenido, tokens ni huellas en logs.

## **6.8 Composición del correo y protección de los datos**

| Elemento | Especificación obligatoria |
| :---- | :---- |
| Para | CONTACT\_RECIPIENT, una dirección de AntartidaLabs verificada en servidor. |
| De y respuesta | CONTACT\_SENDER autorizado. Reply-To es el email validado; nunca usarlo como remitente técnico. |
| Asunto | Consulta web AntartidaLabs | \[nombre de interés desde el catálogo\]. general y lab usan sus etiquetas visibles. |
| Texto plano | Fecha y hora ISO 8601 con zona; ID; nombre; empresa o No informada; email; ID y nombre de interés; mensaje. Sin HTML, adjuntos, IP o agente del navegador. |
| Resultado | Éxito solo ante aceptación conocida. Un rebote posterior se gestiona en la casilla remitente; no se añade bandeja ni seguimiento al sitio. |

Título público del aviso: “Uso de tus datos”. Texto junto al botón: “Usamos los datos que ingresás para recibir y responder esta consulta. El mensaje se envía por correo electrónico a AntartidaLabs; el sitio no guarda una base de consultas. No incluyas información sensible ni credenciales. No usamos este formulario para suscripciones ni publicidad”. El pie enlaza a este mismo bloque \#privacidad. No agregar casilla de marketing ni aceptación contractual.

No guardar borradores o consultas en almacenamiento local, cookies de negocio, base de datos, logs, trazas o analítica. El correo y sus sistemas de transporte procesan necesariamente el mensaje; la casilla destinataria conserva lo recibido conforme a su gestión, con acceso restringido. El estado temporal de 6.6–6.7 no contiene cuerpo ni datos de contacto legibles. No enviar copia automática al visitante ni usar la consulta para entrenar modelos.

## **6.9 Parámetros y valores previos a publicar**

| Parámetro | Valor o regla de provisión |
| :---- | :---- |
| CONTACT\_RECIPIENT | Obligatorio, dirección real de AntartidaLabs. Sin valor de ejemplo en producción. |
| CONTACT\_SENDER | Obligatorio, dirección autorizada por el canal de correo; validación real de envío y respuesta. |
| MAIL\_TRANSPORT | Configuración y secretos del mecanismo elegido por el implementador. Solo servidor; no seleccionados por este manual. |
| PUBLIC\_ORIGIN | Origen HTTPS real del sitio; se usa para enlaces canónicos, orígenes permitidos y receptor del mismo origen. |
| CONTACT\_SECRET | Clave aleatoria del servidor para firma, HMAC y valores de red; sin secretos en archivos públicos. Rotación invalida contextos, conserva campos. |
| CONTEXT\_TTL / STATE\_TTL | Valores iniciales 30 min desde emisión / 30 min desde primer intento. Pueden modificarse juntos sin permitir contexto válido después del registro. |
| RATE\_LIMIT / RATE\_WINDOW | Valores iniciales 5 invocaciones / 15 min. Cualquier ajuste se documenta y conserva mensajes y pruebas equivalentes. |
| MAIL\_TIMEOUT / CLIENT\_TIMEOUT | Valores iniciales 15 s / 20 s. Clasificar incertidumbre según transmisión, no solo por duración. |

Faltan únicamente valores del entorno: direcciones, origen, mecanismo y secretos. Su provisión es una tarea de despliegue, sin cambiar campos, flujos ni alcance. La ausencia o formato inválido de un parámetro obligatorio produce unavailable y bloquea el envío; nunca usar direcciones ficticias o mailto como sustituto. El desarrollador debe ejecutar PA-24 y documentar los valores no secretos y dónde se configuran los secretos.

# **Capítulo 7 — Diseño y experiencia de usuario**

## **7.1 Aplicación de la identidad**

Se adopta el sistema digital de M, capítulos 6–11, como base de esta versión. Sus normas complementarias tienen carácter de propuesta en la fuente; su uso aquí no constituye una nueva aprobación institucional ni una declaración de marca registrada. La grafía visible será AntartidaLabs.

Recurso AS-01: reproducción íntegra del símbolo contenida en M. Extraer el binario word/media/image1.png del DOCX Marca/AntartidaLabs\_Manual\_de\_Marca.docx, sin captura de pantalla ni redibujado. Usarlo localmente en el sitio como AntartidaLabs\_Simbolo\_Web.png, sobre blanco. También está incrustado sin cambios en la portada de este manual. PNG de 1092 × 1092 px, RGB y 84.371 bytes; no atribuirle transparencia. SHA-256: bfcd4295c7ebd993321d4cb333700d6060b8ac81de31cd43f26f433f401598e0. No se requiere un SVG adicional para esta versión. No modificar colores, geometría, elementos ni degradados.

El recurso cuadrado AS-01 conserva lienzo y proporción 1092 × 1092; mostrarlo a 264 × 264 CSS px en todos los tamaños de esta versión. Equivale a unos 162 px de ancho operativo y conserva una protección superior a q \= W/10 del símbolo. No recortar los márgenes blancos del PNG. En 320 px cabe dentro de márgenes de 16 px. La cabecera usa nombre textual; no crear favicon, monocromo, inversa ni composición nueva. Una futura sustitución por SVG requiere verificar equivalencia visual y no cambia estos tamaños.

## **7.2 Paleta y estados**

| Rol | Valor | Aplicación |
| :---- | :---- | :---- |
| Texto principal | \#05183D | Títulos y lectura sobre blanco o niebla. |
| Superficie / lienzo | \#FFFFFF / \#F5F8FC | Tarjetas y fondos alternos. |
| Texto secundario | \#475569 | Ayudas y descripciones secundarias. |
| Acción / hover / activo | \#005A9C / \#004B82 / \#003B6D | Botón primario y enlaces; texto blanco en rellenos. |
| Acentos de marca | \#09E5E9 / \#048CF2 / \#19D7D5 | Acentos discretos; no texto cian sobre blanco ni texto blanco pequeño sobre azul glacial. |
| Borde de control / divisor | \#64748B / \#D5DEE8 | El divisor decorativo no sustituye límites visibles de campos. |
| Foco | \#005A9C | Anillo de 3 px, separado 3 px del control. |
| Deshabilitado | \#D5DEE8 / \#475569 | Fondo y texto; sin bajar opacidad de todo el control. |
| Éxito | \#166534 / \#F0FDF4 | Texto e indicador sobre fondo de éxito. |
| Error | \#B42318 / \#FEF2F2 | Mensaje e icono sobre fondo de error. |
| Información | \#075985 / \#F0F9FF | Ayudas de estado, con texto explícito. |

Predominan blancos y neutros; el azul organiza la jerarquía y los acentos se usan con moderación. No se incorpora selector de tema oscuro. La marca se aplica de manera consistente en todas las secciones; no se cambia el color semántico por familia. Fuente: M, capítulos 7 y 11\.

## **7.3 Tipografía y jerarquía visual**

Recurso AS-02: Noto Sans con pesos reales 400, 600 y 700, conforme a M, capítulo 8\. Obtener los archivos desde la referencia oficial Noto Project indicada allí, conservar avisos y licencia SIL OFL 1.1 y servirlos como recursos locales; no simular negritas ni incorporar una dependencia de carga a un proveedor de fuentes. Esta obtención es técnica y no agrega información sobre AntartidaLabs. Si una fuente no carga, usar Arial y luego sans-serif del sistema sin ocultar texto. Source Code Pro no necesita cargarse para este sitio.

Cuerpo: 1 rem, referencia 16 px, interlineado 1,5. H1: 2–2,5 rem, interlineado 1,2. H2: 1,5–2 rem, interlineado 1,25. H3: hasta 24 px. Botones y campos: 16 px; ayudas: 14 px. Texto a la izquierda, lectura de hasta 72 caracteres por línea y sin justificación.

## **7.4 Grilla y composición responsive**

| Ancho CSS | Grilla y márgenes | Catálogo y formulario |
| :---- | :---- | :---- |
| 320–767 px | 4 columnas; margen 16 px; separación 16 px. | Una tarjeta por fila; campos apilados; texto y símbolo apilados. |
| 768–1199 px | 8 columnas; margen 24 px; separación 24 px. | Dos tarjetas por fila; formulario de una columna. |
| 1200 px o más | 12 columnas; margen mínimo 32 px; separación 24 px. | Tres tarjetas por fila; formulario de una columna, ancho máximo 720 px. |

Ancho máximo del contenido 1200 px, centrado. Cada familia constituye su propio grupo de tarjetas. El detalle expandido ocupa el ancho de su tarjeta y puede alargarla sin igualar alturas por recorte. No se crea desplazamiento horizontal del documento en 320 CSS px. A 200 % de texto, controles, mensajes y navegación admiten más líneas sin perder contenido.

## **7.5 Componentes y movimiento**

Tarjetas: superficie blanca, radio 12 px, padding 24 px, borde decorativo de 1 px y separación de 24 px en escritorio; en móvil la separación es 16 px. Los estados interactivos pertenecen a los controles de la tarjeta. Botón primario: radio 8 px, alto mínimo 44 px, padding 10 × 16 px, peso 600\. Secundario: superficie blanca, borde y texto de acción. Enlaces de navegación con subrayado o indicador visible.

Campos: radio 4 px, borde de 1 px, padding 10 × 12 px; error de 2 px y texto asociado. Espaciados: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 y 96 px. Alturas adaptables. Transiciones: 120–240 ms, referencia 180 ms. Movimiento reducido elimina transiciones y desplazamiento animado. Ninguna animación demora la lectura.

## **7.6 Accesibilidad del recorrido completo**

Objetivo de aceptación: WCAG 2.2 AA, conforme a M. Usar un H1, H2 por sección, H3 por familia y H4 por servicio dentro de su familia. Incluir regiones header, nav, main y footer, idioma es, orden lógico y nombres accesibles. Los detalles abiertos estarán disponibles para tecnologías de asistencia; los cerrados no serán enfocables.

Texto normal con contraste mínimo 4,5:1; texto grande y límites o indicadores necesarios con 3:1. Comprobar todos los estados sobre el fondo real. Objetivos de 44 × 44 px como regla de este sitio; foco visible y nunca oculto por la cabecera. No depender del color, hover, animación ni puntero. Operar con Tab, Shift+Tab, Enter, Espacio y Escape según el control; sin trampas de teclado.

Probar lector de pantalla para navegación, campos, selector agrupado, detalles, errores y resultados. Permitir interlineado de 1,5, espacio entre párrafos de 2 veces el tamaño de fuente, letras de 0,12 em y palabras de 0,16 em sin pérdida. La conformidad no se deduce de la paleta: se evalúan la página y el proceso completo. No se declara certificación de accesibilidad empresarial.

Con colores forzados o alto contraste, conservar bordes, subrayados, indicadores de expansión, foco y errores mediante propiedades del sistema o trazos visibles. No comunicar un estado solo mediante relleno. El movimiento reducido y el espaciado ampliado se prueban en el recorrido completo, incluido menú abierto, detalles y resultados de formulario.

# **Capítulo 8 — Requisitos no funcionales**

Los umbrales siguientes son criterios de calidad del sitio definidos para este desarrollo. No son niveles de servicio de los productos ni compromisos comerciales de infraestructura de AntartidaLabs.

## **8.1 Rendimiento**

RNF-01. Medir Largest Contentful Paint (LCP), estabilidad CLS y respuesta a interacción sobre producción. Realizar tres cargas con caché vacía, viewport 375 × 812 CSS px, red 1,6 Mb/s de bajada, 750 kb/s de subida y 150 ms de latencia, CPU simulada cuatro veces más lenta. Registrar herramienta y versión. Mediana de LCP hasta 2,5 s y CLS hasta 0,1. Medir diez activaciones de menú, detalles y selector desde pulsación hasta actualización visual: percentil 95 por rango más cercano, décima observación ordenada, hasta 200 ms; excluye latencia de correo. Son umbrales del sitio, no SLA de los servicios.

RNF-02. Transferencia inicial comprimida hasta 1,5 MB, incluyendo documento, estilos, recursos interactivos, AS-01, fuentes y contexto de formulario. Reservar dimensiones del símbolo y fuentes sin ocultación de texto; no incorporar recursos decorativos pesados. El contenido comercial completo estará en el documento recibido, sin catálogo remoto. Se permiten las dos operaciones del formulario de 6.4; una falla en preparar contexto no afecta lectura ni navegación.

## **8.2 Seguridad y límites operativos**

RNF-03. Todo acceso público y envío se realizan mediante HTTPS; redirigir accesos sin cifrado. Credenciales y claves solo en servidor o configuración protegida, excluidas de archivos públicos, repositorios entregables y mensajes de error. El receptor no acepta destinatarios libres ni cabeceras construidas con texto de usuario.

RNF-04. Validación completa en servidor, límites de 6.1 y 6.4, controles de origen, tokens, frecuencia y duplicados. Codificar salida para impedir ejecución de contenido; rechazar saltos de línea en cabeceras. Una carga con etiquetas se recibe únicamente como texto plano. Aplicar una política de contenido que limite los recursos a los necesarios, impida incrustación por sitios ajenos y evite interpretar tipos de archivo incorrectos. No habilitar acceso de orígenes arbitrarios al receptor.

RNF-05. Dependencias limitadas y sin vulnerabilidades críticas o altas conocidas sin resolución justificada al momento de entregar; registrar revisión y correcciones. No incluir herramientas de seguimiento, cookies comerciales ni integraciones ajenas al alcance. Un fallo del correo no rompe la lectura del sitio. No se exige base de datos, cola persistente, CRM ni infraestructura de laboratorio para alojar esta página.

## **8.3 Compatibilidad y visualización móvil**

RNF-06. Probar las dos versiones estables más recientes disponibles al momento de la aceptación de Chrome, Edge, Firefox y Safari en escritorio, y Safari en iOS y Chrome en Android. Registrar versiones reales, sin fijarlas en este manual. No se exige Internet Explorer. Deben mantenerse lectura, menú, detalles, selección y envío; diferencias visuales menores son admisibles si no alteran el uso.

RNF-07. Verificar anchos de 320, 375, 768, 1024 y 1440 CSS px, orientación vertical y horizontal y al menos un dispositivo táctil real. Sin solapamientos, recortes ni scroll horizontal de página. El teclado virtual no impide llegar a mensajes y botón. Probar zoom al 200 % y reflujo equivalente a 320 CSS px en escritorio.

## **8.4 Accesibilidad**

RNF-08. Aplicar el recorrido manual y los valores de 7.6, junto con evaluación automática de página completa. La entrega no debe tener barreras que impidan navegar, consultar una ficha o enviar y corregir un formulario con teclado y lector de pantalla. Registrar hallazgos, criterios evaluados y correcciones; una puntuación automática aislada no demuestra conformidad.

## **8.5 SEO y metadatos**

RNF-09. Título de página: “AntartidaLabs | Capacidad tecnológica para investigar en IA”. Descripción: “Conocé la propuesta de AntartidaLabs para integrar infraestructura, datos, ingeniería y operación en investigación en IA. Consultá por tu proyecto.” Usar URL canónica del dominio configurado, idioma es, jerarquía semántica y enlaces rastreables. Los 19 nombres y descripciones deben estar presentes en el documento, incluso con paneles cerrados.

RNF-10. La raíz pública responde correctamente y es indexable; el entorno de pruebas queda excluido de indexación. El dominio y la URL canónica no contienen marcadores. Ofrecer sitemap con la raíz canónica y reglas de rastreo coherentes; no enumerar fragmentos como páginas independientes ni publicar endpoints de contacto como contenido. No generar reseñas, precios ni datos estructurados de clientes, dirección o certificaciones no acreditadas. Las anclas no requieren títulos de página separados.

## **8.6 Datos, observabilidad y mantenimiento**

RNF-11. Sin base de consultas ni captura de nombres, empresa, email, mensaje, cuerpo, tokens, huellas o IP cruda en logs del sitio. Para diagnóstico solo fecha, ID aleatorio, categoría de resultado y duración, máximo siete días. El estado técnico temporal contiene únicamente los datos descritos en 6.6–6.7 y usa sus vencimientos. Desactivar captura de cargas del formulario en registros de acceso, errores y monitoreo; no confundir el correo necesario de 6.8 con una base web de consultas.

RNF-12. El texto del aviso describe la finalidad real y no afirma que el correo se elimina inmediatamente. La gestión de la casilla destinataria queda fuera del almacenamiento web y debe estar restringida a quienes atienden consultas. El mensaje no se utiliza para entrenamiento ni campañas desde este sitio. No se agregan afirmaciones de cumplimiento legal o certificación sin respaldo en las fuentes.

RNF-13. Entregar sitio, catálogo estructurado con nombre, descripción, los cinco campos públicos del panel y metadatos internos necesarios, AS-01 extraído, fuentes AS-02 y licencia, instrucciones de mantenimiento y parámetros de 6.9. Tarjetas, selector y correo se alimentan de un único registro de 19 servicios y dos motivos. La actualización no requiere panel de administración. Cualquier cambio comercial posterior exige fuente vigente; no añadir prestaciones desde ejemplos internos.

# **Capítulo 9 — Matriz de requisitos funcionales**

Alta indica requisito indispensable para publicar; Media ordena comportamientos de soporte también incluidos, no opcionales. Los 38 RF remiten a las pruebas del capítulo 10\. Los RNF se verifican en PA-13 y PA-15 a PA-24, según su cobertura. La prioridad no autoriza omitir requisitos.

| ID | Sección | Requisito funcional | Prioridad | Criterio de aceptación |
| :---: | :---- | :---- | :---: | :---- |
| RF-01 | Arquitectura | Mostrar una única página en español con cinco secciones y aviso de datos. | Alta | Existen los destinos de 3.1 y no hay rutas comerciales extra. PA-01. |
| RF-02 | Navegación | Navegar por anclas y resolver servicios en carga, enlace e historial. | Alta | Cada destino abre su ficha sin cambiar interés; regla activa de 3.4. PA-01/05. |
| RF-03 | Navegación | Proveer menú compacto accesible bajo 768 px. | Alta | Abre, cierra, anuncia estado y responde a Escape y selección. PA-02. |
| RF-04 | Navegación | Ofrecer salto al contenido y estado de sección. | Alta | Primer Tab permite saltar; sección activa tiene indicador y nombre semántico. PA-01/15. |
| RF-05 | Inicio | Publicar titular, síntesis aspiracional y CTA acordados. | Alta | Textos y destinos coinciden con 4.2; no hay afirmaciones no acreditadas. PA-03. |
| RF-06 | Propuesta | Explicar AI Research LAB y las tres líneas. | Alta | Visible núcleo previsto, modularidad, recursos y dependencias. PA-03. |
| RF-07 | Propuesta | Presentar pasos comerciales y componentes de cotización sin precios. | Alta | Se ven los cuatro pasos y límites de 4.4; no hay importes internos. PA-03. |
| RF-08 | Nosotros | Mostrar públicos, visión, seis pilares y límites científicos. | Alta | Contenido coincide con 2.3, 2.4 y 4.7; expansión figura como condicionada. PA-03. |
| RF-09 | Catálogo | Presentar los 19 servicios en seis familias. | Alta | Nombres, orden e IDs coinciden con capítulo 5 y fuente C. PA-04. |
| RF-10 | Catálogo | Mostrar descripción, características, beneficio, público y condiciones. | Alta | Las 19 fichas incluyen los siete campos editoriales del capítulo 5\. PA-04. |
| RF-11 | Catálogo | Expandir y contraer detalles sin modal. | Alta | Dos paneles pueden permanecer abiertos; teclado y foco correctos. PA-05. |
| RF-12 | Catálogo | Acceder al índice de familias y anclas de servicios. | Media | Seis enlaces y 19 fragmentos alcanzan el destino; ficha directa abierta. PA-05. |
| RF-13 | Consulta | Preseleccionar interés desde cada servicio y desde AI Research LAB. | Alta | 19 CTA aplican su ID y lab aplica su motivo; anuncio accesible. PA-06. |
| RF-14 | Consulta | Preservar datos y aplicar reglas de CTA en cada estado. | Alta | No altera instantánea en curso; después de éxito inicia formulario limpio. PA-06/10/11. |
| RF-15 | Formulario | Presentar cinco campos en orden con obligación y ayudas. | Alta | Campos y tipos coinciden con 6.1; empresa admite vacío. PA-07. |
| RF-16 | Formulario | Sincronizar selector con catálogo y motivos separados. | Alta | Hay 21 opciones válidas; placeholder inválido; sin vigésimo servicio. PA-04/07. |
| RF-17 | Validación | Normalizar y validar los cinco datos según 6.2 en ambos extremos. | Alta | Conteo por puntos de código, política de email y límites coinciden. PA-07/08/13. |
| RF-18 | Validación | Validar una dirección de correo sin restringir institución. | Alta | Acepta dirección válida con \+; rechaza formato inválido y CR/LF. PA-07/13. |
| RF-19 | Validación | Relacionar errores con campos y conservar valores. | Alta | Resumen enfocable y enlaces operables; no se inicia correo inválido. PA-08/15. |
| RF-20 | Correo | Preparar contexto y enviar mediante contrato de 6.4–6.5. | Alta | Respuestas conocidas cambian a su estado; correo recibido con datos correctos. PA-09/22. |
| RF-21 | Correo | Fijar asunto y cuerpo desde campos validados. | Alta | Asunto usa nombre del catálogo; correo es texto plano y sin IP. PA-09/13. |
| RF-22 | Envío | Mostrar proceso y bloquear repetición mientras envía. | Alta | Una activación repetida no crea dos solicitudes simultáneas. PA-10. |
| RF-23 | Envío | Confirmar solo tras aceptación del servicio de correo. | Alta | Respuesta de aceptación muestra texto de éxito; espera no lo muestra. PA-09/11. |
| RF-24 | Envío | Distinguir fallo conocido, incertidumbre, procesamiento y cuota. | Alta | Mensajes y acciones exactos de 6.5; sin reintento automático. PA-11/12/22. |
| RF-25 | Envío | Permitir nueva consulta desde el éxito. | Media | Restablece campos y foco con identificador nuevo. PA-10. |
| RF-26 | Envío | Conciliar y controlar repeticiones con ID, huella y estado temporal. | Alta | accepted no reinvoca; verify nunca envía; conflicto no reusa contenido. PA-10/23. |
| RF-27 | Protección | Validar contexto de 30 min, origen, trampa y cuota por invocación. | Alta | Contexto vencido no inicia correo; duplicados no consumen cuota. PA-12/13/23. |
| RF-28 | Ajustes | Manejar ausencia de receptor o remitente válido. | Alta | Formulario indica indisponibilidad y no usa valores inventados. PA-14. |
| RF-29 | Privacidad | Mostrar aviso y enlace desde el pie. | Alta | Aviso visible junto al envío y destino \#privacidad operativo. PA-14. |
| RF-30 | Datos | Excluir persistencia de consultas, copias automáticas y CRM. | Alta | No hay base, guardado local, logs de campos ni correo al visitante. PA-14/20. |
| RF-31 | Identidad | Aplicar recursos AS-01/02 y reglas visuales sin otro archivo de marca. | Alta | Símbolo coincide con huella y mide 264 px; fuente real o fallback legible. PA-15/16. |
| RF-32 | Responsive | Reorganizar tarjetas, textos y formulario según ancho. | Alta | 1/2/3 tarjetas según 7.4, sin perder datos en 320 px. PA-16. |
| RF-33 | Continuidad | Mantener lectura y navegación ante fallo de mejoras interactivas. | Media | Sin mejora se accede a enlaces y detalles; no se oculta catálogo. PA-17. |
| RF-34 | Alcance | Excluir transacciones y contenido empresarial no acreditado. | Alta | No hay cuentas, pagos, compra, casos, certificaciones ni tarifas internas. PA-03/21. |
| RF-35 | Contenido | Publicar solo textos y etiquetas del inventario definido. | Alta | No quedan instrucciones de redacción ni IDs o fuentes visibles. PA-03/04. |
| RF-36 | Contexto | Preparar, renovar y manejar expiración sin enviar automáticamente. | Alta | Fallo GET conserva datos; nuevo contexto no envía. PA-22/23. |
| RF-37 | Verificación | Verificar un envío sin crear una invocación de correo. | Alta | X-Contact-Intent verify devuelve estado conocido o incertidumbre. PA-11/23. |
| RF-38 | Entrega | Entregar configuración y recursos verificables para publicar. | Alta | Lista de 6.9 completa, sin marcadores, recepción y respuesta comprobadas. PA-24. |

# **Capítulo 10 — Criterios de aceptación**

## **10.1 Condiciones y datos de prueba**

Ejecutar sobre la versión candidata con receptor de pruebas controlado, remitente autorizado y correo real habilitado. Los datos serán ficticios: Ana Pérez; Instituto de prueba; una casilla válida bajo control del equipo; y un mensaje de al menos diez caracteres. No usar datasets, secretos ni datos personales reales de terceros. Las credenciales permanecen fuera de las evidencias.

Registrar por caso fecha, versión del sitio, entorno, navegador, pasos, resultado esperado, resultado obtenido y evidencia. La inspección de mensajes y capturas se limita a los datos de prueba. La revisión editorial compara el sitio con las cuatro fuentes y este manual; no se requiere comprobar hechos empresariales adicionales para ejecutar las pruebas funcionales.

## **10.2 Pruebas funcionales**

### **PA-01 Navegación e historial**

Cobertura: RF-01, RF-02, RF-04.

**Procedimiento.** Recorrer todas las anclas con puntero y teclado; usar Atrás/Adelante y desplazamiento manual. Revisar el indicador antes de Propuesta, dentro de familias y al final de la página. Abrir un fragmento desconocido.

**Resultado esperado.** Se cumplen el algoritmo de 3.4, historial y foco. El desplazamiento manual no cambia URL ni foco; el destino no queda cubierto. Un fragmento desconocido no cambia datos ni bloquea lectura.

### **PA-02 Menú móvil**

Cobertura: RF-03.

**Procedimiento.** En 375 px, abrir y recorrer navegación, cerrar con botón, Escape y clic fuera; seleccionar destino. Cambiar a 1024 px con foco en el botón compacto y repetir con foco en un enlace.

**Resultado esperado.** Panel en flujo y estado expandido correctos, sin trampa. Cerrar con botón o Escape conserva o retorna foco allí; clic fuera no lo roba. Selección enfoca destino. En escritorio, foco del botón pasa al primer enlace; foco de enlace se conserva.

### **PA-03 Fidelidad del contenido**

Cobertura: RF-05 a RF-08, RF-34.

**Procedimiento.** Comparar titulares, propósito, visión, públicos, pasos y límites con D, V y M; buscar precios, plazos, clientes, avales, métricas y disponibilidad absoluta.

**Resultado esperado.** Se conserva el carácter previsto y aspiracional, la responsabilidad científica institucional y la cotización por alcance. No aparecen cifras internas, casos, misión inventada ni compromisos no acreditados, tampoco en metadatos o archivos públicos.

### **PA-04 Inventario comercial**

Cobertura: RF-09, RF-10, RF-16.

**Procedimiento.** Contar familias y servicios; cotejar cada ficha y todas las opciones del selector con capítulo 5; revisar IDs y anclas únicos.

**Resultado esperado.** Seis familias, 19 fichas y 21 motivos válidos. Las fichas contienen descripción, características, beneficio, destinatarios, entregables, condiciones y CTA; general y lab no se presentan como servicios adicionales.

### **PA-05 Detalles y enlaces profundos**

Cobertura: RF-11, RF-12.

**Procedimiento.** Comenzar sin fragmento, abrir dos detalles, cerrar uno con teclado; navegar desde Propuesta a Hybrid Research estando cerrado; repetir con fragmento directo y Atrás/Adelante.

**Resultado esperado.** Todos comienzan cerrados salvo destino inicial. Un fragmento de servicio abre su ficha sin seleccionar interés; el botón de detalle no cambia URL. Otros paneles conservan estado; foco nunca permanece oculto.

### **PA-06 Consulta con interés preseleccionado**

Cobertura: RF-13, RF-14.

**Procedimiento.** Activar los 19 CTA y lab; cambiar manualmente interés y datos; usar CTA general y Contacto. Repetir mientras está preparando contexto, enviando, en incertidumbre y después de éxito.

**Resultado esperado.** IDs y anuncios coinciden. Envío pendiente no cambia su instantánea. Éxito seguido de CTA inicia formulario limpio con interés nuevo; Contacto conserva confirmación. Incertidumbre seguida de edición mantiene advertencia y exige nuevo contexto y envío manual.

### **PA-07 Campos válidos y límites**

Cobertura: RF-15 a RF-18.

**Procedimiento.** Probar los mínimos y máximos de 6.1 y un carácter fuera de cada límite; empresa vacía; nombre de una palabra, acentos y caracteres Unicode suplementarios; NFC, CRLF y espacios exteriores. Probar email con \+, local con mayúsculas, dominio en mayúsculas, punto doble, parte local Unicode y formato entre comillas.

**Resultado esperado.** Cliente y servidor cuentan puntos de código tras la normalización exacta. Límites válidos pasan y los restantes producen el mensaje de 6.2. Solo dominio se pasa a minúsculas. Empresa vacía es válida; no se exige institución ni dos palabras.

### **PA-08 Corrección de errores**

Cobertura: RF-17, RF-19.

**Procedimiento.** Enviar vacío y con varios campos inválidos; seguir enlaces del resumen; corregir; repetir enviando directamente al servidor sin validación del navegador.

**Resultado esperado.** No se genera correo inválido. Resumen recibe foco, errores quedan vinculados y los valores se conservan. Servidor aplica las mismas reglas y devuelve errores de campo utilizables.

### **PA-09 Correo exitoso**

Cobertura: RF-20, RF-21, RF-23.

**Procedimiento.** Enviar una consulta válida; observar el momento de aceptación; revisar la casilla receptora y cabeceras; comparar los cinco valores, interés, fecha e ID.

**Resultado esperado.** Se recibe un solo correo de texto plano, destinatario y remitente configurados, Reply-To del visitante y asunto del catálogo. Solo después de aceptación aparece el éxito; no se envía mensaje automático al visitante.

### **PA-10 Duplicados y nueva consulta**

Cobertura: RF-22, RF-25, RF-26.

**Procedimiento.** Demorar correo; pulsar dos veces; repetir ID aceptado y huella igual dentro de su registro; reutilizarlo con otro contenido; simular rechazo conocido y reintentar. Usar Enviar otra consulta y CTA posterior al éxito.

**Resultado esperado.** Una invocación simultánea por ID; ninguna nueva tras aceptación conocida. Un rechazo conocido permite reintento manual con contexto vigente y cuenta cuota. Contenido distinto produce conflict sin correo. Nueva consulta vacía datos y obtiene contexto nuevo.

### **PA-11 Falla y resultado incierto**

Cobertura: RF-23, RF-24, RF-37.

**Procedimiento.** Simular fallo antes de transmitir, rechazo definitivo, demora tras transmitir y pérdida de respuesta después de aceptación. Usar Verificar envío con el mismo ID e instantánea; probar respuesta ilegible o desconocida.

**Resultado esperado.** Fallo conocido solo si no hubo aceptación posible. Corte o demora incierta nunca se presentan como éxito o rechazo definitivo. verify nunca llama al proveedor: devuelve estado o incertidumbre. La nueva invocación exige acción manual y conserva advertencia de duplicado.

### **PA-12 Control de automatización**

Cobertura: RF-24, RF-27.

**Procedimiento.** Completar trampa, usar token inválido y contexto con más de 30 minutos; causar cinco invocaciones reales en 15 min y una sexta. Incluir rechazos del proveedor, verificaciones y repeticiones aceptadas.

**Resultado esperado.** Trampa, firma o expiración impiden nuevas invocaciones. Renovar conserva datos sin autoenviar. Cinco invocaciones consumen cuota aunque fallen; verificaciones y respuestas idempotentes no. La sexta muestra retry\_after y se habilita al liberar cuota, sin autoenvío.

### **PA-13 Manipulación y seguridad de entrada**

Cobertura: RF-18, RF-21, RF-27; RNF-03/04.

**Procedimiento.** Enviar interés inexistente, destinatario adicional, solicitud de más de 32 KiB, saltos de línea en email, etiquetas y texto con apariencia de instrucciones; intentar un origen no permitido.

**Resultado esperado.** Valores o campos inválidos se rechazan; el cliente no puede cambiar cabeceras ni receptor. Las etiquetas admitidas como texto no se ejecutan en pantalla o correo. Origen no permitido no envía; no se exponen secretos ni errores internos.

### **PA-14 Configuración y privacidad**

Cobertura: RF-28 a RF-30.

**Procedimiento.** Retirar receptor o remitente; revisar aviso, enlace del pie, tráfico de red y almacenamiento local antes y después de enviar o recargar.

**Resultado esperado.** Sin configuración no se envía y se ve indisponibilidad. Aviso presente y ancla correcta. No hay base de consultas, persistencia del sitio, CRM, copias al usuario ni datos del formulario en URL.

## **10.3 Pruebas de calidad y alcance**

### **PA-15 Accesibilidad completa**

Cobertura: RF-04, RF-19, RF-31; RNF-08.

**Procedimiento.** Recorrer página, detalles y proceso completo con teclado y lector de pantalla; comprobar contraste y estructura, foco y anuncios únicos; aplicar espaciado de 7.6, movimiento reducido y colores forzados o alto contraste.

**Resultado esperado.** Cada acción y estado mantiene nombre, borde, foco e indicador distinguible sin depender de color. No hay anuncios duplicados por foco y live region ni contenido oculto enfocable. Conservar evidencia por criterio.

### **PA-16 Identidad y responsive**

Cobertura: RF-31, RF-32; RNF-06/07.

**Procedimiento.** Extraer AS-01 desde M, verificar hash y comparar con inicio; medir 264 × 264 CSS px. Verificar pesos reales y licencia AS-02; bloquear fuente. Revisar 320, 375, 768, 1024 y 1440 px, dos orientaciones y texto al 200 %. 

**Resultado esperado.** Se construye sin quinto archivo de marca. Símbolo íntegro sobre blanco, sin recorte ni transparencia supuesta; cabecera textual. Reorganización de 4.9/7.4 correcta, fallback legible, sin solapamiento ni desplazamiento horizontal.

### **PA-17 Compatibilidad y degradación**

Cobertura: RF-33; RNF-06.

**Procedimiento.** Ejecutar navegación, detalle, preselección, validación y correo en la matriz de navegadores de 8.3. Interrumpir las mejoras interactivas y bloquear el recurso tipográfico.

**Resultado esperado.** Matriz principal completa sin fallos críticos. Sin mejora se leen enlaces y detalles, con fuente alternativa; si el envío no puede ejecutarse, no se simula éxito. Se informa su indisponibilidad conservando acceso al contenido.

### **PA-18 Rendimiento**

Cobertura: RNF-01/02.

**Procedimiento.** Ejecutar las tres cargas en viewport y condiciones de RNF-01; medir LCP, CLS y transferencia inicial incluyendo fuentes y contexto. Medir y ordenar diez respuestas visuales de interacción.

**Resultado esperado.** Mediana LCP hasta 2,5 s, CLS hasta 0,1, décima respuesta ordenada hasta 200 ms y peso inicial hasta 1,5 MB. Adjuntar condiciones, versión de herramienta y valores de cada ejecución.

### **PA-19 Buscadores**

Cobertura: RNF-09/10.

**Procedimiento.** Inspeccionar documento recibido, título, descripción, idioma, canónica, sitemap y reglas de rastreo; probar raíz pública y entorno de pruebas.

**Resultado esperado.** Metadatos de 8.5 sin marcadores, 19 nombres y descripciones disponibles sin abrir detalles, raíz indexable y pruebas excluidas. Sitemap contiene la raíz canónica sin fragmentos, datos personales ni endpoints de correo.

### **PA-20 Protección de datos y operación**

Cobertura: RF-30; RNF-03 a RNF-05, RNF-11 a RNF-13.

**Procedimiento.** Inspeccionar cifrado, dependencias y registros. Comprobar estado temporal con reloj de prueba: contexto 30 min desde emisión, registro 30 min desde primer intento, contador 15 min y logs permitidos siete días. Revisar reinicio y múltiples procesos si existen.

**Resultado esperado.** No hay datos de contacto, cuerpos, IP cruda, tokens ni huellas en logs o almacenamiento web. Solo estado permitido con vencimientos. Un verify sin estado devuelve incertidumbre; no crea correo. La guía declara límites ante reinicio.

### **PA-21 Cierre de alcance**

Cobertura: RF-34 y alcance de 1.3.

**Procedimiento.** Revisar navegación, recursos públicos y formularios buscando funcionalidades y afirmaciones fuera de alcance; verificar que servicios no se confundan con funciones operativas del sitio.

**Resultado esperado.** No hay acceso a plataforma, transacciones, infraestructura de investigación, precios o documentos internos descargables. Catálogo público completo, sin campos internos de planificación ni antecedentes inventados.

### **PA-22 Contrato y fallos de preparación**

Cobertura: RF-20, RF-24, RF-36.

**Procedimiento.** Comprobar GET de contexto y POST con ocho campos y X-Contact-Intent send o verify. Probar encabezado ausente o inválido, JSON malformado, tipos no cadena, campos faltantes/adicionales y cada code de 6.5, incluidos 400/413/405/415. Hacer fallar GET y recibir POST ilegible.

**Resultado esperado.** Contrato inválido se rechaza sin correo; 422 queda reservado a campos públicos inválidos dentro de una solicitud bien formada. Preparación y verify no envían. Fallo GET conserva datos; POST no reconocible produce incertidumbre. Solo accepted muestra éxito.

### **PA-23 Vencimientos y verificación sin reenvío**

Cobertura: RF-26, RF-27, RF-36, RF-37.

**Procedimiento.** Emitir contexto y avanzar 29 min, iniciar correo y aceptar; avanzar al minuto 31 desde emisión y repetir ID/huella; avanzar hasta caducar su registro y repetir de nuevo. Probar verify de ID no conocido y uncertain seguido de contexto nuevo.

**Resultado esperado.** Mientras exista registro aceptado se devuelve accepted sin nuevo correo, incluso con contexto vencido. Sin registro y con token vencido no se envía. verify no invoca correo en ningún caso. Un nuevo intento tras incertidumbre conserva aviso y exige pulsación explícita.

### **PA-24 Configuración y entrega de desarrollo**

Cobertura: RF-38; RNF-13.

**Procedimiento.** Revisar todos los parámetros de 6.9, AS-01/02 y licencia, registro único de servicios y guía de mantenimiento. Cambiar receptor de prueba y enviar; responder desde la casilla receptora mediante Reply-To.

**Resultado esperado.** No hay valores de ejemplo, secretos públicos ni decisiones funcionales pendientes. Correo llega al receptor configurado y la respuesta usa el email del visitante. Sin receptor, remitente, transporte o secreto válidos, no se publica como formulario operativo.

## **10.4 Regla de aprobación de la versión**

La versión se acepta cuando los 38 requisitos funcionales y los 13 no funcionales tienen evidencia satisfactoria y las 24 pruebas pasan. No quedan barreras para leer, navegar, revelar fichas, preseleccionar interés, corregir campos, preparar contexto y recibir consultas por correo. Rendimiento y accesibilidad forman parte de la aceptación. Los valores del entorno pendientes se resuelven por configuración de 6.9; no se admite que generen decisiones funcionales nuevas.

Antes de publicar se completa la lista de 6.9 y se ejecuta PA-24 con una recepción y respuesta reales de prueba. El símbolo proviene de M y no requiere otro archivo de marca. La falta de configuración bloquea envío con unavailable; no se usan valores ficticios. No se presumen aprobaciones institucionales ni disponibilidad de servicios que las fuentes no acreditan. El catálogo público conserva su formulación prevista.

La entrega contiene la página, contenidos literales, registro único del catálogo y motivos, AS-01/02 y licencias aplicables, mecanismo de correo, parámetros documentados sin secretos, guía de edición y evidencias de PA-01 a PA-24. Las decisiones técnicas quedan a cargo del implementador dentro de este contrato; no se añaden funciones. La auditoría se considera cerrada cuando las pruebas verifican estos comportamientos, sin tareas de redacción pública o definición de estados pendientes.

[image1]: <data:image/png;base64,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>