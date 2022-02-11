# single-nodejs-service-aws

a starter educational app' with node, Docker, and Kubernetes (this setup has been tested on AWS) to get familiar with these kinds of deployments on AWS

## prerequisites

- `aws` cli installed on your machine
- `kops` cli installed on your machine

### AWS using kops

- this is how you would create an AWS cluster with Kops =>
  - <https://kops.sigs.k8s.io/getting_started/aws/>
  - you may experience issue with EC2 instances lower than `t3.medium`
  - it makes sense to have at least `--node-count=2` for the number of nodes in your cluster
  - example command (provided that `CLUSTER_NAME` exists in your env) => `kops create cluster --zones=eu-central-1a --node-count=2 --name=${CLUSTER_NAME}` and then `kops update cluster --name ${CLUSTER_NAME} --yes --admin`
  - to edit your cluster => `kops edit cluster ${CLUSTER_NAME}`
  - to delete the cluter => `kops delete cluster --name ${CLUSTER_NAME} --yes`
- this is how you would expose your cluster to the world with an AWS load balancer that will automatically route the traffic to the correct pod in Kubernetes (providing that you already deployed at least one and that you have a load balancer definition, here `lb-app.yaml`) =>
  - change the `lb-app.yaml` to reflect your cert ARN in it
  - `kubectl create -f lb-app.yaml`
  - in your AWS -> EC2 -> load balancers -> instances, check that the instances of your kubernetes cluster (including the master) are referenced
  - in Route53, create an A record as an alias routing traffic to an application load balancer which would be the load balancer you previously created
  - after a while, your instances list will be updated inside the load balancer to not include the control plane node and the remaining nodes instances should appear as "InService"
  - you will also notice that you have new ELB security groups set up and that the security group of your nodes has been updated

## how to run

1. `docker build --file YOUR_APP_NAME.Dockerfile --tag {dockerhub_username}/YOUR_APP_NAME:{tag} .`
2. `docker run -p 80:3000 -it {dockerhub_username}/YOUR_APP_NAME:{tag}` => access the app' @ <http://localhost>
3. `docker login`
4. `docker push {dockerhub_username}/YOUR_APP_NAME` => pushing to dockerhub will allow you to pull the image from kube
5. with your cluster running and `kubectl` wired to it, create the app' pod =>
   - `kubectl create -f pod-app.yaml`
   - OR `kubectl create -f rep-app.yaml` if you want to scale your pods horizontally with 2 pods to run at all times
6. you can now access your app from the outside in multiple ways
   1. port-forwarding, so you can access it on your local machine localhost at the port you specified on the lefthand part of the ports assignment in this command => `kubectl port-forward nodejs-service-app 8080:3000`; once port forwarding is open, go to a new shell and `curl localhost:8080` to check that your app' is working
   2. you can expose a port on your nodes to access your app' pod using a `NodePort` =>
      - `kubectl expose pod nodejs-service-app --type=NodePort --name=nodejs-service-app-service`
      - now, you can get the newly created service exposed port with => `kubectl get services`
      - if you do that on AWS, make sure to add to the nodes security group a custom TCP inbound rule on the port that has been exposed
      - now you can go to the public IP address of your any of your cluster's nodes on the specified port to check that your app' is running
      - to delete your NodePort service => `kubectl delete service nodejs-service-app-service`
   3. finally, you can also create a load balancing service on AWS to access your app' from the outside (see root `README.md`)
