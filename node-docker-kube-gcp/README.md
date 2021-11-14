# node-docker-kube-gcp

a starter educational app' with node, Docker, and Kubernetes (this setup has been tested on AWS) to get familiar with these kinds of deployments on the GCP; this app' supports TLS traffic

## how to run

1. `docker build --file node-docker-kube.Dockerfile --tag {dockerhub_username}/node-docker-kube:{tag} .`
2. `docker run -p 80:3000 -it {dockerhub_username}/node-docker-kube:{tag}` => access the app' @ <http://localhost>
3. `docker login`
4. `docker push {dockerhub_username}/node-docker-kube` => pushing to dockerhub will allow you to pull the image from kube
5. with your GCP cluster running and `kubectl` wired to it (see root readme and how to achieve that), create the app' deployement => `kubectl create -f deployment.yaml`
6. expose your deployment to the World with a load balancer => `kubectl create -f lb-app.yml`
7. get the external IP of your service => `kubectl get service ndk-service`
8. go the external IP in your browser or make a curl call to it to check that the sample app' works correctly

## how to run WITH TLS

1. create your cluster following the root readme guidelines for GCP
2. you need to own a domain name (registered at Google Domains for instance)
3. you need to reserve a static IP address, give it the name you want => `gcloud compute addresses create ADDRESS_NAME --global`
4. get the IP you just created => `gcloud compute addresses describe ADDRESS_NAME --global` (for instance `34.149.41.208`)
5. create an A record linking that IP to your domain
6. update the domain value in `managed-cert.yaml` apply a Google managed certificate to your cluster with `kubectl apply -f managed-cert.yaml`
7. create the app' deployement => `kubectl create -f deployment.yaml`
8. expose your deployment with a node port => `kubectl create -f nodeport.yml`
9. modify the static ip name in the `ingress.yml` you'vre created in step 3 and load balance your deployment with => `kubectl create -f ingress.yml`
10. check the status of your managed cert (provisioning might take 60 minutes) => `kubectl describe managedcertificate managed-cert` => you should be able to visit `https://{your_domain}` when the command shows `Certificate Status:  Active`
