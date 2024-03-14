import { TransferAvailabilityDetails } from "@/interfaces";

export const mockTransfer: TransferAvailabilityDetails[] = [
  {
    id: 0,
    direction: "DEPARTURE",
    transferType: "PRIVATE",
    vehicle: {
      code: "CR",
      name: "Coche",
    },
    category: {
      code: "STND",
      name: "Estándar",
    },
    pickupInformation: {
      from: {
        code: "265",
        description: "HM Jaime III",
        type: "ATLAS",
      },
      to: {
        code: "PMI",
        description: "Aeropuerto de Mallorca - Palma",
        type: "IATA",
      },
      date: "2024-04-17",
      time: "09:55:00",
      pickup: {
        address: null,
        number: null,
        town: null,
        zip: null,
        description:
          "ENCONTRAR A SU CONDUCTOR \n\nEspere en la recepción del hotel 10/15 minutos antes de la hora de recogida, el conductor llevará un cartel con su nombre. \n\nSi no se aloja en un hotel (es decir, si se hospeda en una residencia privada, villa u hostal), debe salir fuera 10/15 minutos antes de la hora de recogida. \n\nIdentifíquese mostrando su bono al Proveedor, para quien actuamos como agente de reservas. \n\nLos cambios en los horarios de recogida deben solicitarse a su proveedor o agente de reservas al menos 24 horas antes de la salida. Si el proveedor acepta el cambio, será bajo su propio riesgo. \n\nNo podemos aceptar ninguna responsabilidad por los clientes que no son recogidos a tiempo y, posteriormente, pierden algún vuelo o conexión si los detalles de la reserva han cambiado y no se nos ha informado en consecuencia.\n\nDIFICULTAD LOCALIZANDO A SU CONDUCTOR\nPóngase en contacto con su proveedor para que le ayude. No se vaya sin haber contactado antes con su proveedor en el número +34 871 170 555.\n\nEn caso de que se retrase, deberá llamar al proveedor.",
        altitude: null,
        latitude: 39.57301,
        longitude: 2.642626,
        checkPickup: {
          mustCheckPickupTime: false,
          url: null,
          hoursBeforeConsulting: null,
        },
        pickupId: null,
        stopName: null,
        image: null,
      },
    },
    minPaxCapacity: 1,
    maxPaxCapacity: 4,
    content: {
      vehicle: {
        code: "CR",
        name: "Coche",
      },
      category: {
        code: "STND",
        name: "Estándar",
      },
      images: [
        {
          url: "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
          type: "EXTRALARGE",
        },
        {
          url: "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
          type: "LARGE",
        },
        {
          url: "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
          type: "MEDIUM",
        },
        {
          url: "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
          type: "SMALL",
        },
      ],
      transferDetailInfo: [
        {
          id: "0",
          name: "20 min. Duracion estimada del trayecto",
          description: "20 min. Duracion estimada del trayecto",
          type: "GENERAL_INFO",
        },
        {
          id: "1",
          name: "1 pasajero(s) minimo",
          description: "1 pasajero(s) minimo",
          type: "GENERAL_INFO",
        },
        {
          id: "2",
          name: "4 pasajero(s) maximo",
          description: "4 pasajero(s) maximo",
          type: "GENERAL_INFO",
        },
        {
          id: "3",
          name: "4 maletas permitidas",
          description: "4 maletas permitidas",
          type: "GENERAL_INFO",
        },
      ],
      customerTransferTimeInfo: [],
      supplierTransferTimeInfo: [],
      transferRemarks: [
        {
          type: "CONTRACT",
          description:
            "ENCONTRAR A SU CONDUCTOR \n\nEspere en la recepción del hotel 10/15 minutos antes de la hora de recogida, el conductor llevará un cartel con su nombre. \n\nSi no se aloja en un hotel (es decir, si se hospeda en una residencia privada, villa u hostal), debe salir fuera 10/15 minutos antes de la hora de recogida. \n\nIdentifíquese mostrando su bono al Proveedor, para quien actuamos como agente de reservas. \n\nLos cambios en los horarios de recogida deben solicitarse a su proveedor o agente de reservas al menos 24 horas antes de la salida. Si el proveedor acepta el cambio, será bajo su propio riesgo. \n\nNo podemos aceptar ninguna responsabilidad por los clientes que no son recogidos a tiempo y, posteriormente, pierden algún vuelo o conexión si los detalles de la reserva han cambiado y no se nos ha informado en consecuencia.\n\nDIFICULTAD LOCALIZANDO A SU CONDUCTOR\nPóngase en contacto con su proveedor para que le ayude. No se vaya sin haber contactado antes con su proveedor en el número +34 871 170 555.\n\nEn caso de que se retrase, deberá llamar al proveedor.",
          mandatory: true,
        },
      ],
    },
    price: {
      totalAmount: 37.36,
      netAmount: null,
      currencyId: "EUR",
    },
    rateKey:
      "DEPARTURE|ATLAS|265|IATA|PMI|2024-04-17|09:55|2024-04-17|12:15|2~0~0||4|||||1|PRVT||CR|STND|37.36||||43|PMI|SIMPLE|9a21b233860c2ce0740c51629018bafa|1275900|R|c98a9508a212c182c31e99816297a257",
    cancellationPolicies: [
      {
        amount: 37.36,
        from: "2024-04-16T12:15:00",
        currencyId: "EUR",
        isForceMajeure: null,
      },
    ],
    links: [
      {
        rel: "self",
        href: "/availability",
        method: "GET",
      },
      {
        rel: "confirm",
        href: "/booking",
        method: "POST",
      },
    ],
    factsheetId: 43,
  },
  {
    id: 1,
    direction: "DEPARTURE",
    transferType: "PRIVATE",
    vehicle: {
      code: "CR",
      name: "Coche",
    },
    category: {
      code: "PRM",
      name: "Premium",
    },
    pickupInformation: {
      from: {
        code: "265",
        description: "HM Jaime III",
        type: "ATLAS",
      },
      to: {
        code: "PMI",
        description: "Aeropuerto de Mallorca - Palma",
        type: "IATA",
      },
      date: "2024-04-17",
      time: "09:55:00",
      pickup: {
        address: null,
        number: null,
        town: null,
        zip: null,
        description:
          "ENCONTRAR A SU CONDUCTOR \n\nEspere en la recepción del hotel 10/15 minutos antes de la hora de recogida, el conductor llevará un cartel con su nombre. \n\nSi no se aloja en un hotel (es decir, si se hospeda en una residencia privada, villa u hostal), debe salir fuera 10/15 minutos antes de la hora de recogida. \n\nIdentifíquese mostrando su bono al Proveedor, para quien actuamos como agente de reservas. \n\nLos cambios en los horarios de recogida deben solicitarse a su proveedor o agente de reservas al menos 24 horas antes de la salida. Si el proveedor acepta el cambio, será bajo su propio riesgo. \n\nNo podemos aceptar ninguna responsabilidad por los clientes que no son recogidos a tiempo y, posteriormente, pierden algún vuelo o conexión si los detalles de la reserva han cambiado y no se nos ha informado en consecuencia.\n\nDIFICULTAD LOCALIZANDO A SU CONDUCTOR\nPóngase en contacto con su proveedor para que le ayude. No se vaya sin haber contactado antes con su proveedor en el número +34 871 170 555.\n\nEn caso de que se retrase, deberá llamar al proveedor.",
        altitude: null,
        latitude: 39.57301,
        longitude: 2.642626,
        checkPickup: {
          mustCheckPickupTime: false,
          url: null,
          hoursBeforeConsulting: null,
        },
        pickupId: null,
        stopName: null,
        image: null,
      },
    },
    minPaxCapacity: 1,
    maxPaxCapacity: 3,
    content: {
      vehicle: {
        code: "CR",
        name: "Coche",
      },
      category: {
        code: "PRM",
        name: "Premium",
      },
      images: [
        {
          url: "https://assets.holidaytaxis.com/imgs/default/vehicle_set/luxury-car.png",
          type: "EXTRALARGE",
        },
        {
          url: "https://assets.holidaytaxis.com/imgs/default/vehicle_set/luxury-car.png",
          type: "LARGE",
        },
        {
          url: "https://assets.holidaytaxis.com/imgs/default/vehicle_set/luxury-car.png",
          type: "MEDIUM",
        },
        {
          url: "https://assets.holidaytaxis.com/imgs/default/vehicle_set/luxury-car.png",
          type: "SMALL",
        },
      ],
      transferDetailInfo: [
        {
          id: "0",
          name: "20 min. Duracion estimada del trayecto",
          description: "20 min. Duracion estimada del trayecto",
          type: "GENERAL_INFO",
        },
        {
          id: "1",
          name: "1 pasajero(s) minimo",
          description: "1 pasajero(s) minimo",
          type: "GENERAL_INFO",
        },
        {
          id: "2",
          name: "3 pasajero(s) maximo",
          description: "3 pasajero(s) maximo",
          type: "GENERAL_INFO",
        },
        {
          id: "3",
          name: "3 maletas permitidas",
          description: "3 maletas permitidas",
          type: "GENERAL_INFO",
        },
      ],
      customerTransferTimeInfo: [],
      supplierTransferTimeInfo: [],
      transferRemarks: [
        {
          type: "CONTRACT",
          description:
            "ENCONTRAR A SU CONDUCTOR \n\nEspere en la recepción del hotel 10/15 minutos antes de la hora de recogida, el conductor llevará un cartel con su nombre. \n\nSi no se aloja en un hotel (es decir, si se hospeda en una residencia privada, villa u hostal), debe salir fuera 10/15 minutos antes de la hora de recogida. \n\nIdentifíquese mostrando su bono al Proveedor, para quien actuamos como agente de reservas. \n\nLos cambios en los horarios de recogida deben solicitarse a su proveedor o agente de reservas al menos 24 horas antes de la salida. Si el proveedor acepta el cambio, será bajo su propio riesgo. \n\nNo podemos aceptar ninguna responsabilidad por los clientes que no son recogidos a tiempo y, posteriormente, pierden algún vuelo o conexión si los detalles de la reserva han cambiado y no se nos ha informado en consecuencia.\n\nDIFICULTAD LOCALIZANDO A SU CONDUCTOR\nPóngase en contacto con su proveedor para que le ayude. No se vaya sin haber contactado antes con su proveedor en el número +34 871 170 555.\n\nEn caso de que se retrase, deberá llamar al proveedor.",
          mandatory: true,
        },
      ],
    },
    price: {
      totalAmount: 73.66,
      netAmount: null,
      currencyId: "EUR",
    },
    rateKey:
      "DEPARTURE|ATLAS|265|IATA|PMI|2024-04-17|09:55|2024-04-17|12:15|2~0~0||3|||||1|PRVT||CR|PRM|73.66||||18|PMI|SIMPLE|68f929c7bf19f8594a534f7b97adb313|1275760|R|c98a9508a212c182c31e99816297a257",
    cancellationPolicies: [
      {
        amount: 73.66,
        from: "2024-04-16T12:15:00",
        currencyId: "EUR",
        isForceMajeure: null,
      },
    ],
    links: [
      {
        rel: "self",
        href: "/availability",
        method: "GET",
      },
      {
        rel: "confirm",
        href: "/booking",
        method: "POST",
      },
    ],
    factsheetId: 18,
  },
  {
    id: 2,
    direction: "DEPARTURE",
    transferType: "PRIVATE",
    vehicle: {
      code: "MNBS",
      name: "Shuttle",
    },
    category: {
      code: "STND",
      name: "Estándar",
    },
    pickupInformation: {
      from: {
        code: "265",
        description: "HM Jaime III",
        type: "ATLAS",
      },
      to: {
        code: "PMI",
        description: "Aeropuerto de Mallorca - Palma",
        type: "IATA",
      },
      date: "2024-04-17",
      time: "09:55:00",
      pickup: {
        address: null,
        number: null,
        town: null,
        zip: null,
        description:
          "ENCONTRAR A SU CONDUCTOR \n\nEspere en la recepción del hotel 10/15 minutos antes de la hora de recogida, el conductor llevará un cartel con su nombre. \n\nSi no se aloja en un hotel (es decir, si se hospeda en una residencia privada, villa u hostal), debe salir fuera 10/15 minutos antes de la hora de recogida. \n\nIdentifíquese mostrando su bono al Proveedor, para quien actuamos como agente de reservas. \n\nLos cambios en los horarios de recogida deben solicitarse a su proveedor o agente de reservas al menos 24 horas antes de la salida. Si el proveedor acepta el cambio, será bajo su propio riesgo. \n\nNo podemos aceptar ninguna responsabilidad por los clientes que no son recogidos a tiempo y, posteriormente, pierden algún vuelo o conexión si los detalles de la reserva han cambiado y no se nos ha informado en consecuencia.\n\nDIFICULTAD LOCALIZANDO A SU CONDUCTOR\nPóngase en contacto con su proveedor para que le ayude. No se vaya sin haber contactado antes con su proveedor en el número +34 871 170 555.\n\nEn caso de que se retrase, deberá llamar al proveedor.",
        altitude: null,
        latitude: 39.57301,
        longitude: 2.642626,
        checkPickup: {
          mustCheckPickupTime: false,
          url: null,
          hoursBeforeConsulting: null,
        },
        pickupId: null,
        stopName: null,
        image: null,
      },
    },
    minPaxCapacity: 5,
    maxPaxCapacity: 8,
    content: {
      vehicle: {
        code: "MNBS",
        name: "Shuttle",
      },
      category: {
        code: "STND",
        name: "Estándar",
      },
      images: [
        {
          url: "https://assets.holidaytaxis.com/imgs/default/vehicle_set/minibus-minified.jpg",
          type: "EXTRALARGE",
        },
        {
          url: "https://assets.holidaytaxis.com/imgs/default/vehicle_set/minibus-minified.jpg",
          type: "LARGE",
        },
        {
          url: "https://assets.holidaytaxis.com/imgs/default/vehicle_set/minibus-minified.jpg",
          type: "MEDIUM",
        },
        {
          url: "https://assets.holidaytaxis.com/imgs/default/vehicle_set/minibus-minified.jpg",
          type: "SMALL",
        },
      ],
      transferDetailInfo: [
        {
          id: "0",
          name: "20 min. Duracion estimada del trayecto",
          description: "20 min. Duracion estimada del trayecto",
          type: "GENERAL_INFO",
        },
        {
          id: "1",
          name: "5 pasajero(s) minimo",
          description: "5 pasajero(s) minimo",
          type: "GENERAL_INFO",
        },
        {
          id: "2",
          name: "8 pasajero(s) maximo",
          description: "8 pasajero(s) maximo",
          type: "GENERAL_INFO",
        },
        {
          id: "3",
          name: "8 maletas permitidas",
          description: "8 maletas permitidas",
          type: "GENERAL_INFO",
        },
      ],
      customerTransferTimeInfo: [],
      supplierTransferTimeInfo: [],
      transferRemarks: [
        {
          type: "CONTRACT",
          description:
            "ENCONTRAR A SU CONDUCTOR \n\nEspere en la recepción del hotel 10/15 minutos antes de la hora de recogida, el conductor llevará un cartel con su nombre. \n\nSi no se aloja en un hotel (es decir, si se hospeda en una residencia privada, villa u hostal), debe salir fuera 10/15 minutos antes de la hora de recogida. \n\nIdentifíquese mostrando su bono al Proveedor, para quien actuamos como agente de reservas. \n\nLos cambios en los horarios de recogida deben solicitarse a su proveedor o agente de reservas al menos 24 horas antes de la salida. Si el proveedor acepta el cambio, será bajo su propio riesgo. \n\nNo podemos aceptar ninguna responsabilidad por los clientes que no son recogidos a tiempo y, posteriormente, pierden algún vuelo o conexión si los detalles de la reserva han cambiado y no se nos ha informado en consecuencia.\n\nDIFICULTAD LOCALIZANDO A SU CONDUCTOR\nPóngase en contacto con su proveedor para que le ayude. No se vaya sin haber contactado antes con su proveedor en el número +34 871 170 555.\n\nEn caso de que se retrase, deberá llamar al proveedor.",
          mandatory: true,
        },
      ],
    },
    price: {
      totalAmount: 74.72,
      netAmount: null,
      currencyId: "EUR",
    },
    rateKey:
      "DEPARTURE|ATLAS|265|IATA|PMI|2024-04-17|09:55|2024-04-17|12:15|2~0~0||8|||||1|PRVT||MNBS|STND|74.72||||2|PMI|SIMPLE|5d454d5c81cf02c02c0fe57b11162436|1275288|R|c98a9508a212c182c31e99816297a257",
    cancellationPolicies: [
      {
        amount: 74.72,
        from: "2024-04-16T12:15:00",
        currencyId: "EUR",
        isForceMajeure: null,
      },
    ],
    links: [
      {
        rel: "self",
        href: "/availability",
        method: "GET",
      },
      {
        rel: "confirm",
        href: "/booking",
        method: "POST",
      },
    ],
    factsheetId: 2,
  },
];
