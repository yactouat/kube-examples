# single-nginx-service-gcp

a starter educational app' with nginx and Kubernetes to get familiar with these kinds of deployments on the GCP

## prerequisites

cf `../README.md`

## how to run

### Kubernetes part

- necessary steps for using Kubernetes on the GCP from `../README.md`
- with your GCP cluster running and `kubectl` wired to it create the app' deployement => `kubectl create -f deployment.yaml`
- expose your deployment to the World with a load balancer => `kubectl create -f lb-app.yml`
- get the external IP of your service => `kubectl get service nodejs-service-server`
- go the external IP in your browser or make a curl call to it to check that the sample app' works correctly

#### cleaning up

- `kubectl delete service nginx-service-server`
- `gcloud container clusters delete {cluster-name}`
