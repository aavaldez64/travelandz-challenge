# Booking Request

```curl
$ POST https://api.test.hotelbeds.com/transfer-api/1.0/bookings
```

```json
// Request
{
  "language": "es",
  "holder": {
    "name": "Ron",
    "surname": "Dev",
    "email": "aaronvaldez2001@gmail.com",
    "phone": "+584120423915"
  },
  "transfers": [
    {
      "rateKey": "DEPARTURE|ATLAS|265|IATA|PMI|2024-08-17|09:55|2024-08-17|12:15|2~0~0||4|||||1|PRVT||CR|STND|36.80||||43|PMI|SIMPLE|35da21b98cf95dcf734220761ff3255e|1275900|T|c98a9508a212c182c31e99816297a257",
      "transferDetails": [
        {
          "type": "FLIGHT",
          "direction": "ARRIVAL",
          "code": "XR1234",
          "companyName": "null"
        }
      ]
    }
  ],

  "clientReference": "aavaldez64",
  "welcomeMessage": "Hola Sr Aarón Valdez",
  "remark": "Estos son algunos comentarios"
}
```

Response:

```json
{
  "bookings": [
    {
      "reference": "1-7611550",
      "bookingFileId": null,
      "creationDate": "2024-03-10T08:25:54",
      "status": "CONFIRMED",
      "modificationsPolicies": {
        "cancellation": true,
        "modification": true
      },
      "holder": {
        "name": "Ron",
        "surname": "Dev",
        "email": "aaronvaldez2001@gmail.com",
        "phone": "+584120423915"
      },
      "transfers": [
        {
          "id": 1,
          "rateKey": "DEPARTURE|ATLAS|265|IATA|PMI|2024-08-17|09:55|2024-08-17|12:15|2~0~0||4|||||1|PRVT||CR|STND|36.80||||43|PMI|SIMPLE|35da21b98cf95dcf734220761ff3255e|1275900|T|c98a9508a212c182c31e99816297a257",
          "status": "CONFIRMED",
          "transferType": "PRIVATE",
          "vehicle": {
            "code": "CR",
            "name": "Coche"
          },
          "category": {
            "code": "STND",
            "name": "Estándar"
          },
          "pickupInformation": {
            "from": {
              "code": "265",
              "description": "HM Jaime III",
              "type": "ATLAS"
            },
            "to": {
              "code": "PMI",
              "description": "Aeropuerto de Mallorca - Palma",
              "type": "IATA"
            },
            "date": "2024-08-17",
            "time": "09:55:00",
            "pickup": {
              "address": "Passeig De Mallorca,14B  ",
              "number": null,
              "town": "PALMA DE MALLORCA",
              "zip": "07012",
              "description": "ENCONTRAR A SU CONDUCTOR \n\nEspere en la recepción del hotel 10/15 minutos antes de la hora de recogida, el conductor llevará un cartel con su nombre. \n\nSi no se aloja en un hotel (es decir, si se hospeda en una residencia privada, villa u hostal), debe salir fuera 10/15 minutos antes de la hora de recogida. \n\nIdentifíquese mostrando su bono al Proveedor, para quien actuamos como agente de reservas. \n\nLos cambios en los horarios de recogida deben solicitarse a su proveedor o agente de reservas al menos 24 horas antes de la salida. Si el proveedor acepta el cambio, será bajo su propio riesgo. \n\nNo podemos aceptar ninguna responsabilidad por los clientes que no son recogidos a tiempo y, posteriormente, pierden algún vuelo o conexión si los detalles de la reserva han cambiado y no se nos ha informado en consecuencia.\n\nDIFICULTAD LOCALIZANDO A SU CONDUCTOR\nPóngase en contacto con su proveedor para que le ayude. No se vaya sin haber contactado antes con su proveedor en el número +34 871 170 555.\n\nEn caso de que se retrase, deberá llamar al proveedor.",
              "altitude": null,
              "latitude": 39.57301,
              "longitude": 2.642626,
              "checkPickup": {
                "mustCheckPickupTime": false,
                "url": null,
                "hoursBeforeConsulting": null
              },
              "pickupId": null,
              "stopName": null,
              "image": null
            }
          },
          "paxes": [
            {
              "type": "ADULT",
              "age": 30
            },
            {
              "type": "ADULT",
              "age": 30
            }
          ],
          "content": {
            "vehicle": {
              "code": "CR",
              "name": "Coche"
            },
            "category": {
              "code": "STND",
              "name": "Estándar"
            },
            "images": [
              {
                "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
                "type": "EXTRALARGE"
              },
              {
                "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
                "type": "LARGE"
              },
              {
                "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
                "type": "MEDIUM"
              },
              {
                "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
                "type": "SMALL"
              }
            ],
            "transferDetailInfo": [
              {
                "id": "TRFTIME",
                "name": "Duracion trayecto",
                "description": "min. Duracion estimada del trayecto",
                "type": "GENERAL_INFO"
              },
              {
                "id": "MINPAX",
                "name": "Minimo pax",
                "description": "pasajero(s) minimo",
                "type": "GENERAL_INFO"
              },
              {
                "id": "MAXPAX",
                "name": "Maximo pax",
                "description": "pasajero(s) maximo",
                "type": "GENERAL_INFO"
              },
              {
                "id": "LUGGAGE",
                "name": "Numero de maletas permitidas",
                "description": "maletas permitidas",
                "type": "GENERAL_INFO"
              }
            ],
            "customerTransferTimeInfo": [],
            "supplierTransferTimeInfo": [],
            "transferRemarks": [
              {
                "type": "CONTRACT",
                "description": "ENCONTRAR A SU CONDUCTOR \n\nEspere en la recepción del hotel 10/15 minutos antes de la hora de recogida, el conductor llevará un cartel con su nombre. \n\nSi no se aloja en un hotel (es decir, si se hospeda en una residencia privada, villa u hostal), debe salir fuera 10/15 minutos antes de la hora de recogida. \n\nIdentifíquese mostrando su bono al Proveedor, para quien actuamos como agente de reservas. \n\nLos cambios en los horarios de recogida deben solicitarse a su proveedor o agente de reservas al menos 24 horas antes de la salida. Si el proveedor acepta el cambio, será bajo su propio riesgo. \n\nNo podemos aceptar ninguna responsabilidad por los clientes que no son recogidos a tiempo y, posteriormente, pierden algún vuelo o conexión si los detalles de la reserva han cambiado y no se nos ha informado en consecuencia.\n\nDIFICULTAD LOCALIZANDO A SU CONDUCTOR\nPóngase en contacto con su proveedor para que le ayude. No se vaya sin haber contactado antes con su proveedor en el número +34 871 170 555.\n\nEn caso de que se retrase, deberá llamar al proveedor.",
                "mandatory": true
              }
            ]
          },
          "price": {
            "totalAmount": 36.8,
            "netAmount": null,
            "currencyId": "EUR"
          },
          "cancellationPolicies": [
            {
              "amount": 34.49,
              "from": "2024-08-16T00:00:00",
              "currencyId": "EUR",
              "isForceMajeure": false
            }
          ],
          "factsheetId": 43,
          "arrivalFlightNumber": null,
          "departureFlightNumber": "XR1234",
          "arrivalShipName": null,
          "departureShipName": null,
          "arrivalTrainInfo": null,
          "departureTrainInfo": null,
          "transferDetails": [
            {
              "type": "FLIGHT",
              "direction": "DEPARTURE",
              "code": "XR1234",
              "companyName": null
            }
          ],
          "sourceMarketEmergencyNumber": "34971211630",
          "links": [
            {
              "rel": "transferCancel",
              "href": "/booking/es/reference/1-7611550",
              "method": "DELETE"
            }
          ]
        }
      ],
      "clientReference": "AAVALDEZ64",
      "remark": "Estos son algunos comentarios",
      "invoiceCompany": {
        "code": "E14"
      },
      "supplier": {
        "name": "HOTELBEDS SPAIN, S.L.U",
        "vatNumber": "ESB28916765"
      },
      "totalAmount": 34.49,
      "totalNetAmount": 34.49,
      "pendingAmount": 34.49,
      "currency": "EUR",
      "links": [
        {
          "rel": "self",
          "href": "/booking/es/reference/1-7611550",
          "method": "GET"
        },
        {
          "rel": "bookingDetail",
          "href": "/booking/es/reference/1-7611550",
          "method": "GET"
        },
        {
          "rel": "bookingCancel",
          "href": "/booking/es/reference/1-7611550",
          "method": "DELETE"
        }
      ],
      "paymentDataRequired": false
    }
  ]
}
```

# Booking Details

```curl
$ GET https://api.test.hotelbeds.com/transfer-api/1.0/bookings/{{language}}/reference/{{booking_reference}}
```

Response:

```json
{
  "bookings": [
    {
      "reference": "1-7611550",
      "bookingFileId": null,
      "creationDate": "2024-03-10T08:25:54",
      "status": "CONFIRMED",
      "modificationsPolicies": {
        "cancellation": true,
        "modification": true
      },
      "holder": {
        "name": "Ron",
        "surname": "Dev",
        "email": "aaronvaldez2001@gmail.com",
        "phone": "+584120423915"
      },
      "transfers": [
        {
          "id": 1,
          "status": "CONFIRMED",
          "transferType": "PRIVATE",
          "vehicle": {
            "code": "CR",
            "name": "Coche"
          },
          "category": {
            "code": "STND",
            "name": "Estándar"
          },
          "pickupInformation": {
            "from": {
              "code": "265",
              "description": "HM Jaime III",
              "type": "ATLAS"
            },
            "to": {
              "code": "PMI",
              "description": "Aeropuerto de Mallorca - Palma",
              "type": "IATA"
            },
            "date": "2024-08-17",
            "time": "09:55:00",
            "pickup": {
              "address": "Passeig De Mallorca,14B  ",
              "number": null,
              "town": "PALMA DE MALLORCA",
              "zip": "07012",
              "description": "ENCONTRAR A SU CONDUCTOR \n\nEspere en la recepción del hotel 10/15 minutos antes de la hora de recogida, el conductor llevará un cartel con su nombre. \n\nSi no se aloja en un hotel (es decir, si se hospeda en una residencia privada, villa u hostal), debe salir fuera 10/15 minutos antes de la hora de recogida. \n\nIdentifíquese mostrando su bono al Proveedor, para quien actuamos como agente de reservas. \n\nLos cambios en los horarios de recogida deben solicitarse a su proveedor o agente de reservas al menos 24 horas antes de la salida. Si el proveedor acepta el cambio, será bajo su propio riesgo. \n\nNo podemos aceptar ninguna responsabilidad por los clientes que no son recogidos a tiempo y, posteriormente, pierden algún vuelo o conexión si los detalles de la reserva han cambiado y no se nos ha informado en consecuencia.\n\nDIFICULTAD LOCALIZANDO A SU CONDUCTOR\nPóngase en contacto con su proveedor para que le ayude. No se vaya sin haber contactado antes con su proveedor en el número +34 871 170",
              "altitude": null,
              "latitude": 39.57301,
              "longitude": 2.642626,
              "checkPickup": {
                "mustCheckPickupTime": false,
                "url": null,
                "hoursBeforeConsulting": null
              },
              "pickupId": null,
              "stopName": null,
              "image": null
            }
          },
          "paxes": [
            {
              "type": "ADULT",
              "age": 30
            },
            {
              "type": "ADULT",
              "age": 30
            }
          ],
          "content": {
            "vehicle": {
              "code": "CR",
              "name": "Coche"
            },
            "category": {
              "code": "STND",
              "name": "Estándar"
            },
            "images": [
              {
                "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
                "type": "SMALL"
              },
              {
                "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
                "type": "MEDIUM"
              },
              {
                "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
                "type": "LARGE"
              },
              {
                "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
                "type": "EXTRALARGE"
              }
            ],
            "transferDetailInfo": [
              {
                "id": "TRFTIME",
                "name": "Duracion trayecto",
                "description": "min. Duracion estimada del trayecto",
                "type": "GENERAL_INFO"
              },
              {
                "id": "MINPAX",
                "name": "Minimo pax",
                "description": "pasajero(s) minimo",
                "type": "GENERAL_INFO"
              },
              {
                "id": "MAXPAX",
                "name": "Maximo pax",
                "description": "pasajero(s) maximo",
                "type": "GENERAL_INFO"
              },
              {
                "id": "LUGGAGE",
                "name": "Numero de maletas permitidas",
                "description": "maletas permitidas",
                "type": "GENERAL_INFO"
              }
            ],
            "customerTransferTimeInfo": [],
            "supplierTransferTimeInfo": [],
            "transferRemarks": [
              {
                "type": "CONTRACT",
                "description": "ENCONTRAR A SU CONDUCTOR \n\nEspere en la recepción del hotel 10/15 minutos antes de la hora de recogida, el conductor llevará un cartel con su nombre. \n\nSi no se aloja en un hotel (es decir, si se hospeda en una residencia privada, villa u hostal), debe salir fuera 10/15 minutos antes de la hora de recogida. \n\nIdentifíquese mostrando su bono al Proveedor, para quien actuamos como agente de reservas. \n\nLos cambios en los horarios de recogida deben solicitarse a su proveedor o agente de reservas al menos 24 horas antes de la salida. Si el proveedor acepta el cambio, será bajo su propio riesgo. \n\nNo podemos aceptar ninguna responsabilidad por los clientes que no son recogidos a tiempo y, posteriormente, pierden algún vuelo o conexión si los detalles de la reserva han cambiado y no se nos ha informado en consecuencia.\n\nDIFICULTAD LOCALIZANDO A SU CONDUCTOR\nPóngase en contacto con su proveedor para que le ayude. No se vaya sin haber contactado antes con su proveedor en el número +34 871 170",
                "mandatory": true
              }
            ]
          },
          "price": {
            "totalAmount": 34.49,
            "netAmount": 34.49,
            "currencyId": "EUR"
          },
          "cancellationPolicies": [
            {
              "amount": 34.49,
              "from": "2024-08-16T00:00:00",
              "currencyId": "EUR",
              "isForceMajeure": false
            }
          ],
          "factsheetId": 43,
          "arrivalFlightNumber": null,
          "departureFlightNumber": "XR1234",
          "arrivalShipName": null,
          "departureShipName": null,
          "arrivalTrainInfo": null,
          "departureTrainInfo": null,
          "transferDetails": [
            {
              "type": "FLIGHT",
              "direction": "DEPARTURE",
              "code": "XR1234",
              "companyName": null
            }
          ],
          "sourceMarketEmergencyNumber": "34971211630",
          "links": [
            {
              "rel": "transferCancel",
              "href": "/booking/es/reference/1-7611550",
              "method": "DELETE"
            }
          ]
        }
      ],
      "clientReference": "AAVALDEZ64",
      "remark": "Estos son algunos comentarios",
      "invoiceCompany": {
        "code": "E14"
      },
      "supplier": {
        "name": "HOTELBEDS SPAIN, S.L.U",
        "vatNumber": "ESB28916765"
      },
      "totalAmount": 34.49,
      "totalNetAmount": 34.49,
      "pendingAmount": 34.49,
      "currency": "EUR",
      "links": [
        {
          "rel": "self",
          "href": "/booking/es/reference/1-7611550",
          "method": "GET"
        },
        {
          "rel": "bookingDetail",
          "href": "/booking/es/reference/1-7611550",
          "method": "GET"
        },
        {
          "rel": "bookingCancel",
          "href": "/booking/es/reference/1-7611550",
          "method": "DELETE"
        }
      ],
      "paymentDataRequired": false
    }
  ]
}
```

# Booking Cancellation

```curl
$ DELETE https://api.test.hotelbeds.com/transfer-api/1.0/bookings/{{language}} /reference/ {{booking_reference}}
$ DELETE https://api.test.hotelbeds.com/transfer-api/1.0/bookings/{{language}} /reference/ {{booking_reference}}?simulation={{true/false}}
```

Response:

```json
{
  "bookings": [
    {
      "reference": "1-7611550",
      "bookingFileId": null,
      "creationDate": "2024-03-10T08:25:54",
      "status": "CANCELLED",
      "modificationsPolicies": {
        "cancellation": false,
        "modification": false
      },
      "holder": {
        "name": "Ron",
        "surname": "Dev",
        "email": "aaronvaldez2001@gmail.com",
        "phone": "+584120423915"
      },
      "transfers": [
        {
          "id": 1,
          "status": "CANCELLED",
          "transferType": "PRIVATE",
          "vehicle": {
            "code": "CR",
            "name": "Car"
          },
          "category": {
            "code": "STND",
            "name": "Standard"
          },
          "pickupInformation": {
            "from": {
              "code": "265",
              "description": "HM Jaime III",
              "type": "ATLAS"
            },
            "to": {
              "code": "PMI",
              "description": "TEST - Majorca - Palma Airport",
              "type": "IATA"
            },
            "date": "2024-08-17"
          },
          "paxes": [
            {
              "type": "ADULT",
              "age": 30
            },
            {
              "type": "ADULT",
              "age": 30
            }
          ],
          "price": {
            "totalAmount": 0.0,
            "netAmount": 0.0,
            "currencyId": "EUR"
          },
          "factsheetId": null
        }
      ],
      "clientReference": "AAVALDEZ64",
      "remark": "Estos son algunos comentarios",
      "invoiceCompany": {
        "code": "E14"
      },
      "supplier": {
        "name": "HOTELBEDS SPAIN, S.L.U",
        "vatNumber": "ESB28916765"
      },
      "totalAmount": 0.0,
      "totalNetAmount": 0.0,
      "pendingAmount": 0.0,
      "currency": "EUR",
      "links": [
        {
          "rel": "self",
          "href": "/booking/en/reference/1-7611550",
          "method": "GET"
        },
        {
          "rel": "bookingDetail",
          "href": "/booking/en/reference/1-7611550",
          "method": "GET"
        }
      ]
    }
  ]
}
```

# Booking List

```curl
GET https://api.test.hotelbeds.com/transfer-api/1.0/bookings/{{language}}?fromDate={{fromDate}}&toDate={{toDate}}&dateType={{dateType}}&offset={{offset}}&limit={{limit}}
```

```json
{
  "bookings": [
    {
      "reference": "1-7611550",
      "bookingFileId": null,
      "creationDate": "2024-03-10T08:25:54",
      "status": "CANCELLED",
      "modificationsPolicies": {
        "cancellation": false,
        "modification": false
      },
      "holder": {
        "name": "Ron",
        "surname": "Dev",
        "email": "aaronvaldez2001@gmail.com",
        "phone": "+584120423915"
      },
      "transfers": [
        {
          "transferType": "PRIVATE",
          "vehicle": {
            "code": "CR"
          },
          "category": {
            "code": "STND"
          },
          "pickupInformation": {
            "from": {
              "code": "265",
              "type": "ATLAS"
            },
            "to": {
              "code": "null",
              "type": null
            },
            "date": "2024-08-17",
            "time": "09:55:00"
          },
          "price": {
            "totalAmount": 0.0,
            "netAmount": 0.0,
            "currencyId": "EUR"
          },
          "cancellationPolicies": [],
          "links": null
        }
      ],
      "clientReference": "AAVALDEZ64",
      "remark": "",
      "totalAmount": 0.0,
      "totalNetAmount": 0.0,
      "pendingAmount": 0.0,
      "currency": "EUR",
      "links": [
        {
          "rel": "self",
          "href": "/booking/es/reference/1-7611550",
          "method": "GET"
        },
        {
          "rel": "bookingDetail",
          "href": "/booking/es/reference/1-7611550",
          "method": "GET"
        }
      ]
    },
    {
      "reference": "102-16858516",
      "bookingFileId": null,
      "creationDate": "2024-03-10T00:44:11",
      "status": "CONFIRMED",
      "modificationsPolicies": {
        "cancellation": true,
        "modification": true
      },
      "holder": {
        "name": "John",
        "surname": "Doe",
        "email": "john.doe@hotelbeds.com",
        "phone": "+16543245812"
      },
      "transfers": [
        {
          "transferType": "SHARED",
          "vehicle": {
            "code": "SH"
          },
          "category": {
            "code": "STND"
          },
          "pickupInformation": {
            "from": {
              "code": "null",
              "type": null
            },
            "to": {
              "code": "57",
              "type": "ATLAS"
            },
            "date": "2024-06-12",
            "time": "12:00:00"
          },
          "price": {
            "totalAmount": 19.1,
            "netAmount": 19.1,
            "currencyId": "EUR"
          },
          "cancellationPolicies": [
            {
              "amount": 19.1,
              "from": "2024-06-11T00:00:00",
              "currencyId": "EUR",
              "isForceMajeure": false
            }
          ],
          "links": [
            {
              "rel": "transferCancel",
              "href": "/booking/es/reference/102-16858516",
              "method": "DELETE"
            }
          ]
        }
      ],
      "clientReference": "1",
      "remark": "",
      "totalAmount": 19.1,
      "totalNetAmount": 19.1,
      "pendingAmount": 19.1,
      "currency": "EUR",
      "links": [
        {
          "rel": "self",
          "href": "/booking/es/reference/102-16858516",
          "method": "GET"
        },
        {
          "rel": "bookingDetail",
          "href": "/booking/es/reference/102-16858516",
          "method": "GET"
        },
        {
          "rel": "bookingCancel",
          "href": "/booking/es/reference/102-16858516",
          "method": "DELETE"
        }
      ]
    },
    {
      "reference": "102-16858515",
      "bookingFileId": null,
      "creationDate": "2024-03-10T00:42:49",
      "status": "CONFIRMED",
      "modificationsPolicies": {
        "cancellation": true,
        "modification": true
      },
      "holder": {
        "name": "John",
        "surname": "Doe",
        "email": "john.doe@hotelbeds.com",
        "phone": "+16543245812"
      },
      "transfers": [
        {
          "transferType": "SHARED",
          "vehicle": {
            "code": "SH"
          },
          "category": {
            "code": "STND"
          },
          "pickupInformation": {
            "from": {
              "code": "null",
              "type": null
            },
            "to": {
              "code": "57",
              "type": "ATLAS"
            },
            "date": "2024-06-12",
            "time": "12:00:00"
          },
          "price": {
            "totalAmount": 19.1,
            "netAmount": 19.1,
            "currencyId": "EUR"
          },
          "cancellationPolicies": [
            {
              "amount": 19.1,
              "from": "2024-06-11T00:00:00",
              "currencyId": "EUR",
              "isForceMajeure": false
            }
          ],
          "links": [
            {
              "rel": "transferCancel",
              "href": "/booking/es/reference/102-16858515",
              "method": "DELETE"
            }
          ]
        }
      ],
      "clientReference": "1",
      "remark": "",
      "totalAmount": 19.1,
      "totalNetAmount": 19.1,
      "pendingAmount": 19.1,
      "currency": "EUR",
      "links": [
        {
          "rel": "self",
          "href": "/booking/es/reference/102-16858515",
          "method": "GET"
        },
        {
          "rel": "bookingDetail",
          "href": "/booking/es/reference/102-16858515",
          "method": "GET"
        },
        {
          "rel": "bookingCancel",
          "href": "/booking/es/reference/102-16858515",
          "method": "DELETE"
        }
      ]
    },
    {
      "reference": "102-16858514",
      "bookingFileId": null,
      "creationDate": "2024-03-10T00:39:39",
      "status": "CONFIRMED",
      "modificationsPolicies": {
        "cancellation": true,
        "modification": true
      },
      "holder": {
        "name": "John",
        "surname": "Doe",
        "email": "john.doe@hotelbeds.com",
        "phone": "+16543245812"
      },
      "transfers": [
        {
          "transferType": "SHARED",
          "vehicle": {
            "code": "SH"
          },
          "category": {
            "code": "STND"
          },
          "pickupInformation": {
            "from": {
              "code": "null",
              "type": null
            },
            "to": {
              "code": "57",
              "type": "ATLAS"
            },
            "date": "2024-06-12",
            "time": "12:00:00"
          },
          "price": {
            "totalAmount": 19.1,
            "netAmount": 19.1,
            "currencyId": "EUR"
          },
          "cancellationPolicies": [
            {
              "amount": 19.1,
              "from": "2024-06-11T00:00:00",
              "currencyId": "EUR",
              "isForceMajeure": false
            }
          ],
          "links": [
            {
              "rel": "transferCancel",
              "href": "/booking/es/reference/102-16858514",
              "method": "DELETE"
            }
          ]
        }
      ],
      "clientReference": "1",
      "remark": "",
      "totalAmount": 19.1,
      "totalNetAmount": 19.1,
      "pendingAmount": 19.1,
      "currency": "EUR",
      "links": [
        {
          "rel": "self",
          "href": "/booking/es/reference/102-16858514",
          "method": "GET"
        },
        {
          "rel": "bookingDetail",
          "href": "/booking/es/reference/102-16858514",
          "method": "GET"
        },
        {
          "rel": "bookingCancel",
          "href": "/booking/es/reference/102-16858514",
          "method": "DELETE"
        }
      ]
    },
    {
      "reference": "102-16858513",
      "bookingFileId": null,
      "creationDate": "2024-03-10T00:37:16",
      "status": "CONFIRMED",
      "modificationsPolicies": {
        "cancellation": true,
        "modification": true
      },
      "holder": {
        "name": "John",
        "surname": "Doe",
        "email": "john.doe@hotelbeds.com",
        "phone": "+16543245812"
      },
      "transfers": [
        {
          "transferType": "PRIVATE",
          "vehicle": {
            "code": "MNBS"
          },
          "category": {
            "code": "STND"
          },
          "pickupInformation": {
            "from": {
              "code": "null",
              "type": null
            },
            "to": {
              "code": "57",
              "type": "ATLAS"
            },
            "date": "2024-06-12",
            "time": "12:00:00"
          },
          "price": {
            "totalAmount": 91.63,
            "netAmount": 91.63,
            "currencyId": "EUR"
          },
          "cancellationPolicies": [
            {
              "amount": 91.63,
              "from": "2024-06-11T00:00:00",
              "currencyId": "EUR",
              "isForceMajeure": false
            }
          ],
          "links": [
            {
              "rel": "transferCancel",
              "href": "/booking/es/reference/102-16858513",
              "method": "DELETE"
            }
          ]
        }
      ],
      "clientReference": "1",
      "remark": "",
      "totalAmount": 91.63,
      "totalNetAmount": 91.63,
      "pendingAmount": 91.63,
      "currency": "EUR",
      "links": [
        {
          "rel": "self",
          "href": "/booking/es/reference/102-16858513",
          "method": "GET"
        },
        {
          "rel": "bookingDetail",
          "href": "/booking/es/reference/102-16858513",
          "method": "GET"
        },
        {
          "rel": "bookingCancel",
          "href": "/booking/es/reference/102-16858513",
          "method": "DELETE"
        }
      ]
    }
  ]
}
```
