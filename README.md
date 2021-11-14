# node containerized templates

## what is this ?

This repo is my living documentation to get a feel at node apps with Kubernetes

## pre requisites

- you need to have Docker installed on your machine and also a Dockerhub account
- you need `kubectl`
- you also need `kops` to create and manage your Kubernetes cluster (cf. <https://kops.sigs.k8s.io/getting_started/aws/> )
- an AWS account is nice to have

## how-to's

### cheat sheet

- <https://kubernetes.io/docs/reference/kubectl/cheatsheet/>

### create a cluster with kops

#### AWS

- this is how you would create an #AWS cluster with #Kops =>
  - <https://kops.sigs.k8s.io/getting_started/aws/>
    - you may experience issue with #EC2 instances lower than `t3.medium`
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

### delete a resource on the cluster

- `kubectl delete -f {resource}.yaml`

### edit a resource on the cluster (may not always trigger an update)

- `kubectl edit -f {resource}.yaml`

### get pods by selector

- `kubectl get pods --selector={label}={value}`

### get the logs of a given pod

- `kubectl get pods`
- `kubectl logs {pod}` OR `kubectl logs --follow {pod}`
