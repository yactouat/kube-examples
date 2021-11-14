# node-docker-kube-aws

a starter educational app' with node, Docker, and Kubernetes (this setup has been tested on AWS) to get familiar with these kinds of deployments on AWS

## how to run

1. `docker build --file node-docker-kube.Dockerfile --tag {dockerhub_username}/node-docker-kube:{tag} .`
2. `docker run -p 80:3000 -it {dockerhub_username}/node-docker-kube:{tag}` => access the app' @ <http://localhost>
3. `docker login`
4. `docker push {dockerhub_username}/node-docker-kube` => pushing to dockerhub will allow you to pull the image from kube
5. with your cluster running and `kubectl` wired to it, create the app' pod =>
   - `kubectl create -f pod-app.yaml`
   - OR `kubectl create -f rep-app.yaml` if you want to scale your pods horizontally with 2 pods to run at all times
6. you can now access your app from the outside in multiple ways
   1. port-forwarding, so you can access it on your local machine localhost at the port you specified on the lefthand part of the ports assignment in this command => `kubectl port-forward ndk-app 8080:3000`; once port forwarding is open, go to a new shell and `curl localhost:8080` to check that your app' is working
   2. you can expose a port on your nodes to access your app' pod using a `NodePort` =>
      - `kubectl expose pod ndk-app --type=NodePort --name=ndk-app-service`
      - now, you can get the newly created service exposed port with => `kubectl get services`
      - if you do that on AWS, make sure to add to the nodes security group a custom TCP inbound rule on the port that has been exposed
      - now you can go to the public IP address of your any of your cluster's nodes on the specified port to check that your app' is running
      - to delete your NodePort service => `kubectl delete service ndk-app-service`
   3. finally, you can also create a load balancing service on AWS to access your app' from the outside (see root `README.md`)
