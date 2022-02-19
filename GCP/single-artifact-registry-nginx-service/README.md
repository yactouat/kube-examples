# single-nginx-service-gcp

a starter educational app' with nginx and Kubernetes, using Google's Artifact Registry, to get familiar with these kinds of deployments on the GCP

## prerequisites

cf `../README.md`

## how to run

### Docker Artifact Registry part

- create the Artifact Registry repo => `gcloud artifacts repositories create nginx-service --repository-format=docker --location=europe-west3 --description="nginx-service Docker repository"` (instead of `europe-west3`, you can choose whatever region that suits you by running `gcloud artifacts locations list`)
- from this folder, build and tag your Docker image locally => `docker build -t europe-west3-docker.pkg.dev/${PROJECT_ID}/nginx-service/nginx-service:v1 .` (`${PROJECT_ID}` can be set in your path)
- verify that it runs as expected by going to <http://localhost> after having run => `docker run --rm -p 80:80 europe-west3-docker.pkg.dev/${PROJECT_ID}/nginx-service/nginx-service:v1`
- authenticate your Docker install to Aritfact Registry => `gcloud auth configure-docker europe-west3-docker.pkg.dev`
- push your image to the Artifact Registry => `docker push europe-west3-docker.pkg.dev/${PROJECT_ID}/nginx-service/nginx-service:v1`

### Kubernetes part

- necessary steps for using Kubernetes on the GCP from `../README.md`
- with your GCP cluster running and `kubectl` wired to it create the app' deployement => `kubectl create -f deployment.yaml` (dont forget to modify the image name value in there)
- expose your deployment to the World with a load balancer => `kubectl create -f load-balancer.yml`
- get the external IP of your service => `kubectl get service nginx-service-server`
- go the external IP in your browser or make a curl call to it to check that the sample app' works correctly

### deploying an update

- modify the nginx conf to display something else in the rendered `h1` tag
- build, tag, and verify a new image locally
- push the new image
- change the image tag in `deployment.yml`
- apply the new deployment with `kubectl apply -f deployment.yml`
- go back to the IP of your load balancer service and see the updated app' !

#### cleaning up

- `kubectl delete service nginx-service-server`
- `gcloud container clusters delete {cluster-name}`
