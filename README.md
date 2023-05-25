## Description

Users CRUD operations with Nest

## Installation

```bash
$ yarn install
```

### Running

This example requires docker or a local mongodb installation.  If using a local mongodb, see `app.module.ts` for connection options, and make sure there are matching options for the mongodb installation and the source code.

#### Docker

There is a `docker-compose.yml` file for starting Docker.

`docker-compose up`

After running the sample, you can stop the Docker container with

`docker-compose down`

### Run the sample

Then, run Nest as usual:

`yarn start`


### Test

```bash
# unit tests
$ yarn run test
```

### Swagger 

```bash

localhost:3000/_doc
