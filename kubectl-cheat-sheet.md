# `kubectl` cheat sheet

## debug what's happening within a node

`kubectl run -i --tty busybox --image=busybox --restart=Never -- sh` => this will run a new pod in it that will act as a shell to try interactions within your cluster.

### delete a resource on a cluster

- `kubectl delete -f {resource}.yaml`

### describe a service

- `kubectl describe service`

### execute a command within a pod's running container

`kubectl exec pod_name -- ls /folder` (or whatever other command you want to do).

### get pods by selector

- `kubectl get pods --selector={label}={value}`

### get the logs of a given pod

- `kubectl get pods`
- `kubectl attach pod_name` OR `kubectl logs {pod}` OR `kubectl logs --follow {pod}` OR `kubectl exec -it {pod} -- bash` (and then whatever you do to see the logs)

### useful commands with deployments

Useful commands with deployments =>

- `kubectl get deployments`
- `kubectl get rs` => get the replica sets
- `kubectl rollout status deployment/{deployment}`
- `kubectl rollout history deployment/{deployment}`
- `kubectl rollout undo deployment/{deployment}` => will rollback to previous version of your deployed app'

### more commands

- <https://kubernetes.io/docs/reference/kubectl/cheatsheet/>
