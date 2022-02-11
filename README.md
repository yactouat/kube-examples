# kube examples

## what is this ?

This repo is my living documentation to get a feel at deploying apps with Kubernetes

## nice to have

- Docker installed on your machine
- a Dockerhub account
- `kubectl` installed
- a GCP or an AWS account

## generalities

### container runtime

a container runtime is responsible for:

- pulling containers from a containers registry
- providing an execution environment for the containers images and for the pod abstraction
- swapping container runtimes

### kubelets

They are responsible for:

- starting up pods on a node, they ask the master node if there is a need for creating pods or if there any other updates at node-level
- the pods lifecycle
- reporting the state of the pods and using probes to check on them

Kubelets can communicate with all running pods on a given node.

### nodes

Kubernetes nodes are components where application pods actually run, they consist of a virtual or physical worker machines; so it makes sense to have at least two nodes on a Kubernetes cluster, in case of the aforementioned machines dies. Each node of a Kubernetes cluster must have a unique hostname and a unique MAC address.

The nodes are responsible for:

- starting pods and the containers supporting these pods
- implementing network reachability with `iptables` rules allowing to forward traffic between nodes and within a node's pods

The process that is responsible of running a set of containers within a node is called a *kubelet*.  

Also a node needs a container runtime. The default Kubernetes container runtime is `containerd`, but you can use Docker images.  

And, finally, a node also has a *kube proxy*, which:

- feeds information about what pods are running to its node `iptables` program so traffic can be routed at node-level; whenever a new pod is launched, the kube proxy will change the `iptables` rules so the pod is routable within the cluster
- implements networking via a service implementation on the node itself
- proxy load-balances traffic to pods at node-level

It is via a kube proxie and HTTP services that pods within a node can be reached from the outside world.  

Kubelets and kube-proxies communicate directly with the Kubernetes API server.

## how-to's

### `kubectl` cheat sheet

#### delete a resource on a cluster

- `kubectl delete -f {resource}.yaml`

#### get pods by selector

- `kubectl get pods --selector={label}={value}`

#### get the logs of a given pod

- `kubectl get pods`
- `kubectl logs {pod}` OR `kubectl logs --follow {pod}`

#### more

- <https://kubernetes.io/docs/reference/kubectl/cheatsheet/>
