# FireBrok :fire:

> A next generation Broker for IoT applications.
> Find detailed documentation in the [docs folder](./docs).
> **v0.1.0**

## Setup

The platform is divided in 3 diferent parts :
* **The aggregator**, he exposes an mqtt endpoint, and write mqtt inputs in the database.
* **The back-end**, built with firebase, he persists datas and manage authentication.
* **The web dashboard**, are independents from the back-end, two client are developed on separate repository :
  * **[FireBrok-Angular](#)**, dashboard built with [angular](https://angular.io).
  * **[FireBrok-Vue](#)**, dashboard built with [Vue.js](https://vuejs.org).
