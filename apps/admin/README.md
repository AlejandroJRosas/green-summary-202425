<div>
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png" alt="jolteon"/>
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/471.png" alt="glaceon"/>
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/470.png" alt="leafeon"/>
</div>

# Green Summary: Módulo de Inteligencia de Negocios 

## Descripción
Aquí se guardarán los archivos relacionados a los procesos de ETL y desarrollo del dashboard de la aplicación

## Tecnologías a utilizar
- Pentaho Spoon
- PowerBI

## Pasos a seguir para el proyecto (General):

1. Crear modelo dimensional de nuestra solución de BI
1. [Pentaho - **Transformation**] Extraer los datos de la BD y transformar según modelo dimensional
1. [Pentaho - **Transformation**] Cargar datos a DataWarehouse
1. [Pentaho **Job**] (Opcional) Crear rutina para ETL periódico 
1. [PowerBI] Conectar PowerBI con Datawarehouse
1. Definir métricas y gráficas de interés a ser mostradas según modelo dimensional y áreas de interés del negocio
1. [PowerBI] Diseñar Dashboard
1. [PowerBI] Pegar gráficas del dashboard con la información del Datawarehouse
1. [PowerBI - **Deploy**] Desplegar dashboard para su visualización
