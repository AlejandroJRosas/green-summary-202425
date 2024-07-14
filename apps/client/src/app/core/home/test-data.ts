import { MatrixInfoDto } from '../../services/recopilation.service'

export const matrix: MatrixInfoDto = {
  id: 23,
  name: 'GreenMetric 2025',
  description: 'La descripción de la recopilación es obligatoria',
  startDate: new Date('2024-07-02'),
  endDate: new Date('2024-07-31'),
  departmentEndDate: new Date('2024-07-24'),
  isReady: true,
  indicators: [
    {
      index: 1,
      name: 'Setting and Infrastructure (SI)',
      alias: 'Infraestructura',
      helpText:
        'Evalúa el compromiso de la institución con la creación de un campus sostenible a través del diseño, la construcción y la operación de sus instalaciones.',
      categories: [
        {
          id: 34,
          name: 'Área con Vegetación Plantada',
          helpText:
            'El área con vegetación plantada incluye todos los terrenos de una institución que han sido intencionalmente cultivados con plantas, arbustos, árboles y otras formas de vegetación.',
          criteria: [
            {
              id: 97,
              subIndex: 1,
              name: 'Types of higher education institution ',
              alias: 'Tipos de institución de educación superior',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 98,
              subIndex: 2,
              name: 'Climate',
              alias: 'Clima',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 99,
              subIndex: 3,
              name: 'Number of campus sites',
              alias: 'Número de sitios del campus',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 100,
              subIndex: 4,
              name: 'Campus setting',
              alias: 'Entorno del campus',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 101,
              subIndex: 5,
              name: 'Total campus area (m2)',
              alias: 'Área total del campus (m2)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 102,
              subIndex: 6,
              name: 'Total campus ground floor area of buildings (m2)',
              alias:
                'Superficie total de la planta baja de los edificios del campus (m2)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            }
          ]
        },
        {
          id: 35,
          name: 'Facilidades para personas con discapacidades',
          helpText:
            'Las facilidades para personas con discapacidades incluyen todas las infraestructuras y servicios diseñados para garantizar la accesibilidad y comodidad de las personas con discapacidades dentro de la institución.',
          criteria: [
            {
              id: 103,
              subIndex: 7,
              name: 'Total campus buildings area (m2)',
              alias: 'Área total de edificios del campus (m2)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 104,
              subIndex: 8,
              name: 'The ratio of open space area to total area',
              alias:
                'La relación entre el área de espacio abierto y el área total.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 105,
              subIndex: 9,
              name: 'Total area on campus covered in forest vegetation',
              alias: 'Área total del campus cubierta de vegetación forestal',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 106,
              subIndex: 10,
              name: 'Total area on campus covered in planted vegetation',
              alias: 'Área total del campus cubierta con vegetación plantada',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 107,
              subIndex: 11,
              name: 'Total area on campus for water absorption besides the forest and planted vegetation',
              alias:
                'Área total del campus para absorción de agua además del bosque y la vegetación plantada',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 108,
              subIndex: 12,
              name: 'Total number of regular students',
              alias: 'Número total de estudiantes regulares',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            }
          ]
        },
        {
          id: 36,
          name: 'Facilidades y equipamiento de seguridad física y laboral',
          helpText:
            'Las facilidades y el equipamiento de seguridad física y laboral abarcan todas las medidas, instalaciones y equipos destinados a garantizar la seguridad y el bienestar de las personas dentro de la institución.',
          criteria: [
            {
              id: 109,
              subIndex: 13,
              name: 'Total number of online students',
              alias: 'Número total de estudiantes en línea',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 110,
              subIndex: 14,
              name: 'Total number of academic and administrative staff',
              alias: 'Número total de personal académico y administrativo',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 111,
              subIndex: 15,
              name: 'The total open space area divided by the total campus population',
              alias:
                'El área total de espacios abiertos dividida por la población total del campus.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 112,
              subIndex: 16,
              name: 'Total university budget (in US Dollars)',
              alias:
                'Presupuesto universitario total (en dólares estadounidenses)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 113,
              subIndex: 17,
              name: 'University budget for sustainability effort (in US Dollars)',
              alias:
                'Presupuesto universitario para esfuerzos de sostenibilidad (en dólares estadounidenses)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 114,
              subIndex: 18,
              name: 'Percentage of university budget for sustainability efforts',
              alias:
                'Porcentaje del presupuesto universitario para esfuerzos de sostenibilidad',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            }
          ]
        },
        {
          id: 37,
          name: 'Conservación y promoción de la vida silvestre en campus',
          helpText:
            'La conservación y promoción de la vida silvestre en el campus incluye todas las iniciativas y prácticas destinadas a proteger y fomentar la biodiversidad local.',
          criteria: [
            {
              id: 115,
              subIndex: 19,
              name: 'Percentage of operation and maintenance activities of building in one year period',
              alias:
                'Porcentaje de actividades de operación y mantenimiento del edificio en el período de un año',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 116,
              subIndex: 20,
              name: 'Campus facilities for disabled, special needs and/or maternity care',
              alias:
                'Instalaciones del campus para discapacitados, necesidades especiales y/o atención de maternidad.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 117,
              subIndex: 21,
              name: 'Security and safety facilities',
              alias: 'Instalaciones de seguridad y protección.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 118,
              subIndex: 22,
              name: "Health infrastructure facilities for students, academics and administrative staffs' well-bein",
              alias:
                'Instalaciones de infraestructura de salud para el bienestar de estudiantes, académicos y personal administrativo.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 119,
              subIndex: 23,
              name: 'Conservation: plant (flora), animal (fauna), or wildlife, genetic resources for food and wildlife, genetic resources for food and agriculture secured in either medium or long- term conservation facilities',
              alias:
                'Conservación: plantas (flora), animales (fauna) o vida silvestre, recursos genéticos para la alimentación y la vida silvestre, recursos genéticos para la alimentación y la agricultura asegurados en instalaciones de conservación a mediano o largo plazo.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 120,
              subIndex: 24,
              name: 'Planning, implementation, monitoring and/or evaluation of all programs related to Setting and Infrastructure through the utilization of Information and Communication Technology (ICT)',
              alias:
                'Planificación, implementación, seguimiento y/o evaluación de todos los programas relacionados con el Entorno y la Infraestructura mediante la utilización de Tecnologías de la Información y la Comunicación (TIC)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        }
      ]
    },
    {
      index: 2,
      name: 'Energy and Climate Change (EC)',
      alias: 'Energía y Cambio Climático',
      helpText:
        'Evalúa el compromiso de la institución con la reducción de su huella de carbono y la lucha contra el cambio climático.',
      categories: [
        {
          id: 38,
          name: 'Equipamiento para uso eficiente de la energía',
          helpText:
            'Información sobre equipos y dispositivos que ayudan a utilizar la energía de manera más eficiente.',
          criteria: [
            {
              id: 121,
              subIndex: 1,
              name: 'Energy efficient appliances usage',
              alias: 'Uso de electrodomésticos energéticamente eficientes',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 122,
              subIndex: 2,
              name: "Total campus' smart building area (m2 )",
              alias:
                'Superficie total del edificio inteligente del campus (m2 )',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            }
          ]
        },
        {
          id: 39,
          name: 'Edificaciones inteligentes',
          helpText:
            'Detalles sobre edificaciones que integran sistemas inteligentes para optimizar el uso de recursos.',
          criteria: [
            {
              id: 123,
              subIndex: 3,
              name: 'Smart building implementation',
              alias: 'Implantación de edificios inteligentes',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 124,
              subIndex: 4,
              name: 'Number of renewable energy sources on campus',
              alias: 'Número de fuentes de energía renovables en el campus',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            }
          ]
        },
        {
          id: 40,
          name: 'Fuentes de energía renovables',
          helpText:
            'Información sobre las diversas fuentes de energía renovable disponibles.',
          criteria: [
            {
              id: 125,
              subIndex: 5,
              name: 'Renewable energy sources and their amount of the energy produced',
              alias:
                '\nFuentes de energía renovables y su cantidad de energía producida.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 126,
              subIndex: 6,
              name: 'Electricity usage per year (in kilowatt hours)',
              alias: 'Consumo de electricidad por año (en kilovatios hora)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        },
        {
          id: 41,
          name: 'Consumo de electricidad',
          helpText:
            'Datos sobre el consumo de electricidad y cómo se puede gestionar mejor.',
          criteria: [
            {
              id: 127,
              subIndex: 7,
              name: "Total electricity usage divided by total campus' population (kWh per person)",
              alias:
                '\nUso total de electricidad dividido por la población total del campus (kWh por persona)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 128,
              subIndex: 8,
              name: 'The ratio of renewable energy production divided by total energy usage per year',
              alias:
                'La proporción de producción de energía renovable dividida por el uso total de energía por año.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            }
          ]
        },
        {
          id: 42,
          name: 'Consumo de agua',
          helpText:
            'Detalles sobre el consumo de agua y métodos para conservar este recurso.',
          criteria: [
            {
              id: 129,
              subIndex: 9,
              name: 'Elements of green building implementation as reflected in all construction and renovation policies',
              alias:
                '\nElementos de la implementación de edificios sustentables reflejados en todas las políticas de construcción y renovación.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 130,
              subIndex: 10,
              name: 'Greenhouse gas emission reduction program',
              alias:
                '\nPrograma de reducción de emisiones de gases de efecto invernadero',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        },
        {
          id: 43,
          name: 'Huella de Carbono',
          helpText:
            'Información sobre cómo se mide la huella de carbono y su importancia.',
          criteria: [
            {
              id: 131,
              subIndex: 11,
              name: 'Total carbon footprint (CO₂ emission in the last 12 months, in metric tons)',
              alias:
                '\nHuella de carbono total (emisiones de CO₂ en los últimos 12 meses, en toneladas métricas)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 132,
              subIndex: 12,
              name: "Total carbon footprint divided by total campus' population (metric tons per person)",
              alias:
                'Huella de carbono total dividida por la población total del campus (toneladas métricas por persona)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            }
          ]
        },
        {
          id: 44,
          name: 'Programa reducción de GEI',
          helpText:
            'Programas diseñados para reducir las emisiones de gases de efecto invernadero.',
          criteria: [
            {
              id: 133,
              subIndex: 13,
              name: 'Number of innovative program(s) in energy and climate change',
              alias:
                'Número de programas innovadores en energía y cambio climático',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 134,
              subIndex: 14,
              name: 'Impactful university program(s) on climate change',
              alias:
                'Programa(s) universitario(s) impactante(s) sobre el cambio climático',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        },
        {
          id: 45,
          name: 'Políticas Verdes',
          helpText:
            'Políticas que fomentan la implementación de prácticas verdes en la organización.',
          criteria: [
            {
              id: 135,
              subIndex: 15,
              name: 'Planning, implementation, monitoring and/or evaluation of all programs related to Energy and Climate Change through the utilization of Information and Communication Technology (ICT)',
              alias:
                '\nPlanificación, implementación, seguimiento y/o evaluación de todos los programas relacionados con Energía y Cambio Climático mediante la utilización de Tecnologías de la Información y la Comunicación (TIC)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        }
      ]
    },
    {
      index: 3,
      name: 'Waste (WS)',
      alias: 'Desperdicios',
      helpText:
        'Evalúa el compromiso de la institución con la reducción de la generación de residuos y la promoción de prácticas sostenibles de manejo de residuos.',
      categories: [
        {
          id: 46,
          name: 'Programa 3R para papel y plástico',
          helpText:
            'El Programa 3R (Reducir, Reutilizar y Reciclar) para papel y plástico busca minimizar el impacto ambiental de estos materiales dentro de la institución.',
          criteria: [
            {
              id: 136,
              subIndex: 1,
              name: "3R (Reduce, Reuse, Recycle) program for university's waste",
              alias:
                '\nPrograma 3R (Reducir, Reutilizar, Reciclar) para los residuos universitarios',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 137,
              subIndex: 2,
              name: 'Program to reduce the use of paper and plastic on campus',
              alias:
                'Programa para reducir el uso de papel y plástico en el campus',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 138,
              subIndex: 3,
              name: 'Total volume organic waste produced',
              alias: 'Volumen total de residuos orgánicos producidos',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        },
        {
          id: 47,
          name: 'Programa 3R para materia orgánica',
          helpText:
            'El Programa 3R (Reducir, Reutilizar y Reciclar) para materia orgánica está diseñado para gestionar de manera sostenible los residuos orgánicos generados dentro de la institución.',
          criteria: [
            {
              id: 139,
              subIndex: 4,
              name: 'Total volume organic waste treated',
              alias: 'Volumen total de residuos orgánicos tratados',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 140,
              subIndex: 5,
              name: 'Organic waste treatment',
              alias: 'Tratamiento de residuos orgánicos',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 141,
              subIndex: 6,
              name: 'Total volume inorganic waste produced',
              alias: '\nVolumen total de residuos inorgánicos producidos',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        },
        {
          id: 48,
          name: 'Programa 3R desechos tóxicos',
          helpText:
            'El Programa 3R (Reducir, Reutilizar y Reciclar) para desechos tóxicos está orientado a gestionar de manera segura y sostenible los residuos peligrosos generados en la institución.',
          criteria: [
            {
              id: 142,
              subIndex: 7,
              name: 'Total volume inorganic waste treated',
              alias: 'Volumen total de residuos inorgánicos tratados',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 143,
              subIndex: 8,
              name: 'Inorganic waste treatment',
              alias: 'Tratamiento de residuos inorgánicos',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 144,
              subIndex: 9,
              name: 'Total volume toxic waste produced',
              alias: 'Volumen total de residuos tóxicos producidos',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        },
        {
          id: 49,
          name: 'Programa Tratamiento de Aguas servidas',
          helpText:
            'El Programa de Tratamiento de Aguas Servidas está diseñado para gestionar y tratar las aguas residuales generadas en la institución de manera eficiente y sostenible.',
          criteria: [
            {
              id: 145,
              subIndex: 10,
              name: 'Total volume toxic waste treated',
              alias: 'Volumen total de residuos tóxicos tratados',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 146,
              subIndex: 11,
              name: 'Toxic waste treatment',
              alias: 'Tratamiento de residuos tóxicos',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 147,
              subIndex: 12,
              name: 'Sewage disposal',
              alias: '\nEliminación de aguas residuales',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 148,
              subIndex: 13,
              name: 'Planning, implementation, monitoring and/or evaluation of all programs related to Waste Management through the utilization of Information and Communication Technology (ICT)',
              alias:
                'Planificación, implementación, seguimiento y/o evaluación de todos los programas relacionados con la Gestión de Residuos mediante la utilización de Tecnologías de la Información y la Comunicación (TIC)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        }
      ]
    },
    {
      index: 4,
      name: 'Water (WR)',
      alias: 'Agua',
      helpText: 'Datos sobre el uso y conservación del agua.',
      categories: [
        {
          id: 50,
          name: 'Programa Conservación y uso eficiente del Agua',
          helpText:
            'Información sobre cómo conservar el agua y utilizarla eficientemente.',
          criteria: [
            {
              id: 149,
              subIndex: 1,
              name: 'Water conservation program and implementation',
              alias: '\nPrograma e implementación de conservación del agua',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 150,
              subIndex: 2,
              name: 'Water recycling program implementation',
              alias: 'Implementación del programa de reciclaje de agua.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 151,
              subIndex: 3,
              name: 'Water efficient appliances usage',
              alias: 'Uso de electrodomésticos que ahorran agua',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        },
        {
          id: 51,
          name: 'Programa Reciclaje del Agua',
          helpText:
            'Detalles sobre cómo reciclar y reutilizar el agua de manera efectiva.',
          criteria: [
            {
              id: 152,
              subIndex: 4,
              name: 'Consumption of treated water',
              alias: '\nConsumo de agua tratada',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 153,
              subIndex: 5,
              name: 'Water pollution control in the campus area',
              alias:
                'Control de la contaminación del agua en el área del campus.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 154,
              subIndex: 6,
              name: 'Planning, implementation, monitoring and/or evaluation of all programs related to Water Management through the utilization of Information and Communication Technology (ICT)',
              alias:
                'Planificación, implementación, seguimiento y/o evaluación de todos los programas relacionados con la Gestión del Agua mediante la utilización de Tecnologías de la Información y la Comunicación (TIC)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        }
      ]
    },
    {
      index: 5,
      name: 'Transportation (TR)',
      alias: 'Transporte',
      helpText: 'Información sobre los medios de transporte disponibles.',
      categories: [
        {
          id: 52,
          name: 'Iniciativas de transporte de emisión cero',
          helpText:
            'Las iniciativas de transporte de emisión cero están orientadas a promover el uso de medios de transporte sostenibles y libres de emisiones dentro de la institución.',
          criteria: [
            {
              id: 155,
              subIndex: 1,
              name: 'Number of cars actively used and managed by the university',
              alias:
                'Número de automóviles utilizados y gestionados activamente por la universidad.\n',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 156,
              subIndex: 2,
              name: 'Number of cars entering the university daily',
              alias:
                'Número de automóviles que ingresan a la universidad diariamente.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 157,
              subIndex: 3,
              name: 'Number of motorcycles entering the university daily',
              alias:
                '\nNúmero de motocicletas que ingresan diariamente a la universidad',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 158,
              subIndex: 4,
              name: "The total number of vehicles (cars and motorcycles with combustion engines) divided by the total campus' population",
              alias:
                'El número total de vehículos (automóviles y motocicletas con motor de combustión) dividido por la población total del campus.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 159,
              subIndex: 5,
              name: 'Shuttle services',
              alias: 'Servicios de transporte',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 160,
              subIndex: 6,
              name: 'Number of shuttles operating in the university',
              alias: 'Número de transportes operando en la universidad',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 161,
              subIndex: 7,
              name: 'Average number of passengers of each shuttle',
              alias: '\nNúmero promedio de pasajeros de cada transporte',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 162,
              subIndex: 8,
              name: 'Total trips of each shuttle services each day',
              alias:
                '\nNúmero total de viajes de cada servicio de transporte cada día',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 163,
              subIndex: 9,
              name: 'Zero Emission Vehicles (ZEV) availability on campus',
              alias:
                'Disponibilidad de vehículos de cero emisiones (ZEV) en el campus',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        },
        {
          id: 53,
          name: 'Iniciativas reducción uso vehículos',
          helpText:
            'Las iniciativas de reducción del uso de vehículos buscan disminuir la dependencia de automóviles y promover alternativas de transporte más sostenibles dentro de la institución.',
          criteria: [
            {
              id: 164,
              subIndex: 10,
              name: 'Average number of Zero Emission Vehicles on campus per day',
              alias:
                'Número promedio de vehículos de cero emisiones en el campus por día',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 165,
              subIndex: 11,
              name: 'The total number of Zero Emission Vehicles (ZEV) divided by the total campus population',
              alias:
                '\nEl número total de vehículos de cero emisiones (ZEV) dividido por la población total del campus',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 166,
              subIndex: 12,
              name: 'Total ground parking area (m2 )',
              alias: '\nÁrea total de estacionamiento en tierra (m2)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 167,
              subIndex: 13,
              name: 'The ratio of the ground parking area to total campus area',
              alias:
                'La relación entre el área de estacionamiento en tierra y el área total del campus.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 168,
              subIndex: 14,
              name: 'Program to limit or decrease the parking area on campus for the last 3 years (from 2021 to 2023)',
              alias:
                'Programa para limitar o disminuir el área de estacionamiento en el campus durante los últimos 3 años (de 2021 a 2023)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 169,
              subIndex: 15,
              name: 'Number of initiatives to decrease private vehicles on campus',
              alias:
                'Número de iniciativas para disminuir el vehículo privado en el campus',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 170,
              subIndex: 16,
              name: 'Pedestrian path on campus',
              alias: '\nCamino peatonal en el campus',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 171,
              subIndex: 17,
              name: 'The approximate daily travel distance of a vehicle inside your campus only (in Kilometers)',
              alias:
                'La distancia diaria aproximada de viaje de un vehículo dentro de su campus únicamente (en kilómetros)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 172,
              subIndex: 18,
              name: 'Planning, implementation, monitoring and/or evaluation of all programs related to Transportation through the utilization of Information and Communication Technology (ICT)',
              alias:
                'Planificación, implementación, seguimiento y/o evaluación de todos los programas relacionados con el Transporte mediante la utilización de Tecnologías de la Información y las Comunicaciones (TIC)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        }
      ]
    },
    {
      index: 6,
      name: 'Education and Research (ED)',
      alias: 'Educación',
      helpText: 'Información sobre programas educativos y de investigación.',
      categories: [
        {
          id: 54,
          name: 'Cursos académicos con contenidos de sostenibilidad',
          helpText:
            'Evalúa el compromiso de la institución con la integración de principios y prácticas de sostenibilidad en la currícula académica.',
          criteria: [
            {
              id: 173,
              subIndex: 1,
              name: 'Number of courses/subjects related to sustainability offerred',
              alias:
                'Número de cursos/materias relacionadas con la sostenibilidad ofertadas',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 174,
              subIndex: 2,
              name: 'Total number of courses/subjects offered',
              alias: 'Número total de cursos/materias ofrecidas',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        },
        {
          id: 55,
          name: 'Publicaciones académicas en sostenibilidad',
          helpText:
            'Evalúa el compromiso de la institución con la investigación y la difusión del conocimiento en el ámbito de la sostenibilidad.',
          criteria: [
            {
              id: 175,
              subIndex: 3,
              name: 'The ratio of sustainability courses to total courses/subjects',
              alias:
                'La proporción de cursos de sostenibilidad con respecto al total de cursos/asignaturas.',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 176,
              subIndex: 4,
              name: 'Total research funds dedicated to sustainability research (in US Dollars)',
              alias:
                'Fondos totales de investigación dedicados a la investigación sobre sostenibilidad (en dólares estadounidenses)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        },
        {
          id: 56,
          name: 'Eventos relacionados con sostenibilidad',
          helpText:
            'Evalúa el compromiso de la institución con la organización y participación en eventos que promuevan la educación, la sensibilización y la acción hacia la sostenibilidad.',
          criteria: [
            {
              id: 177,
              subIndex: 5,
              name: 'Total research funds (in US Dollars)',
              alias:
                '\nFondos totales de investigación (en dólares estadounidenses)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 178,
              subIndex: 6,
              name: 'The ratio of sustainability research funding to total research funding',
              alias:
                '\nLa relación entre la financiación de la investigación sobre sostenibilidad y la financiación total de la investigación',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            }
          ]
        },
        {
          id: 57,
          name: 'Actividades organizadas por estudiantes relacionadas con sostenibilidad',
          helpText:
            'Evalúa el compromiso de la institución con el fomento de la participación estudiantil en iniciativas que promuevan la sostenibilidad.',
          criteria: [
            {
              id: 179,
              subIndex: 7,
              name: 'Number of scholarly publications on sustainability',
              alias: 'Número de publicaciones académicas sobre sostenibilidad',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 180,
              subIndex: 8,
              name: 'Number of events related to sustainability (environment)',
              alias:
                '\nNúmero de eventos relacionados con la sostenibilidad (medio ambiente)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        },
        {
          id: 58,
          name: 'Sitio web con contenidos de sostenibilidad',
          helpText:
            'Evalúa la existencia y calidad de los contenidos relacionados con la sostenibilidad en el sitio web de la institución.',
          criteria: [
            {
              id: 181,
              subIndex: 9,
              name: 'Number of activities organized by student organizations related to sustainability per year',
              alias:
                'Número de actividades organizadas por organizaciones estudiantiles relacionadas con la sostenibilidad por año',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 182,
              subIndex: 10,
              name: 'University-run sustainability website',
              alias:
                'Sitio web de sostenibilidad gestionado por la universidad',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            }
          ]
        },
        {
          id: 59,
          name: 'Reporte de sostenibilidad',
          helpText:
            'Evalúa la elaboración y publicación de informes que transparentan el desempeño ambiental, social y económico de la institución.',
          criteria: [
            {
              id: 183,
              subIndex: 11,
              name: 'Sustainability website address (URL) if available',
              alias:
                '\nDirección del sitio web de sostenibilidad (URL), si está disponible',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 184,
              subIndex: 12,
              name: 'Sustainability report',
              alias: 'Reporte de Sostenibilidad',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        },
        {
          id: 60,
          name: 'Actividades culturales en el campus',
          helpText:
            'Evalúa la promoción y desarrollo de actividades culturales que fomenten la vida universitaria y el bienestar de la comunidad.',
          criteria: [
            {
              id: 185,
              subIndex: 13,
              name: 'Sustainability report link address (URL) if available',
              alias:
                '\nDirección del enlace del informe de sostenibilidad (URL), si está disponible',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            },
            {
              id: 186,
              subIndex: 14,
              name: 'Number of cultural activities on campus',
              alias: 'Número de actividades culturales en el campus',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        },
        {
          id: 61,
          name: 'Programas de aprendizaje y enseñanza en sostenibilidad',
          helpText:
            'Evalúa la existencia e implementación de programas y cursos que abordan temáticas relacionadas con el desarrollo sostenible.',
          criteria: [
            {
              id: 187,
              subIndex: 15,
              name: 'Number of university sustainability program(s) with international collaborations',
              alias:
                '\nNúmero de programas universitarios de sostenibilidad con colaboraciones internacionales',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 188,
              subIndex: 16,
              name: 'Number of community services related to sustainability organized by university and involving students',
              alias:
                'Número de servicios comunitarios relacionados con la sostenibilidad organizados por universidad y que involucran a estudiantes',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        },
        {
          id: 62,
          name: 'Actividades comunitarias con contenidos de sostenibilidad(involucren estudiantes)',
          helpText:
            'Evalúa la existencia y desarrollo de actividades comunitarias que promuevan el aprendizaje y la acción sostenible entre los estudiantes.',
          criteria: [
            {
              id: 189,
              subIndex: 17,
              name: 'Number of sustainability-related startups',
              alias: '\nNúmero de startups relacionadas con la sostenibilidad',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 190,
              subIndex: 18,
              name: 'Total number of graduates with green jobs',
              alias: '\nNúmero total de graduados con empleos verdes',
              helpText: 'Texto de Ayuda',
              requiresEvidence: false
            }
          ]
        },
        {
          id: 63,
          name: 'Iniciativas emprendimientos',
          helpText:
            'Evalúa el apoyo y fomento que brinda la institución al desarrollo de iniciativas emprendedoras entre sus estudiantes, egresados y comunidad en general.',
          criteria: [
            {
              id: 191,
              subIndex: 19,
              name: 'Availability of unit(s) or office(s) that coordinate sustainability on campus',
              alias:
                '\nDisponibilidad de unidad(es) u oficina(s) que coordinen la sostenibilidad en el campus',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            },
            {
              id: 192,
              subIndex: 20,
              name: 'Planning, implementation, monitoring and/or evaluation of university governance through the utilization of Information and Communication Technology (ICT)',
              alias:
                '\nPlanificación, implementación, seguimiento y/o evaluación de la gobernanza universitaria mediante la utilización de Tecnologías de la Información y las Comunicaciones (TIC)',
              helpText: 'Texto de Ayuda',
              requiresEvidence: true
            }
          ]
        }
      ]
    }
  ],
  departments: [
    {
      department: {
        id: 138,
        fullName: 'Dirección de Servicios Generales',
        email: 'email3@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 142,
        fullName: 'Dirección de Extensión Social Universitaria',
        email: 'email7@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 140,
        fullName: 'Coordinación de Sustentabilidad Ambiental',
        email: 'email5@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 139,
        fullName: 'Coordinación de Seguridad y Salud laboral',
        email: 'email4@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 156,
        fullName: 'Coordinación General de Tecnología de la Información (CGTI)',
        email: 'email21@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 54,
        fullName: 'CADH',
        email: 'cadh@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 141,
        fullName: 'Coordinación de Comunicaciones',
        email: 'email6@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 144,
        fullName: 'Escuela de Ingeniería Civil',
        email: 'email9@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 145,
        fullName: 'Escuela de Ingeniería Industrial',
        email: 'email10@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 146,
        fullName: 'Escuela de Ingeniería Informática',
        email: 'email11@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 154,
        fullName: 'Dirección de Desarrollo Estudiantil',
        email: 'email19@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 136,
        fullName: 'Vicerrectorado',
        email: 'vicerectorado@ucab.edu.ve',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 153,
        fullName: 'Coordinación de Internacionalización',
        email: 'email18@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 151,
        fullName: 'Escuela de Educación',
        email: 'email16@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 148,
        fullName: 'Escuela Admininstración y Contaduría',
        email: 'email13@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 149,
        fullName: 'Escuela Relaciones Industriales',
        email: 'email14@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 150,
        fullName: 'Escuela de Derecho',
        email: 'email15@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 147,
        fullName: 'Escuela de Comunicación Social',
        email: 'email12@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 155,
        fullName: 'Coordinación General de Recursos Humanos',
        email: 'email20@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 157,
        fullName: 'Centro Estudios Regionales',
        email: 'email22@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 152,
        fullName: 'Coordinación de Cultura',
        email: 'email17@gmail.com',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: true,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    },
    {
      department: {
        id: 137,
        fullName: 'Dirección de Finanzas y Administración',
        email: 'finanzas.admin@ucab.edu.ve',
        type: 'department'
      },
      answers: [
        {
          categoryId: 34,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 35,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 36,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 37,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 38,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 39,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 40,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 41,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 42,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 43,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 44,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 45,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 46,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 47,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 48,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 49,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 50,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 51,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 52,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 53,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 54,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 55,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 56,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 57,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 58,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 59,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 60,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 61,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 62,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        },
        {
          categoryId: 63,
          isRecommended: false,
          isAnswered: false,
          isApproved: false,
          hasError: false
        }
      ]
    }
  ]
}
