# single-nodejs-service-gcp

a starter educational app' with node, Docker, and Kubernetes to get familiar with these kinds of deployments on the GCP; this app' supports TLS traffic

## prerequisites

cf `../README.md`

## how to run

### Docker part

- `docker build --file YOUR_APP_NAME.Dockerfile --tag {dockerhub_username}/YOUR_APP_NAME:{tag} .`
- `docker run -p 80:3000 -it {dockerhub_username}/YOUR_APP_NAME:{tag}` => access the app' @ <http://localhost>
- `docker login`
- `docker push {dockerhub_username}/YOUR_APP_NAME` => pushing to dockerhub will allow you to pull the image from kube

### Kubernetes part

- necessary steps for using Kubernetes on the GCP from `../README.md`
- with your GCP cluster running and `kubectl` wired to it create the app' deployement => `kubectl create -f deployment.yaml`
- expose your deployment to the World with a load balancer => `kubectl create -f lb-app.yml`
- get the external IP of your service => `kubectl get service nodejs-service-service`
- go the external IP in your browser or make a curl call to it to check that the sample app' works correctly

## how to run WITH TLS

- you need to own a domain name (registered at Google Domains for instance)
- you need to reserve a static IP address, give it the name you want => `gcloud compute addresses create ADDRESS_NAME --global`
- get the IP you just created => `gcloud compute addresses describe ADDRESS_NAME --global` (for instance `34.149.41.208`)
- create an A record linking that IP to your domain
- update the domain value in `managed-cert.yaml` apply a Google managed certificate to your cluster with `kubectl apply -f managed-cert.yaml`
- create the app' deployement => `kubectl create -f deployment.yaml`
- expose your deployment with a node port => `kubectl create -f nodeport.yml`
- modify the static ip name in the `ingress.yml` file that is present in this folder and load balance your deployment with => `kubectl create -f ingress.yml`
- check the status of your managed cert (provisioning might take 60 minutes) => `kubectl describe managedcertificate managed-cert` => you should be able to visit `https://{your_domain}` when the command shows `Certificate Status:  Active`
