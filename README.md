# Cilicium Hubble Demo

In this demo we will use Hubble to manage a circuit breaker.

## How to build?

> ⚠ Requires jdk 17

```bash
# First you gotta build services' jars
./gradlew bootJar

# Then you can build the docker images
docker build -t <your_service_name> -f ./Dockerfile ./servicePath
```
