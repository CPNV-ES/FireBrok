# FireBrok :fire:

> A next generation Broker for IoT applications.
> Find detailed documentation in the [docs folder](./docs).

## Changelog - v0.1.1

* Authentication check on the create_automatons function
* Validates datas on submit of the create_automatons function
* New python simulator, to push test datas

## Setup

The platform is divided in 3 diferent parts :
* **The aggregator**, he exposes an mqtt endpoint, and write mqtt inputs in the database.
* **The back-end**, built with firebase, he persists datas and manage authentication.
* **The web dashboard**, are independents from the back-end, two client are developed on separate repository :
  * **[FireBrok-Angular](https://bastiennicoud.github.io/FireBrok-Angular/)**, dashboard built with [angular](https://angular.io).
  * **[FireBrok-Vue](https://github.com/KevinJordil/MQTT-Firebase-Dashboard)**, dashboard built with [Vue.js](https://vuejs.org).
