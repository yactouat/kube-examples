# node-docker-kube

a starter app' with node, Docker, and Kubernetes

## how to run

1. you need to have Docker installed on your machine
2. `docker build --file node-docker-kube.Dockerfile --tag {dockerhub_username}/node-docker-kube:{tag} .`
3. `docker run -p 80:3000 -it node-docker-kube:1` => access the app' @ <http://localhost>
4. `docker login`
5. `docker push {dockerhub_username}/node-docker-kube` => pushing to dockerhub will allow you to pull from kube
