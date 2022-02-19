# kube examples

## what is this ?

This repo is my living documentation to get a feel at deploying apps with Kubernetes

## prerequisites

- Docker installed on your machine
- a Dockerhub account
- `kubectl` installed
- a GCP or an AWS account

## definitions

### cluster control plane

The control plane node is a cluster component that implements the major control functions of a cluster such as pods scheduling; its components are

- `etcd`, which is the cluster data store that persists the state of Kubernetes objects as key-value-pairs; it runs on ports 2379 and 2380 by default; the API server needs to talk to it via these ports or the replicas of `etcd` itself will use these ports to communicate in order to establish redundancy
- the API server, which is the primary entry point for cluster administrative operations, it is stateless; it runs by default on port 6443
- the controller-manager, which manages the life cycle of our cluster's controllers; its job is to execute controller-loops; it listens to itself on port 10252
- the Scheduler, which tells Kubernetes which nodes to start pods on based on defined requirements; before scheduling pods, it evaluates the necessary resources for that to ensure their availability when placing a pod on a given node of a cluster; the Scheduler's job is also to make sure that the resources constraints of our system are respected; the Scheduler runs by default on port 10251 and listens to itself

In Kubernetes, you would deploy an application to a cluster, which will then be run on the nodes of this cluster.  

It is the default behavior of control plane nodes to only run pods that are system pods.  

### `ClusterIP` service

A `ClusterIp` service is a service that has an IP address that is only reachable from inside the cluster.

### container runtime

a container runtime is responsible for:

- pulling containers from a containers registry
- providing an execution environment for the containers images and for the pod abstraction
- swapping container runtimes

### Deployment object

Kubernetes deployment object is used for deploying stateless applications like web servers.

Deployment objects:

- create replica sets based on what's defined in the deployment specs
- manage the state of the replica sets

Deployments are really useful when you want to manage the transition to a new version of your application (or even roll back to the previous one)
Deployments still need a service to expose them to the World so users can reach your application, you can use a load-balancer object for that, for instance.

Wen using a deployment object, you define the state of your application that Kubernetes will verify so that the cluster matches the desired state; it is better to use these kinds of objects than directly using replication controllers or replica sets because it's easier to do updates and rollbacks with deployments.

With a deployment object, you can:

- create a deployment (which means deploying an app')
- update a deployment (updating an app' with a new version)
- do rolling updates, or zero-downtime-deployments
- roll back to a previous version of your app'
- pause/resume a deployment (to do canary-deployments for instance)

### kubelets

They are responsible for:

- starting up pods on a node, they ask the master node if there is a need for creating pods or if there any other updates at node-level
- the pods lifecycle
- reporting the state of the pods and using probes to check on them

Kubelets can communicate with all running pods on a given node. A node's kubelet runs on port 10250 and all control plane components will need access to it inside a Kubernetes cluster; kubelets drive the work on individual nodes in a cluster.

### Kubernetes

Kubernetes is a clustered environment tool used for automatic containers orchestration in production environments, just like other tools, such as AWS ECS, Docker Swarm, etc. These tools follow this pattern:

- *managers* receive an expected *state* that describes an application's stack deployment as it should be on prod.; this description contains the number of replicas to run, the exposed ports, etc.
- inside a *cluster* managed by the tool, machines are scanned in order to have *workers* delegating tasks on them; these machines then become *worker nodes*
- *managers* watch for changes within the *cluster* and correct discrepancies between the actual and the desired *state* of your application stack

Kubernetes API objects are a collection of primitives that represent a system's state; they are the building blocks of any Kubernetes deployment, with the most basic one being the *pod*.

The key benefits of using Kubernetes are:

- the speed of deployment, which gives the ability for systems to change quickly
- the speed of recovery thanks to the definition of our system desired state (with a declarative configuration) in Kubernetes
- the ability to hide infrastructure complexity in the cluster

### nodes

Kubernetes nodes are components where application pods actually run, they consist of a virtual or physical worker machines; so it makes sense to have at least two nodes on a Kubernetes cluster, in case of the aforementioned machines dies. Each node of a Kubernetes cluster must have a unique hostname and a unique MAC address.

Nodes are, in the Kubernetes hierarchy of elements, right under the cluster control plane machine.

The nodes are responsible for:

- starting pods and the containers supporting these pods
- implementing network reachability with `iptables` rules allowing to forward traffic between nodes and within a node's pods

You can choose to start containers on a specific node if you want; you can also move containers from one node to another.

The process that is responsible of running a set of containers within a node is called a *kubelet*.  

Also a node needs a container runtime. The default Kubernetes container runtime is `containerd`, but you can use Docker images.  

And, finally, a node also has a *kube proxy*, which:

- feeds information about what pods are running to its node `iptables` program so traffic can be routed at node-level; whenever a new pod is launched, the kube proxy will change the `iptables` rules so the pod is routable within the cluster
- implements networking via a service implementation on the node itself
- proxy load-balances traffic to pods at node-level

It is via a kube proxie and HTTP services that pods within a node can be reached from the outside world.  

Kubelets and kube-proxies communicate directly with the Kubernetes API server.  

### pods

Basically, a pod is a deployed container. In other words, pods are a single or a collection of containers that are deployed as a single unit (essentially, the container-based applications); from a Kubernetes perspective, these are the most basic units of work in your cluster; they also are the cluster's resource scheduling units.

Before launching a container based on an image in Kubernetes, you'll need a pod definition that describes the application you want to run. Pods are stateless by default (meaning that they no depend on a persistent storage); this is because a system where each pods have their own state cannot be scaled horizontally. Pods are ephemeral by nature as they are never re deployed but rather destructed and have new ones being spawned.  

In a cluster, every deployed pod will have its own IP address but those IPs can only be reached from inside your cluster. Pods within a node can communicate via a bridge using the real IP addresses of the pods. That means pods on a node can communicate with all pods on pre defined ports on all nodes in a cluster without NAT.

You can have multi container pods in Kubernetes, but one container within this pod dies, then all of the pod goes away.

### rolling updates

Describes deployments updates that incrementally replace existing pods with pods containing a new Docker image.

### Service object

A Service Kubernetes object defines rules and load balancing for accessing your application from the internet.  

Each service has a service endpoint, which is a URL that other pods can connect to; *service-discovery* is a way for pods to easily communicate with each other. Services group pods into one static IP address, reachable from any Pod inside the cluster; a service of type `LoadBalancer`, for instance, makes those clusters reachable from the outside.

Kubernetes services add persistency to the epehemerality of pods by providing a network abstraction for pod access; typically =>

- a service will allocate an IP and a DNS name to the application service you are defining so that end-users can access it
- services can also be leveraged to scale up/down applications by adding/removing pods based on the demands for a given application at any point in time
- services can also act as load balancers for pods
- you'll always find services that will act as frontend for specific pods
