# ESPOILER BLOCKER

<p align="center">
  <img align="center" src="images/logo/logo.png" width="300" width="300">
</p>

Extensión de Chrome para ocultar spoilers de los videos de highlights publicados por [ESPN Fans](https://www.youtube.com/ESPNFans). Oculta la imagen de thumbnail mostrando los resultados, cambia el título del vídeo para solo mencionar los equipos, y muestra los logos (cuando estos están disponibles) en la miniatura.

<img width="1338" height="917" alt="XKMSJNSqQE" src="https://github.com/user-attachments/assets/d2e72d70-fa4a-413f-8a94-b5fc358172b5" />

<img width="1722" height="806" alt="chrome_LzoYskZxkq" src="https://github.com/user-attachments/assets/1cde4bb6-407d-4352-bd37-8a43d84821ac" />

Se contemplan los videos mostrados en la página principal de YouTube, aquellos en el canal de ESPN Fans, y los videos sugeridos que se encuentran abajo a la derecha al tener uno abierto.

Además, cuando se abre un video de highlights, se modifican el título del vídeo, del reproductor, y de la pestaña para evitar spoilers.

## Buildear y testear

- Instalar npm
- Abrir una terminal dentro del repositorio y correr:
```
npm i 
```
Para instalar las dependencias.
- Buildear la extensión con el siguiente comando:
```
npm run build
```
- Ir a la página de extensiones de tu navegador y activar el modo desarrollador
- (En Chrome) clickear en el botón "Cargar extensión sin paquete" y seleccionar la carpeta del repositorio.

## Creditos

- Logos de equipos europeos de [luukhopman/football-logos](https://github.com/luukhopman/football-logos)
- Banderas de países de [flagcdn.com](https://flagcdn.com/)

## Disclaimer

Esta extensión no está asociada con ESPN, ESPN Fans, ni con ninguno de los equipos de fútbol de los cuales la extensión muestra sus escudos en las miniaturas de los videos. Todos los derechos de sus imágenes pertenecen a los dueños correspondientes.
