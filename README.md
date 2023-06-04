# Cilicium Hubble Demo

In this demo we will use Hubble to manage a circuit breaker.

## How to build the microservices?

> ⚠ Requires jdk 17

```bash
# First you gotta build services' jars
./gradlew bootJar

# Then you can build the docker images
docker build -t <your_service_name> -f ./Dockerfile ./servicePath
```

## Run the demo

### Start a cluster and cilium

In our example we will use a local minikube cluster and install cilium with its 
[CLI](https://docs.cilium.io/en/stable/gettingstarted/k8s-install-default/#install-the-cilium-cli).

```bash 
# We want a cluster with no cni so we can use cilium
minikube start --network-plugin=cni --cni=false

cilium install -n kube-system 
cilium status --wait
cilium hubble enable --ui -n kube-system 
```

We then import our previously build services' images into minikube 
and apply the k8s manifests (including prometheus' and grafana's).

```bash
minikube image load <your_service_name> # two times
find kubernetes -regextype egrep -regex '.*ya?ml$' -exec kubectl apply -f {} \;

# We then can show the hubble ui
cilium hubble ui
```

Finally, we have to se up the discord alerting.

First access the grafana ui.
    
```bash
kubectl -n cilium-monitoring port-forward service/grafana --address 0.0.0.0 --address :: 3000:3000
```

The installed manifests already includes the data sources, so you will just need to go to dashboards > Hubble > click on any dashboard > edit > alert and set an alert.

![Create an alert](./img/grafana_alert.gif)

Then go to Alerting > Notification channels > Add channel > Discord > set the webhook url and save.

![Create a discord channel](./img/grafana_discord.gif)